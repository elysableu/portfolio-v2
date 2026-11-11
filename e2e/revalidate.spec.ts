import { expect, test } from "@playwright/test";

// API-only checks: one browser project is enough.
test.skip(({ isMobile }) => isMobile, "API test runs once");

test("rejects publish requests without the secret", async ({ request }) => {
  const res = await request.post("/api/revalidate");

  expect(res.status()).toBe(401);
});

test("accepts publish requests with the secret", async ({ request }) => {
  const secret = process.env.REVALIDATE_SECRET;
  test.skip(!secret, "REVALIDATE_SECRET not set");

  const res = await request.post("/api/revalidate", {
    headers: { authorization: `Bearer ${secret}` },
  });

  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ revalidated: true, tag: "content" });
});
