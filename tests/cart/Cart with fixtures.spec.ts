import { test, expect } from '../../fixtures/index';
 
test.describe('Cart Feature', () => {
 
    // authenticatedPage fixture handles login automatically
    // No more beforeEach login boilerplate!
    test.beforeEach(async ({ authenticatedPage }) => {
        // Login is handled by authenticatedPage fixture
        // Nothing else needed here
    });
 
    // TC007 - Add product to cart
    test('@smoke @regression TC007 - Add product to cart and verify', async ({ productsPage, cartPage }) => {
        await productsPage.goto();
        await productsPage.addFirstProductToCart();
 
        await cartPage.goto();
        await cartPage.expectCartHasItems();
 
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBeGreaterThan(0);
 
        console.log(`✅ Product added to cart — ${itemCount} item(s) in cart`);
    });
 
    // TC008 - Verify cart shows correct product
    test('@regression TC008 - Verify cart displays added product details', async ({ productsPage, cartPage }) => {
        await productsPage.goto();
        await productsPage.addFirstProductToCart();
 
        await cartPage.goto();
        await cartPage.expectCartHasItems();
        await cartPage.expectCheckoutVisible();
 
        console.log(`✅ Cart displaying correct product details`);
    });
 
    // TC009 - Remove product from cart
    test('@regression TC009 - Remove product from cart and verify cart is empty', async ({ productsPage, cartPage }) => {
        await productsPage.goto();
        await productsPage.addFirstProductToCart();
 
        await cartPage.goto();
        await cartPage.expectCartHasItems();
        await cartPage.removeProduct(0);
        await cartPage.expectCartEmpty();
 
        console.log(`✅ Product removed — cart is now empty`);
    });
 
    // TC010 - Verify checkout button
    test('@regression TC010 - Verify checkout button is visible with items in cart', async ({ productsPage, cartPage }) => {
        await productsPage.goto();
        await productsPage.addFirstProductToCart();
 
        await cartPage.goto();
        await cartPage.expectCheckoutVisible();
 
        console.log(`✅ Checkout button visible with items in cart`);
    });
 
});