import { test, expect } from "@playwright/test";

test("Verify product display on Home page", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const samsungGalaxyS6 = page.getByRole("link", { name: "Samsung galaxy s6" });
    await expect(samsungGalaxyS6).toBeVisible();

    const productCards = page.locator(".card");
    await expect(productCards.first()).toBeVisible();

    const categoriesHeader = page.getByRole("link", { name: "CATEGORIES" });
    await expect(categoriesHeader).toBeVisible();

    await samsungGalaxyS6.click();
    await expect(page).toHaveURL(/prod.html\?idp_=1/);
    await expect(page.getByRole("heading", { name: "Samsung galaxy s6" })).toBeVisible();
});