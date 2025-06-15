import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class JobDetailPage extends BasePage {
  readonly jobTitleHeading: Locator;
  readonly locationParagraph: Locator;
  readonly submitButton: Locator;
  readonly initialApplyButton: Locator;
  readonly detailedRoleDescriptionHeading: Locator;
  readonly desiredSkillsHeading: Locator;
  readonly opportunityHeading: Locator;
  readonly detailedRoleDescriptionList: Locator;
  readonly desiredSkillsList: Locator;
  readonly opportunityList: Locator;
  readonly message: Locator;
  readonly errorMessage: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly nameErrorMessage: Locator;
  readonly emailErrorMessage: Locator;
  readonly resumeErrorMessage: Locator;


  constructor(page: Page) {
    super(page);
    this.jobTitleHeading = page.getByRole('heading', { level: 1 });
    this.locationParagraph = page.locator('p');
    this.initialApplyButton = page.getByRole('button', { name: 'APPLY NOW', exact: true });
    this.submitButton = page.locator('button[type="submit"]', { hasText: 'APPLY NOW' });
    this.detailedRoleDescriptionHeading = page.getByRole('heading', { name: 'DETAILED ROLE DESCRIPTION:' });
    this.desiredSkillsHeading = page.getByRole('heading', { name: 'DESIRED SKILLS:' });
    this.opportunityHeading = page.getByRole('heading', { name: 'WHY YOU DO NOT WANT TO MISS THIS CAREER OPPORTUNITY?' });
    this.detailedRoleDescriptionList = this.detailedRoleDescriptionHeading.locator('+ ul');
    this.desiredSkillsList = this.desiredSkillsHeading.locator('+ ul');
    this.opportunityList = this.opportunityHeading.locator('+ ul');
    this.message = this.page.locator('.success');
    this.errorMessage = this.page.locator('.error');
    this.nameInput = page.locator('//input[@name="name"]');
    this.emailInput = page.locator('//input[@name="email"]');
    this.nameErrorMessage = page.locator('.error-msz:has-text("Name must be at least 2 characters long.")');
    this.emailErrorMessage = page.locator('.error-msz:has-text("Email is required.")');
    this.resumeErrorMessage = page.locator('.error-msz:has-text("Resume is required.")');
  }

  async goto(jobId: string) {
    await super.goto(`http://localhost:4200/job/${jobId}`);
  }

  async fillForm(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.page.locator('input[type="file"]').setInputFiles('data/resume.pdf');
  }
  async fillInvalidForm(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }
  async getSubmissionStatus(): Promise<{ success: boolean; error: boolean; errorMessage?: string }> {
    const isSuccessMessageVisible = await this.message.isVisible({ timeout: 5000 });
    const isErrorMessageVisible = await this.errorMessage.isVisible({ timeout: 5000 });

    if (isSuccessMessageVisible) {
      return { success: true, error: false };
    } else if (isErrorMessageVisible) {
      const errorMessageText = await this.errorMessage.textContent();
      return { success: false, error: true, errorMessage: errorMessageText ?? undefined };
    } else {
      return { success: false, error: false };
    }
  }
}