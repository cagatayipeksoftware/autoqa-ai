import { test, expect } from "@playwright/test";

test("Verify successful checkout with valid details", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();

    page.on("dialog", async (dialog) => {
        await dialog.accept();
    });

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await page.getByRole("button", { name: "Place Order" }).click();

    await page.getByLabel("Total:").fill("John Doe");
    await page.getByLabel("Country:").fill("USA");
    await page.getByLabel("City:").fill("New York");
    await page.getByLabel("Credit card:").fill("1234567812345678");
    await page.getByLabel("Month:").fill("12");
    await page.getByLabel("Year:").fill("2025");

    await page.getByRole("button", { name: "Purchase" }).click();

    await expect(page.getByRole("heading", { name: "Thank you for your purchase!" })).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
});