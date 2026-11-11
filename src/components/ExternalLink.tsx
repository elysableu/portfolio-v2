import type { AnchorHTMLAttributes } from "react";

/** Anchor that opens in a new tab without leaking `window.opener`. */
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
