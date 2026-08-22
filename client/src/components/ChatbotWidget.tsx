import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, UserRound } from "lucide-react";

// Renders **bold**, bullet lines (- item), and blank-line spacing
function renderContent(content: string, isUser: boolean) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line === "") {
      nodes.push(<div key={`sp-${i}`} className="h-2" />);
      return;
    }

    const isBullet = line.startsWith("- ");
    const text = isBullet ? line.slice(2) : line;

    // Parse **bold** spans
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className={isUser ? "font-bold" : "font-semibold text-[#0F1B2D]"}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={j}>{part}</span>
      )
    );

    if (isBullet) {
      nodes.push(
        <div key={i} className="flex items-start gap-2 mt-1.5">
          <span className={`mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${isUser ? "bg-white/70" : "bg-[#2563EB]"}`} />
          <span className="leading-snug">{rendered}</span>
        </div>
      );
    } else {
      nodes.push(<p key={i} className="leading-snug">{rendered}</p>);
    }
  });

  return nodes;
}

type Role = "visitor" | "bot" | "admin" | "system";
type Status = "bot" | "awaiting_human" | "human" | "closed";

type Message = {
  id: number;
  role: Role;
  content: string;
};

type Lead = {
  name: string;
  email: string;
  conversationId: string;
};

const LEAD_STORAGE_KEY = "dspops_chat_lead";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POLL_MS = 2000;

