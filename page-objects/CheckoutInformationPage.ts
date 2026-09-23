import { expect, Locator, Page } from '@playwright/test'

export class CheckoutInformationPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly continueButton: Locator
  readonly errorMessage: Locator
  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.locator('#first-name')
    this.lastNameInput = page.locator('#last-name')
    this.postalCodeInput = page.locator('#postal-code')
    this.continueButton = page.locator('#continue')
    this.errorMessage = page.getByRole('alert')
    this.finishButton = page.locator('#finish')
  }

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async continueCheckout() {
    await this.continueButton.click()
  }

  async submitInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.fillInformation(firstName, lastName, postalCode)
    await this.continueCheckout()
  }

  async assertRequiredFieldError(message: string) {
    await expect(this.errorMessage).toContainText(message)
  }

  async assertOverviewPage() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    )
  }

  async finishOrder() {
    await this.finishButton.click()
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html',
    )
  }
}
