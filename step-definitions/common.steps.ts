import { Given } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

Given("user opens homepage", async function () {

    this.homePage = new HomePage(this.page);

    await this.homePage.open();

});
Given("user opens {string}", async function (pageName: string) {

    this.homePage = new HomePage(this.page);

    switch (pageName.toLowerCase()) {

        case "home":
            await this.homePage.open();
            break;

        case "product":
            await this.homePage.open();
            await this.homePage.clickFirstProduct();
            break;

        case "cart":
            await this.homePage.open();

            this.cartPage = new CartPage(this.page);
            await this.cartPage.openCart();
            break;

        case "login":
            await this.homePage.open();
            await this.homePage.openLogin();
            break;

        default:
            throw new Error(`Unknown page: ${pageName}`);
    }

});