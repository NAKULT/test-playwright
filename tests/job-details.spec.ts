import { test, expect } from '@playwright/test';
import { JobListingPage } from '../pages/JobListingPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import * as fs from 'fs';
import * as path from 'path';

const testDataPath = path.join(__dirname, '../data/testdata.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

let jobListingPage: JobListingPage;
let jobDetailPage: JobDetailPage;

test.describe('Job Detail Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    jobListingPage = new JobListingPage(page);
    jobDetailPage = new JobDetailPage(page);
    await jobListingPage.goto();
  });

  test('Verify job detail pages load, display correct information, and handle apply button click', async ({ page }) => {
    let anySubmissionFailed = false;
    const failedJobTitles: string[] = [];

    const jobLinks = await jobListingPage.jobLinks.all();

    for (const jobLink of jobLinks) {
      const jobLinkText = await jobLink.textContent();

      await test.step(`Testing Job: ${jobLinkText}`, async () => {
        await jobLink.click();

        const jobTitleMatch = jobLinkText?.match(/(.*?)Location:/);
        const expectedJobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : jobLinkText ?? '';
        await expect(jobDetailPage.jobTitleHeading).toBeVisible();
        await expect(jobDetailPage.jobTitleHeading).toHaveText(expectedJobTitle);

        await expect(jobDetailPage.locationParagraph).toBeVisible();
        await expect(jobDetailPage.initialApplyButton).toBeVisible();

        await expect(jobDetailPage.detailedRoleDescriptionHeading).toBeVisible();
        await expect(jobDetailPage.desiredSkillsHeading).toBeVisible();
        await expect(jobDetailPage.opportunityHeading).toBeVisible();

        await expect(jobDetailPage.detailedRoleDescriptionList).toBeVisible();
        await expect(jobDetailPage.detailedRoleDescriptionList.locator('li').first()).toBeVisible();

        await expect(jobDetailPage.desiredSkillsList).toBeVisible();
        await expect(jobDetailPage.desiredSkillsList.locator('li').first()).toBeVisible();

        await expect(jobDetailPage.opportunityList).toBeVisible();
        await expect(jobDetailPage.opportunityList.locator('li').first()).toBeVisible();

        await jobDetailPage.initialApplyButton.click();

        await expect(jobDetailPage.submitButton).toBeVisible();

        await jobDetailPage.fillForm(testData.testUser.name, testData.testUser.email);
        await jobDetailPage.submitButton.click();
        await Promise.race([
          jobDetailPage.message.waitFor({ state: 'visible', timeout: 10000 }),
          jobDetailPage.errorMessage.waitFor({ state: 'visible', timeout: 10000 }),
        ]);

        const submissionStatus = await jobDetailPage.getSubmissionStatus();

        if (submissionStatus.success) {
          await test.step('Verify Success Message', async () => {
            await expect(jobDetailPage.message).toHaveText(testData.messages.success, { timeout: 10000 });
          });
          console.log(`Application submitted successfully for job: ${jobLinkText}`);
        } else if (submissionStatus.error) {
          await test.step('Verify Error Message', async () => {
            await expect(jobDetailPage.errorMessage).toBeVisible({ timeout: 10000 });
            // Optionally assert specific error message text if known:
            await expect(jobDetailPage.errorMessage).toHaveText(testData.messages.error, { timeout: 10000 });
          });
          console.warn(`Application submission failed for job: ${jobLinkText}. Error message: ${submissionStatus.errorMessage}`);
          anySubmissionFailed = true;
          failedJobTitles.push(jobLinkText ?? 'Unknown Job');
        } else {
          console.error(`Neither success nor error message was visible after submission for job: ${jobLinkText}`);
          await expect(true).toBe(false);
          anySubmissionFailed = true;
          failedJobTitles.push(jobLinkText ?? 'Unknown Job');
        }

        await jobListingPage.goto();
      });
    }

    expect(anySubmissionFailed, `One or more job application submissions failed: ${failedJobTitles.join(', ')}`).toBe(false);
  });

  test('Verify form validation error messages', async ({ page }) => {
    // Navigate to the job listing page and click on the first job link
    await jobListingPage.jobLinks.first().click();

    // Click the initial Apply Now button to reveal the form
    await jobDetailPage.initialApplyButton.click();

    await jobDetailPage.fillInvalidForm('A', '');
    await jobDetailPage.submitButton.click();
    await expect(jobDetailPage.nameErrorMessage).toBeVisible();
    await expect(jobDetailPage.nameErrorMessage).toHaveText(testData.messages.nameError);

    await expect(jobDetailPage.emailErrorMessage).toBeVisible();
    await expect(jobDetailPage.emailErrorMessage).toHaveText(testData.messages.emailRequiredError);

    await expect(jobDetailPage.resumeErrorMessage).toBeVisible();
    await expect(jobDetailPage.resumeErrorMessage).toHaveText(testData.messages.resumeRequiredError);
  });
});