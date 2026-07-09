import { Scenario } from "../models/Scenario";
import { MissingStep } from "../models/MissingStep";
import { GherkinTemplateEngine } from "../templates/GherkinTemplateEngine";

export class StepScanner {

    private readonly engine = new GherkinTemplateEngine();

    scan(
        scenarios: Scenario[],
        existingSteps: string[]
    ): MissingStep[] {

        const missing: MissingStep[] = [];

        for (const scenario of scenarios) {

            const generatedSteps =
                this.engine.build(scenario);

            for (const step of generatedSteps) {

                if (!existingSteps.includes(step)) {

                    const [keyword, ...text] = step.split(" ");

                    missing.push({

                        keyword:
                            keyword as
                            "Given" | "When" | "Then",

                        text: text.join(" "),

                        feature: scenario.feature

                    });

                }

            }

        }

        return missing;

    }

}