function loadStoredLead(): Lead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.name === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.conversationId === "string" &&
      parsed.name.trim() &&
      parsed.conversationId.trim() &&
      EMAIL_REGEX.test(parsed.email)
    ) {
      return {
        name: parsed.name,
        email: parsed.email,
        conversationId: parsed.conversationId,
      };
    }
  } catch {
    // ignore corrupt storage
  }
  return null;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<Lead | null>(() => loadStoredLead());
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<Status>("bot");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const highestId = useRef(0);

  const conversationId = lead?.conversationId ?? "";

  const merge = useCallback((incoming: Message[]) => {
    if (!incoming.length) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m.id));
      const fresh = incoming.filter((m) => !seen.has(m.id));
      if (!fresh.length) return prev;
      return [...prev, ...fresh].sort((a, b) => a.id - b.id);
    });
    highestId.current = Math.max(highestId.current, ...incoming.map((m) => m.id));
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus the right field when panel opens
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      if (lead) {
        inputRef.current?.focus();
      } else {
        nameInputRef.current?.focus();
      }
    }, 100);
    return () => clearTimeout(t);
  }, [isOpen, lead]);

  // Rejoin an existing conversation. A refresh must not lose the thread, and
  // Rashid may have replied while the visitor was away.
  useEffect(() => {
    if (!conversationId || messages.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/chat/${conversationId}/messages`);
        if (!res.ok) {
          // Stale id — drop it and let them start again rather than sitting on
          // a conversation the server has never heard of.
          if (res.status === 404) {
            window.localStorage.removeItem(LEAD_STORAGE_KEY);
            setLead(null);
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        merge(data.messages ?? []);
        if (data.status) setStatus(data.status);
      } catch {
        // offline — the next send or poll recovers
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [conversationId, messages.length, merge]);

  // Poll only once a human is involved. In plain bot mode the reply arrives in
  // the response to the visitor's own message, so there is nothing to poll for.
  useEffect(() => {
    if (!isOpen || !conversationId) return;
    if (status !== "awaiting_human" && status !== "human") return;

    const tick = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch(
          `/api/chat/${conversationId}/messages?since=${highestId.current}`
        );
        if (!res.ok) return;
        const data = await res.json();
        merge(data.messages ?? []);
        if (data.status) setStatus(data.status);
      } catch {
        // transient blip; the next tick retries
      }
    };
    const handle = window.setInterval(tick, POLL_MS);
    // Catch up the instant the tab comes back, rather than making someone who
    // just switched back wait for the next tick to see a reply already waiting.
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(handle);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [isOpen, conversationId, status, merge]);

  function handleClose() {
    if (conversationId && messages.some((m) => m.role === "visitor")) {
      fetch(`/api/chat/${conversationId}/close`, { method: "POST" }).catch(() => {});
    }
    setIsOpen(false);
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmittingLead) return;

    const name = leadName.trim();
    const email = leadEmail.trim();

    if (!name) {
      setLeadError("Please enter your name.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setLeadError("Please enter a valid email address.");
      return;
    }

    setLeadError(null);
    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start the chat");

      const newLead: Lead = { name, email, conversationId: data.conversationId };
      // Stored only AFTER the server confirms. Storing first meant a failed
      // request left the visitor marked as known while nothing was captured —
      // and they were never asked again.
      try {
        window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(newLead));
      } catch {
        // private mode — the chat still works for this session
      }

      setLead(newLead);
      setStatus(data.status ?? "bot");
      merge([{ id: data.greetingId ?? 1, role: "bot", content: data.greeting }]);
      setLeadName("");
      setLeadEmail("");
    } catch (err: any) {
      setLeadError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  }

  async function requestHuman() {
    if (!conversationId) return;
    try {
      const res = await fetch(`/api/chat/${conversationId}/request-human`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        merge(data.messages ?? []);
        if (data.status) setStatus(data.status);
      }
    } catch {
      // the bot is still there; nothing useful to tell the visitor
    }
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading || !conversationId) return;

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/chat/${conversationId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      merge(data.messages ?? []);
      if (data.status) setStatus(data.status);
    } catch {
      merge([
        {
          id: Date.now(),
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const waitingForHuman = status === "awaiting_human";
  const humanLive = status === "human";

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-navy">
            <span className="text-white font-semibold text-sm">
              {humanLive ? "Chatting with Rashid" : "Ask about DSPOps"}
            </span>
            <div className="flex items-center gap-1">
              {lead && !waitingForHuman && !humanLive && status !== "closed" && (
                <button
                  onClick={requestHuman}
                  className="text-white/70 hover:text-white transition-colors text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1"
                >
                  <UserRound size={13} />
                  Talk to a person
                </button>
              )}
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors p-1 rounded"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {lead ? (
            <>
              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg) =>
                  msg.role === "system" ? (
                    <p
                      key={msg.id}
                      className="text-[11px] italic text-gray-500 text-center leading-snug px-4"
                    >
                      {msg.content}
                    </p>
                  ) : (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "visitor" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                          msg.role === "visitor"
                            ? "bg-[#2563EB] text-white rounded-br-sm"
                            : "bg-white border border-gray-100 shadow-sm text-gray-700 rounded-bl-sm"
                        }`}
                      >
                        {msg.role === "admin" && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#2563EB] mb-1">
                            <UserRound size={11} /> Rashid
                          </span>
                        )}
                        {renderContent(msg.content, msg.role === "visitor")}
                      </div>
                    </div>
                  )
                )}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || status === "closed"}
                  placeholder={humanLive ? "Message Rashid..." : "Type a message..."}
                  className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || status === "closed"}
                  className="p-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleLeadSubmit}
              className="flex-1 flex flex-col px-5 py-5 space-y-4 overflow-y-auto"
            >
              <div>
                <h3 className="text-[#0F1B2D] font-semibold text-base">
                  Before we start
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  Tell us who you are so we can follow up if the chat drops off.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="chat-lead-name"
                    className="block text-xs font-medium text-[#0F1B2D] mb-1"
                  >
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="chat-lead-name"
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    disabled={isSubmittingLead}
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="chat-lead-email"
                    className="block text-xs font-medium text-[#0F1B2D] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="chat-lead-email"
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    disabled={isSubmittingLead}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand disabled:opacity-50"
                  />
                </div>

                {leadError && (
                  <p className="text-xs text-red-600">{leadError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingLead ? "Starting..." : "Start chatting"}
              </button>

              <p className="text-[11px] text-gray-500 leading-snug">
                We'll only use this to follow up about DSPOps. No spam.
              </p>
            </form>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-navy text-white rounded-full shadow-lg hover:bg-navy-light transition-colors flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
