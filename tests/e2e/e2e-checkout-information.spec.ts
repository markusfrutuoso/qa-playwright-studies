import { test, expect } from '@playwright/test'

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
  })

  test('All Information Empty', async ({ page }) => {
    await page.fill('#first-name', '')
    await page.fill('#last-name', '')
    await page.fill('#postal-code', '')
    await page.click('#continue')
    const emptyInformation = page.getByRole('alert')
    await expect(emptyInformation).toContainText(
      'Error: First Name is required',
    )
  })
  test("Empty 'First Name'", async ({ page }) => {
    await page.fill('#first-name', '')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    const emptyFirstName = page.getByRole('alert')
    await expect(emptyFirstName).toContainText('Error: First Name is required')
  })

  test("Empty 'Last Name'", async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', '')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    const emptyLastName = page.getByRole('alert')
    await expect(emptyLastName).toContainText('Error: Last Name is required')
  })

  test("Empty 'Zip/Postal Code'", async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '')
    await page.click('#continue')
    const emptyPostalCode = page.getByRole('alert')
    await expect(emptyPostalCode).toContainText(
      'Error: Postal Code is required',
    )
  })

  test('All Valid Information', async ({ page }) => {
    await page.fill('#first-name', 'First Name')
    await page.fill('#last-name', 'Last Name')
    await page.fill('#postal-code', '123456789')
    await page.click('#continue')
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    )
  })

  test('Finish the Order', async ({ page }) => {
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
})
