import { test, expect } from "@playwright/test";

test("Verify pagination for product listings", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const productCards = page.locator(".card");
    const nextButton = page.getByRole("button", { name: "Next" });

    await expect(productCards).toHaveCount(9);
    await expect(nextButton).toBeVisible();

    await nextButton.click();

    await expect(productCards.first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toBeVisible();
});