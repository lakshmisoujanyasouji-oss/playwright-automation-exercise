import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    // Locators
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly emptyCartMessage: Locator;
    readonly productNames: Locator;
    readonly removeButtons: Locator;
    readonly quantities: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('#cart_info_table tbody tr');
        this.checkoutButton = page.locator('.col-sm-6 .btn.btn-default.check_out');
        this.emptyCartMessage = page.locator('#empty_cart');
        this.productNames = page.locator('.cart_description h4 a');
        this.removeButtons = page.locator('a.cart_quantity_delete');
        this.quantities = page.locator('.cart_quantity button');
    }

    // Navigate to cart page
    async goto(): Promise<void> {
        await super.goto('/view_cart');
    }

    // Get number of items in cart
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    // Get product name at index
    async getProductName(index: number): Promise<string> {
        return await this.productNames.nth(index).innerText();
    }

    // Remove product at index
    async removeProduct(index: number): Promise<void> {
        await this.removeButtons.nth(index).click();
        await this.page.waitForTimeout(1000);
    }

    // Proceed to checkout
    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    // Verify cart is empty
    async expectCartEmpty(): Promise<void> {
        await expect(this.emptyCartMessage).toBeVisible({ timeout: 10000 });
    }

    // Verify cart has items
    async expectCartHasItems(): Promise<void> {
        await expect(this.cartItems.first()).toBeVisible({ timeout: 10000 });
    }

    // Verify specific product is in cart
    async expectProductInCart(productName: string): Promise<void> {
        await expect(this.page.locator(`.cart_description h4 a:has-text("${productName}")`))
            .toBeVisible({ timeout: 10000 });
    }

    // Verify checkout button is visible
    async expectCheckoutVisible(): Promise<void> {
        await expect(this.checkoutButton).toBeVisible({ timeout: 10000 });
    }
}