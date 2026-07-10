import { spawn } from "child_process";

import { ExecutionResult } from "../ai/models/ExecutionResult";

export class GeneratedTestRunner {

    async run(): Promise<ExecutionResult> {

        return new Promise((resolve) => {



            const process = spawn(

                "playwright",

                [
                    "test",
                    "tests/generated"
                ],

                {
                    shell: false
                }

            );

            let stdout = "";

            let stderr = "";

            process.stdout.on("data", data => {

                stdout += data.toString();

            });

            process.stderr.on("data", data => {

                stderr += data.toString();

            });

            process.on("close", code => {

                resolve({

                    success: code === 0,

                    exitCode: code ?? -1,

                    stdout,

                    stderr

                });

            });

        });

    }

}