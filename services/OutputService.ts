import fs from "fs/promises";
import path from "path";

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

}