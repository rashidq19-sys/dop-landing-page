import { Fragment, type ElementType, type HTMLAttributes } from "react";

/** A run of text, optionally styled (e.g. the hero's blue "one screen."). */
export type Segment = string | { text: string; className?: string };

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** One entry per line; lines are separated by <br />. */
  lines: Segment[][];
  /**
   * "lit": plain word spans whose colour is animated.
   * "rise": each word sits in an overflow-hidden slot so it can slide up into place.
   */
  mode?: "lit" | "rise";
  /** Extra data-* hooks for the hero's pre-paint CSS. */
  wordProps?: Record<string, string>;
};

const textOf = (s: Segment) => (typeof s === "string" ? s : s.text);

/**
 * Renders a heading split into word spans for GSAP. Screen readers get the full
 * sentence through aria-label; the word pieces are aria-hidden. Real spaces sit
 * between the spans, so crawlers and copy-paste read the sentence normally.
 */
export default function SplitWords({
  as: Tag = "h2",
  lines,
  mode = "lit",
  wordProps,
  ...rest
}: Props) {
  const label = lines.map((line) => line.map(textOf).join("")).join(" ").replace(/\s+/g, " ").trim();

  return (
    <Tag aria-label={label} {...rest}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.map((seg, si) => {
            const className = typeof seg === "string" ? undefined : seg.className;
            const words = textOf(seg).split(/(\s+)/);
            return words.map((w, wi) => {
              if (!w) return null;
              if (/^\s+$/.test(w)) return " ";
              const word =
                mode === "rise" ? (
                  // The slot: padding plus a matching negative margin keeps
                  // descenders from being clipped without moving the baseline.
                  <span
                    key={`${si}-${wi}`}
                    aria-hidden="true"
                    className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
                  >
                    <span data-word {...wordProps} className={`inline-block ${className ?? ""}`}>
                      {w}
                    </span>
                  </span>
                ) : (
                  <span key={`${si}-${wi}`} data-word {...wordProps} aria-hidden="true" className={className}>
                    {w}
                  </span>
                );
              return word;
            });
          })}
        </Fragment>
      ))}
    </Tag>
  );
}
