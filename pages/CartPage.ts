import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    // =========================
    // Locators
    // =========================

    readonly cartLink: Locator;
    readonly cartRows: Locator;

    constructor(page: Page) {
        super(page);

        this.cartLink = page.getByRole("link", {
            name: "Cart",
            exact: true
        });

        this.cartRows = page.locator("#tbodyid tr");
    }

    // =========================
    // Actions
    // =========================

    async openCart() {
        await this.click(this.cartLink);
    }

    // =========================
    // Assertions
    // =========================

    async shouldContainProducts() {
        await this.expectVisible(this.cartRows.first());
    }

}