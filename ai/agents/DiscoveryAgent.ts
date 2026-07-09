import { GeminiService } from "../GeminiService";
import { WebsiteSnapshot } from "../models/WebsiteSnapshot";
import { WebsiteSpec } from "../models/WebsiteSpec";

export class DiscoveryAgent {

    constructor(
        private readonly gemini: GeminiService
    ) {}

    async discover(
        snapshot: WebsiteSnapshot
    ): Promise<WebsiteSpec> {

        return await this.gemini.discoverWebsite(snapshot);

    }

}