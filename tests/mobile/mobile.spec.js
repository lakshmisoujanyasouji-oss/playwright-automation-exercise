import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Emulation Tests', () => {

    // TC-MOB001 - Verify site loads correctly on iPhone 13
    test('@regression TC-MOB001 - Verify automationexercise loads on iPhone 13', async ({ browser }) => {

        // Get iPhone 13 device profile
        const iPhone13 = devices['iPhone 13'];

        // Create mobile context
        const context = await browser.newContext({
            ...iPhone13,
        });

        const page = await context.newPage();

        // Navigate to our test site
        await page.goto('https://www.automationexercise.com');

        // Verify page loads correctly on mobile
        await expect(page).toHaveTitle(/Automation Exercise/);

        // Verify viewport is mobile size
        const viewport = page.viewportSize();
        expect(viewport?.width).toBe(390);

        console.log(`✅ Site loaded on iPhone 13 — viewport: ${viewport?.width}x${viewport?.height}`);

        // Cleanup
        await context.close();
    });

});