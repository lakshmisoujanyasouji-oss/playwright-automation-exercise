import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { AccountPage } from '../pages/accountPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

// ─── Fixture Types ────

export type PageFixtures = {
    loginPage: LoginPage;
    signupPage: SignupPage;
    accountPage: AccountPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export type AuthFixtures = {
    authenticatedPage: LoginPage;
};

// ─── Base Fixtures — Page Objects ───

export const test = base.extend<PageFixtures & AuthFixtures>({

    // ── Page Object Fixtures ───
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);
        await use(signupPage);
    },

    accountPage: async ({ page }, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    // ── Authenticated Fixture ───
    // Use this fixture when test needs a logged-in user
    // It handles login automatically before the test starts

    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );
        await expect(page).toHaveURL('https://www.automationexercise.com/', { timeout: 30000 });
        await use(loginPage);
    },

});

// ─── Re-export expect so tests only import from fixtures ───
export { expect, request } from '@playwright/test';