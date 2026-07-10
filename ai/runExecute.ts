import { GeneratedTestRunner } from "../services/GeneratedTestRunner";

async function main() {

    console.log("Running generated Playwright tests...");

    const runner = new GeneratedTestRunner();

    const result = await runner.run();

    console.log(result.stdout);

    if (result.stderr) {

        console.error(result.stderr);

    }

    console.log(`Exit Code: ${result.exitCode}`);

    console.log(`Success: ${result.success}`);

}

main().catch(error => {

    console.error(error);

    process.exit(1);

});