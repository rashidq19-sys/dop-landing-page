import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : false,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      dsp_name VARCHAR(255),
      phone VARCHAR(50),
      source VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS source VARCHAR(50)`);
  await pool.query(`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS dsp_name VARCHAR(255)`);

  // First-party, anonymous page-view tracking for the admin traffic counter.
  // visitor_id is a random ID generated in the visitor's browser (no name,
  // email, or IP) so we can tell unique people from repeat views. created_at
  // is timestamptz (UTC) and bucketed into Europe/London days at query time.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS page_views (
      id BIGSERIAL PRIMARY KEY,
      visitor_id VARCHAR(64) NOT NULL,
      path VARCHAR(512) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at)`);

  // Live chat. A transcript used to exist only in the visitor's browser, so a
  // conversation could never be re-opened and a human could never join one.
  // public_id is the only identifier that reaches a URL — the numeric id never
  // leaves the server, so conversations cannot be enumerated by guessing.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id                      BIGSERIAL PRIMARY KEY,
      public_id               VARCHAR(32) UNIQUE NOT NULL,
      visitor_name            VARCHAR(255),
      visitor_email           VARCHAR(255),
      status                  VARCHAR(20) NOT NULL DEFAULT 'bot',
      escalation_reason       TEXT,
      escalated_at            TIMESTAMPTZ,
      admin_joined_at         TIMESTAMPTZ,
      closed_at               TIMESTAMPTZ,
      last_visitor_message_at TIMESTAMPTZ,
      last_admin_message_at   TIMESTAMPTZ,
      created_at              TIMESTAMPTZ DEFAULT NOW(),
      updated_at              TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id              BIGSERIAL PRIMARY KEY,
      conversation_id BIGINT NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
      role            VARCHAR(16) NOT NULL,
      content         TEXT NOT NULL,
      created_at      TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON chat_messages (conversation_id, id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON chat_conversations (status, updated_at DESC)`);

  console.log("Database initialized — waitlist + page_views + chat tables ready");
}

export default pool;
