import { When, Then } from "@cucumber/cucumber";
import { ProductPage } from "../pages/ProductPage";

When("user opens the first product", async function () {
    await this.homePage.clickFirstProduct();

    this.productPage = new ProductPage(this.page);
});

Then("product details page should be displayed", async function () {
    await this.productPage.shouldDisplayProduct();
});