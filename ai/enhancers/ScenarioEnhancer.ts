import { GeminiService } from "../GeminiService";
import { Scenario } from "../models/Scenario";

export class ScenarioEnhancer {

    constructor(
        private readonly gemini: GeminiService
    ) {}

    async enhance(
        scenarios: Scenario[]
    ): Promise<Scenario[]> {

        return this.gemini.enhanceScenarios(scenarios);

    }

}