import { test, expect } from '@Playwright/test'

test.describe.parallel('Search Results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Find Results', async ({ page }) => {
    await page.fill('#searchTerm', 'bank')
    await page.keyboard.press('Enter')

    const findResult = page.locator('.top_offset')
    const numberOfLinks = page.locator('li > a')
    await expect(findResult).toContainText(
      'The following pages were found for the query:',
    )
    await expect(numberOfLinks).toHaveCount(2)
  })

  test("Don't Find Results", async ({ page }) => {
    await page.fill('#searchTerm', 'Invalid Search')
    await page.keyboard.press('Enter')

    const dontFindResult = page.locator('.top_offset')
    const numberOfLinks = page.locator('li > a')
    await expect(dontFindResult).toContainText(
      'No results were found for the query:',
    )
    await expect(numberOfLinks).toHaveCount(0)
  })
})
