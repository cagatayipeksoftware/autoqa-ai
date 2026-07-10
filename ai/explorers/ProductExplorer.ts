import { Page } from "@playwright/test";

import { BaseExplorer } from "./BaseExplorer";
import { PageSnapshot } from "../models/PageSnapshot";

import { NavigationService } from "../../services/NavigationService";
import { SnapshotBuilder } from "../builders/SnapshotBuilder";

export class ProductExplorer extends BaseExplorer {

    private readonly navigation = new NavigationService();

    private readonly snapshotBuilder = new SnapshotBuilder();

    async explore(page: Page): Promise<PageSnapshot> {

        const product = await this.navigation.findFirstProduct(page);

        await page
            .locator(`a[href="${product.href}"]`)
            .first()
            .click();

        await page.waitForURL(/prod/i);

        const snapshot = await this.snapshotBuilder.build(
            page,
            "Product"
        );

        await page.goBack();

        await page.waitForURL(/index/i);

        return snapshot;

    }

}