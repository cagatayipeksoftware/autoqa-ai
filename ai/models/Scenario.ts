export interface Scenario {

    id: string;

    feature: string;

    title: string;

    page: string;

    priority: "High" | "Medium" | "Low";

    tags: string[];

    steps: string[];

}