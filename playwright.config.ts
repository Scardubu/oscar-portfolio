import { defineConfig, devices } from '@playwright/test';

/**
 * playwright.config.ts — scardubu.dev
 *
 * Runs E2E tests against the Next.js dev server (localhost:3000).
 * CI: runs against the production build (next start) for accuracy.
 *
 * Browsers tested:
 *   Desktop: Chromium, Firefox, Safari (WebKit)
 *   Mobile:  Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
 *
 * Run:
 *   pnpm test          → all browsers
 *   pnpm test:e2e      → Chromium only (fast, local)
 *   pnpm test:mobile   → mobile viewports only
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  /* ── Global settings ───────────────────────────────────────── */
  fullyParallel:   true,
  forbidOnly:      !!process.env.CI,   // fail if .only left in on CI
  retries:         process.env.CI ? 2 : 0,
  workers:         process.env.CI ? 1 : undefined,
  reporter:        process.env.CI ? 'github' : 'html',

  /* ── Global test timeout ───────────────────────────────────── */
  timeout: 30_000,
  expect:  { timeout: 8_000 },

  /* ── Shared browser context ────────────────────────────────── */
  use: {
    baseURL:        'http://localhost:3000',
    trace:          'on-first-retry',
    screenshot:     'only-on-failure',
    video:          'retain-on-failure',
    actionTimeout:  8_000,
    navigationTimeout: 15_000,
  },

  /* ── Browser matrix ────────────────────────────────────────── */
  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use:  { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use:  { ...devices['Desktop Safari'] },
    },

    /* Mobile viewports */
    {
      name: 'mobile-chrome',
      use:  { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use:  { ...devices['iPhone 12'] },
    },
  ],

  /* ── Dev server ────────────────────────────────────────────── */
  webServer: {
    command:           'pnpm dev',
    url:               'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout:           60_000,
    stdout:            'pipe',
    stderr:            'pipe',
  },
});