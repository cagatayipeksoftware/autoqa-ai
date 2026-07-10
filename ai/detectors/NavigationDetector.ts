import { Page } from "@playwright/test";

import { NavigationLink } from "../models/NavigationLink";

export class NavigationDetector {

    async detect(page: Page): Promise<NavigationLink[]> {

        const links = await page
            .locator("a")
            .evaluateAll(elements =>
                elements.map(element => ({
                    text: (element.textContent ?? "").trim(),
                    href: element.getAttribute("href") ?? ""
                }))
            );

        return links
            .filter(link => link.text.length > 0)
            .filter(
                (link, index, array) =>
                    index ===
                    array.findIndex(item =>
                        item.text === link.text &&
                        item.href === link.href
                    )
            );

    }

}