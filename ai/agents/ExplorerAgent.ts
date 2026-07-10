import { Page } from "@playwright/test";

import { WebsiteSnapshot } from "../models/WebsiteSnapshot";

import { HomeExplorer } from "../explorers/HomeExplorer";
import { ProductExplorer } from "../explorers/ProductExplorer";
import { CartExplorer } from "../explorers/CartExplorer";
import { ModalExplorer } from "../explorers/ModalExplorer";

export class ExplorerAgent {

    private readonly homeExplorer = new HomeExplorer();
    private readonly productExplorer = new ProductExplorer();
    private readonly cartExplorer = new CartExplorer();
    private readonly modalExplorer = new ModalExplorer();

    constructor(
        private readonly page: Page
    ) {}

    async explore(): Promise<WebsiteSnapshot> {

        const snapshots = [];

        // Home
        snapshots.push(
            await this.homeExplorer.explore(this.page)
        );

        // Product
        snapshots.push(
            await this.productExplorer.explore(this.page)
        );

        // Cart
        snapshots.push(
            await this.cartExplorer.explore(this.page)
        );

        // Contact Modal
        snapshots.push(
            await this.modalExplorer.exploreModal(
                this.page,
                "#navbarExample a[data-target='#exampleModal']",
                "#exampleModal",
                "Contact Modal"
            )
        );

        // Login Modal
        snapshots.push(
            await this.modalExplorer.exploreModal(
                this.page,
                "#login2",
                "#logInModal",
                "Login Modal"
            )
        );

        // Sign Up Modal
        snapshots.push(
            await this.modalExplorer.exploreModal(
                this.page,
                "#signin2",
                "#signInModal",
                "Sign Up Modal"
            )
        );

        // About Us Modal
        snapshots.push(
            await this.modalExplorer.exploreModal(
                this.page,
                "#navbarExample a[data-target='#videoModal']",
                "#videoModal",
                "About Us Modal"
            )
        );

        return {
            pages: snapshots
        };

    }

}