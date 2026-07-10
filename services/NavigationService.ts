import { Page } from "@playwright/test";

import { NavigationLink } from "../ai/models/NavigationLink";
import { NavigationDetector } from "../ai/detectors/NavigationDetector";
import { LinkClassifier } from "../ai/detectors/LinkClassifier";

export class NavigationService {

    private readonly detector = new NavigationDetector();
    private readonly classifier = new LinkClassifier();

    async findFirstProduct(page: Page): Promise<NavigationLink> {

        const links = await this.detector.detect(page);

        const product = links.find(link =>
            this.classifier.isProduct(link)
        );

        if (!product) {
            throw new Error("Product link not found.");
        }

        return product;

    }

    async findCart(page: Page): Promise<NavigationLink> {

        const links = await this.detector.detect(page);

        const cart = links.find(link =>
            this.classifier.isCart(link)
        );

        if (!cart) {
            throw new Error("Cart link not found.");
        }

        return cart;

    }

}