import { describe, expect, it, vi } from "vitest";
import { CONTENT_TAG, handleRevalidate } from "./revalidate";

const SECRET = "s3cret-value";

function request(authorization?: string) {
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: authorization ? { authorization } : {},
  });
}

describe("handleRevalidate", () => {
  it("revalidates the content tag when the bearer secret matches", async () => {
    const revalidate = vi.fn();

    const res = await handleRevalidate(request(`Bearer ${SECRET}`), { secret: SECRET, revalidate });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ revalidated: true, tag: CONTENT_TAG });
    expect(revalidate).toHaveBeenCalledExactlyOnceWith(CONTENT_TAG);
  });

  it.each([
    ["no header", undefined],
    ["wrong secret", "Bearer nope"],
    ["secret with a different length", `Bearer ${SECRET}-extra`],
    ["wrong scheme", `Basic ${SECRET}`],
  ])("rejects %s with 401 and does not revalidate", async (_label, header) => {
    const revalidate = vi.fn();

    const res = await handleRevalidate(request(header), { secret: SECRET, revalidate });

    expect(res.status).toBe(401);
    expect(revalidate).not.toHaveBeenCalled();
  });

  it("refuses every request when no secret is configured", async () => {
    const revalidate = vi.fn();

    const res = await handleRevalidate(request("Bearer "), { secret: undefined, revalidate });

    expect(res.status).toBe(503);
    expect(revalidate).not.toHaveBeenCalled();
  });
});
