import { expect, test } from "@playwright/test";

const sections = ["Projects", "Experience", "Skills", "Contact"] as const;

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop nav is hidden on mobile");

  for (const name of sections) {
    test(`"${name}" scrolls its section into view`, async ({ page }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Primary" });

      await nav.getByRole("link", { name }).click();

      await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
      await expect(page.getByRole("heading", { level: 2, name })).toBeInViewport();
    });
  }
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Menu button only exists on mobile");

  test("menu opens, navigates, and closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /menu/i });
    const nav = page.getByRole("navigation", { name: "Primary" });

    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();

    await nav.getByRole("link", { name: "Skills" }).click();

    await expect(nav).toBeHidden();
    await expect(page.getByRole("heading", { level: 2, name: "Skills" })).toBeInViewport();
  });
});

test("skip link moves keyboard users to the main content", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
