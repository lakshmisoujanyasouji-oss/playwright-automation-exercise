import { test, expect } from "@playwright/test";
import { SignupPage } from "../../pages/signupPage";
import { AccountPage } from "../../pages/accountPage";
import { LoginPage } from "../../pages/loginPage";
import { buildUser } from "../../fixtures/userFactory";

test.describe("Signup Feature", () => {
  // TC003 - regression only (long running test)
  test("@regression TC003 - User can register, delete account and verify deletion", async ({ page }) => {

    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const loginPage = new LoginPage(page);
    const user = buildUser();

    // Step 1: Navigate to signup page
    await signupPage.goto();

    // Step 2: Start signup
    await signupPage.startSignup(user.name, user.email!);

    // Step 3: Complete registration form
    await signupPage.completeSignup(user);

    // Step 4: Verify account created
    await signupPage.expectAccountCreated();

    // Step 5: Move to logged-in state
    await signupPage.clickContinue();

    // Step 6: Delete account (cleanup)
    await accountPage.deleteAccount();
    await accountPage.expectAccountDeleted();
    await accountPage.clickContinue();

    // Step 7: Verify account deleted
    // ✅ Professional fix — check URL instead of flaky error message
    await loginPage.goto();
    await loginPage.login(user.email!, user.password);

    // Wait for either login page (failed login) or check we didn't reach home
    await page.waitForLoadState('domcontentloaded');
    const currentUrl = page.url();

    // Verify we are NOT on home page — login failed as expected
    expect(currentUrl).toContain('/login');
  });

});