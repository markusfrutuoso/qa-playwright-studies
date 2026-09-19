import { test, expect } from '@playwright/test'

test.describe
  .parallel('Checkout, Remove and Continue Shopping from Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#shopping_cart_container')
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
  })

  test('Remove an Item from Checkout Page', async ({ page }) => {
    await page.click('#remove-sauce-labs-backpack')
    const removedItem = page.locator('.inventory_item_name')
    await expect(removedItem).not.toBeVisible()
  })

  test('Continue Shopping', async ({ page }) => {
    await page.click('#continue-shopping')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  test('Checkout', async ({ page }) => {
    await page.click('#checkout')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html',
    )
  })
})
