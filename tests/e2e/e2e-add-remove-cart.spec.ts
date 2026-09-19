import { test, expect } from '@Playwright/test'

test.describe.parallel('Add and Remove Items', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
  })

  test("Add Item to the Cart After Login Page", async ({page}) => {
    await page.click("#addZ-to-cart-sauce-labs-backpack")
  })