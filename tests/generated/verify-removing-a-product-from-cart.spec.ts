import { test, expect } from "@playwright/test";

test("Verify removing a product from cart", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();

  page.on("dialog", (dialog) => dialog.dismiss());

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  const productRow = page.getByRole("row", { name: "Samsung galaxy s6" });
  await expect(productRow).toBeVisible();

  await page.getByRole("link", { name: "Delete" }).click();

  await expect(productRow).not.toBeAttached();
});