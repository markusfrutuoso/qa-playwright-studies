import { test, expect } from '@Playwright/test'

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
  })