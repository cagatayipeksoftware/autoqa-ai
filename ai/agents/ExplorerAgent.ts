import { Page } from "@playwright/test";

import { WebsiteSnapshot } from "../models/WebsiteSnapshot";

import { HomeExplorer } from "../explorers/HomeExplorer";
import { ProductExplorer } from "../explorers/ProductExplorer";

export class ExplorerAgent {

    private readonly homeExplorer = new HomeExplorer();
    private readonly productExplorer = new ProductExplorer();

    constructor(
        private readonly page: Page
    ) {}

    async explore(): Promise<WebsiteSnapshot> {

        const snapshots = [];

        // Home Page
        snapshots.push(
            await this.homeExplorer.explore(this.page)
        );

        // Product Page
        snapshots.push(
            await this.productExplorer.explore(this.page)
        );

        return {
            pages: snapshots
        };

    }

}