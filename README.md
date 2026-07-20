# AI-First Autonomous E2E QA Test Engine

An advanced, AI-driven Quality Engineering framework developed with **Playwright (JavaScript/Node.js)** and the **Google Gemini API** (`@google/genai`). This engine shifts from traditional, hardcoded E2E automated test scripts to autonomous QA workflows capable of intelligent test-data generation and real-time self-healing runtime failure analysis.

Target Application under test: [TodoMVC React Architecture](https://todomvc.com/examples/react/dist/)

---

## 🚀 Core Features

*   **Intelligent Input Generation (AI Agent Data Matrix):** Leverages a generative LLM runner (`gemini-2.5-flash`) before execution to dynamically compile volatile, unstructured, and destructive edge-case strings (e.g., extreme text volume buffers, multi-locale symbols, script injection strings) to strain UI thresholds.
*   **State Mutation & E2E Validation:** Uses high-performance Playwright selectors and assertions to fully validate DOM transformations, list interactions, lifecycle transitions, and data persistent views across Chromium, Firefox, and WebKit browsers.
*   **Autonomous Diagnostic Engine:** Implements a fallback intercept loop using automated error trapping. If a runtime UI element locator fails or times out, the script extracts the localized DOM structural snippet (`page.content()`) and transmits it alongside the stack trace back to the AI engine for plain-English debugging analytics.
*   **CI/CD & Advanced Observability:** Integrated with automated trace viewing configurations, global HTML reporting protocols, step-by-step latency tracking (`slowMo`), and programmatic error logging hooks.

---

## 📂 Project Architecture

```text
ai-first-sdet-project/
├── .github/workflows/    # CI/CD pipeline automation
├── e2e/
│   └── todo-ai.spec.js   # Main orchestrator & UI verification suites
├── utils/
│   └── aiHelper.js       # Core Gemini API wrapper for generation & diagnostics
├── .env                  # Environment secrets configuration (Excluded from Git)
├── .gitignore            # Security filters safeguarding keys & artifacts
└── playwright.config.js  # Global parallel worker execution profiles
