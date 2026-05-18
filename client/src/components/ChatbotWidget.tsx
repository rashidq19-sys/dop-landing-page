import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

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

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Lead = {
  name: string;
  email: string;
};

const LEAD_STORAGE_KEY = "dspops_chat_lead";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      parsed.name.trim() &&
      EMAIL_REGEX.test(parsed.email)
    ) {
      return { name: parsed.name, email: parsed.email };
    }
  } catch {
    // ignore corrupt storage
  }
  return null;
}

function buildGreeting(lead: Lead | null): Message {
  const firstName = lead?.name.trim().split(/\s+/)[0];
  return {
    role: "assistant",
    content: firstName
      ? `Hi ${firstName}! Ask me anything about DSPOps — features, pricing, or how it works.`
      : "Hi! Ask me anything about DSPOps — features, pricing, or how it works.",
  };
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<Lead | null>(() => loadStoredLead());
  const [messages, setMessages] = useState<Message[]>(() => [buildGreeting(loadStoredLead())]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

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

  function handleClose() {
    // Fire-and-forget: notify backend the session ended, only if user chatted
    if (messages.length > 1) {
      fetch("/api/chat/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      }).catch(() => {});
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

    const newLead: Lead = { name, email };

    try {
      window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(newLead));
    } catch {
      // ignore storage errors (private mode etc.) — chat still works for this session
    }

    // Fire-and-forget: notify backend a new lead arrived
    fetch("/api/chat/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead),
    }).catch(() => {});

    setLead(newLead);
    setMessages([buildGreeting(newLead)]);
    setLeadName("");
    setLeadEmail("");
    setIsSubmittingLead(false);
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
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

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-navy">
            <span className="text-white font-semibold text-sm">
              Ask about DSPOps
            </span>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {lead ? (
            <>
              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-[#2563EB] text-white rounded-br-sm"
                          : "bg-white border border-gray-100 shadow-sm text-gray-700 rounded-bl-sm"
                      }`}
                    >
                      {renderContent(msg.content, msg.role === "user")}
                    </div>
                  </div>
                ))}

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
                  disabled={isLoading}
                  placeholder="Type a message..."
                  className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
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
