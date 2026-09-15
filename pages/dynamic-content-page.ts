import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class DynamicContentPage extends BasePage {
    readonly contentBlocks: Locator;
    readonly staticHyperlink: Locator;

    constructor(page: Page) {
        super(page);
        // The page has two id='content' elements. 
        // The text blocks are inside the one with class 'large-centered'.
        this.contentBlocks = page.locator('div.large-10.columns:not(.large-centered)');
        this.staticHyperlink = page.locator('a[href="/dynamic_content?with_content=static"]');
    }

    /**
     * Navigate to the Dynamic Content page with static content parameter
     */
    async gotoDynamicContentPage() {
        await this.goto('https://the-internet.herokuapp.com/dynamic_content?with_content=static');
    }

    /**
     * Get all text contents from the 3 content blocks on the page
     * @returns Array of strings containing the text of each block
     */
    async getAllContentTexts(): Promise<string[]> {
        return await this.contentBlocks.allTextContents();
    }

    /**
     * Click the static content hyperlink
     */
    async clickStaticHyperlink() {
        await this.staticHyperlink.click();
        // Wait for network/DOM to settle after navigation
        await this.page.waitForLoadState('networkidle');
    }
}
