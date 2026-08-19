import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     */
    async goto(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for a locator to be visible
     */
    async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }
}
