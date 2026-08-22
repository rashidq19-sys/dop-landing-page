import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import { Loader2, Send, Sparkles, Undo2, LogIn, Bot, Check } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";

// Rashid's quick-reply screen, reached from the link in the escalation email.
// Mobile matters as much as desktop here — he is usually replying from his
// phone, standing somewhere, to someone who is waiting.

type Role = "visitor" | "bot" | "admin" | "system";
type Status = "bot" | "awaiting_human" | "human" | "closed";

interface Message {
  id: number;
  role: Role;
  content: string;
  createdAt: string;
}

const POLL_MS = 2000;

/**
 * The bot writes **bold** and "- " bullets, so the operator needs the same
 * rendering the visitor gets — otherwise Rashid reads raw asterisks and can't
 * see what his own bot actually said. Mirrors renderContent in ChatbotWidget.
 */
function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line === "") return <div key={`sp-${i}`} className="h-2" />;

    const isBullet = line.startsWith("- ");
    const text = isBullet ? line.slice(2) : line;
    const rendered = text.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
      ) : (
        <span key={j}>{part}</span>
      )
    );

    return isBullet ? (
      <div key={i} className="flex items-start gap-2 mt-1.5">
        <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 bg-current opacity-50" />
        <span className="leading-snug">{rendered}</span>
      </div>
    ) : (
      <p key={i} className="leading-snug">{rendered}</p>
    );
  });
}

const STATUS_LABEL: Record<Status, string> = {
  bot: "Bot is handling this",
  awaiting_human: "Waiting for you",
  human: "You are live",
  closed: "Closed",
};

const STATUS_STYLE: Record<Status, string> = {
  bot: "bg-slate-100 text-slate-700 border-slate-200",
  awaiting_human: "bg-amber-100 text-amber-800 border-amber-200",
  human: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

/** A short blip when the visitor says something, built inline so there's no asset to ship. */
function playPing() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
    setTimeout(() => ctx.close().catch(() => {}), 500);
  } catch {
    // audio is a nicety, never a failure
  }
}

