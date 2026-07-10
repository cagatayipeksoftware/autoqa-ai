export interface ExecutionReport {

    file: string;

    status: "passed" | "failed";

    duration: number;

    error?: string;

    stack?: string;

}