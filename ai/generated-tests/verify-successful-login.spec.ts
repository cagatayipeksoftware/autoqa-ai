import { test, expect } from "@playwright/test";

test("Verify successful login", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Log in" }).click();

  await page.getByLabel("Username:").fill("testuser_automation");
  await page.getByLabel("Password:").fill("password123");

  await page.getByRole("button", { name: "Log in" }).click();

  const welcomeMessage = page.getByRole("link", { name: "Welcome testuser_automation" });
  await expect(welcomeMessage).toBeVisible();
});