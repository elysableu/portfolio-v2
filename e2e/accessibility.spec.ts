import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no WCAG 2.2 A/AA violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("has no violations with the mobile menu open", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu only");
  await page.goto("/");
  await page.getByRole("button", { name: /menu/i }).click();

  const results = await new AxeBuilder({ page })
    .include("header")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  const behavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(behavior).toBe("auto");
  await context.close();
});
