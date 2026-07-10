import { test, expect } from "@playwright/test";

test("Verify successful logout", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "Log in" }).click();
    await page.getByLabel("Username").fill("testuser_demo");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();

    await page.getByRole("link", { name: "Log out" }).click();

    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
});