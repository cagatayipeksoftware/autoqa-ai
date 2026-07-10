import { test, expect } from "@playwright/test";

test("Verify cart page loads with added products", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const productName = "Samsung galaxy s6";
    await page.getByRole("link", { name: productName }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();

    page.on("dialog", async (dialog) => {
        await dialog.accept();
    });

    await page.getByRole("link", { name: "Cart", exact: true }).click();

    await expect(page).toHaveURL(/.*cart/);
    
    const cartTable = page.getByRole("table");
    await expect(cartTable).toBeVisible();
    await expect(cartTable.getByRole("cell", { name: productName })).toBeVisible();
    await expect(page.getByRole("button", { name: "Place Order" })).toBeVisible();
});