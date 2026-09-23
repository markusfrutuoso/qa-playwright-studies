import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ShoppingPage } from '../../page-objects/ShoppingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage'

const validCheckoutInformation = {
  firstName: 'First Name',
  lastName: 'Last Name',
  postalCode: '123456789',
}

test.describe('Fill All Checkout Information', () => {
  let homePage: HomePage
  let shoppingPage: ShoppingPage
  let loginPage: LoginPage
  let cartPage: CartPage
  let checkoutInformationPage: CheckoutInformationPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    shoppingPage = new ShoppingPage(page)
    loginPage = new LoginPage(page)
    cartPage = new CartPage(page)
    checkoutInformationPage = new CheckoutInformationPage(page)

    await homePage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
    await shoppingPage.addItem()
    await cartPage.gotoCartPage()
    await cartPage.checkoutButton()
  })

  test('All Information Empty', async () => {
    await checkoutInformationPage.submitInformation('', '', '')
    await checkoutInformationPage.assertRequiredFieldError(
      'Error: First Name is required',
    )
  })

  test("Empty 'First Name'", async () => {
    await checkoutInformationPage.submitInformation(
      '',
      validCheckoutInformation.lastName,
      validCheckoutInformation.postalCode,
    )
    await checkoutInformationPage.assertRequiredFieldError(
      'Error: First Name is required',
    )
  })

  test("Empty 'Last Name'", async () => {
    await checkoutInformationPage.submitInformation(
      validCheckoutInformation.firstName,
      '',
      validCheckoutInformation.postalCode,
    )
    await checkoutInformationPage.assertRequiredFieldError(
      'Error: Last Name is required',
    )
  })

  test("Empty 'Zip/Postal Code'", async () => {
    await checkoutInformationPage.submitInformation(
      validCheckoutInformation.firstName,
      validCheckoutInformation.lastName,
      '',
    )
    await checkoutInformationPage.assertRequiredFieldError(
      'Error: Postal Code is required',
    )
  })

  test('All Valid Information', async () => {
    await checkoutInformationPage.submitInformation(
      validCheckoutInformation.firstName,
      validCheckoutInformation.lastName,
      validCheckoutInformation.postalCode,
    )
    await checkoutInformationPage.assertOverviewPage()
  })

  test('Finish the Order', async () => {
    await checkoutInformationPage.submitInformation(
      validCheckoutInformation.firstName,
      validCheckoutInformation.lastName,
      validCheckoutInformation.postalCode,
    )
    await checkoutInformationPage.assertOverviewPage()
    await checkoutInformationPage.finishOrder()
  })
})