export default function AdminChat() {
  const [, params] = useRoute("/admin/chat/:publicId");
  const publicId = params?.publicId ?? "";
  const [token] = useState(() =>
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("k") ?? ""
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<Status>("bot");
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
  const [escalationReason, setEscalationReason] = useState<string | null>(null);

  const [draft, setDraft] = useState("");
  const [isAiDraft, setIsAiDraft] = useState(false);
  const [preRefine, setPreRefine] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"join" | "send" | "refine" | "suggest" | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const highestId = useRef(0);
  const originalTitle = useRef<string>("");
  const flashTimer = useRef<number | null>(null);

  usePageMeta({
    title: "Live chat — DSPOps",
    description: "Operator view for a live visitor conversation.",
    noindex: true,
  });

  const qs = useCallback(
    (suffix = "") => `/api/admin/chats/${publicId}${suffix}?k=${encodeURIComponent(token)}`,
    [publicId, token]
  );

  const applyMessages = useCallback((incoming: Message[], announce: boolean) => {
    if (!incoming.length) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m.id));
      const fresh = incoming.filter((m) => !seen.has(m.id));
      if (!fresh.length) return prev;
      return [...prev, ...fresh].sort((a, b) => a.id - b.id);
    });
    highestId.current = Math.max(highestId.current, ...incoming.map((m) => m.id));

    if (announce && incoming.some((m) => m.role === "visitor")) {
      playPing();
      if (document.visibilityState === "hidden" && !flashTimer.current) {
        originalTitle.current = originalTitle.current || document.title;
        flashTimer.current = window.setInterval(() => {
          document.title =
            document.title === originalTitle.current
              ? "💬 New message"
              : originalTitle.current;
        }, 900);
      }
    }
  }, []);

  // Stop the title flashing the moment he looks at the tab.
  useEffect(() => {
    const stop = () => {
      if (document.visibilityState === "visible" && flashTimer.current) {
        window.clearInterval(flashTimer.current);
        flashTimer.current = null;
        if (originalTitle.current) document.title = originalTitle.current;
      }
    };
    document.addEventListener("visibilitychange", stop);
    window.addEventListener("focus", stop);
    return () => {
      document.removeEventListener("visibilitychange", stop);
      window.removeEventListener("focus", stop);
      if (flashTimer.current) window.clearInterval(flashTimer.current);
    };
  }, []);

  const suggest = useCallback(async () => {
    setBusy("suggest");
    try {
      const res = await fetch(qs("/suggest"), { method: "POST" });
      const data = await res.json();
      if (res.ok && typeof data.draft === "string" && data.draft.trim()) {
        setDraft(data.draft.trim());
        setIsAiDraft(true);
        setPreRefine(null);
      }
    } catch {
      // a missing suggestion is not worth an error banner — he can just type
    } finally {
      setBusy(null);
    }
  }, [qs]);

  // Initial load
  useEffect(() => {
    if (!publicId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(qs());
        if (res.status === 401) {
          setError(
            "This link has expired or isn't valid. Open the chat from the admin dashboard instead."
          );
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load the conversation");
        if (cancelled) return;

        setVisitorName(data.visitorName);
        setVisitorEmail(data.visitorEmail);
        setEscalationReason(data.escalationReason);
        setStatus(data.status);
        applyMessages(data.messages ?? [], false);
        if (data.status !== "closed") suggest();
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [publicId, qs, applyMessages, suggest]);

  // Poll. Pauses while the tab is hidden so a forgotten tab doesn't poll all day.
  useEffect(() => {
    if (error || loading || status === "closed") return;
    const tick = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch(`${qs("/messages")}&since=${highestId.current}`);
        if (!res.ok) return;
        const data = await res.json();
        const fresh: Message[] = data.messages ?? [];
        applyMessages(fresh, true);
        if (data.status) setStatus(data.status);
        // A new question deserves a fresh draft — but never clobber his typing.
        if (fresh.some((m) => m.role === "visitor") && (!draft.trim() || isAiDraft)) {
          suggest();
        }
      } catch {
        // transient network blips are expected; the next tick retries
      }
    };
    const handle = window.setInterval(tick, POLL_MS);
    // Catch up immediately on returning to the tab — he may have been away
    // while the visitor was typing.
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(handle);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [error, loading, status, qs, applyMessages, suggest, draft, isAiDraft]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function join() {
    setBusy("join");
    try {
      const res = await fetch(qs("/join"), { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not join");
      setStatus(data.status);
      applyMessages(data.messages ?? [], false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  }

  async function send() {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy("send");
    try {
      const res = await fetch(qs("/message"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send");
      applyMessages([data.message], false);
      setStatus(data.status);
      setDraft("");
      setIsAiDraft(false);
      setPreRefine(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  }

  async function refine() {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy("refine");
    try {
      const res = await fetch(qs("/refine"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not refine that");
      setPreRefine(text);
      setDraft(data.refined);
      setIsAiDraft(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  }

  function undoRefine() {
    if (preRefine === null) return;
    setDraft(preRefine);
    setPreRefine(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      refine();
      return;
    }
    // Enter sends on a real keyboard. On touch it must insert a newline —
    // sending is the button's job there.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (e.key === "Enter" && !e.shiftKey && !isTouch) {
      e.preventDefault();
      send();
    }
  }

  if (!publicId) return null;

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-[#0F1B2D]">Can't open this chat</h1>
          <p className="text-sm text-[#0F1B2D]/70 mt-2 leading-relaxed">{error}</p>
          <a href="/admin" className="inline-block mt-5 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-semibold">
            Go to the dashboard
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#2563EB]" size={28} />
      </div>
    );
  }

  const canReply = status !== "closed";

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F1B2D]">
      <div className="max-w-[1100px] mx-auto md:grid md:grid-cols-[1fr_300px] md:gap-6 md:px-6 md:py-6">
        {/* Conversation */}
        <div className="flex flex-col h-[100dvh] md:h-[calc(100dvh-3rem)] md:border md:border-black/8 md:rounded-2xl md:bg-white md:overflow-hidden">
          <header className="px-4 py-3 border-b border-black/8 bg-white flex items-center gap-3 shrink-0">
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[15px] truncate">{visitorName || "Visitor"}</div>
              <div className="text-[12px] text-[#0F1B2D]/55 truncate">{visitorEmail || "—"}</div>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${STATUS_STYLE[status]}`}>
              {STATUS_LABEL[status]}
            </span>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) =>
              m.role === "system" ? (
                <p key={m.id} className="text-[12px] italic text-[#0F1B2D]/45 text-center py-1">
                  {m.content}
                </p>
              ) : (
                <div key={m.id} className={`flex ${m.role === "visitor" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug ${
                      m.role === "visitor"
                        ? "bg-white border border-black/8 rounded-bl-sm"
                        : m.role === "admin"
                          ? "bg-[#2563EB] text-white rounded-br-sm"
                          : "bg-slate-100 text-[#0F1B2D]/80 rounded-br-sm"
                    }`}
                  >
                    {m.role === "bot" && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide opacity-60 mb-1">
                        <Bot size={11} /> Assistant
                      </span>
                    )}
                    {renderContent(m.content)}
                  </div>
                </div>
              )
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          {canReply && (
            <div className="border-t border-black/8 bg-white px-3 pt-2.5 pb-3 shrink-0">
              {status !== "human" && (
                <button
                  onClick={join}
                  disabled={busy === "join"}
                  className="w-full mb-2.5 px-4 py-3 bg-[#2563EB] text-white rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {busy === "join" ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                  Join and take over from the bot
                </button>
              )}

              {isAiDraft && draft.trim() && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#2563EB] font-semibold mb-1.5 px-1">
                  <Sparkles size={12} /> AI draft — send it, or edit it first
                </div>
              )}

              <textarea
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setIsAiDraft(false);
                }}
                onKeyDown={onKeyDown}
                rows={3}
                placeholder="Type your reply…"
                className="w-full resize-none px-3.5 py-3 border border-black/12 rounded-lg text-[15px] outline-none focus:ring-2 focus:ring-[#2563EB]/40"
              />

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={refine}
                  disabled={!draft.trim() || busy !== null}
                  title="Refine (Ctrl/Cmd+K)"
                  className="px-3.5 py-2.5 rounded-lg border border-[#2563EB]/30 text-[#2563EB] text-[13px] font-bold flex items-center gap-1.5 disabled:opacity-40"
                >
                  {busy === "refine" ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Refine
                </button>

                {preRefine !== null && (
                  <button
                    onClick={undoRefine}
                    className="px-3 py-2.5 rounded-lg border border-black/12 text-[13px] font-semibold flex items-center gap-1.5"
                  >
                    <Undo2 size={14} /> Undo
                  </button>
                )}

                <button
                  onClick={send}
                  disabled={!draft.trim() || busy !== null}
                  className="ml-auto px-5 py-2.5 bg-[#2563EB] text-white rounded-lg text-[13px] font-bold flex items-center gap-1.5 disabled:opacity-40"
                >
                  {busy === "send" ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Details rail — desktop only; the header carries this on mobile */}
        <aside className="hidden md:block">
          <div className="border border-black/8 rounded-2xl bg-white p-4 text-[13px]">
            <h2 className="font-bold text-[14px] mb-3">Visitor</h2>
            <dl className="space-y-2.5">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-[#0F1B2D]/45">Name</dt>
                <dd className="font-semibold">{visitorName || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-[#0F1B2D]/45">Email</dt>
                <dd className="font-semibold break-all">{visitorEmail || "—"}</dd>
              </div>
              {escalationReason && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-[#0F1B2D]/45">Handed over because</dt>
                  <dd className="font-semibold">{escalationReason}</dd>
                </div>
              )}
            </dl>

            {status === "human" && (
              <button
                onClick={async () => {
                  await fetch(qs("/handback"), { method: "POST" });
                  setStatus("bot");
                }}
                className="mt-4 w-full px-3 py-2.5 rounded-lg border border-black/12 text-[13px] font-semibold flex items-center justify-center gap-1.5"
              >
                <Check size={14} /> Hand back to the bot
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
