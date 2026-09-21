import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Add and Remove Items', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let shoppingPage: ShoppingPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    shoppingPage = new ShoppingPage(page)
    await homePage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('Add an Item to the Cart', async ({ page }) => {
    await page.locator('shopping_cart_container').getByLabel('empty')
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')
  })

  test('Remove an Item from the Cart', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')
    await page.click('#remove-sauce-labs-backpack')
    await page.locator('shopping_cart_container').getByLabel('empty')
  })

  test('Add Multiple Items to the cart', async ({ page }) => {
    await page.locator('shopping_cart_container').getByLabel('empty')
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#add-to-cart-sauce-labs-bike-light')
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
    await page.click('#add-to-cart-sauce-labs-fleece-jacket')
    await page.click('#add-to-cart-sauce-labs-onesie')
    await page.click(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    )
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')
  })
})
