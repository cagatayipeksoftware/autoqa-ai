<div align="center">

# 🤖 AutoQA AI

### Autonomous AI-Powered QA Automation Framework

Discover websites • Understand user journeys • Generate test scenarios • Create Playwright tests • Execute automatically

---

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-Latest-45ba4b?logo=playwright)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.5-blue?logo=google)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# 📖 Table of Contents

- Introduction
- Why AutoQA AI?
- Features
- Current Capabilities
- Architecture
- AI Pipeline
- Project Structure
- Installation
- Configuration
- Usage
- Commands
- Explorer System
- Discovery Engine
- Scenario Generation
- Feature Generation
- Playwright Generation
- Test Execution
- Output Files
- Token Optimization
- Developer Guide
- Roadmap
- Planned Features
- Contributing
- FAQ
- License

---

# 🚀 Introduction

AutoQA AI is an autonomous Quality Assurance automation framework that combines modern browser automation with Large Language Models.

Instead of manually writing test cases for every website, AutoQA AI is capable of:

- Exploring a website
- Understanding its structure
- Discovering user journeys
- Creating structured QA scenarios
- Generating Playwright test suites
- Executing generated tests automatically

The long-term vision of this project is to build an AI-powered QA Engineer capable of understanding, generating, executing and continuously improving automated test suites with minimal human intervention.

---

# ❓ Why AutoQA AI?

Traditional automation frameworks require engineers to manually write:

- Test scenarios
- Feature files
- Playwright scripts
- Locators
- Assertions

Every new project starts almost from scratch.

AutoQA AI changes this workflow.

Instead of writing tests manually, the framework first understands the application and then generates automated tests using AI.

The generated output can later be refined, executed and eventually self-healed.

---

# ✨ Features

## Current

- Website exploration
- Page metadata extraction
- Navigation discovery
- Form discovery
- Button discovery
- Image discovery
- Website Snapshot generation
- AI Website Discovery (Gemini)
- Website Specification generation
- Scenario generation
- AI Scenario enhancement
- Feature file generation
- Playwright test generation
- Automatic Playwright execution
- Structured JSON outputs

---

## Planned

- Self-Healing Tests
- Failure Analysis
- Locator Repair
- Retry Engine
- API Test Generation
- Visual Regression Testing
- Accessibility AI
- Performance Testing
- Mobile Testing
- Cross Browser Optimization
- Test Prioritization using AI
- Risk-based Test Generation

---

# 📌 Current Capabilities

The framework is currently able to perform the following workflow:

Website

↓

Explorer

↓

Website Snapshot

↓

Gemini Discovery

↓

Website Specification

↓

Scenario Generator

↓

Scenario Models

↓

Feature Generator

↓

Playwright Generator

↓

Generated Playwright Tests

↓

Playwright Execution

---

At the current stage, generated tests are executed automatically.

Self-healing capabilities are part of the roadmap and are not yet implemented.

---

# 🎯 Vision

The goal of AutoQA AI is not to replace QA Engineers.

The goal is to eliminate repetitive work and allow engineers to focus on exploratory testing, quality strategy and complex business validation while AI handles repetitive automation tasks.

Eventually AutoQA AI should be able to:

- Understand unknown applications
- Generate automation suites
- Execute tests
- Detect failures
- Diagnose problems
- Repair broken tests
- Re-run automatically
- Continuously improve the automation suite

This project is being developed incrementally toward that vision.
# 🏗️ Architecture

AutoQA AI follows a modular architecture where every stage of the QA generation pipeline is isolated into its own responsibility.

Each component performs exactly one task and passes structured data to the next stage.

This makes the framework highly maintainable, testable and extensible.

---

## High-Level Architecture

```text
                 Website
                    │
                    ▼
          Explorer Agents
                    │
                    ▼
          Website Snapshot
                    │
                    ▼
           Discovery Agent
                    │
                    ▼
             Gemini AI
                    │
                    ▼
            Website Specification
                    │
                    ▼
          Scenario Generator
                    │
                    ▼
           Scenario Models
                    │
                    ▼
           Feature Generator
                    │
                    ▼
           Feature Files
                    │
                    ▼
          Playwright Agent
                    │
                    ▼
        Playwright Test Files
                    │
                    ▼
       Generated Test Runner
                    │
                    ▼
          Execution Results
```

Each block has a single responsibility.

The output of one block becomes the input of the next block.

No component depends on implementation details of another component.

---

# 🧠 AI Pipeline

The framework currently consists of two independent AI workflows.

## 1. Website Discovery

The first workflow understands the application.

```text
Website

↓

Explorer

↓

Website Snapshot

↓

Gemini

↓

Website Specification
```

