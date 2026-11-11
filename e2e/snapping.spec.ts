import { expect, type Page, test } from "@playwright/test";

const HEADER = 64; // sticky header height (h-16)

/** Waits for scrolling (including snap animation) to come to rest. */
async function settledScrollY(page: Page): Promise<number> {
  let last = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) return y;
    last = y;
    await page.waitForTimeout(100);
  }
  return last;
}

/** Document offset at which a section's top sits just under the header. */
function snapPointOf(page: Page, selector: string) {
  return page.evaluate(
    ([sel, header]) => {
      const el = document.querySelector(sel)!;
      return Math.round(el.getBoundingClientRect().top + window.scrollY - (header as number));
    },
    [selector, HEADER] as const,
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("every section fills the window below the header", async ({ page }) => {
  const viewport = page.viewportSize()!;
  const heights = await page.$$eval("main > section", (els) =>
    els.map((el) => el.getBoundingClientRect().height),
  );

  expect(heights).toHaveLength(5);
  for (const height of heights) {
    expect(height).toBeGreaterThanOrEqual(viewport.height - HEADER - 1);
  }
});

test("hides the next section when a section is in view", async ({ page, isMobile }) => {
  test.skip(isMobile, "Uses desktop nav links");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Skills" }).click();
  await settledScrollY(page);

  await expect(page.getByRole("heading", { level: 2, name: "Skills" })).toBeInViewport();
  await expect(page.getByRole("heading", { level: 2, name: "Contact" })).not.toBeInViewport();
});

test("a partial scroll snaps to the next section's top", async ({ page }) => {
  const viewport = page.viewportSize()!;
  const projectsTop = await snapPointOf(page, "#projects");

  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  await page.mouse.wheel(0, Math.round(projectsTop * 0.7));

  expect(await settledScrollY(page)).toBeCloseTo(projectsTop, -1);
});

test("scrolls freely inside a section taller than the window", async ({ page }) => {
  const viewport = page.viewportSize()!;
  const projectsTop = await snapPointOf(page, "#projects");
  const experienceTop = await snapPointOf(page, "#experience");
  test.skip(experienceTop - projectsTop <= viewport.height, "Projects fits in this viewport");

  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), projectsTop);
  await settledScrollY(page);
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  await page.mouse.wheel(0, 300);

  const y = await settledScrollY(page);
  expect(y).toBeGreaterThan(projectsTop + 200);
  expect(y).toBeLessThan(experienceTop);
});

for (const id of ["skills", "contact"]) {
  test(`centers the ${id} content vertically in its section`, async ({ page }) => {
    const gaps = await page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId)!;
      const box = section.getBoundingClientRect();
      const first = section.firstElementChild!.getBoundingClientRect();
      const last = section.lastElementChild!.getBoundingClientRect();
      return { above: first.top - box.top, below: box.bottom - last.bottom };
    }, id);

    // Equal space above the heading and below the content (within 2px).
    expect(Math.abs(gaps.above - gaps.below)).toBeLessThanOrEqual(2);
  });
}

test("the footer is still reachable at the bottom of the page", async ({ page }) => {
  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
  );
  await settledScrollY(page);

  await expect(page.getByRole("contentinfo")).toBeInViewport();
});
