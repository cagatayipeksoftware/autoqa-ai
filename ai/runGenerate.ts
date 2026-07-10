import { OutputService } from "../services/OutputService";

import { ScenarioRepository } from "./repositories/ScenarioRepository";
import { PlaywrightAgent } from "./agents/PlayWrightAgent";
import { PlaywrightTest } from "./models/PlayWrightTest";

async function main() {

    console.log("Loading scenarios...");

    const repository = new ScenarioRepository();

    const scenarios = await repository.load();

    console.log(`${scenarios.length} scenarios loaded.`);

    const agent = new PlaywrightAgent();

    const tests: PlaywrightTest[] = [];

    for (const scenario of scenarios) {

        console.log(`Generating ${scenario.title}...`);

        const test = await agent.generate(scenario);

        tests.push(test);

    }

    const output = new OutputService();

    await output.savePlaywrightTests(tests);

    console.log("Playwright tests generated successfully.");

}

main().catch(error => {

    console.error(error);

    process.exit(1);

});