Explorer agents visit the application and collect structured information about the UI.

Instead of attempting to understand the application directly through prompts, the AI receives structured metadata extracted from the browser.

This significantly improves consistency and reduces hallucinations.

---

## 2. Playwright Generation

Once the application is understood, automation generation begins.

```text
Website Specification

↓

Scenario Generator

↓

Scenario Models

↓

Playwright Agent

↓

Gemini

↓

Playwright Test
```

The AI does not generate tests blindly.

Instead, tests are created from structured scenarios produced by the framework.

This separation allows future improvements without changing the overall architecture.

---

# 🧩 Core Components

## Explorer

Responsible for browser exploration.

Current explorers include:

- Home Explorer
- Product Explorer
- Cart Explorer

Each explorer visits one page and extracts structured metadata.

Collected information includes:

- Page title
- URL
- Headings
- Links
- Buttons
- Forms
- Images

Explorer agents never communicate directly with Gemini.

Their responsibility ends after producing a Website Snapshot.

---

## Website Snapshot

The Website Snapshot represents the explored application.

It is a lightweight JSON model describing the application's visible UI.

Example:

```json
{
  "pages": [
    {
      "name": "Home",
      "title": "STORE",
      "buttons": [
        "Log in",
        "Sign up"
      ]
    }
  ]
}
```

Snapshots are intentionally structured.

The AI consumes JSON instead of raw browser state.

---

## Discovery Agent

The Discovery Agent is responsible for transforming browser data into business knowledge.

Input:

- Website Snapshot

Output:

- Website Specification

The Discovery Agent delegates reasoning to Gemini while keeping orchestration inside the framework.

---

## Gemini Service

Gemini is currently used for three independent tasks.

### Website Discovery

Transforms snapshots into structured specifications.

---

### Scenario Enhancement

Improves generated QA scenarios.

---

### Playwright Generation

Produces executable Playwright TypeScript tests.

The framework is designed so additional AI providers can be added in the future without changing business logic.

Possible future providers include:

- OpenAI
- Claude
- DeepSeek
- Local LLMs

---

## Website Specification

Website Specification is the central knowledge model of the framework.

It contains:

- Pages
- Navigation
- Forms
- User Flows
- Risks
- Test Ideas

Every downstream component depends on this model.

Because the specification is structured JSON, it can be stored, versioned and regenerated independently.

---

## Scenario Generator

The Scenario Generator converts Website Specifications into executable QA scenarios.

Each scenario contains:

- Identifier
- Feature
- Page
- Title
- Priority
- Tags
- Steps

Scenarios remain framework-independent.

They do not contain Playwright code.

---

## Feature Generator

Converts scenarios into Gherkin feature files.

Example:

```gherkin
Feature: Login

Scenario: Successful Login

Given ...

When ...

Then ...
```

Generated feature files are stored separately from Playwright tests.

This allows BDD and Playwright workflows to evolve independently.

---

## Playwright Agent

The Playwright Agent is responsible for automation generation.

Input:

- Scenario

Output:

- Playwright TypeScript Test

Generation rules are controlled through prompt engineering rather than hardcoded templates.

This allows the framework to improve as prompting strategies evolve.

---

## Output Service

Every pipeline stage produces persistent artifacts.

Examples include:

- Website Snapshot
- Website Specification
- Scenario Models
- Feature Files
- Playwright Tests

The Output Service centralizes file creation to keep business logic independent from storage.

---

## Generated Test Runner

Generated tests are executed automatically after creation.

Execution results are captured and will become the input of future AI healing workflows.

Current responsibilities:

- Execute generated Playwright tests
- Collect stdout
- Collect stderr
- Return execution status

Future versions will also collect:

- Trace files
- Screenshots
- Videos
- HTML Reports

---

# 🎯 Design Principles

AutoQA AI follows several architectural principles.

## Single Responsibility

Each class has exactly one responsibility.

Examples:

- ExplorerAgent explores
- DiscoveryAgent discovers
- ScenarioGenerator generates scenarios
- FeatureGenerator generates features
- PlaywrightAgent generates Playwright code

---

## AI is an Engine, not the Framework

The framework owns the workflow.

Gemini performs reasoning only.

Replacing the LLM should not require architectural changes.

---

## Structured Data First

AI receives structured models whenever possible.

Examples:

- WebsiteSnapshot
- WebsiteSpecification
- Scenario

Instead of raw HTML.

This improves consistency while significantly reducing token usage.

---

## Modular Growth

New capabilities should be added as independent modules.

Examples include:

- API Testing
- Visual Testing
- Accessibility Testing
- Performance Testing
- Mobile Testing

The existing architecture is intentionally designed to accommodate these future extensions.
