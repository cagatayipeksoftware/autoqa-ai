import { test, expect } from "@playwright/test";

test("Verify product display on Home page", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const samsungGalaxyS6 = page.getByRole("link", { name: "Samsung galaxy s6" });
  await expect(samsungGalaxyS6).toBeVisible();

  const productCards = page.locator(".card");
  await expect(productCards.first()).toBeVisible();

  const categoriesHeading = page.getByRole("heading", { name: "Categories" });
  await expect(categoriesHeading).toBeVisible();

  await samsungGalaxyS6.click();

  await expect(page.getByRole("heading", { name: "Samsung galaxy s6" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
});