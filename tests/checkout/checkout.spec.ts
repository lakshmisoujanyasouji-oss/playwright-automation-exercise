import { test, expect } from '../../fixtures/index';
import { LoginPage } from '../../pages/loginPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { buildUser } from '../../fixtures/userFactory';
// IUser is used internally by CheckoutPage — no need to import in spec

test.describe('Checkout Feature', () => {

    // Login and add product before each test
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );
        await expect(page).toHaveURL('https://www.automationexercise.com/', { timeout: 30000 });

        // Add a product to cart
        const productsPage = new ProductsPage(page);
        await productsPage.goto();
        await productsPage.addFirstProductToCart();
    });

    // TC011 - Verify checkout page loads with address and order details
    test('@regression TC011 - Verify checkout page displays address and order details', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Proceed to checkout
        await cartPage.goto();
        await cartPage.proceedToCheckout();

        // Verify checkout sections visible
        await checkoutPage.expectAddressVisible();
        await checkoutPage.expectOrderSectionVisible();

        console.log(`✅ Checkout page loaded with address and order details`);
    });

    // TC012 - Place order with valid payment details
    test('@smoke @regression TC012 - Place order successfully with valid payment details', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = buildUser();

        // Proceed to checkout
        await cartPage.goto();
        await cartPage.proceedToCheckout();

        // Add comment and place order
        await checkoutPage.addOrderComment('Automated test order — please ignore');
        await checkoutPage.placeOrder();

        // Fill payment details and confirm
        await checkoutPage.fillPaymentDetails(user);
        await checkoutPage.confirmOrder();

        // Verify order placed
        await checkoutPage.expectOrderPlaced();

        console.log(`✅ Order placed successfully`);
    });

    // TC013 - Verify order comment is accepted
    test('@regression TC013 - Verify order comment field accepts text input', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Proceed to checkout
        await cartPage.goto();
        await cartPage.proceedToCheckout();

        // Add comment
        const comment = 'Test order comment for automation validation';
        await checkoutPage.addOrderComment(comment);

        // Verify comment is filled
        await expect(page.locator('textarea[name="message"]')).toHaveValue(comment);

        console.log(`✅ Order comment accepted`);
    });

    // TC014 - Verify place order button is visible on checkout
    test('@regression TC014 - Verify place order button is visible on checkout page', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Proceed to checkout
        await cartPage.goto();
        await cartPage.proceedToCheckout();

        // Verify place order button visible
        await expect(checkoutPage.placeOrderButton).toBeVisible({ timeout: 10000 });

        console.log(`✅ Place order button visible on checkout page`);
    });

});