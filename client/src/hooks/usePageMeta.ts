import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

// SPA limitation: meta tags set here are picked up by Google (it renders JS)
// but NOT by social link previewers (LinkedIn/Slack/WhatsApp parse static HTML).
// Static OG tags in client/index.html are the fallback for shared links.
// Build-time prerendering (scripts/prerender.mjs) captures these into the
// per-route HTML so crawlers see the final tags without rendering JS.

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, attr: "name" | "property" = "name") {
  const el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.remove();
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ATTR = "data-page-jsonld";

function setPageJsonLd(payload: Record<string, unknown> | Record<string, unknown>[]) {
  document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((el) => el.remove());
  const arr = Array.isArray(payload) ? payload : [payload];
  for (const item of arr) {
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute(JSON_LD_ATTR, "true");
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  }
}

function clearPageJsonLd() {
  document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((el) => el.remove());
}

export function usePageMeta({ title, description, canonicalPath, noindex, jsonLd }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    if (canonicalPath) {
      const href = `https://dspops.app${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;
      setCanonical(href);
      setMeta("og:url", href, "property");
    }

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("robots");
    }

    if (jsonLd) {
      setPageJsonLd(jsonLd);
    } else {
      clearPageJsonLd();
    }

    return () => {
      clearPageJsonLd();
    };
  }, [title, description, canonicalPath, noindex, jsonLd]);
}

// Helpers to build common JSON-LD payloads.

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://dspops.app${item.path.startsWith("/") ? "" : "/"}${item.path}`,
    })),
  };
}
