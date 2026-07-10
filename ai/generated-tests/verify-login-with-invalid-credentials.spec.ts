import { test, expect } from "@playwright/test";

test("Verify login with invalid credentials", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "Log in" }).click();

    const loginModal = page.getByRole("dialog", { name: "Log in" });
    await expect(loginModal).toBeVisible();

    await loginModal.getByLabel("Username:").fill("invalid_user_12345");
    await loginModal.getByLabel("Password:").fill("wrongpassword");

    page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe("Wrong password.");
        await dialog.dismiss();
    });

    await loginModal.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByRole("link", { name: "Welcome invalid_user_12345" })).not.toBeVisible();
});