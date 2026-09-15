import { test, expect } from '@playwright/test';
import { DynamicControlsPage } from '../pages/dynamic-controls-page';

test.describe('Dynamic Controls Functionality', () => {
    test('Case 1: Check checkbox and remove it', async ({ page }) => {
        const dynamicControlsPage = new DynamicControlsPage(page);

        await test.step('Navigate to the Dynamic Controls page', async () => {
            await dynamicControlsPage.gotoDynamicControlsPage();
        });

        await test.step('Check the checkbox', async () => {
            await dynamicControlsPage.checkCheckbox();
            await expect(dynamicControlsPage.checkbox).toBeChecked();
        });

        await test.step('Click Remove button and wait for message "It\'s gone!"', async () => {
            await dynamicControlsPage.clickRemoveAddButton();
            await dynamicControlsPage.verifyMessage("It's gone!");
        });
    });

    test('Case 2: Click remove directly without checking the checkbox', async ({ page }) => {
        const dynamicControlsPage = new DynamicControlsPage(page);

        await test.step('Navigate to the Dynamic Controls page', async () => {
            await dynamicControlsPage.gotoDynamicControlsPage();
        });

        await test.step('Click Remove button and wait for message "It\'s gone!"', async () => {
            await dynamicControlsPage.clickRemoveAddButton();
            await dynamicControlsPage.verifyMessage("It's gone!");
        });
    });
});
