import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartPage: Locator
  readonly continueShopping: Locator
  readonly checkout: Locator

  constructor(page: Page) {
    this.page = page
    this.cartPage = page.locator('#shopping_cart_container')
    this.continueShopping = page.locator('#continue-shopping')
    this.checkout = page.locator('#checkout')
  }

  async gotoCartPage() {
    await this.cartPage.click()
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
  }
  async continueShoppingButton() {
    await this.continueShopping.click()
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html',
    )
  }
  async checkoutButton() {
    await this.checkout.click()
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html',
    )
  }
}
