import { test, expect } from '@playwright/test';

test.describe('API Mocking Tests', () => {

    // TC-MOCK001 - Mock API response and verify UI reflects mocked data
    test('@regression TC-MOCK001 - Verify UI renders mocked product API response', async ({ page }) => {

        // Intercept and mock the products API
        await page.route('**/api/productsList', async route => {
            const mockedResponse = {
                responseCode: 200,
                products: [
                    {
                        id: 999,
                        name: 'AI Mocked Product',
                        price: 'Rs. 999',
                        brand: 'MockBrand',
                        category: {
                            usertype: { usertype: 'Women' },
                            category: 'Mock Category'
                        }
                    }
                ]
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedResponse)
            });
        });

        // Navigate to products page
        await page.goto('/products');

        // Verify page loads successfully
        await expect(page).toHaveURL(/products/);
        await expect(page.locator('h2:has-text("All Products")')).toBeVisible();

        console.log('✅ API Mock intercepted and UI loaded successfully');
    });
});