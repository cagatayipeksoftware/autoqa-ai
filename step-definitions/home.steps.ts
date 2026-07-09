import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

let homePage: HomePage;

Given("user opens Demoblaze", async function () {

    homePage = new HomePage(this.page);

    await homePage.open();

});

Then("homepage should be displayed", async function () {

    expect(await this.page.title()).toContain("STORE");

});