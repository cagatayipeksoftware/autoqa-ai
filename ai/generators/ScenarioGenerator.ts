import { WebsiteSpec } from "../models/WebsiteSpec";
import {
    BusinessValue,
    Scenario,
    ScenarioType
} from "../models/Scenario";

export class ScenarioGenerator {

    generate(spec: WebsiteSpec): Scenario[] {

        return spec.testIdeas.map(testIdea => ({

            id: testIdea.id,

            feature: this.getFeatureName(testIdea.page),

            title: testIdea.title,

            page: testIdea.page,

            priority: testIdea.priority,

            type: testIdea.type as ScenarioType,

            businessValue: this.getBusinessValue(testIdea.priority),

            tags: this.buildTags(testIdea),

            preconditions: this.buildPreconditions(testIdea),

            steps: [],

            expectedResults: this.buildExpectedResults(testIdea),

            edgeCases: this.buildEdgeCases(testIdea),

            accessibilityChecks: this.buildAccessibilityChecks(testIdea)

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

    private getBusinessValue(
        priority: "High" | "Medium" | "Low"
    ): BusinessValue {

        switch (priority) {

            case "High":
                return "Critical";

            case "Medium":
                return "High";

            default:
                return "Medium";

        }

    }

    private buildPreconditions(
        testIdea: WebsiteSpec["testIdeas"][number]
    ): string[] {

        if (testIdea.type === "Smoke") {

            return [
                "Application is available"
            ];

        }

        return [];

    }

    private buildExpectedResults(
        testIdea: WebsiteSpec["testIdeas"][number]
    ): string[] {

        return [
            `${testIdea.title} completes successfully`
        ];

    }

    private buildEdgeCases(
        testIdea: WebsiteSpec["testIdeas"][number]
    ): string[] {

        if (testIdea.type === "Negative") {

            return [
                "Invalid input",
                "Empty input"
            ];

        }

        return [];

    }

    private buildAccessibilityChecks(
        testIdea: WebsiteSpec["testIdeas"][number]
    ): string[] {

        return [

            "Keyboard navigation",

            "Visible focus indicator"

        ];

    }

}