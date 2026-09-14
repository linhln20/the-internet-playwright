import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckboxesPage extends BasePage {
    readonly checkboxes: Locator;

    constructor(page: Page) {
        super(page);
        this.checkboxes = page.locator('form input[type="checkbox"]');
    }

    /**
     * Get a specific checkbox by index (0-based)
     */
    getCheckboxByIndex(index: number): Locator {
        return this.checkboxes.nth(index);
    }

    /**
     * Check if a specific checkbox is checked
     */
    async isCheckboxCheckedByIndex(index: number): Promise<boolean> {
        return await this.getCheckboxByIndex(index).isChecked();
    }

    /**
     * Check a specific checkbox
     */
    async checkCheckboxByIndex(index: number) {
        const checkbox = this.getCheckboxByIndex(index);
        if (!await checkbox.isChecked()) {
            await checkbox.check();
        }
    }

    /**
     * Uncheck a specific checkbox
     */
    async uncheckCheckboxByIndex(index: number) {
        const checkbox = this.getCheckboxByIndex(index);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
    }

    /**
     * Retrieves the total quantity of checkboxes present within the form.
     * @returns A promise that resolves to the total number of checkboxes.
     */
    async getTotalCheckboxesCount(): Promise<number> {
        return await this.checkboxes.count();
    }

    /**
     * Retrieves the total quantity of currently checked checkboxes.
     * @returns A promise that resolves to the number of checked checkboxes.
     */
    async getCheckedCheckboxesCount(): Promise<number> {
        return await this.page.locator('form input[type="checkbox"]:checked').count();
    }
}
