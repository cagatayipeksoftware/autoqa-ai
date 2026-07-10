import { test, expect } from "@playwright/test";

test("Verify pagination for product listings", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const productCards = page.locator(".card");
  await expect(productCards.first()).toBeVisible();

  const initialCount = await productCards.count();
  expect(initialCount).toBeLessThanOrEqual(9);

  const nextButton = page.getByRole("button", { name: "Next" });
  await nextButton.click();

  await expect(page.getByRole("button", { name: "Previous" })).toBeVisible();
  
  const secondPageCards = page.locator(".card");
  await expect(secondPageCards.first()).toBeVisible();
});