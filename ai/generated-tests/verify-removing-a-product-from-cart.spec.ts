import { test, expect } from "@playwright/test";

test("Verify removing a product from cart", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  // Navigate to a product and add to cart
  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();

  // Handle browser dialog confirmation
  page.on("dialog", (dialog) => dialog.accept());

  // Navigate to Cart
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await expect(page).toHaveURL(/cart/);

  // Ensure product is in cart
  const row = page.getByRole("row", { name: "Samsung galaxy s6" });
  await expect(row).toBeVisible();

  // Delete product
  await page.getByRole("link", { name: "Delete" }).click();

  // Verify product is removed
  await expect(row).not.toBeVisible();
});