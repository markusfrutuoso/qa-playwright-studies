import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage'
import { CheckoutCompletePage } from '../../page-objects/CheckoutCompletePage'

test.describe('Finished Purchase', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let shoppingPage: ShoppingPage
  let cartPage: CartPage
  let checkoutInformationPage: CheckoutInformationPage
  let checkoutCompletePage: CheckoutCompletePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    shoppingPage = new ShoppingPage(page)
    cartPage = new CartPage(page)
    checkoutInformationPage = new CheckoutInformationPage(page)
    checkoutCompletePage = new CheckoutCompletePage(page)

    await homePage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
    await shoppingPage.addItem()
    await cartPage.gotoCartPage()
    await cartPage.checkoutButton()
    await checkoutInformationPage.submitInformation(
      'First Name',
      'Last Name',
      '123456789',
    )
    await checkoutInformationPage.assertOverviewPage()
    await checkoutInformationPage.finishOrder()
  })

  test('Show order completion confirmation', async () => {
    await checkoutCompletePage.assertOrderCompleted()
  })

  test('Back Home after Purchase', async () => {
    await checkoutCompletePage.backToProducts()
  })
})
