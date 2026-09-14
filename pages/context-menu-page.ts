import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ContextMenuPage extends BasePage {
    readonly hotSpotBox: Locator;

    constructor(page: Page) {
        super(page);
        this.hotSpotBox = page.locator('#hot-spot');
    }

    /**
     * Performs a right-click (context menu action) on the hot-spot area
     * and captures the resulting JavaScript alert message.
     * @returns A promise that resolves to the text of the alert dialog.
     */
    async rightClickHotSpotAndGetAlertText(): Promise<string> {
        // Establish the dialog listener and handle it asynchronously to prevent the click action from blocking (deadlocking)
        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            const alertMessage = dialog.message();
            await dialog.accept();
            return alertMessage;
        });
        
        // Trigger the context menu via a right mouse click
        await this.hotSpotBox.click({ button: 'right' });
        
        // Await the resolution of the dialog handling
        return await dialogPromise;
    }
}
