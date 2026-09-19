import { test, expect } from '@playwright/test'

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
  })

  // Negative Scenario
  test('Negative Scenario / Invalid Username and Password', async ({
    page,
  }) => {
    await page.fill('#user-name', 'invalidusername')
    await page.fill('#password', 'invalidpassword')
    await page.click('#login-button')

    const loginError = page.getByRole('alert')
    await expect(loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  })

  test('Negative Scenario / Valid Username and Invalid Password', async ({
    page,
  }) => {
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'invalidpassword')
    await page.click('#login-button')

    const loginError = page.getByRole('alert')
    await expect(loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  })

  test('Negative Scenario / Invalid Username and Valid Password', async ({
    page,
  }) => {
    await page.fill('#user-name', 'invalidusername')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')

    const loginError = page.getByRole('alert')
    await expect(loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  })

  // Positive Scenario + Logout

  test('Positive Scenario for Login + Logout', async ({ page }) => {
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')

    const loginSucess = page.locator('.inventory_container')
    await expect(loginSucess).toBeVisible()

    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')

    const logoutSucess = page.locator('.login_container')
    await expect(logoutSucess).toBeVisible()
  })
})
