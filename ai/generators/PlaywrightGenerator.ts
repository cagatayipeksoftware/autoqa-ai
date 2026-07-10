import { Scenario } from "../models/Scenario";
import { PlaywrightTest } from "../../ai/models/PlayWrightTest";
import { PlaywrightAIService } from "../../services/PlayWrightAIService";

export class PlaywrightGenerator {

    constructor(
        private readonly ai = new PlaywrightAIService()
    ) {}

    async generate(
        scenarios: Scenario[]
    ): Promise<PlaywrightTest[]> {

        const tests: PlaywrightTest[] = [];

        for (const scenario of scenarios) {

            tests.push(
                await this.ai.generate(scenario)
            );

        }

        return tests;

    }

}