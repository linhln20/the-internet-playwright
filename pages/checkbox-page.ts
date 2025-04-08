import { Locator, Page } from '@playwright/test';

export class CheckboxesPage {
    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.locator('form input[type="checkbox"]').nth(0);
        this.checkbox2 = page.locator('form input[type="checkbox"]').nth(1);
    }

    // First checkbox methods
    async isFirstCheckboxChecked() {
        return await this.checkbox1.isChecked();
    }

    async checkFirstCheckbox() {
        if (!await this.checkbox1.isChecked()) {
            await this.checkbox1.check();
        }
    }

    async uncheckFirstCheckbox() {
        if (await this.checkbox1.isChecked()) {
            await this.checkbox1.uncheck();
        }
    }

    // Second checkbox methods
    async isSecondCheckboxChecked() {
        return await this.checkbox2.isChecked();
    }

    async checkSecondCheckbox() {
        if (!await this.checkbox2.isChecked()) {
            await this.checkbox2.check();
        }
    }

    async uncheckSecondCheckbox() {
        if (await this.checkbox2.isChecked()) {
            await this.checkbox2.uncheck();
        }
    }
}
