import fs from "fs/promises";
import path from "path";

import { Scenario } from "../models/Scenario";

export class ScenarioRepository {

    async load(): Promise<Scenario[]> {

        const file = path.join(
            process.cwd(),
            "ai",
            "output",
            "scenario-models.json"
        );

        const content = await fs.readFile(
            file,
            "utf-8"
        );

        return JSON.parse(content);

    }

}