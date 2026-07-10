import { Page } from "@playwright/test";

import { BaseExplorer } from "./BaseExplorer";
import { ImageSnapshot, PageSnapshot } from "../models/PageSnapshot";

export class ModalExplorer extends BaseExplorer {

    async explore(page: Page): Promise<PageSnapshot> {

        throw new Error(
            "Use exploreModal() instead of explore()."
        );

    }

    async exploreModal(
        page: Page,
        triggerSelector: string,
        modalSelector: string,
        name: string
    ): Promise<PageSnapshot> {

        await page.locator(triggerSelector).click();

        await page.locator(modalSelector).waitFor();

        const headings = this.cleanText(
            await page.locator(`${modalSelector} h1, ${modalSelector} h2, ${modalSelector} h3, ${modalSelector} h4, ${modalSelector} h5, ${modalSelector} h6`).allTextContents()
        );

        const links = this.cleanText(
            await page.locator(`${modalSelector} a`).allTextContents()
        );

        const buttons = this.cleanText(
            await page.locator(`${modalSelector} button`).allTextContents()
        );

        const forms = (
            await page.locator(`${modalSelector} form`)
                .evaluateAll(forms =>
                    forms.map(form =>
                        form.getAttribute("id")
                        ?? form.getAttribute("name")
                        ?? "form"
                    )
                )
        ).filter(Boolean);

        const images = (
            await page.locator(`${modalSelector} img`)
                .evaluateAll(images =>
                    images.map(image => ({
                        alt: image.getAttribute("alt") ?? "",
                        src: image.getAttribute("src") ?? ""
                    }))
                )
        ).filter(image => image.src.length > 0) as ImageSnapshot[];

        const snapshot: PageSnapshot = {

            name,

            url: page.url(),

            title: await page.title(),

            html: await page.locator(modalSelector).innerHTML(),

            headings,

            links,

            buttons,

            forms,

            images

        };

        const closeButton = page.locator(`${modalSelector} .close`).first();

        if (await closeButton.isVisible()) {
            await closeButton.click();
        } else {
            await page.keyboard.press("Escape");
        }

        await page.locator(modalSelector).waitFor({
            state: "hidden"
        });

        return snapshot;

    }

    private cleanText(values: string[]): string[] {

        return [...new Set(
            values
                .map(value => value.trim())
                .filter(Boolean)
        )];

    }

}