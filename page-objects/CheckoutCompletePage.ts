import { expect, Locator, Page } from '@playwright/test'

export class CheckoutCompletePage {
  readonly page: Page
  readonly completeHeader: Locator
  readonly completeText: Locator
  readonly backToProductsButton: Locator

  constructor(page: Page) {
    this.page = page
    this.completeHeader = page.locator('.complete-header')
    this.completeText = page.locator('.complete-text')
    this.backToProductsButton = page.locator('#back-to-products')
  }

  async assertOrderCompleted() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!')
    await expect(this.completeText).toBeVisible()
  }

  async backToProducts() {
    await this.backToProductsButton.click()
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html',
    )
  }
}
