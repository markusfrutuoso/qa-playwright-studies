import { expect, Locator, Page } from '@playwright/test'
import { LoadFnOutput } from 'node:module'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly loginError: Locator
  readonly logoutSucess: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('#login-button')
    this.loginError = page.getByRole('alert')
    this.logoutSucess = page.locator('.login_container')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn')
    await this.page.click('#logout_sidebar_link')
    await this.logoutSucess.click()
    await expect(this.page).toHaveURL('https://www.saucedemo.com/')
  }

  async assertErrorMessage() {
    await expect(this.loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  }
}
