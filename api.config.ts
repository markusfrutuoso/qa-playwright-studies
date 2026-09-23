import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 30000,
  retries: 0,
  testDir: 'tests/api',
  fullyParallel: true,
  use: {
    baseURL: 'https://dummyjson.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/api', open: 'never' }],
  ],
  outputDir: 'test-results/api',
}

export default config
