import { IWorldOptions, World } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import type { AxeResults } from "axe-core";

export class CustomWorld extends World {

    page!: Page;

    homePage!: HomePage;

    productPage!: ProductPage;

    cartPage!: CartPage;

    constructor(options: IWorldOptions) {
        super(options);
    }

}