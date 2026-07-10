import { Page } from "@playwright/test";

import { BaseExplorer } from "./BaseExplorer";
import { PageSnapshot } from "../models/PageSnapshot";

import { NavigationService } from "../../services/NavigationService";
import { SnapshotBuilder } from "../builders/SnapshotBuilder";

export class CartExplorer extends BaseExplorer {

    private readonly navigation = new NavigationService();

    private readonly snapshotBuilder = new SnapshotBuilder();

    async explore(page: Page): Promise<PageSnapshot> {

        const cart = await this.navigation.findCart(page);

        await page
            .locator(`a[href="${cart.href}"]`)
            .first()
            .click();

        await page.waitForURL(/cart/i);

        const snapshot = await this.snapshotBuilder.build(
            page,
            "Cart"
        );

        await page.goBack();

        await page.waitForURL(/index/i);

        return snapshot;

    }

}