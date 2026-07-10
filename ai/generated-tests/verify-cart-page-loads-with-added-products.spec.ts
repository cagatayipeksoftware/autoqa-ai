import { test, expect } from "@playwright/test";

test("Verify cart page loads with added products", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();

  page.on("dialog", (dialog) => dialog.accept());

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(page).toHaveURL(/.*cart/);
  
  const cartTable = page.getByRole("table");
  await expect(cartTable).toBeVisible();
  
  const productRow = page.getByRole("row").filter({ hasText: "Samsung galaxy s6" });
  await expect(productRow).toBeVisible();
});