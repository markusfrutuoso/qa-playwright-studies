import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { CartPage } from '../../page-objects/CartPage'

test.describe.only('Fill All Checkout Information', () => {
  let homePage: HomePage
  let shoppingPage: ShoppingPage
  let loginPage: LoginPage
  let cartPage: CartPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    shoppingPage = new ShoppingPage(page)
    loginPage = new LoginPage(page)
    cartPage = new CartPage(page)

    await homePage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
    await shoppingPage.addItem()
    await cartPage.gotoCartPage()
    await cartPage.checkoutButton()
  })

  test('All Information Empty', async ({ page }) => {
    await page.fill('#first-name', '')
    await page.fill('#last-name', '')
    await page.fill('#postal-code', '')
    await page.click('#continue')
    const emptyInformation = page.getByRole('alert')
    await expect(emptyInformation).toContainText(
      'Error: First Name is required',
    )
  })
  test("Empty 'First Name'", async ({ page }) => {
    await page.fill('#first-name', '')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    const emptyFirstName = page.getByRole('alert')
    await expect(emptyFirstName).toContainText('Error: First Name is required')
  })

  test("Empty 'Last Name'", async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', '')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    const emptyLastName = page.getByRole('alert')
    await expect(emptyLastName).toContainText('Error: Last Name is required')
  })

  test("Empty 'Zip/Postal Code'", async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '')
    await page.click('#continue')
    const emptyPostalCode = page.getByRole('alert')
    await expect(emptyPostalCode).toContainText(
      'Error: Postal Code is required',
    )
  })

  test('All Valid Information', async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    )
  })

  test('Finish the Order', async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    )
    await page.click('#finish')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html',
    )
  })
})
