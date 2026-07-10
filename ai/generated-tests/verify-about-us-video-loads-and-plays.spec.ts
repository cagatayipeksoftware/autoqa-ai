import { test, expect } from "@playwright/test";

test("Verify About Us video loads and plays", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    await page.getByRole("link", { name: "About us" }).click();

    const modal = page.getByRole("dialog", { name: "About us" });
    await expect(modal).toBeVisible();

    const video = modal.getByRole("img", { name: "Video player" });
    await expect(video).toBeVisible();

    await modal.getByRole("button", { name: "Play" }).click();

    await expect(modal.getByRole("button", { name: "Pause" })).toBeVisible();

    await modal.getByRole("button", { name: "Close" }).click();
    await expect(modal).not.toBeVisible();
});