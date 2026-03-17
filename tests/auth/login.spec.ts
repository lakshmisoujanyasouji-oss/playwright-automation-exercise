import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';



test.describe('Login Feature', () => {
    
    // Test 1 - Valid Login
    test('@smoke @regression TC001 - Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );
        // Verify user is logged in
        await expect(page).toHaveURL('https://www.automationexercise.com/', { timeout: 30000 });
        await expect(page.locator('a[href="/logout"]')).toBeVisible();
    });

    // Test 2 - Invalid Login
    test('@smoke @regression TC001 - Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('invalid@gmail.com', 'wrongpassword');
        // Verify error message is displayed
        await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible({ timeout: 10000 });
    });

});