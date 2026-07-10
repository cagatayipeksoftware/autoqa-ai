import { test, expect } from "@playwright/test";

test("Verify adding a product to cart from product page", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();

  await expect(page).toHaveURL(/prod\.html\?idp_=1/);
  await expect(page.getByRole("heading", { name: "Samsung galaxy s6" })).toBeVisible();

  await page.getByRole("link", { name: "Add to cart" }).click();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Product added");
    await dialog.accept();
  });

  await page.getByRole("link", { name: "Cart", exact: true }).click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByRole("cell", { name: "Samsung galaxy s6" })).toBeVisible();
});