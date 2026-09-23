import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Login / Logout Flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('Negative Scenario / Invalid Username and Password', async () => {
    await loginPage.login('invalidusername', 'invalidpassword')
    await loginPage.assertErrorMessage()
  })

  test('Negative Scenario / Valid Username and Invalid Password', async () => {
    await loginPage.login('standard_user', 'invalidpassword')
    await loginPage.assertErrorMessage()
  })

  test('Negative Scenario / Invalid Username and Valid Password', async () => {
    await loginPage.login('invalidusername', 'secret_sauce')
    await loginPage.assertErrorMessage()
  })

  test('Positive Scenario for Login + Logout', async () => {
    await loginPage.login('standard_user', 'secret_sauce')
    await loginPage.logout()
  })
})
