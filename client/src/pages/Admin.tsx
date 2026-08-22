import { useState, useEffect } from "react";
import { Lock, LogOut, Users, BarChart3, Trash2, MessageSquare, ArrowRight } from "lucide-react";

interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  dsp_name: string | null;
  phone: string | null;
  source: string | null;
  created_at: string;
}

interface MetricPair {
  uniqueVisitors: number;
  pageViews: number;
}

interface TrafficStats {
  summary: {
    today: MetricPair;
    last7Days: MetricPair;
    last30Days: MetricPair;
    allTime: MetricPair;
  };
  daily: { day: string; uniqueVisitors: number; pageViews: number }[];
  byPage: { path: string; uniqueVisitors: number; pageViews: number }[];
}

const SUMMARY_CARDS: { key: keyof TrafficStats["summary"]; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "last7Days", label: "Last 7 days" },
  { key: "last30Days", label: "Last 30 days" },
  { key: "allTime", label: "All time" },
];

function formatNum(n: number): string {
  return n.toLocaleString("en-GB");
}

// "2026-06-23" → "Mon 23 Jun". Anchored to midday to avoid timezone date-rollover.
function formatDay(day: string): string {
  return new Date(`${day}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function StatCard({ label, metric }: { label: string; metric: MetricPair }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-bold text-slate-900 leading-none">
            {formatNum(metric.uniqueVisitors)}
          </p>
          <p className="text-xs text-slate-500 mt-1">visitors</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand leading-none">
            {formatNum(metric.pageViews)}
          </p>
          <p className="text-xs text-slate-500 mt-1">page views</p>
        </div>
      </div>
    </div>
  );
}


interface ChatSummary {
  conversationId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  status: "bot" | "awaiting_human" | "human" | "closed";
  escalationReason: string | null;
  messageCount: number;
  lastMessageAt: string | null;
  createdAt: string;
}

const CHAT_STATUS_LABEL: Record<ChatSummary["status"], string> = {
  bot: "Bot",
  awaiting_human: "Waiting for you",
  human: "You are live",
  closed: "Closed",
};

const CHAT_STATUS_STYLE: Record<ChatSummary["status"], string> = {
  bot: "bg-slate-100 text-slate-600",
  awaiting_human: "bg-amber-100 text-amber-800",
  human: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-100 text-slate-400",
};

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<TrafficStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatSummary[]>([]);

  const isLoggedIn = !!token;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      sessionStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (token) {
      fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    sessionStorage.removeItem("admin_token");
    setToken("");
    setEntries([]);
    setTotal(0);
    setStats(null);
    setChats([]);
  };

  const handleDelete = async (id: number, email: string) => {
    if (!window.confirm(`Delete ${email} from the waitlist? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleLogout();
        setError("Session expired. Please log in again.");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete signup");
      }

      setEntries((prev) => prev.filter((e) => e.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const [waitlistRes, statsRes, chatsRes] = await Promise.all([
          fetch("/api/admin/waitlist", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/admin/chats", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (waitlistRes.status === 401 || statsRes.status === 401) {
          handleLogout();
          setError("Session expired. Please log in again.");
          return;
        }

        const waitlistData = await waitlistRes.json();
        if (!waitlistRes.ok) throw new Error(waitlistData.error || "Failed to fetch signups");
        const statsData = await statsRes.json();
        if (!statsRes.ok) throw new Error(statsData.error || "Failed to fetch traffic");

        if (cancelled) return;
        setEntries(waitlistData.entries);
        setTotal(waitlistData.total);
        setStats(statsData);
        // A failed chat list must not blank the rest of the dashboard.
        if (chatsRes.ok) {
          const chatsData = await chatsRes.json();
          setChats(chatsData.conversations ?? []);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                <Lock size={24} className="text-brand" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-slate-900 text-center mb-6">
              Admin Access
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-brand" />
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Site Traffic */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={20} className="text-brand" />
            <h2 className="text-lg font-bold text-slate-900">Site Traffic</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Anonymous, first-party counts. Tracking began when this feature shipped — no
            earlier history.
          </p>

          {loading && !stats ? (
            <div className="text-center py-12 text-slate-500">Loading…</div>
          ) : !stats ? (
            <div className="text-center py-12 text-slate-500">No traffic data yet.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {SUMMARY_CARDS.map((c) => (
                  <StatCard key={c.key} label={c.label} metric={stats.summary[c.key]} />
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Day by day */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-sm font-semibold text-slate-700">
                      Day by day · last 30 days
                    </h3>
                  </div>
                  {stats.daily.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-slate-500">
                      No visits recorded yet.
                    </p>
                  ) : (
                    <div className="max-h-80 overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-white">
                          <tr className="border-b border-slate-200">
                            <th className="text-left px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="text-right px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Visitors
                            </th>
                            <th className="text-right px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Views
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {stats.daily.map((d) => (
                            <tr key={d.day} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-2.5 text-sm text-slate-700">
                                {formatDay(d.day)}
                              </td>
                              <td className="px-5 py-2.5 text-sm font-medium text-slate-900 text-right">
                                {formatNum(d.uniqueVisitors)}
                              </td>
                              <td className="px-5 py-2.5 text-sm text-slate-600 text-right">
                                {formatNum(d.pageViews)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* By page */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-sm font-semibold text-slate-700">
                      By page · last 30 days
                    </h3>
                  </div>
                  {stats.byPage.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-slate-500">
                      No visits recorded yet.
                    </p>
                  ) : (
                    <div className="max-h-80 overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-white">
                          <tr className="border-b border-slate-200">
                            <th className="text-left px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Page
                            </th>
                            <th className="text-right px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Visitors
                            </th>
                            <th className="text-right px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Views
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {stats.byPage.map((p) => (
                            <tr key={p.path} className="hover:bg-slate-50 transition-colors">
                              <td
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 max-w-[220px] truncate"
                                title={p.path}
                              >
                                {p.path}
                              </td>
                              <td className="px-5 py-2.5 text-sm font-medium text-slate-900 text-right">
                                {formatNum(p.uniqueVisitors)}
                              </td>
                              <td className="px-5 py-2.5 text-sm text-slate-600 text-right">
                                {formatNum(p.pageViews)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Waitlist */}
        {/* Live chats — anyone waiting on a human is pinned to the top by the API */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} className="text-brand" />
            <h2 className="text-lg font-bold text-slate-900">Live Chats</h2>
            {chats.some((c) => c.status === "awaiting_human") && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold">
                {chats.filter((c) => c.status === "awaiting_human").length} waiting
              </span>
            )}
          </div>

          {chats.length === 0 ? (
            <p className="text-sm text-slate-500 bg-white border border-slate-200 rounded-xl p-5">
              No chats yet. Conversations appear here as soon as a visitor starts one.
            </p>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
              {chats.map((c) => (
                <a
                  key={c.conversationId}
                  href={`/admin/chat/${c.conversationId}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm truncate">
                        {c.visitorName || "Visitor"}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${CHAT_STATUS_STYLE[c.status]}`}
                      >
                        {CHAT_STATUS_LABEL[c.status]}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {c.visitorEmail || "—"}
                      {c.escalationReason ? ` · ${c.escalationReason}` : ""}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 shrink-0 hidden sm:block">
                    {c.messageCount} msg{c.messageCount === 1 ? "" : "s"}
                  </div>
                  <ArrowRight size={16} className="text-slate-400 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-brand" />
            <h2 className="text-lg font-bold text-slate-900">Waitlist Signups</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              {total}
            </span>
          </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No signups yet. Share your landing page to start collecting leads!
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      DSP Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Signed Up
                    </th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {entry.name || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {entry.dsp_name || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {entry.phone || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {entry.source || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(entry.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(entry.id, entry.email)}
                          disabled={deletingId === entry.id}
                          aria-label={`Delete ${entry.email}`}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </section>
      </main>
    </div>
  );
}
