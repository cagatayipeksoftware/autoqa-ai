import { test, expect } from "@playwright/test";

test("Verify registration with existing username", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Sign up" }).click();

  const modal = page.getByLabel("Sign up");
  await expect(modal).toBeVisible();

  await modal.getByLabel("Username:").fill("existinguser");
  await modal.getByLabel("Password:").fill("password123");

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("This user already exist.");
    await dialog.dismiss();
  });

  await modal.getByRole("button", { name: "Sign up" }).click();
});