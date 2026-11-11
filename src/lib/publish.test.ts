import { describe, expect, it, vi } from "vitest";
import { requestRevalidation } from "./publish";

const ok = () => new Response(JSON.stringify({ revalidated: true }), { status: 200 });

describe("requestRevalidation", () => {
  it("POSTs to the site's revalidate endpoint with the bearer secret", async () => {
    const fetch = vi.fn().mockResolvedValue(ok());

    const result = await requestRevalidation({
      siteUrl: "https://example.com/",
      secret: "abc",
      fetch,
    });

    expect(fetch).toHaveBeenCalledExactlyOnceWith("https://example.com/api/revalidate", {
      method: "POST",
      headers: { authorization: "Bearer abc" },
    });
    expect(result).toEqual({ ok: true, message: "Published to https://example.com" });
  });

  it("skips without calling the site when no secret is set", async () => {
    const fetch = vi.fn();

    const result = await requestRevalidation({ siteUrl: "http://localhost:3000", secret: undefined, fetch });

    expect(fetch).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/REVALIDATE_SECRET/);
  });

  it("reports a rejected request without throwing", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("no", { status: 401 }));

    const result = await requestRevalidation({ siteUrl: "http://localhost:3000", secret: "x", fetch });

    expect(result).toEqual({ ok: false, message: expect.stringContaining("401") });
  });

  it("reports an unreachable site without throwing", async () => {
    const fetch = vi.fn().mockRejectedValue(new TypeError("fetch failed"));

    const result = await requestRevalidation({ siteUrl: "http://localhost:3000", secret: "x", fetch });

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/could not reach http:\/\/localhost:3000/i);
  });
});
