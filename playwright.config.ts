import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 5 : undefined,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'always',
    }],
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
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
