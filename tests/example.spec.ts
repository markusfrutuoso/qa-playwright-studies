import { test, expect } from "@playwright/test";
import { loadHomePage, assertTitle } from "../helpers";

test("Simple basic test", async ({ page }) => {
  await page.goto("https://www.example.com");

  const pageTitle = page.locator("h1");
  await expect(pageTitle).toHaveText("Example Domain");
});

test("Clicking on Elements", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/");

  await page.click("#signin_button");
  await page.click("text=Sign in");

  const errorMessage = page.locator(".alert-error");
  await expect(errorMessage).toContainText("Login and/or password are wrong. ");
});

test.describe("Test Suite", () => {
  test("Working with inputs", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");

    await page.fill("#user_login", "example@gmail.com");
    await page.fill("#user_password", "examplepassword");
    await page.getByLabel("Keep me signed in").click();
    await page.click("text=Sign in");

    const errorMessage = page.locator(".alert-error");
    await expect(errorMessage).toContainText(
      "Login and/or password are wrong. ",
    );
  });

  test("Assertions @AssertionTestTag", async ({ page }) => {
    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle("Example Domain");

    const element = page.locator("h1");

    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);

    const nonExistingElement = page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();
  });
});

test.describe("Hooks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.example.com");
  });

  test("Screenshots", async ({ page }) => {
    await page.screenshot({ path: "screenshot.png", fullPage: true });
  });

  test("Single Element Screenshot", async ({ page }) => {
    const element = page.$("h1");
    await element.screenshot({ path: "single_element_screenshot.png" });
  });
});

test("Custom Helpers", async ({ page }) => {
  await loadHomePage(page);
  await assertTitle(page);
});
