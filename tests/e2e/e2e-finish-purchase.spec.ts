import { test, expect } from '@playwright/test'
import { existsSync } from 'fs'

test.describe.parallel('Fill All Checkout Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#shopping_cart_container')
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await page.click('#checkout')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html',
    )
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    )
    await page.click('#finish')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html',
    )
  })
  test('Back Home after Purchase', async ({ page }) => {
    await page.click('#back-to-products')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  test('Generate PDF order', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download')
    await page.click('#generate-pdf-order')
    const download = await downloadPromise
    const filePath = 'test-results/order.pdf'
    await download.saveAs(filePath)

    expect(existsSync(filePath)).toBeTruthy()
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i)
  })
})
