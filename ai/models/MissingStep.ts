export interface MissingStep {

    keyword: "Given" | "When" | "Then";

    text: string;

    feature: string;

}