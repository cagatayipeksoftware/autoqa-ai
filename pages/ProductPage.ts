import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    // =========================
    // Locators
    // =========================

    readonly addToCartButton: Locator;

    readonly productTitle: Locator;

    readonly productPrice: Locator;

    constructor(page: Page) {

        super(page);

        this.addToCartButton =
            page.getByRole("link", { name: "Add to cart" });

        this.productTitle =
            page.locator(".name");

        this.productPrice =
            page.locator(".price-container");

    }

    // =========================
    // Actions
    // =========================

    async addProductToCart() {

        await this.handleDialog();

        await this.click(this.addToCartButton);

    }

    // =========================
    // Assertions
    // =========================

    async shouldDisplayProduct() {

        await this.expectVisible(this.productTitle);

    }

}