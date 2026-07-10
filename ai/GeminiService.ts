import { GoogleGenAI } from "@google/genai";
import { Env } from "../utils/Env";
import { WebsiteSpec } from "./models/WebsiteSpec";
import { discoveryPrompt } from "./prompts/discovery";
import { WebsiteSnapshot } from "./models/WebsiteSnapshot";
import { Scenario } from "./models/Scenario";
import { scenarioEnhancementPrompt } from "./prompts/scenarioEnhancement";
import { playwrightGenerationPrompt } from "./prompts/playwrightGeneration";
export class GeminiService {

    private client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: Env.geminiApiKey
        });
    }

    async discoverWebsite(snapshot: WebsiteSnapshot): Promise<WebsiteSpec> {

        const response = await this.client.models.generateContent({
            model: "gemini-2.5-flash",
            contents:
                `${discoveryPrompt}

            Website Snapshot:

            ${JSON.stringify(snapshot, null, 2)}`
        });

        const text = response.text ?? "";

        // Remove Markdown code blocks if Gemini returns them
        const cleaned = text
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

        try {

            const spec = JSON.parse(cleaned) as WebsiteSpec;

            this.validateWebsiteSpec(spec);

            return spec;

        } catch (error) {

            console.error("\n========== GEMINI RAW RESPONSE ==========\n");
            console.error(cleaned);
            console.error("\n=========================================\n");

            throw error;

        }
    }
    async generatePlaywrightTest(
    scenario: Scenario
): Promise<string> {

    const response = await this.client.models.generateContent({

        model: "gemini-3.1-flash-lite",

        contents: `${playwrightGenerationPrompt}

Application URL:
https://demoblaze.com

Scenario:
${JSON.stringify(scenario, null, 2)}

Requirements:
- Generate exactly one Playwright test.
- Use @playwright/test.
- Use getByRole() whenever possible.
- Use accessible locators.
- Use realistic assertions.
- Return ONLY valid TypeScript.
`

    });

    const code = (response.text ?? "")
        .replace(/```typescript\s*/gi, "")
        .replace(/```ts\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

    this.validatePlaywrightCode(code);

    return code;

}
    async enhanceScenarios(
        scenarios: Scenario[]
    ): Promise<Scenario[]> {

        const response = await this.client.models.generateContent({

            model: "gemini-3.5-flash",

            contents: `${scenarioEnhancementPrompt}

Scenarios:

${JSON.stringify(scenarios, null, 2)}`

        });

        const text = response.text ?? "";

        const cleaned = text
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

        try {

            const enhanced = JSON.parse(cleaned) as Scenario[];

            this.validateScenarios(enhanced);

            return enhanced;

        } catch (error) {

            console.error("\n========== GEMINI RAW RESPONSE ==========\n");
            console.error(cleaned);
            console.error("\n=========================================\n");

            throw error;

        }

    }

    private validateWebsiteSpec(spec: WebsiteSpec): void {

        if (!Array.isArray(spec.pages)) {
            throw new Error("Invalid WebsiteSpec: pages is missing.");
        }

        if (!Array.isArray(spec.navigation)) {
            throw new Error("Invalid WebsiteSpec: navigation is missing.");
        }

        if (!Array.isArray(spec.forms)) {
            throw new Error("Invalid WebsiteSpec: forms is missing.");
        }

        if (!Array.isArray(spec.userFlows)) {
            throw new Error("Invalid WebsiteSpec: userFlows is missing.");
        }

        if (!Array.isArray(spec.testIdeas)) {
            throw new Error("Invalid WebsiteSpec: testIdeas is missing.");
        }

        if (!Array.isArray(spec.risks)) {
            throw new Error("Invalid WebsiteSpec: risks is missing.");
        }

    }
    private validatePlaywrightCode(
    code: string
): void {

    if (!code.includes("test(")) {
        throw new Error("Generated code is not a Playwright test.");
    }

    if (!code.includes("@playwright/test")) {
        throw new Error("Missing Playwright import.");
    }

}
    private validateScenarios(
        scenarios: Scenario[]
    ): void {

        if (!Array.isArray(scenarios)) {
            throw new Error("Invalid Scenario list.");
        }

        for (const scenario of scenarios) {

            if (!scenario.id) {
                throw new Error("Scenario id is missing.");
            }

            if (!scenario.title) {
                throw new Error("Scenario title is missing.");
            }

            if (!Array.isArray(scenario.expectedResults)) {
                throw new Error(
                    `Scenario ${scenario.id}: expectedResults is missing.`
                );
            }

            if (!Array.isArray(scenario.preconditions)) {
                throw new Error(
                    `Scenario ${scenario.id}: preconditions is missing.`
                );
            }

            if (!Array.isArray(scenario.edgeCases)) {
                throw new Error(
                    `Scenario ${scenario.id}: edgeCases is missing.`
                );
            }

            if (!Array.isArray(scenario.accessibilityChecks)) {
                throw new Error(
                    `Scenario ${scenario.id}: accessibilityChecks is missing.`
                );
            }

        }

    }

}