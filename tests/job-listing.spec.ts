import { test, expect } from '@playwright/test';
import { JobListingPage } from '../pages/JobListingPage';

let jobListingPage: JobListingPage;

test.beforeEach(async ({ page }) => {
  jobListingPage = new JobListingPage(page);
  await jobListingPage.goto();
});

test('Job Listing Page Load and Content Verification', async ({ page }) => {
  await expect(page).toHaveTitle('GalytixTestExercise');

  await expect(jobListingPage.browseJobsHeading).toBeVisible();
  await expect(jobListingPage.technologyHeading).toBeVisible();

  await expect(jobListingPage.jobList).toBeVisible();

  await expect(jobListingPage.jobLinks.first()).toBeVisible();
});

test('Navigate from Job Listing to Job Detail Page', async ({ page }) => {
  const jobIds = await jobListingPage.getJobIds();

  if (jobIds.length > 0) {
    await jobListingPage.jobLinks.first().click();

    await expect(page).toHaveURL(`http://localhost:4200/job/${jobIds[0]}`);
  } else {
    console.log('No job listings found to test navigation.');
  }
});