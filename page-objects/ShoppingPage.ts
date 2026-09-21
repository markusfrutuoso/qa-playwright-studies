import { expect, Locator, Page } from '@playwright/test'

export class ShoppingPage {
  readonly page: Page
  readonly sauceBackpack: Locator
  readonly sauceBikeLight: Locator
  readonly sauceTshirt: Locator
  readonly sauceJacket: Locator
  readonly sauceOnesie: Locator
  readonly testShirt: Locator
  readonly cartHaveItems: Locator
  readonly cartHaventItems: Locator

  constructor(page: Page) {
    this.page = page
    this.sauceBackpack = page.locator('#add-to-cart-sauce-labs-backpack')
    this.sauceBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light')
    this.sauceTshirt = page.locator('add-to-cart-sauce-labs-bolt-t-shirt')
    this.sauceJacket = page.locator('#add-to-cart-sauce-labs-fleece-jacket')
    this.sauceOnesie = page.locator('#add-to-cart-sauce-labs-onesie')
    this.testShirt = page.locator(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    )
    this.cartHaveItems = page
      .locator('shopping_cart_container')
      .getByLabel('Cart, # items')
    this.cartHaventItems = page
      .locator('shopping_cart_container')
      .getByLabel('Empty')
  }

  async addItem() {
    await this.sauceBackpack.click()
    await this.cartHaveItems
  }
}
