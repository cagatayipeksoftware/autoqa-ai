import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Config } from "../utils/Config";

export class HomePage extends BasePage {

    // =========================
    // Locators
    // =========================

    readonly productCards: Locator;
    readonly firstProduct: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly signUpLink: Locator;

    constructor(page: Page) {
        super(page);

        this.productCards = page.locator(".card");

        this.firstProduct = page.locator(".hrefch").first();

        this.cartLink = page.getByRole("link", { name: "Cart" });

        this.loginLink = page.getByRole("link", { name: "Log in" });

        this.signUpLink = page.getByRole("link", { name: "Sign up" });
    }

    // =========================
    // Actions
    // =========================

    async open() {
        await this.goto(Config.baseUrl);
    }

    async clickFirstProduct() {

    await this.click(this.firstProduct);

}

    async openCart() {
    await this.click(this.cartLink);
}

    async openLogin() {
    await this.click(this.loginLink);
}

    async openSignUp() {
    await this.click(this.signUpLink);
}

    // =========================
    // Assertions
    // =========================

    async shouldDisplayProducts() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async getProductCount() {
        return await this.productCards.count();
    }

}