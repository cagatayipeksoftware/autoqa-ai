import { test, expect } from "@playwright/test";

test("Verify successful login", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Log in" }).click();

  const modal = page.getByRole("dialog", { name: "Log in" });
  await modal.getByLabel("Username:").fill("testuser_automation");
  await modal.getByLabel("Password:").fill("password123");
  await modal.getByRole("button", { name: "Log in" }).click();

  const welcomeMessage = page.getByRole("link", { name: /Welcome testuser_automation/i });
  await expect(welcomeMessage).toBeVisible();
});