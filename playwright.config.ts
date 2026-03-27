// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  projects: [
    { name: "chromium",      use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",       use: { ...devices["Desktop Firefox"] } },
    { name: "webkit",        use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "pnpm build && pnpm start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

// e2e/smoke.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Portfolio smoke tests", () => {
  test("hero above fold, no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(page.viewportSize()?.width ?? 375);
  });

  test("all three projects render with data-project-id", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-project-id]")).toHaveCount(3);
  });

  test("nav links scroll to sections", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="#projects"]');
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("contact email link visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test("all external links have noopener noreferrer", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const rel = await links.nth(i).getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("no horizontal overflow at 375px", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);
    await ctx.close();
  });

  test("metric cards render qualitative labels (no counter animations)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("REAL-WORLD REACH")).toBeVisible();
    await expect(page.getByText("ALWAYS ON")).toBeVisible();
  });

  test("SabiScore architecture decisions expand", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator('[data-project-id="sabiscore"]')
      .getByRole("button", { name: /architecture decisions/i });
    await btn.click();
    await expect(page.getByText(/Redis caching/i)).toBeVisible();
  });
});