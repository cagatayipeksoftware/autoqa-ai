import { test, expect } from "@playwright/test";

test("Verify product details page loads correctly", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const productName = "Samsung galaxy s6";
    
    await page.getByRole("link", { name: productName, exact: true }).click();

    const productTitle = page.getByRole("heading", { name: productName });
    await expect(productTitle).toBeVisible();

    const priceText = page.getByRole("heading", { name: "$360" });
    await expect(priceText).toBeVisible();

    const addToCartButton = page.getByRole("link", { name: "Add to cart" });
    await expect(addToCartButton).toBeVisible();
    
    await expect(page.getByText("Product description")).toBeVisible();
});