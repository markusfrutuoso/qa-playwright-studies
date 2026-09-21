import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { CartPage } from '../../page-objects/CartPage'

test.describe('Checkout, Remove and Continue Shopping from Cart', () => {
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
  })

  test('Remove an Item from Checkout Page', async ({ page }) => {
    await shoppingPage.removeItem()
    await expect(page.locator('.inventory_item_name')).not.toBeVisible()
  })

  test('Continue Shopping Button', async ({ page }) => {
    await cartPage.continueShoppingButton()
  })

  test('Checkout Button', async ({ page }) => {
    await cartPage.checkoutButton()
  })
})
