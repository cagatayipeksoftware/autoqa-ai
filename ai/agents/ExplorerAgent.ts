import { Page } from "@playwright/test";
import { WebsiteSnapshot } from "../models/WebsiteSnapshot";

export class ExplorerAgent {

    constructor(
        private readonly page: Page
    ) {}

    async explore(): Promise<WebsiteSnapshot> {

        return {

            pages: [
                {
                    name: "Home",
                    url: this.page.url(),
                    title: await this.page.title(),
                    html: await this.page.content()
                }
            ]

        };

    }

}