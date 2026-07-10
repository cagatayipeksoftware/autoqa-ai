import { test, expect } from "@playwright/test";

test("Verify successful user registration", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Sign up" }).click();

  const username = `testuser_${Date.now()}`;
  const password = "password123";

  await page.getByLabel("Username:").fill(username);
  await page.getByLabel("Password:").fill(password);

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Sign up successful.");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Sign up" }).click();
});