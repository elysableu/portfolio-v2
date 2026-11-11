type Options = {
  siteUrl: string;
  secret: string | undefined;
  fetch?: typeof globalThis.fetch;
};

type Result = { ok: boolean; message: string };

/**
 * Asks a running site to drop its cached content so freshly seeded data
 * shows on the next visit. Never throws: the seed itself already succeeded.
 */
export async function requestRevalidation({
  siteUrl,
  secret,
  fetch = globalThis.fetch,
}: Options): Promise<Result> {
  const base = siteUrl.replace(/\/+$/, "");

  if (!secret) {
    return {
      ok: false,
      message: "REVALIDATE_SECRET is not set, so the site was not notified. Changes appear within a day.",
    };
  }

  try {
    const res = await fetch(`${base}/api/revalidate`, {
      method: "POST",
      headers: { authorization: `Bearer ${secret}` },
    });
    return res.ok
      ? { ok: true, message: `Published to ${base}` }
      : { ok: false, message: `${base} rejected the publish request (HTTP ${res.status}).` };
  } catch {
    return { ok: false, message: `Could not reach ${base}. Is the site running?` };
  }
}
