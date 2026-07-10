import { test, expect } from "@playwright/test";

test("Verify category filter for 'Phones'", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Phones" }).click();

  const phoneItems = page.getByRole("link", { name: /Samsung galaxy|Nokia lumia|Iphone/i });

  await expect(phoneItems.first()).toBeVisible();
  
  const itemCount = await phoneItems.count();
  expect(itemCount).toBeGreaterThan(0);
});