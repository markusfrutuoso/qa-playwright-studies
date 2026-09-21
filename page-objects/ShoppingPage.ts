import { expect, Locator, Page } from '@playwright/test'

export class ShoppingPage {
  readonly page: Page
  readonly addBackpack: Locator
  readonly addBikeLight: Locator
  readonly addTshirt: Locator
  readonly addJacket: Locator
  readonly addOnesie: Locator
  readonly addtestShirt: Locator
  readonly cartHasItems: Locator
  readonly cartHasntItems: Locator
  readonly removeBackpack: Locator

  constructor(page: Page) {
    this.page = page
    this.addBackpack = page.locator('#add-to-cart-sauce-labs-backpack')
    this.addBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light')
    this.addTshirt = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')
    this.addJacket = page.locator('#add-to-cart-sauce-labs-fleece-jacket')
    this.addOnesie = page.locator('#add-to-cart-sauce-labs-onesie')
    this.addtestShirt = page.locator(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    )
    this.removeBackpack = page.locator('#remove-sauce-labs-backpack')
    this.cartHasItems = page
      .locator('shopping_cart_container')
      .getByLabel('Cart, # items')
    this.cartHasntItems = page
      .locator('shopping_cart_container')
      .getByLabel('Empty')
  }

  async addItem() {
    await this.addBackpack.click()
  }

  async removeItem() {
    await this.removeBackpack.click()
  }

  async addMultipleItems() {
    await this.addBackpack.click()
    await this.addBikeLight.click()
    await this.addTshirt.click()
    await this.addJacket.click()
    await this.addOnesie.click()
    await this.addtestShirt.click()
  }

  async verifyCartHasItems() {
    await this.cartHasItems
  }

  async verifyCartHasntItems() {
    await this.cartHasntItems
  }
}
