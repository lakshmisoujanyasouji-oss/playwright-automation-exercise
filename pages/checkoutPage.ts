import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { IUser } from '../interfaces/IUser';

export class CheckoutPage extends BasePage {

    // Locators
    readonly placeOrderButton: Locator;
    readonly commentBox: Locator;
    readonly confirmOrderButton: Locator;
    readonly orderSuccessMessage: Locator;
    readonly orderSection: Locator;
    readonly addressSection: Locator;

    constructor(page: Page) {
        super(page);
        this.placeOrderButton = page.locator('.btn.btn-default.check_out');
        this.commentBox = page.locator('textarea[name="message"]');
        this.confirmOrderButton = page.locator('[data-qa="pay-button"]');  // "Pay and Confirm Order" button
        this.orderSuccessMessage = page.locator('h2:has-text("Order Placed!")');
        this.orderSection = page.locator('#cart_items');
        this.addressSection = page.locator('#address_delivery');
    }

    // Navigate to checkout
    async goto(): Promise<void> {
        await super.goto('/checkout');
    }

    // Fill order comment
    async addOrderComment(comment: string): Promise<void> {
        await this.commentBox.fill(comment);
    }

    // Place order
    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    // Confirm order on payment page
    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
    }

    // Fill payment details
    async fillPaymentDetails(user: IUser): Promise<void> {
        await this.page.locator('[data-qa="name-on-card"]').fill(user.name);
        await this.page.locator('[data-qa="card-number"]').fill('4111111111111111');
        await this.page.locator('[data-qa="cvc"]').fill('123');
        await this.page.locator('[data-qa="expiry-month"]').fill(user.month);
        await this.page.locator('[data-qa="expiry-year"]').fill(user.year);
    }

    // Verify order placed successfully
    async expectOrderPlaced(): Promise<void> {
        await expect(this.orderSuccessMessage).toBeVisible({ timeout: 30000 });
    }

    // Verify address section is visible
    async expectAddressVisible(): Promise<void> {
        await expect(this.addressSection).toBeVisible({ timeout: 10000 });
    }

    // Verify order section is visible
    async expectOrderSectionVisible(): Promise<void> {
        await expect(this.orderSection).toBeVisible({ timeout: 10000 });
    }
}