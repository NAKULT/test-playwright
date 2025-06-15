
# Test Plan for Galytix Job Board Website

## 1. Introduction
This document outlines the test plan for the Galytix Job Board website, accessible at `http://localhost:4200/jobs`. The goal here is to validate that the core job listing and detail view functionalities are working smoothly and as expected.

## 2. Scope

**In Scope:**
- Job Listing Page (`/jobs`)
- Individual Job Detail Pages (`/job/:id`)

**Out of Scope:**
- Backend data persistence
- Performance/load testing

## 3. Test Approach
We'll be using automated UI testing with Playwright. All test cases will be written in TypeScript, and run locally against the Angular dev server.

## 4. Test Environment
- Application hosted locally at `http://localhost:4200`
- Browsers: Chromium, Firefox, and WebKit (via Playwright)
- Test runner: Node.js + Playwright

## 5. Test Cases

### 5.1 Job Listing Page Tests (`/jobs`)
- **Page Load**: Make sure `/jobs` loads without any console errors.
- **Page Title**: Verify it displays "GalytixTestExercise" as the title.
- **Headings Present**: Confirm headings like "Browse Jobs" and "Technology" exist.
- **Job List**: Check that jobs show up in a list format.
- **Job Entry**: Each job card should have a title, location, and date posted.
- **Navigation**: Clicking a job should go to its detail page.

### 5.2 Job Detail Page Tests (`/job/:id`)
- **Page Load**: Should open when a job is clicked or accessed directly.
- **Job Info**: Title and location should be visible and accurate.
- **Apply Button**: "APPLY NOW" button should be there and styled.
- **Section Headers**: Check for "DETAILED ROLE DESCRIPTION:", "DESIRED SKILLS:", and "WHY YOU DO NOT WANT TO MISS THIS CAREER OPPORTUNITY?".
- **Content Display**: Make sure descriptions and skill lists are not empty.
- **Back Navigation**: There should be a working way to return to the job list.

## 6. Deliverables
- TypeScript Playwright test scripts (`*.spec.ts`)
- Test execution reports (HTML or CLI summary)

## 7. Schedule
Timeline is currently defined 3 hours from the time the app was delivered.

## 8. Roles and Responsibilities

As this is an individual test project for evaluation purposes, all roles and responsibilities are handled by a me. These include:

- Setting up and configuring the test environment.
- Designing test cases based on the UI and functional flow.
- Writing and executing automated test scripts using Playwright.
- Identifying, documenting, and explaining any issues or gaps found.
- Preparing and submitting the test plan and related documentation as part of the deliverables.

This test plan is being managed by the developer/QA responsible for the Angular job board project. No external stakeholders are assigned at this time.

## 9. Tools
- Playwright
- Node.js
- npm or yarn
- VS Code or any IDE

## 10. Entry and Exit Criteria

**Entry Criteria:**
- The application builds successfully and runs at `localhost:4200`
- Job data is either mocked or available from an API
- All basic navigation is functional (no routing errors)

**Exit Criteria:**
- All planned test cases are executed at least once
- Critical bugs (e.g., navigation failures, blank data) are resolved
- No blocker or high-priority issues remain
- Test report is generated and archived

---
