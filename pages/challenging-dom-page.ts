import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export interface ButtonTextState {
    blueButtonText: string;
    redButtonText: string;
    greenButtonText: string;
}

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
     * Retrieves the current text values of the three colored buttons.
     * Uses Promise.all to fetch texts concurrently for execution optimization.
     * 
     * @returns A promise that resolves to the current ButtonTextState.
     */
    async getCurrentButtonTexts(): Promise<ButtonTextState> {
        const [blueText, redText, greenText] = await Promise.all([
            this.blueButton.innerText(),
            this.redButton.innerText(),
            this.greenButton.innerText()
        ]);

        return {
            blueButtonText: blueText.trim(),
            redButtonText: redText.trim(),
            greenButtonText: greenText.trim()
        };
    }

    /**
     * Executes a series of clicks and records the dynamic texts of the buttons after each click.
     * 
     * @param clickCount The total number of iterations to perform (defaults to 3).
     * @param triggerButton The specific locator used to trigger the DOM change (defaults to the blue button).
     * @returns A promise resolving to an array of ButtonTextState recorded at each iteration.
     */
    async getButtonTextsAcrossClicks(
        clickCount: number = 3,
        triggerButton: Locator = this.blueButton
    ): Promise<ButtonTextState[]> {
        const textStatesHistory: ButtonTextState[] = [];

        for (let iteration = 0; iteration < clickCount; iteration++) {
            // Trigger the DOM update
            await triggerButton.click();
            
            // Ensure elements are fully visible and stabilized before extraction
            await Promise.all([
                this.blueButton.waitFor({ state: 'visible' }),
                this.redButton.waitFor({ state: 'visible' }),
                this.greenButton.waitFor({ state: 'visible' })
            ]);

            const currentTexts = await this.getCurrentButtonTexts();
            textStatesHistory.push(currentTexts);
        }

        return textStatesHistory;
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
