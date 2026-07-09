import { When, Then } from "@cucumber/cucumber";

import { CartPage } from "../pages/CartPage";

When("user adds the product to the cart", async function () {

    await this.productPage.addProductToCart();

});

When("user opens the cart", async function () {

    this.cartPage = new CartPage(this.page);

    await this.cartPage.openCart();

});

Then("the cart should contain products", async function () {

    await this.cartPage.shouldContainProducts();

});