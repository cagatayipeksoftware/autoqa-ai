import { test, expect } from "@playwright/test";

test("Verify cart page loads with added products", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();

  page.on("dialog", (dialog) => dialog.accept());

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(page).toHaveURL(/.*cart/);
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Samsung galaxy s6" })).toBeVisible();
});