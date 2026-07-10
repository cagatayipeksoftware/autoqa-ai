import { Page } from "@playwright/test";

import {
    ImageSnapshot,
    PageSnapshot
} from "../models/PageSnapshot";

export class SnapshotBuilder {

    async build(
        page: Page,
        name: string,
        html?: string
    ): Promise<PageSnapshot> {

        const headings = this.clean(
            await page.locator("h1,h2,h3,h4,h5,h6").allTextContents()
        );

        const links = this.clean(
            await page.locator("a").allTextContents()
        );

        const buttons = this.clean(
            await page.locator("button").allTextContents()
        );

        const forms = (
            await page.locator("form")
                .evaluateAll(forms =>
                    forms.map(form =>
                        form.getAttribute("id")
                        ?? form.getAttribute("name")
                        ?? "form"
                    )
                )
        ).filter(Boolean);

        const images = (
            await page.locator("img")
                .evaluateAll(images =>
                    images.map(image => ({
                        alt: image.getAttribute("alt") ?? "",
                        src: image.getAttribute("src") ?? ""
                    }))
                )
        ).filter(image => image.src.length > 0) as ImageSnapshot[];

        return {

            name,

            url: page.url(),

            title: await page.title(),

            html: html ?? await page.content(),

            headings,

            links,

            buttons,

            forms,

            images

        };

    }

    private clean(values: string[]): string[] {

        return [...new Set(
            values
                .map(value => value.trim())
                .filter(Boolean)
        )];

    }

}