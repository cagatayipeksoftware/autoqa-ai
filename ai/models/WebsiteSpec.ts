import { TestIdea } from "./TestIdea";

export interface WebsiteSpec {

    pages: string[];

    navigation: string[];

    forms: string[];

    userFlows: string[];

    testIdeas: TestIdea[];

    risks: string[];

}