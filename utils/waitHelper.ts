import { Page } from '@playwright/test';

// Wait for a specific URL to contain a path segment
export async function waitForURL(page: Page, urlSegment: string, timeout = 30000): Promise<void> {
    await page.waitForURL(`**/${urlSegment}**`, { timeout });
}

// Wait for an element to be visible
export async function waitForVisible(page: Page, selector: string, timeout = 10000): Promise<void> {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
}

// Wait for an element to be hidden
export async function waitForHidden(page: Page, selector: string, timeout = 10000): Promise<void> {
    await page.locator(selector).waitFor({ state: 'hidden', timeout });
}

// Wait for network to be idle
export async function waitForNetwork(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
}

// Wait for a fixed number of milliseconds
export async function waitFor(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
}
