import { Scenario } from "../models/Scenario";

export class GherkinTemplateEngine {

    build(scenario: Scenario): string[] {

        const title = scenario.title.toLowerCase();

        // LOGIN
        if (title.includes("login")) {

            if (title.includes("invalid") || title.includes("fails")) {

                return [
                  
                    "When user logs in with invalid credentials",
                    "Then an error message should be displayed"
                ];

            }

            return [
              
                "When user logs in with valid credentials",
                "Then user should be logged in successfully"
            ];

        }

        // SIGNUP
        if (title.includes("registration") || title.includes("sign up")) {

            return [
                
                "When user registers with valid information",
                "Then account should be created successfully"
            ];

        }

        // CART
        if (title.includes("cart")) {

            return [
               
                "When user adds a product to the cart",
                "Then cart should contain the product"
            ];

        }

        // PRODUCT
        if (title.includes("product")) {

            return [
               
                "When user opens a product",
                "Then product details should be displayed"
            ];

        }

        // DEFAULT
        return [

            "When user performs the action",
            "Then expected result should be displayed"
        ];

    }

}