
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    
    // Page locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: any) {
        super(page);
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
        this.logoutButton = page.locator('a[href="/logout"]');
    }

      // Navigate to login page
    async goto(): Promise<void> {
        await super.goto('/login');;
    }

    // Login method
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Verify invalid login error message
    async expectInvalidCredentialsError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    }
    // Logout method
    async logout(): Promise<void> {
    await this.logoutButton.click();
    }
    // To verify logout - redirected to login page
    async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL('/login');
    await expect(this.logoutButton).not.toBeVisible();
}
}

