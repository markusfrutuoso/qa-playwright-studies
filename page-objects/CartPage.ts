import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartButton: Locator
  readonly continueShopping: Locator
  readonly checkout: Locator
  readonly inventoryItemName: Locator

  constructor(page: Page) {
    this.page = page
    this.cartButton = page.locator('#shopping_cart_container')
    this.continueShopping = page.locator('#continue-shopping')
    this.checkout = page.locator('#checkout')
    this.inventoryItemName = page.locator('.inventory_item_name')
  }

  async gotoCartPage() {
    await this.cartButton.click()
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

  async assertCartIsEmpty() {
    await expect(this.inventoryItemName).toHaveCount(0)
  }
}
