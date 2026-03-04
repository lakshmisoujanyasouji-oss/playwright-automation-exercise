import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/productsPage";
import searchData from "../../fixtures/products.json";

test.describe("Products Feature", () => {

    searchData.searchTerms.forEach(term => {
        test(`TC005 - Search for product: ${term}`, async ({ page }) => {
            const productsPage = new ProductsPage(page);

            // Step 1: Navigate to products page
            await productsPage.goto();

             // Step 2: Scroll down to see more products
            await productsPage.scrollToProduct(term);

            // Step 3: Search for product
            await productsPage.searchProduct(term);

            // Step 4: Verify results are visible
            await productsPage.expectResultsVisible(term);
        });
    });

});