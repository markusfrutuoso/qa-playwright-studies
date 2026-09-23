import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly loginError: Locator
  readonly loginContainer: Locator
  readonly loginForm: Locator
  readonly menuButton: Locator
  readonly logoutLink: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('#login-button')
    this.loginError = page.getByRole('alert')
    this.loginContainer = page.locator('.login_container')
    this.loginForm = page.locator('form')
    this.menuButton = page.locator('#react-burger-menu-btn')
    this.logoutLink = page.locator('#logout_sidebar_link')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async logout() {
    await this.menuButton.click()
    await this.logoutLink.click()
    await expect(this.page).toHaveURL('https://www.saucedemo.com/')
    await expect(this.loginContainer).toBeVisible()
  }

  async assertErrorMessage() {
    await expect(this.loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  }

  async snapshotLoginForm() {
    await expect(this.loginForm).toHaveScreenshot('login-form.png', {
      animations: 'disabled',
    })
  }

  async snapshotErrorMessage() {
    await expect(this.loginError).toHaveScreenshot('login-error.png', {
      animations: 'disabled',
    })
  }
}
