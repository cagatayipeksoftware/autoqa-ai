export interface Scenario {

    id: string;

    feature: string;

    title: string;

    page: string;

    priority: "High" | "Medium" | "Low";

    tags: string[];

    steps: string[];

    type: ScenarioType;

    businessValue: BusinessValue;

    preconditions: string[];

    expectedResults: string[];

    edgeCases: string[];

    accessibilityChecks: string[];

}

export type ScenarioType =
    | "Smoke"
    | "Positive"
    | "Negative"
    | "Regression"
    | "Accessibility";

export type BusinessValue =
    | "Critical"
    | "High"
    | "Medium"
    | "Low";