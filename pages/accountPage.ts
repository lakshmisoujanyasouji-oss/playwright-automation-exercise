import { Page, Locator, expect } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.accountDeletedMessage = page.locator('h2:has-text("Account Deleted!")');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async expectAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedMessage).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }
}