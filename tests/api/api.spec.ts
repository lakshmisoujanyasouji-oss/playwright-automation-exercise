import { test, expect } from '../../fixtures/index';
import { ApiHelper } from '../../utils/apiHelper';

test.describe('API Tests', () => {

    // TC-API001 - GET All Products List
    test('@api @regression TC-API001 - GET All Products List', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.getAllProducts();

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(200);
        expect(response.body.products).toBeDefined();
        expect(response.body.products.length).toBeGreaterThan(0);

        const firstProduct = response.body.products[0];
        expect(firstProduct).toBeDefined();
        if (firstProduct) {
            expect(firstProduct.id).toBeDefined();
            expect(firstProduct.name).toBeDefined();
            expect(firstProduct.price).toBeDefined();
        }
        console.log(`✅ ${response.body.products.length} products returned from API`);
    });

    // TC-API002 - POST To All Products List - Not Supported
    test('@api @regression TC-API002 - POST All Products List returns 405', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.postProductsList();

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(405);
        expect(response.body.message).toBe('This request method is not supported.');
        console.log(`✅ 405 correctly returned for unsupported POST method`);
    });

    // TC-API003 - POST Search Product
    test('@api @regression TC-API003 - POST Search Product returns results', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.searchProduct('top');

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(200);
        expect(response.body.products).toBeDefined();
        expect(response.body.products.length).toBeGreaterThan(0);
        console.log(`✅ Search returned ${response.body.products.length} products`);
    });

    // TC-API004 - POST Verify Login - Valid
    test('@api @smoke @regression TC-API004 - POST Verify Login with valid credentials', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.verifyLogin(
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(200);
        expect(response.body.message).toBe('User exists!');
        console.log(`✅ Valid login verified via API`);
    });

    // TC-API005 - POST Verify Login - Invalid
    test('@api @regression TC-API005 - POST Verify Login with invalid credentials', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.verifyLogin('invalid@test.com', 'wrongpassword');

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(404);
        expect(response.body.message).toBe('User not found!');
        console.log(`✅ Invalid login correctly returned 404`);
    });

    // TC-API006 - DELETE Verify Login - Not Supported
    test('@api @regression TC-API006 - DELETE Verify Login returns 405', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.deleteVerifyLogin();

        expect(response.status).toBe(200);
        expect(response.body.responseCode).toBe(405);
        expect(response.body.message).toBe('This request method is not supported.');
        console.log(`✅ 405 correctly returned for unsupported DELETE method`);
    });

});