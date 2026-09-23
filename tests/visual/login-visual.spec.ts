import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Page Visual Tests', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.visit()
  })

  test('Login Form', async () => {
    await loginPage.snapshotLoginForm()
  })

  test('Login Error Message', async () => {
    await loginPage.login('invalidusername', 'invalidpassword')
    await loginPage.snapshotErrorMessage()
  })
})
