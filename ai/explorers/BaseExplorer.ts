import { Page } from "@playwright/test";
import { PageSnapshot } from "../models/PageSnapshot";

export abstract class BaseExplorer {

    abstract explore(
        page: Page
    ): Promise<PageSnapshot>;

}