import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}
    async handleDialog(accept: boolean = true) {
    this.page.once("dialog", async (dialog) => {
        console.log(`Dialog: ${dialog.message()}`);

        if (accept) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    });
}
    // =========================
    // Navigation
    // =========================

    async goto(url: string) {
        await this.page.goto(url);
    }

    async reload() {
        await this.page.reload();
    }

    // =========================
    // Actions
    // =========================

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async hover(locator: Locator) {
        await locator.hover();
    }

    // =========================
    // Getters
    // =========================

    async getTitle() {
        return this.page.title();
    }

    async getText(locator: Locator) {
        return await locator.textContent();
    }

    // =========================
    // Assertions
    // =========================

    async expectTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async expectVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async expectText(locator: Locator, text: string) {
        await expect(locator).toContainText(text);
    }

    // =========================
    // Waits
    // =========================

    async wait(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);

    }

// =========================
// Dialog
// =========================


}
