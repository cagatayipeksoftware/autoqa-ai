import { test, expect } from "@playwright/test";

test("Verify product details page loads correctly", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const productLink = page.getByRole("link", { name: "Samsung galaxy s6" });
  await productLink.click();

  await expect(page.getByRole("heading", { name: "Samsung galaxy s6" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "$360" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
  await expect(page).toHaveURL(/prod.html/);
});