import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  // Page locators
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
  }

  // Navigate to login page (uses baseURL from playwright.config.ts)
  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  // Login method
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Verify invalid login error message
  async expectInvalidCredentialsError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}