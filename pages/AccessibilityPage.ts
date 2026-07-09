import { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

export class AccessibilityPage {
    constructor(private page: Page) {}

    async scan(): Promise<AxeResults> {
        return await new AxeBuilder({
            page: this.page
        }).analyze();
    }
}