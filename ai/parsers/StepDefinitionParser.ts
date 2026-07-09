import fs from "fs";
import path from "path";

export class StepDefinitionParser {

    parse(directory: string): string[] {

        const steps: string[] = [];

        const files = fs
            .readdirSync(directory)
            .filter(file => file.endsWith(".ts"));

        const regex =
            /(Given|When|Then)\(\s*["'`](.*?)["'`]/g;

        for (const file of files) {

            const content = fs.readFileSync(
                path.join(directory, file),
                "utf8"
            );

            let match;

            while ((match = regex.exec(content)) !== null) {

                steps.push(`${match[1]} ${match[2]}`);

            }

        }

        return steps;

    }

}