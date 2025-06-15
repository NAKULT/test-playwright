# test-playwright

This repository contains Playwright end-to-end tests for a web application.

## Getting Started

To get started with this repository, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NAKULT/test-playwright.git
    cd test-playwright
    ```

2.  **Install dependencies:**
    Navigate to the cloned repository directory and install the necessary dependencies using npm:
    ```bash
    npm install
    ```
    This will install Playwright and other required packages.

3.  **Install Playwright browsers:**
    After installing dependencies, install the Playwright browsers:
    ```bash
    npx playwright install
    ```

## Running Tests

To run the test cases, use the following command in the terminal:

```bash
npx playwright test
```

This command will execute all test files in the `tests` directory. 

## Project Structure

-   `tests/`: Contains the Playwright test files (`.spec.ts`).
-   `pages/`: Contains Page Object Model classes for interacting with web pages.
-   `data/`: Contains test data, such as `testdata.json`.
-   `playwright.config.ts`: Playwright configuration file.
-   `package.json`: Project dependencies and scripts.

## Note that one test case is currently failing because a job application submission is not succeeding. The Playwright report will indicate which specific job application failed in the reports.

## After test run we can check index.html inside playwright-report to get the test reports.