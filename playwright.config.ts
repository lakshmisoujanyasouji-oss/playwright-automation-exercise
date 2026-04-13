import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load .env for local dev — in CI secrets are injected via GitHub Actions
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  // Global setup & teardown
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',

  // Global test timeout
  timeout: 60000,

  // Global assertion timeout
  expect: {
    timeout: 15000
  },

  // Run tests sequentially — safer for e-commerce flows
  fullyParallel: false,
  workers: 1,

  // Fail CI build if test.only is accidentally left in
  forbidOnly: isCI,

  // Retry once in CI — avoid excessive retries hiding real failures
  retries: isCI ? 1 : 0,

  // Reporters
  reporter: [
    ['html'],
    ['./ai/aiReporter.ts']
  ],

  use: {
    baseURL: 'https://www.automationexercise.com',

    // Headless in CI, headed locally for debugging
    headless: isCI,

    // Timeouts
    navigationTimeout: 60000,
    actionTimeout: 15000,

    // Artifacts on failure
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: isCI
    ? [
        // Run on Chromium only in CI — add Firefox/WebKit once all tests are stable
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ],
});