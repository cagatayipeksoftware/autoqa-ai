import { Page } from "@playwright/test";
import { GeminiService } from "../GeminiService";
import { WebsiteSpec } from "../models/WebsiteSpec";

export class DiscoveryAgent {

    constructor(
        private page: Page,
        private gemini: GeminiService
    ) {}

    async discover(): Promise<WebsiteSpec> {

        const html = await this.page.content();

        return await this.gemini.discoverWebsite(html);

    }

}