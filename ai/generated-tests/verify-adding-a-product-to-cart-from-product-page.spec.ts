import { test, expect } from "@playwright/test";

test("Verify adding a product to cart from product page", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();

  await expect(page).toHaveURL(/prod\.html\?idp_=1/);
  await expect(page.getByRole("heading", { name: "Samsung galaxy s6" })).toBeVisible();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.getByRole("link", { name: "Add to cart" }).click();

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(page.getByRole("row", { name: "Samsung galaxy s6" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Samsung galaxy s6" })).toHaveText("Samsung galaxy s6");
});