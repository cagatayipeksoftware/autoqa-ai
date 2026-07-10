import { test, expect } from "@playwright/test";

test("Verify product details page loads correctly", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const productName = "Samsung galaxy s6";
  const productLink = page.getByRole("link", { name: productName, exact: true });

  await expect(productLink).toBeVisible();
  await productLink.click();

  await expect(page).toHaveURL(/.*prod\.html/);

  const heading = page.getByRole("heading", { name: productName });
  await expect(heading).toBeVisible();

  const price = page.getByRole("heading", { name: "$360" });
  await expect(price).toBeVisible();

  const addToCartButton = page.getByRole("link", { name: "Add to cart" });
  await expect(addToCartButton).toBeVisible();
});