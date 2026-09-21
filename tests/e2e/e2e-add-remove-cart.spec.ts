import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Add and Remove Items', () => {
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
    await shoppingPage.addItem()
    await shoppingPage.verifyCartHasItems()
  })

  test('Remove an Item from the Cart', async ({ page }) => {
    await shoppingPage.addItem()
    await shoppingPage.removeItem()
    await shoppingPage.verifyCartHasntItems()
  })

  test('Add Multiple Items to the cart', async ({ page }) => {
    await shoppingPage.addMultipleItems()
    await shoppingPage.verifyCartHasItems()
  })
})
