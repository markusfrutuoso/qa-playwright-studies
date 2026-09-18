# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-login.spec.ts >> Login / Logout Flow >> Negative Scenario for Login
- Location: tests\e2e\e2e-login.spec.ts:10:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "your-url", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - generic [ref=f2e2]:
    - link "Zero Bank" [ref=f2e6] [cursor=pointer]:
      - /url: /index.html
    - generic [ref=f2e10]:
      - heading "Troubles entering the site?" [level=3] [ref=f2e12]
      - generic [ref=f2e13]:
        - generic [ref=f2e14]: Login and/or password are wrong.
        - generic [ref=f2e15]:
          - generic [ref=f2e16]:
            - generic [ref=f2e17] [cursor=pointer]: Login
            - generic [ref=f2e18]:
              - textbox "Login" [active] [ref=f2e19]
              - generic [ref=f2e20]: 
          - generic [ref=f2e21]:
            - generic [ref=f2e22] [cursor=pointer]: Password
            - textbox "Password" [ref=f2e24]
          - generic [ref=f2e25]:
            - generic [ref=f2e26] [cursor=pointer]: Keep me signed in
            - checkbox "Keep me signed in" [ref=f2e28] [cursor=pointer]
        - button "Sign in" [ref=f2e30] [cursor=pointer]
      - link "Forgot your password ?" [ref=f2e31] [cursor=pointer]:
        - /url: /forgot-password.html
  - generic [ref=f2e35]:
    - generic [ref=f2e36]:
      - list [ref=f2e38]:
        - listitem [ref=f2e39]: Download WebInspect
      - list [ref=f2e41]:
        - listitem [ref=f2e42]: Terms of Use
      - list [ref=f2e44]:
        - listitem [ref=f2e45]: Contact Micro Focus
        - listitem [ref=f2e46]: Privacy Statement
    - generic [ref=f2e48]:
      - text: The Free Online Bank Web site is published by Micro Focus Fortify for the sole purpose of demonstrating the functionality and effectiveness of Micro Focus Fortify’s WebInspect products in detecting and reporting Web application vulnerabilities. This site is not a real banking site and any similarities to third party products and/or Web sites are purely coincidental. This site is provided "as is" without warranty of any kind, either express or implied. Micro Focus Fortify does not assume any risk in relation to your use of this Web site. Use of this Web site indicates that you have read and agree to Micro Focus Fortify’s Terms of Use found at
      - link "https://www.microfocus.com/about/legal/#privacy" [ref=f2e49] [cursor=pointer]:
        - /url: https://www.microfocus.com/about/legal/#privacy
      - text: and Micro Focus Fortify’s Online Privacy Statement found at
      - link "https://www.microfocus.com/about/legal/#privacy" [ref=f2e50] [cursor=pointer]:
        - /url: https://www.microfocus.com/about/legal/#privacy
      - text: . Copyright © 2012-2018, Micro Focus Development Company. All rights reserved.
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
> 15 |     await page.goto('your-url')
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
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
  28 |     await page.goto('your-url')
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