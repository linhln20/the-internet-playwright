import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ChallengingDomPage extends BasePage {
    readonly url = 'https://the-internet.herokuapp.com/challenging_dom';
    
    // Buttons change IDs constantly, so we locate them by CSS Class instead of ID
    readonly blueButton: Locator;
    readonly redButton: Locator;
    readonly greenButton: Locator;

    constructor(page: Page) {
        super(page);
        
        // Locate by class (ignoring random IDs)
        this.blueButton = page.locator('.button:not(.alert):not(.success)');
        this.redButton = page.locator('.button.alert');
        this.greenButton = page.locator('.button.success');
    }

    async gotoPage() {
        await this.goto(this.url);
    }

    /**
     * Get the text value of a specific cell in the table based on row and column
     * @param row Row index (0-indexed)
     * @param column Column index (0-indexed)
     */
    async getCellText(row: number, column: number): Promise<string> {
        const rowLocator = this.page.locator('table tbody tr').nth(row);
        const cellLocator = rowLocator.locator('td').nth(column);
        return (await cellLocator.innerText()).trim();
    }

    /**
     * Click on the "edit" button in a specific row
     * @param row Row index (0-indexed)
     */
    async clickEditInRow(row: number) {
        const rowLocator = this.page.locator('table tbody tr').nth(row);
        await rowLocator.locator('a[href="#edit"]').click();
    }

    /**
     * Click on the "delete" button in a specific row
     * @param row Row index (0-indexed)
     */
    async clickDeleteInRow(row: number) {
        const rowLocator = this.page.locator('table tbody tr').nth(row);
        await rowLocator.locator('a[href="#delete"]').click();
    }
}
