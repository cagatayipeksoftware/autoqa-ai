import { Page } from "@playwright/test";

import { BaseExplorer } from "./BaseExplorer";
import { PageSnapshot } from "../models/PageSnapshot";

import { SnapshotBuilder } from "../builders/SnapshotBuilder";

export class HomeExplorer extends BaseExplorer {

    private readonly snapshotBuilder = new SnapshotBuilder();

    async explore(page: Page): Promise<PageSnapshot> {

        return this.snapshotBuilder.build(
            page,
            "Home"
        );

    }

}