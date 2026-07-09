import AxeBuilder from "@axe-core/playwright";
import { Page } from "@playwright/test";
import type { AxeResults } from "axe-core";

export class AccessibilityService {

    constructor(private page: Page) {}

    async scan(): Promise<AxeResults> {

        return await new AxeBuilder({
            page: this.page
        }).analyze();

    }

}