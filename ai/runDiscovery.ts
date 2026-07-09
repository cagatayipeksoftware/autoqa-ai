import { chromium } from "@playwright/test";

import { GeminiService } from "./GeminiService";
import { DiscoveryAgent } from "./agents/DiscoveryAgent";
import { ExplorerAgent } from "./agents/ExplorerAgent";

import { ScenarioGenerator } from "./generators/ScenarioGenerator";
import { FeatureGenerator } from "./generators/FeatureGenerator";

import { OutputService } from "../services/OutputService";

async function main() {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://demoblaze.com");

    console.log("Exploring website...");

    const explorer = new ExplorerAgent(page);

    const snapshot = await explorer.explore();

    console.log("Website exploration completed.");

    const gemini = new GeminiService();

    const discoveryAgent = new DiscoveryAgent(gemini);

    console.log("Running AI discovery...");

    const specification = await discoveryAgent.discover(snapshot);

    const output = new OutputService();

    await output.saveJson(
        "website-snapshot.json",
        snapshot
    );

    console.log("website-snapshot.json created successfully.");

    await output.saveJson(
        "website-spec.json",
        specification
    );

    console.log("website-spec.json created successfully.");

    const scenarioGenerator = new ScenarioGenerator();

    const scenarios = scenarioGenerator.generate(specification);

    await output.saveJson(
        "scenario-models.json",
        scenarios
    );

    console.log("scenario-models.json created successfully.");

    const featureGenerator = new FeatureGenerator();

    const features = featureGenerator.generate(scenarios);

    await output.saveFeatures(features);

    console.log("Feature files created successfully.");

    await browser.close();

}

main();