# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-login.spec.ts >> Login / Logout Flow >> Positive Scenario for Login + Logout
- Location: tests\e2e\e2e-login.spec.ts:23:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "your-url", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - generic [ref=f2e6]:
    - heading "Não foi possível estabelecer uma conexão segura com este site" [level=1] [ref=f2e7]
    - paragraph [ref=f2e8]:
      - strong [ref=f2e9]: zero.webappsecurity.com
      - text: usa um protocolo incompatível.
    - generic [ref=f2e10]: ERR_SSL_VERSION_OR_CIPHER_MISMATCH
  - button "Saiba mais" [ref=f2e12] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@Playwright/test'
  2  | 
  3  | test.describe.parallel('Login / Logout Flow', () => {
  4  |   // Before Hook
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('http://zero.webappsecurity.com/')
  7  |   })
  8  | 
  9  |   // Negative Scenario
  10 |   test('Negative Scenario for Login', async ({ page }) => {
  11 |     await page.click('#signin_button')
  12 |     await page.fill('#user_login', 'invalidemail@gmail.com')
  13 |     await page.fill('#user_password', 'invalidpassword')
  14 |     await page.click('text=Sign in')
  15 |     await page.goto('your-url')
  16 | 
  17 |     const errorMessage = page.locator('.alert-error')
  18 |     await expect(errorMessage).toContainText('Login and/or password are wrong.')
  19 |   })
  20 | 
  21 |   // Positive Scenario + Logout
  22 | 
  23 |   test('Positive Scenario for Login + Logout', async ({ page }) => {
  24 |     await page.click('#signin_button')
  25 |     await page.fill('#user_login', 'username')
  26 |     await page.fill('#user_password', 'password')
  27 |     await page.click('text=Sign in')
> 28 |     await page.goto('your-url')
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  29 | 
  30 |     const accountSummaryTab = page.locator('#account_summary_tab')
  31 |     await expect(accountSummaryTab).toBeVisible()
  32 | 
  33 |     await page.goto('http://zero.webappsecurity.com/logout.html')
  34 |     await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  35 |   })
  36 | })
  37 | 
```