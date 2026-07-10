import { test, expect } from "@playwright/test";

test("Verify registration with existing username", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Sign up" }).click();

  const signUpModal = page.getByRole("dialog", { name: "Sign up" });
  await expect(signUpModal).toBeVisible();

  await signUpModal.getByLabel("Username:").fill("existinguser");
  await signUpModal.getByLabel("Password:").fill("password123");

  await signUpModal.getByRole("button", { name: "Sign up" }).click();

  const dialog = await page.waitForEvent("dialog");
  expect(dialog.message()).toBe("This user already exist.");
  await dialog.accept();
});