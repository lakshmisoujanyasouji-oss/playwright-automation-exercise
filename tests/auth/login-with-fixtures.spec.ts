import { test, expect } from '../../fixtures/index';
import { LoginPage } from '../../pages/loginPage';
 
test.describe('Login Feature', () => {
 
    // TC001 - Valid Login
    // loginPage is auto-injected by fixture
    test('@smoke @regression TC001 - Login with valid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );
        await expect(page).toHaveURL('https://www.automationexercise.com/', { timeout: 30000 });
        await expect(page.locator('a[href="/logout"]')).toBeVisible();
    });
 
    // TC002 - Invalid Login
    test('@regression TC002 - Login with invalid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('invalid@gmail.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
    });
 
});