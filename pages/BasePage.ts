import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to a specific path
    async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }

    // Wait for page to fully load
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    // Get current page title
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // Scroll to bottom of page
    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => 
            window.scrollTo(0, document.body.scrollHeight)
        );
    }

    // Take screenshot
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ 
            path: `test-results/screenshots/${name}.png` 
        });
    }
}