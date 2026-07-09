import { Page } from "@playwright/test";

import { BaseExplorer } from "./BaseExplorer";
import { ImageSnapshot, PageSnapshot } from "../models/PageSnapshot";

export class HomeExplorer extends BaseExplorer {

    async explore(page: Page): Promise<PageSnapshot> {

        const headings = this.cleanText(
            await page
                .locator("h1,h2,h3,h4,h5,h6")
                .allTextContents()
        );

        const links = this.cleanText(
            await page
                .locator("a")
                .allTextContents()
        );

        const buttons = this.cleanText(
            await page
                .locator("button")
                .allTextContents()
        ).filter(button => button.length > 1);

        const forms = (
            await page
                .locator("form")
                .evaluateAll(forms =>
                    forms.map(form =>
                        form.getAttribute("id") ??
                        form.getAttribute("name") ??
                        "form"
                    )
                )
        ).filter(Boolean);

        const images = (
            await page
                .locator("img")
                .evaluateAll(images =>
                    images.map(image => ({
                        alt: image.getAttribute("alt") ?? "",
                        src: image.getAttribute("src") ?? ""
                    }))
                )
        ).filter(image => image.src.length > 0) as ImageSnapshot[];

        return {

            name: "Home",

            url: page.url(),

            title: await page.title(),

            html: await page.content(),

            headings,

            links,

            buttons,

            forms,

            images

        };

    }

    private cleanText(values: string[]): string[] {

        return [...new Set(
            values
                .map(value => value.trim())
                .filter(Boolean)
        )];

    }

}