import { test, expect } from "@playwright/test";

test("Verify successful login", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "Log in" }).click();

    const modal = page.getByRole("dialog", { name: "Log in" });
    await expect(modal).toBeVisible();

    await modal.getByLabel("Username:").fill("testuser_demo");
    await modal.getByLabel("Password:").fill("testpassword123");
    await modal.getByRole("button", { name: "Log in" }).click();

    const logoutLink = page.getByRole("link", { name: "Log out" });
    await expect(logoutLink).toBeVisible();
    await expect(page.getByRole("link", { name: "Welcome testuser_demo" })).toBeVisible();
});