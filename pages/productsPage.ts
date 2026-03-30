import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    // Locators
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productResults: Locator;
    readonly addToCartButtons: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLink: Locator;

    constructor(page: any) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productResults = page.locator('.productinfo p');
        this.addToCartButtons = page.locator('.productinfo .btn.add-to-cart');
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        this.viewCartLink = page.locator('p.text-center a:has-text("View Cart")');
    }

    // Navigate to products page
    async goto(): Promise<void> {
        await super.goto('/products');
    }

    // Search for a product
    async searchProduct(term: string): Promise<void> {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    // Verify search results are visible
    async expectResultsVisible(term: string): Promise<void> {
        const count = await this.productResults.count();
        expect(count).toBeGreaterThan(0);
    }

    // Scroll down to load more products
    async scrollToProduct(productName: string): Promise<void> {
        const product = this.page.locator(`.productinfo p:has-text("${productName}")`).first();
        await product.scrollIntoViewIfNeeded();
    }

    // Add first product to cart and continue shopping
    async addFirstProductToCart(): Promise<void> {
        await this.addToCartButtons.first().click();
        await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.continueShoppingButton.click();
    }

    // Add first product to cart and go to cart
    async addFirstProductAndViewCart(): Promise<void> {
        await this.addToCartButtons.first().click();
        await this.viewCartLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.viewCartLink.click();
    }
}