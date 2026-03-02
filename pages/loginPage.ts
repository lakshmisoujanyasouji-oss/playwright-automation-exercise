
import { Page, Locator } from '@playwright/test';

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

    // Navigate to login page
    async navigateToLoginPage() {
        await this.page.goto('https://www.automationexercise.com/login');
    }

    // Login method
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
