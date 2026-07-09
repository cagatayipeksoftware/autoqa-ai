import { GoogleGenAI } from "@google/genai";
import { Env } from "../utils/Env";
import { WebsiteSpec } from "./models/WebsiteSpec";
import { discoveryPrompt } from "./prompts/discovery";
import { WebsiteSnapshot } from "./models/WebsiteSnapshot";


export class GeminiService {

    private client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: Env.geminiApiKey
        });
    }

    async discoverWebsite(snapshot:WebsiteSnapshot): Promise<WebsiteSpec> {

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

}