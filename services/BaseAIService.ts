import { GoogleGenAI } from "@google/genai";

import { Env } from "../utils/Env";

export abstract class BaseAIService {

    protected readonly client: GoogleGenAI;

    constructor() {

        this.client = new GoogleGenAI({

            apiKey: Env.geminiApiKey

        });

    }

    protected cleanJson(text: string): string {

        return text
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

    }

}