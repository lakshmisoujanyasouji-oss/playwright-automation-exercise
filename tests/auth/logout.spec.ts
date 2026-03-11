import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";



test.describe("Logout Feature", () => {
    test("TC004 - User can logout successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Step 1: Navigate to login page
        await loginPage.goto();
        // Step 2: Login with valid credentials
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );

        // Step 3: Verify logout button is visible (user is logged in)
        await expect(loginPage.logoutButton).toBeVisible();

        // Step 4: Logout
        await loginPage.logout();

        // Step 5: Verify user is logged out
        await loginPage.expectLoggedOut();
    });
});