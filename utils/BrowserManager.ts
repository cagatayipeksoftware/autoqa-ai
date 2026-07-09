import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

export class BrowserManager {

    private static browser: Browser;
    private static context: BrowserContext;
    private static page: Page;

    static async launch() {
        this.browser = await chromium.launch({
            headless: false
        });

        this.context = await this.browser.newContext();

        this.page = await this.context.newPage();
    }

    static getPage() {
        return this.page;
    }

    static async close() {
        await this.browser.close();
    }
}