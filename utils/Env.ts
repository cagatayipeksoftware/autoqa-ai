import dotenv from "dotenv";

dotenv.config();

export const Env = {
    geminiApiKey: process.env.GEMINI_API_KEY ?? ""
};