import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

test.describe('API Tests', () => {

    // TC-API001 - GET All Products List
    test('TC-API001 - GET All Products List', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${BASE_URL}/api/productsList`);

        // Verify status code
        expect(response.status()).toBe(200);

        // Verify response body
        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.products).toBeDefined();
        expect(body.products.length).toBeGreaterThan(0);

        // Verify product structure
        const firstProduct = body.products[0];
        expect(firstProduct.id).toBeDefined();
        expect(firstProduct.name).toBeDefined();
        expect(firstProduct.price).toBeDefined();
    });

    // TC-API002 - POST To All Products List - Not Supported
    test('TC-API002 - POST All Products List returns 405', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${BASE_URL}/api/productsList`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    // TC-API003 - POST Search Product
    test('TC-API003 - POST Search Product returns results', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${BASE_URL}/api/searchProduct`, {
            form: { search_product: 'top' }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.products).toBeDefined();
        expect(body.products.length).toBeGreaterThan(0);
    });

    // TC-API004 - POST Verify Login - Valid
    test('TC-API004 - POST Verify Login with valid credentials', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                email: process.env.TEST_EMAIL!,
                password: process.env.TEST_PASSWORD!
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User exists!');
    });

    // TC-API005 - POST Verify Login - Invalid
    test('TC-API005 - POST Verify Login with invalid credentials', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                email: 'invalid@test.com',
                password: 'wrongpassword'
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    // TC-API006 - DELETE Verify Login - Not Supported
    test('TC-API006 - DELETE Verify Login returns 405', async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.delete(`${BASE_URL}/api/verifyLogin`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

});