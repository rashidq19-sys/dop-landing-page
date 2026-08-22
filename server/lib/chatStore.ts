import { nanoid } from "nanoid";
import pool from "../db.js";

// All database access for live chat. Deliberately knows nothing about HTTP or
// Anthropic, so it can be verified without an API key and the route files stay
// thin. Rows never leave this module in snake_case.

export type ChatRole = "visitor" | "bot" | "admin" | "system";
export type ChatStatus = "bot" | "awaiting_human" | "human" | "closed";

export interface Conversation {
  id: number;
  publicId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  status: ChatStatus;
  escalationReason: string | null;
  escalatedAt: Date | null;
  adminJoinedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

export interface ConversationSummary extends Conversation {
  messageCount: number;
  lastMessageAt: Date | null;
}

const CONVERSATION_COLUMNS = `
  id, public_id, visitor_name, visitor_email, status, escalation_reason,
  escalated_at, admin_joined_at, closed_at, created_at, updated_at
`;

function toConversation(row: any): Conversation {
  return {
    id: Number(row.id),
    publicId: row.public_id,
    visitorName: row.visitor_name,
    visitorEmail: row.visitor_email,
    status: row.status,
    escalationReason: row.escalation_reason,
    escalatedAt: row.escalated_at,
    adminJoinedAt: row.admin_joined_at,
    closedAt: row.closed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toMessage(row: any): ChatMessage {
  return {
    id: Number(row.id),
    role: row.role,
    content: row.content,
    createdAt: row.created_at,
  };
}

export async function createConversation(
  name: string,
  email: string
): Promise<Conversation> {
  const cleanName = name.trim().slice(0, 255) || null;
  const cleanEmail = email.trim().toLowerCase().slice(0, 255) || null;

  const result = await pool.query(
    `INSERT INTO chat_conversations (public_id, visitor_name, visitor_email)
     VALUES ($1, $2, $3)
     RETURNING ${CONVERSATION_COLUMNS}`,
    [nanoid(21), cleanName, cleanEmail]
  );
  return toConversation(result.rows[0]);
}

export async function getConversationByPublicId(
  publicId: string
): Promise<Conversation | null> {
  const result = await pool.query(
    `SELECT ${CONVERSATION_COLUMNS} FROM chat_conversations WHERE public_id = $1`,
    [publicId]
  );
  return result.rowCount ? toConversation(result.rows[0]) : null;
}

export async function addMessage(
  conversationId: number,
  role: ChatRole,
  content: string
): Promise<ChatMessage> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO chat_messages (conversation_id, role, content)
       VALUES ($1, $2, $3)
       RETURNING id, role, content, created_at`,
      [conversationId, role, content]
    );

    // Keep the conversation's activity clocks in step with its messages, so the
    // admin list can sort by "who is waiting" without scanning chat_messages.
    await client.query(
      `UPDATE chat_conversations
          SET last_visitor_message_at = CASE WHEN $2 = 'visitor' THEN NOW() ELSE last_visitor_message_at END,
              last_admin_message_at   = CASE WHEN $2 = 'admin'   THEN NOW() ELSE last_admin_message_at END,
              updated_at = NOW()
        WHERE id = $1`,
      [conversationId, role]
    );
    await client.query("COMMIT");
    return toMessage(result.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function getMessages(
  conversationId: number,
  sinceId = 0
): Promise<ChatMessage[]> {
  const result = await pool.query(
    `SELECT id, role, content, created_at
       FROM chat_messages
      WHERE conversation_id = $1 AND id > $2
      ORDER BY id ASC`,
    [conversationId, sinceId]
  );
  return result.rows.map(toMessage);
}

/** The last `limit` messages, returned oldest-first so they can be replayed to the model. */
export async function getRecentMessages(
  conversationId: number,
  limit: number
): Promise<ChatMessage[]> {
  const result = await pool.query(
    `SELECT id, role, content, created_at FROM (
       SELECT id, role, content, created_at
         FROM chat_messages
        WHERE conversation_id = $1
        ORDER BY id DESC
        LIMIT $2
     ) recent
     ORDER BY id ASC`,
    [conversationId, limit]
  );
  return result.rows.map(toMessage);
}

export async function countMessages(conversationId: number): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS n FROM chat_messages WHERE conversation_id = $1`,
    [conversationId]
  );
  return result.rows[0].n;
}

/**
 * Move a conversation to a new status. The three lifecycle timestamps are set
 * with COALESCE so they record the FIRST time each thing happened — a repeated
 * escalation or a second join must not rewrite history.
 */
export async function setStatus(
  publicId: string,
  status: ChatStatus,
  extra: { escalationReason?: string } = {}
): Promise<Conversation | null> {
  const result = await pool.query(
    `UPDATE chat_conversations
        SET status = $2::text,
            escalation_reason = COALESCE(escalation_reason, $3::text),
            escalated_at    = CASE WHEN $2::text = 'awaiting_human' THEN COALESCE(escalated_at, NOW())    ELSE escalated_at END,
            admin_joined_at = CASE WHEN $2::text = 'human'          THEN COALESCE(admin_joined_at, NOW()) ELSE admin_joined_at END,
            closed_at       = CASE WHEN $2::text = 'closed'         THEN COALESCE(closed_at, NOW())       ELSE closed_at END,
            updated_at = NOW()
      WHERE public_id = $1
      RETURNING ${CONVERSATION_COLUMNS}`,
    [publicId, status, extra.escalationReason ?? null]
  );
  return result.rowCount ? toConversation(result.rows[0]) : null;
}

/**
 * Escalate, but ONLY from the 'bot' state — the guard is in the WHERE clause,
 * not in JavaScript.
 *
 * Generating a bot reply takes a second or two, and the operator can press Join
 * during that window. A caller holding a conversation it read before the AI call
 * would otherwise resurrect a chat Rashid has already joined, dropping it back
 * to 'awaiting_human' and letting the bot talk over him. Returns null when the
 * transition did not apply, which also makes escalation naturally idempotent.
 */
export async function escalateToAwaitingHuman(
  publicId: string,
  reason: string | null
): Promise<Conversation | null> {
  const result = await pool.query(
    `UPDATE chat_conversations
        SET status = 'awaiting_human',
            escalation_reason = COALESCE(escalation_reason, $2::text),
            escalated_at = COALESCE(escalated_at, NOW()),
            updated_at = NOW()
      WHERE public_id = $1 AND status = 'bot'
      RETURNING ${CONVERSATION_COLUMNS}`,
    [publicId, reason]
  );
  return result.rowCount ? toConversation(result.rows[0]) : null;
}

export async function listConversations(limit = 50): Promise<ConversationSummary[]> {
  const result = await pool.query(
    `SELECT c.id, c.public_id, c.visitor_name, c.visitor_email, c.status,
            c.escalation_reason, c.escalated_at, c.admin_joined_at, c.closed_at,
            c.created_at, c.updated_at,
            COALESCE(m.message_count, 0)::int AS message_count,
            m.last_message_at
       FROM chat_conversations c
       LEFT JOIN (
         SELECT conversation_id, COUNT(*) AS message_count, MAX(created_at) AS last_message_at
           FROM chat_messages
          GROUP BY conversation_id
       ) m ON m.conversation_id = c.id
      ORDER BY c.updated_at DESC
      LIMIT $1`,
    [limit]
  );
  return result.rows.map((row) => ({
    ...toConversation(row),
    messageCount: row.message_count,
    lastMessageAt: row.last_message_at,
  }));
}
