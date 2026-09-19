import { test, expect } from '@playwright/test'

test.describe.parallel('Add and Remove Items', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  test('Add an Item to the Cart', async ({ page }) => {
    // verify if the cart is empty
    await page.locator('shopping_cart_container').getByLabel('empty')

    // add an item
    await page.click('#add-to-cart-sauce-labs-backpack')

    // verify if the item was added
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')
  })

  test('Remove an Item from the Cart', async ({ page }) => {
    // add an item
    await page.click('#add-to-cart-sauce-labs-backpack')

    // verify if the cart have an item
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')

    // remove the item
    await page.click('#remove-sauce-labs-backpack')

    // verify if the item was removed
    await page.locator('shopping_cart_container').getByLabel('empty')
  })

  test('Add Multiple Items to the cart', async ({ page }) => {
    await page.locator('shopping_cart_container').getByLabel('empty')
    // add multiple items
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#add-to-cart-sauce-labs-bike-light')
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
    await page.click('#add-to-cart-sauce-labs-fleece-jacket')
    await page.click('#add-to-cart-sauce-labs-onesie')
    await page.click(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    )
    // verify if they were added
    await page.locator('shopping_cart_container').getByLabel('Cart, # items')
  })
})
