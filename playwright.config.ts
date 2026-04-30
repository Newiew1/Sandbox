import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 5 : undefined,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['html'],
    ['allure-playwright'],  // ← Add this line
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    screenshot: 'only-on-failure',  // ← Automatic screenshots
    video: 'retain-on-failure',     // ← Automatic videos
    trace: 'on-first-retry',        // ← Already have this
  },
  retries: process.env.CI ? 2 : 0,  // CI = retry twice if fails
  // Local = don't retry (fast feedback)
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Microsoft Edge',
      use: { browserName: 'chromium', channel: 'msedge' },
    },
  ],
});
