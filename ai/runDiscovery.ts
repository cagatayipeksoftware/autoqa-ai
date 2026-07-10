import { chromium } from "@playwright/test";

import { GeminiService } from "./GeminiService";

import { ExplorerAgent } from "./agents/ExplorerAgent";
import { DiscoveryAgent } from "./agents/DiscoveryAgent";

import { ScenarioGenerator } from "./generators/ScenarioGenerator";
import { FeatureGenerator } from "./generators/FeatureGenerator";

import { ScenarioEnhancer } from "./enhancers/ScenarioEnhancer";

import { OutputService } from "../services/OutputService";

async function main() {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://demoblaze.com");

    const output = new OutputService();

    // ======================================================
    // 1. Website Exploration
    // ======================================================

    console.log("Exploring website...");

    const explorer = new ExplorerAgent(page);

    const snapshot = await explorer.explore();

    console.log("Website exploration completed.");

    await output.saveJson(
        "website-snapshot.json",
        snapshot
    );

    console.log("website-snapshot.json created successfully.");

    // ======================================================
    // 2. AI Website Discovery
    // ======================================================

    const gemini = new GeminiService();

    const discoveryAgent = new DiscoveryAgent(gemini);

    console.log("Running AI discovery...");

    const specification = await discoveryAgent.discover(snapshot);

    await output.saveJson(
        "website-spec.json",
        specification
    );

    console.log("website-spec.json created successfully.");

    // ======================================================
    // 3. Scenario Generation
    // ======================================================

    const scenarioGenerator = new ScenarioGenerator();

    let scenarios = scenarioGenerator.generate(specification);

    // ======================================================
    // 4. AI Scenario Enhancement
    // ======================================================

    const enhancer = new ScenarioEnhancer(gemini);

    console.log("Enhancing scenarios with AI...");

    scenarios = await enhancer.enhance(scenarios);

    await output.saveJson(
        "scenario-models.json",
        scenarios
    );

    console.log("scenario-models.json created successfully.");

    // ======================================================
    // 5. Feature Generation
    // ======================================================

    const featureGenerator = new FeatureGenerator();

    const features = featureGenerator.generate(scenarios);

    await output.saveFeatures(features);

    console.log("Feature files created successfully.");

    await browser.close();

}

main();