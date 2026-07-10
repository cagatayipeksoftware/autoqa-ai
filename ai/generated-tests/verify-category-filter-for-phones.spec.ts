import { test, expect } from "@playwright/test";

test("Verify category filter for 'Phones'", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const phonesLink = page.getByRole("link", { name: "Phones" });
  await phonesLink.click();

  const productTitles = page.getByRole("link", { name: /Samsung galaxy|Nokia lumia|Nexus 6/i });

  await expect(productTitles.first()).toBeVisible();
  
  const count = await productTitles.count();
  expect(count).toBeGreaterThan(0);
});