import { GeminiService } from "../GeminiService";

import { Scenario } from "../models/Scenario";
import { PlaywrightTest } from "../models/PlayWrightTest";

export class PlaywrightAgent {

    private readonly gemini = new GeminiService();

    async generate(
        scenario: Scenario
    ): Promise<PlaywrightTest> {

        const code =
            await this.gemini.generatePlaywrightTest(
                scenario
            );

        return {

            feature: scenario.feature,

            scenario: scenario.title,

            fileName: this.buildFileName(scenario),

            code

        };

    }

    private buildFileName(
        scenario: Scenario
    ): string {

        return scenario.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            + ".spec.ts";

    }

}