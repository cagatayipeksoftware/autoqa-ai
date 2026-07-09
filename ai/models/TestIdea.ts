export type Priority = "High" | "Medium" | "Low";

export type TestType =
    | "Smoke"
    | "Regression"
    | "Positive"
    | "Negative"
    | "Accessibility";

export interface TestIdea {
    id: string;
    title: string;
    page: string;
    priority: Priority;
    type: TestType;
    reason: string;
}