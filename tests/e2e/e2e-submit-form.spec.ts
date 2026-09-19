import { test, expect } from '@Playwright/test'

test.describe.parallel('Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })

  test('Reset Feedback Form', async ({ page }) => {
    await page.fill('#name', 'somename')
    await page.fill('#email', 'someemail@gmail.com')
    await page.fill('#subject', 'somesubject')
    await page.fill('#comment', 'somecomment')

    await page.click("input[name='clear']")

    const nameInput = page.locator('#name')
    const emailInput = page.locator('#email')
    const subjectInput = page.locator('#subject')
    const commentInput = page.locator('#comment')

    await expect(nameInput).toBeEmpty()
    await expect(emailInput).toBeEmpty()
    await expect(subjectInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  })

  test('Submit Feedback Form', async ({ page }) => {
    await page.fill('#name', 'somename')
    await page.fill('#email', 'someemail@gmail.com')
    await page.fill('#subject', 'somesubject')
    await page.fill('#comment', 'somecomment')
    await page.click("input[name='submit']")

    await expect(page).toHaveURL(
      'http://zero.webappsecurity.com/sendFeedback.html',
    )
  })
})
