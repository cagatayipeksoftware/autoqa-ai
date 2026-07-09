import { GoogleGenAI } from "@google/genai";
import { Env } from "../utils/Env";
import { WebsiteSpec } from "./models/WebsiteSpec";
import { discoveryPrompt } from "./prompts/discovery";

export class GeminiService {

    private client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: Env.geminiApiKey
        });
    }

    async discoverWebsite(html: string): Promise<WebsiteSpec> {

        const response = await this.client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${discoveryPrompt}\n\nHTML:\n${html}`
        });

        const text = response.text ?? "";

// Markdown code block'larını temizle
const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

try {
    return JSON.parse(cleaned) as WebsiteSpec;
} catch (error) {
    console.error("Gemini returned invalid JSON:");
    console.error(cleaned);
    throw error;
}
    }

}