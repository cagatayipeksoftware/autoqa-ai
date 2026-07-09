import { Page } from "@playwright/test";

import { WebsiteSnapshot } from "../models/WebsiteSnapshot";

import { HomeExplorer } from "../explorers/HomeExplorer";

export class ExplorerAgent {

    private readonly homeExplorer = new HomeExplorer();

    constructor(
        private readonly page: Page
    ) {}

    async explore(): Promise<WebsiteSnapshot> {

        const snapshots = [];

        snapshots.push(
            await this.homeExplorer.explore(this.page)
        );

        return {

            pages: snapshots

        };

    }

}