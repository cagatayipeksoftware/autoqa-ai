import { Scenario } from "./Scenario";
import { WebsiteSpec } from "./WebsiteSpec";
import { WebsiteSnapshot } from "./WebsiteSnapshot";

export interface PlaywrightContext {

    scenario: Scenario;

    specification: WebsiteSpec;

    snapshot: WebsiteSnapshot;

}