import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the profile and all content sections from the database", async ({ page }) => {
  await expect(page).toHaveTitle(/Elysa Ward/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Elysa Ward");

  for (const name of [/projects/i, /experience/i, /skills/i, /contact/i]) {
    await expect(page.getByRole("region", { name })).toBeVisible();
  }
  await expect(page.getByRole("region", { name: /projects/i }).getByRole("article")).toHaveCount(4);
});

test("loads every project screenshot", async ({ page }) => {
  const images = page.getByRole("region", { name: /projects/i }).getByRole("img");
  await expect(images).toHaveCount(4);

  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
  }
});

test("serves the résumé as a PDF", async ({ page, request }) => {
  const href = await page.getByRole("link", { name: /résumé/i }).getAttribute("href");
  const response = await request.get(href!);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("project links point at real, external URLs", async ({ page }) => {
  const links = page.getByRole("region", { name: /projects/i }).getByRole("link");

  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("target", "_blank");
  }
});

test("has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  await page.reload();
  await page.waitForLoadState("networkidle");

  expect(errors).toEqual([]);
});

test("opts out of Dark Reader, since the site is already dark", async ({ page }) => {
  // Without this, the extension rewrites inline styles and breaks hydration.
  await expect(page.locator('meta[name="darkreader-lock"]')).toHaveCount(1);
});

test("never scrolls horizontally", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
