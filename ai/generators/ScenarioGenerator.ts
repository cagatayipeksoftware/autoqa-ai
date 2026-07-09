import { WebsiteSpec } from "../models/WebsiteSpec";
import { Scenario } from "../models/Scenario";

export class ScenarioGenerator {

    generate(spec: WebsiteSpec): Scenario[] {

        return spec.testIdeas.map(testIdea => ({

            id: testIdea.id,

            feature: this.getFeatureName(testIdea.page),

            title: testIdea.title,

            page: testIdea.page,

            priority: testIdea.priority,

            tags: this.buildTags(testIdea),

            steps: []

        }));

    }

    private getFeatureName(page: string): string {

        return page
            .replace(" Modal", "")
            .trim();

    }

    private buildTags(testIdea: WebsiteSpec["testIdeas"][number]): string[] {

        return [
            `@${testIdea.priority.toLowerCase()}`,
            `@${testIdea.type.toLowerCase()}`
        ];

    }

}