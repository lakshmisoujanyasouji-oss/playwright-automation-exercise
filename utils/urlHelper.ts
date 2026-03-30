import { Page, expect } from '@playwright/test';

const BASE_URL = 'https://www.automationexercise.com';

// Assert page is on expected URL
export async function expectURL(page: Page, path: string, timeout = 30000): Promise<void> {
    await expect(page).toHaveURL(`${BASE_URL}${path}`, { timeout });
}

// Assert URL contains a segment
export async function expectURLContains(page: Page, segment: string, timeout = 30000): Promise<void> {
    await expect(page).toHaveURL(new RegExp(segment), { timeout });
}

// Get current page path (strips base URL)
export function getCurrentPath(page: Page): string {
    const url = new URL(page.url());
    return url.pathname;
}

// Build full URL from path
export function buildURL(path: string): string {
    return `${BASE_URL}${path}`;
}