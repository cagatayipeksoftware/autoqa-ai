import { chromium } from "@playwright/test";
import { GeminiService } from "./GeminiService";
import { DiscoveryAgent } from "./agents/DiscoveryAgent";
import { OutputService } from "../services/OutputService";

async function main() {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://demoblaze.com");

    const gemini = new GeminiService();

    const discoveryAgent = new DiscoveryAgent(
        page,
        gemini
    );

    console.log("Running AI discovery...");

    const specification = await discoveryAgent.discover();

    const output = new OutputService();

    await output.saveJson(
        "website-spec.json",
        specification
    );

    console.log("website-spec.json created successfully.");

    await browser.close();

}

main();