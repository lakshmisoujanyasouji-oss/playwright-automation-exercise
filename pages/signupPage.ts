import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { IUser } from "../interfaces/IUser";

export class SignupPage extends BasePage {

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;

  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: any) {
    super(page);

    // Initial signup
    this.nameInput = page.locator('[data-qa="signup-name"]');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    // Account details
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');

    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileInput = page.locator('[data-qa="mobile_number"]');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedMessage = page.locator('h2:has-text("Account Created!")');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async goto(): Promise<void> {
    await super.goto('/login');
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async completeSignup(user: IUser): Promise<void> {
    await this.passwordInput.fill(user.password);

    await this.daySelect.selectOption(user.day);
    await this.monthSelect.selectOption(user.month);
    await this.yearSelect.selectOption(user.year);

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileInput.fill(user.mobile);

    await this.createAccountButton.click();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.accountCreatedMessage).toBeVisible();
  }
  async clickContinue(): Promise<void> {
    await expect(this.continueButton).toBeVisible({ timeout: 30000 });
    await this.continueButton.click();
}
}