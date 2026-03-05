import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    // Locators
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productResults: Locator;

    constructor(page: any) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productResults = page.locator('.productinfo p');
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
}