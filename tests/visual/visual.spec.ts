import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Visual Regression Testing', () => {
  test('Full Login Page Snapshot', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()

    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Login Logo Snapshot', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()

    const loginLogo = page.locator('.login_logo')
    await expect(loginLogo).toHaveScreenshot('login-logo.png', {
      animations: 'disabled',
    })
  })
})
