import { test, expect } from "@playwright/test";

test("Verify successful user registration", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "Sign up" }).click();

    const modal = page.getByRole("dialog", { name: "Sign up" });
    await expect(modal).toBeVisible();

    const username = `user_${Date.now()}`;
    const password = "Password123!";

    await modal.getByLabel("Username:").fill(username);
    await modal.getByLabel("Password:").fill(password);
    await modal.getByRole("button", { name: "Sign up" }).click();

    page.on("dialog", async (dialog) => {
        await expect(dialog.message()).toBe("Sign up successful.");
        await dialog.accept();
    });
});