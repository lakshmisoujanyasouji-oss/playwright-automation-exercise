import { test, expect } from '@playwright/test';
import {
    initializeDatabase,
    closeDatabase,
    getAllProducts,
    getProductByName,
    getProductsByCategory,
    getProductById,
    insertUser,
    getUserByEmail,
    deleteUserByEmail,
    userExists
} from '../../db/dbHelper';

test.describe('Database Tests', () => {

    // ─── Setup & Teardown ──────────────────────────────────────────────────────

    test.beforeAll(() => {
        initializeDatabase();
    });

    test.afterAll(() => {
        closeDatabase();
    });

    // ─── Product Tests ─────────────────────────────────────────────────────────

    test('@db @regression TC-DB001 - Database should contain seeded products', () => {
        const products = getAllProducts();

        expect(products.length).toBeGreaterThan(0);

        // Verify product structure via TypeScript interface
        const first = products[0];
        expect(first).toBeDefined();
        expect(first!.id).toBeDefined();
        expect(first!.name).toBeDefined();
        expect(first!.price).toBeDefined();
        expect(first!.category).toBeDefined();

        console.log(`✅ Found ${products.length} products in database`);
    });

    test('@db @regression TC-DB002 - Verify specific product data integrity', () => {
        const product = getProductByName('Blue Top');

        expect(product).toBeDefined();
        expect(product!.name).toBe('Blue Top');
        expect(product!.price).toBe('Rs. 500');
        expect(product!.category).toBe('Women');

        console.log(`✅ Product verified: ${product!.name} — ${product!.price}`);
    });

    test('@db @regression TC-DB003 - Verify all products have valid categories', () => {
        const products = getAllProducts();
        const validCategories = ['Women', 'Men', 'Kids'];

        products.forEach(product => {
            expect(validCategories).toContain(product.category);
        });

        console.log(`✅ All ${products.length} products have valid categories`);
    });

    test('@db @regression TC-DB004 - Verify products can be queried by category', () => {
        const womenProducts = getProductsByCategory('Women');
        const menProducts = getProductsByCategory('Men');

        expect(womenProducts.length).toBeGreaterThan(0);
        expect(menProducts.length).toBeGreaterThan(0);

        // Verify every result matches the queried category
        womenProducts.forEach(p => expect(p.category).toBe('Women'));
        menProducts.forEach(p => expect(p.category).toBe('Men'));

        console.log(`✅ Women: ${womenProducts.length} products, Men: ${menProducts.length} products`);
    });

    test('@db @regression TC-DB005 - Verify product can be queried by ID', () => {
        const product = getProductById(1);

        expect(product).toBeDefined();
        expect(product!.id).toBe(1);
        expect(product!.name).toBe('Blue Top');

        console.log(`✅ Product by ID verified: ${product!.name}`);
    });

    test('@db @regression TC-DB006 - Verify non-existent product returns undefined', () => {
        const product = getProductByName('Non Existent Product XYZ');

        expect(product).toBeUndefined();

        console.log(`✅ Non-existent product correctly returns undefined`);
    });

    // ─── User Tests ────────────────────────────────────────────────────────────

    test('@db @smoke @regression TC-DB007 - Insert user and verify record exists in DB', () => {
        const testEmail = `tc007_${Date.now()}@playwright.com`;
        const testName = 'DB Test User TC007';

        // Clean up first to ensure independence
        deleteUserByEmail(testEmail);

        // Insert and verify
        insertUser(testName, testEmail);

        const user = getUserByEmail(testEmail);
        expect(user).toBeDefined();
        expect(user!.email).toBe(testEmail);
        expect(user!.name).toBe(testName);

        // Cleanup after test
        deleteUserByEmail(testEmail);

        console.log(`✅ User inserted and verified: ${testEmail}`);
    });

    test('@db @regression TC-DB008 - Delete user and verify record removed from DB', () => {
        const testEmail = `tc008_${Date.now()}@playwright.com`;
        const testName = 'DB Test User TC008';

        // Setup — insert first
        insertUser(testName, testEmail);
        expect(userExists(testEmail)).toBe(true);

        // Delete and verify
        deleteUserByEmail(testEmail);
        expect(userExists(testEmail)).toBe(false);

        console.log(`✅ User deleted and verified removed: ${testEmail}`);
    });

    test('@db @regression TC-DB009 - Verify non-existent user returns false', () => {
        const fakeEmail = 'nonexistent_xyz_123@test.com';

        const exists = userExists(fakeEmail);
        expect(exists).toBe(false);

        console.log(`✅ Non-existent user correctly returns false`);
    });

    test('@db @regression TC-DB010 - Verify duplicate email is handled gracefully', () => {
        const testEmail = `tc010_${Date.now()}@playwright.com`;
        const testName = 'Duplicate User Test';

        // Insert once
        insertUser(testName, testEmail);
        expect(userExists(testEmail)).toBe(true);

        // Insert again — should not throw (INSERT OR IGNORE)
        expect(() => insertUser(testName, testEmail)).not.toThrow();

        // Cleanup
        deleteUserByEmail(testEmail);

        console.log(`✅ Duplicate email handled gracefully via INSERT OR IGNORE`);
    });

});