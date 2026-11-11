import { createHash, timingSafeEqual } from "node:crypto";

/** Cache tag shared by every database-backed read on the page. */
export const CONTENT_TAG = "content";

type Deps = {
  secret: string | undefined;
  revalidate: (tag: string) => void;
};

/** Compares secrets in constant time, regardless of their lengths. */
function matches(provided: string, expected: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

/**
 * Authorizes a publish request (`Authorization: Bearer <secret>`) and
 * invalidates cached content. Framework-free so it can be unit tested.
 */
export async function handleRevalidate(request: Request, { secret, revalidate }: Deps) {
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured" }, { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  const [scheme, token = ""] = header.split(" ");
  if (scheme !== "Bearer" || !matches(token, secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidate(CONTENT_TAG);
  return Response.json({ revalidated: true, tag: CONTENT_TAG });
}
