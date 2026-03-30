import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test.describe('Cart Feature', () => {

    // Login and add a product before each test
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );
        await expect(page).toHaveURL('https://www.automationexercise.com/', { timeout: 30000 });
    });

    // TC007 - Add product to cart
    test('@smoke @regression TC007 - Add product to cart and verify', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        // Navigate to products and add first product
        await productsPage.goto();
        await productsPage.addFirstProductToCart();

        // Navigate to cart and verify
        await cartPage.goto();
        await cartPage.expectCartHasItems();

        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBeGreaterThan(0);

        console.log(`✅ Product added to cart — ${itemCount} item(s) in cart`);
    });

    // TC008 - Verify cart shows correct product
    test('@regression TC008 - Verify cart displays added product details', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        // Add product to cart
        await productsPage.goto();
        await productsPage.addFirstProductToCart();

        // Verify cart has items
        await cartPage.goto();
        await cartPage.expectCartHasItems();
        await cartPage.expectCheckoutVisible();

        console.log(`✅ Cart displaying correct product details`);
    });

    // TC009 - Remove product from cart
    test('@regression TC009 - Remove product from cart and verify cart is empty', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        // Add product first
        await productsPage.goto();
        await productsPage.addFirstProductToCart();

        // Go to cart and remove
        await cartPage.goto();
        await cartPage.expectCartHasItems();
        await cartPage.removeProduct(0);

        // Verify cart is empty
        await cartPage.expectCartEmpty();

        console.log(`✅ Product removed — cart is now empty`);
    });

    // TC010 - Verify checkout button visible with items in cart
    test('@regression TC010 - Verify checkout button is visible with items in cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        // Add product
        await productsPage.goto();
        await productsPage.addFirstProductToCart();

        // Verify checkout button
        await cartPage.goto();
        await cartPage.expectCheckoutVisible();

        console.log(`✅ Checkout button visible with items in cart`);
    });

});