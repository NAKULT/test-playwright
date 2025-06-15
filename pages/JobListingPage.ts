import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class JobListingPage extends BasePage {
  readonly browseJobsHeading: Locator;
  readonly technologyHeading: Locator;
  readonly jobList: Locator;
  readonly jobLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.browseJobsHeading = page.getByRole('heading', { name: 'Browse Jobs' });
    this.technologyHeading = page.getByRole('heading', { name: 'Technology' });
    this.jobList = page.getByRole('list');
    this.jobLinks = page.locator('ul li a');
  }

  async goto() {
    await super.goto('http://localhost:4200/jobs');
  }

  async getJobIds(): Promise<string[]> {
    const links = await this.jobLinks.all();
    const jobIds: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/job/')) {
        jobIds.push(href.replace('/job/', ''));
      }
    }
    return jobIds;
  }
}