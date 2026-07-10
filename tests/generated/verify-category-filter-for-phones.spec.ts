import { test, expect } from "@playwright/test";

test("Verify category filter for 'Phones'", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const phoneCategoryLink = page.getByRole("link", { name: "Phones" });
    await phoneCategoryLink.click();

    const productCards = page.getByRole("link", { name: /Samsung galaxy|Nokia lumia|Nexus 6/i });
    
    await expect(productCards.first()).toBeVisible();
    
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
});