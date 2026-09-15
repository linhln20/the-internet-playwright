import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DragAndDropPage extends BasePage {
    readonly columnA: Locator;
    readonly columnB: Locator;
    readonly headerA: Locator;
    readonly headerB: Locator;

    constructor(page: Page) {
        super(page);
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
        this.headerA = this.columnA.locator('header');
        this.headerB = this.columnB.locator('header');
    }

    /**
     * Navigate to the Drag and Drop page
     */
    async gotoDragAndDropPage() {
        await this.goto('https://the-internet.herokuapp.com/drag_and_drop');
    }

    /**
     * Drag column A and drop it to column B
     */
    async dragColumnAToColumnB() {
        const source = '#column-a';
        const target = '#column-b';

        await this.page.evaluate(({ source, target }) => {
            const dataTransfer = new DataTransfer();
            
            const sourceElement = document.querySelector(source);
            const targetElement = document.querySelector(target);
            
            if (sourceElement && targetElement) {
                sourceElement.dispatchEvent(new DragEvent('dragstart', { dataTransfer, bubbles: true }));
                targetElement.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true }));
                sourceElement.dispatchEvent(new DragEvent('dragend', { dataTransfer, bubbles: true }));
            }
        }, { source, target });
    }

    /**
     * Verify that header A is inside column B
     */
    async verifyHeaderAIsInColumnB() {
        await expect(this.headerB).toHaveText('A');
    }

    /**
     * Verify that header B is inside column A
     */
    async verifyHeaderBIsInColumnA() {
        await expect(this.headerA).toHaveText('B');
    }
}
