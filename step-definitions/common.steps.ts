import { Given } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";

Given("user opens homepage", async function () {

    this.homePage = new HomePage(this.page);

    await this.homePage.open();

});