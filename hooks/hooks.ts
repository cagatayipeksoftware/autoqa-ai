import { Before, After, setWorldConstructor } from "@cucumber/cucumber";
import { BrowserManager } from "../utils/BrowserManager";
import { CustomWorld } from "../utils/CustomWorld";
setWorldConstructor(CustomWorld);

Before(async function () {

    await BrowserManager.launch();

    this.page = BrowserManager.getPage();

});

After(async function () {

    await BrowserManager.close();

});