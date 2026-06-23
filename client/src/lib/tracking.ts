// First-party, privacy-friendly page-view tracking.
//
// Stores a random anonymous visitor ID in localStorage so the backend can tell
// unique people from repeat views. The ID identifies no one — it carries no
// name, email, or IP, and is only ever sent to our own /api/track endpoint.

const VISITOR_KEY = "dspops_vid";

function randomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    // localStorage blocked (private mode / cookies disabled): use an ephemeral
    // ID so the view still counts (as a new visitor each time).
    return `anon-${randomId()}`;
  }
}

export function trackPageView(path: string): void {
  // Never track the private admin area.
  if (!path || path.startsWith("/admin")) return;

  try {
    const body = JSON.stringify({ path, visitorId: getVisitorId() });
    // fetch + keepalive — NOT navigator.sendBeacon, which sends text/plain and
    // would bypass express.json(), leaving req.body empty. keepalive lets the
    // request survive a fast navigation away from the page.
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* tracking must never break the page */
    });
  } catch {
    /* tracking must never break the page */
  }
}
