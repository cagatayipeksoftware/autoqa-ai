import fs from "fs/promises";
import path from "path";
import { Scenario } from "../ai/models/Scenario";

export class OutputService {

    async saveJson(fileName: string, data: unknown): Promise<void> {

        const outputDirectory = path.join(process.cwd(), "ai", "output");

        await fs.mkdir(outputDirectory, {
            recursive: true
        });

        await fs.writeFile(
            path.join(outputDirectory, fileName),
            JSON.stringify(data, null, 2),
            "utf-8"
        );

    }
    async saveFeatures(features: Map<string, string>): Promise<void> {

    const outputDirectory = path.join(
        process.cwd(),
        "ai",
        "generated-features"
    );

    await fs.mkdir(outputDirectory, {
        recursive: true
    });

    for (const [featureName, content] of features) {

        const fileName = `${featureName}.feature`;

        await fs.writeFile(
            path.join(outputDirectory, fileName),
            content,
            "utf-8"
        );

    }

}
    
    async saveScenarios(scenarios: Scenario[]) {

    await this.saveJson(
        "scenario-models.json",
        scenarios
    );


}
    


}