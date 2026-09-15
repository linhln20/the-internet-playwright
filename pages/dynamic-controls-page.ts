import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DynamicControlsPage extends BasePage {
    readonly checkbox: Locator;
    readonly removeAddButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        super(page);
        this.checkbox = page.locator('#checkbox input[type="checkbox"]');
        this.removeAddButton = page.locator('#checkbox-example button');
        this.message = page.locator('#checkbox-example #message');
    }

    /**
     * Navigate to the Dynamic Controls page
     */
    async gotoDynamicControlsPage() {
        await this.goto('https://the-internet.herokuapp.com/dynamic_controls');
    }

    /**
     * Check the checkbox
     */
    async checkCheckbox() {
        await this.checkbox.check();
    }

    /**
     * Click the Remove/Add button
     */
    async clickRemoveAddButton() {
        await this.removeAddButton.click();
    }

    /**
     * Wait for the message to appear and verify its text
     */
    async verifyMessage(expectedText: string) {
        await this.waitForVisible(this.message);
        await expect(this.message).toHaveText(expectedText);
    }
}
