import { test, expect } from '@playwright/test'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com')

  const pageTitle = page.locator('h1')
  await expect(pageTitle).toHaveText('Example Domain')
})

test('Clicking on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')

  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong. ')
})

test.describe('Test Suite', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')

    await page.fill('#user_login', 'example@gmail.com')
    await page.fill('#user_password', 'examplepassword')
    await page.getByLabel('Keep me signed in').click()
    await page.click('text=Sign in')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText(
      'Login and/or password are wrong. ',
    )
  })

  test('Assertions @AssertionTestTag', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = page.locator('h1')

    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})
