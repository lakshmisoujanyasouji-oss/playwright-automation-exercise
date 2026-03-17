import { test, expect } from '@playwright/test';
import {
    initializeDatabase,
    getAllProducts,
    getProductByName,
    insertUser,
    getUserByEmail,
    deleteUserByEmail,
    userExists
} from '../../db/dbHelper';

test.describe('Database Tests', () => {

    // Initialize DB before all tests
    test.beforeAll(() => {
        initializeDatabase();
    });

    // TC-DB001 - Verify products table has data
    test('@db @regression TC-DB001 - Database should contain products', () => {
        const products = getAllProducts();

        // Verify products exist
        expect(products.length).toBeGreaterThan(0);

        // Verify product structure
        const firstProduct = products[0];
        expect(firstProduct.id).toBeDefined();
        expect(firstProduct.name).toBeDefined();
        expect(firstProduct.price).toBeDefined();
        expect(firstProduct.category).toBeDefined();

        console.log(`✅ Found ${products.length} products in database`);
    });

    // TC-DB002 - Verify specific product exists in DB
    test('@db @regression TC-DB002 - Verify specific product data integrity', () => {
        const product = getProductByName('Blue Top');

        // Verify product exists
        expect(product).toBeDefined();
        expect(product.name).toBe('Blue Top');
        expect(product.price).toBe('Rs. 500');
        expect(product.category).toBe('Women');

        console.log(`✅ Product verified: ${product.name} - ${product.price}`);
    });

    // TC-DB003 - Verify product category data
    test('@db @regression TC-DB003 - Verify all products have valid categories', () => {
        const products = getAllProducts();
        const validCategories = ['Women', 'Men', 'Kids'];

        products.forEach(product => {
            expect(validCategories).toContain(product.category);
        });

        console.log(`✅ All ${products.length} products have valid categories`);
    });

    // TC-DB004 - Insert user and verify in DB
    test('@db @smoke @regression TC-DB004 - Insert user and verify record exists in DB', () => {
        const testEmail = 'dbtest@playwright.com';
        const testName = 'DB Test User';

        // Insert user
        insertUser(testName, testEmail);

        // Verify user exists in DB
        const user = getUserByEmail(testEmail);
        expect(user).toBeDefined();
        expect(user.email).toBe(testEmail);
        expect(user.name).toBe(testName);

        console.log(`✅ User inserted and verified: ${user.email}`);
    });

    // TC-DB005 - Delete user and verify removed from DB
    test('@db @regression TC-DB005 - Delete user and verify record removed from DB', () => {
        const testEmail = 'dbtest@playwright.com';

        // Delete user
        deleteUserByEmail(testEmail);

        // Verify user no longer exists
        const exists = userExists(testEmail);
        expect(exists).toBe(false);

        console.log(`✅ User deleted and verified removed from DB`);
    });

    // TC-DB006 - Verify user does not exist before insert
    test('@db @regression TC-DB006 - Verify non-existent user returns undefined', () => {
        const fakeEmail = 'nonexistent@test.com';

        const exists = userExists(fakeEmail);
        expect(exists).toBe(false);

        console.log(`✅ Non-existent user correctly returns false`);
    });

});