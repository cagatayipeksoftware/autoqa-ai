import { Page } from "@playwright/test";
import { PageSnapshot } from "../models/PageSnapshot";
import { BaseExplorer } from "./BaseExplorer";

export class ExplorerPipeline {

    constructor(
        private readonly explorers: BaseExplorer[]
    ) {}

    async run(page: Page): Promise<PageSnapshot[]> {

        const snapshots: PageSnapshot[] = [];

        for (const explorer of this.explorers) {

            const snapshot = await explorer.explore(page);

            snapshots.push(snapshot);

        }

        return snapshots;

    }

}