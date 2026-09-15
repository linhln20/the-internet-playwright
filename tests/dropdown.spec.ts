import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown-page';

test.describe('Dropdown Functionality', () => {
    test('should be able to select Option 1', async ({ page }) => {
        const dropdownPage = new DropdownPage(page);

        await test.step('Navigate to the Dropdown page', async () => {
            await dropdownPage.gotoDropdownPage();
        });

        await test.step('Select Option 1 and verify', async () => {
            await dropdownPage.selectOption1();
            await dropdownPage.verifyOption1IsSelected();
        });
    });

    test('should be able to select Option 2', async ({ page }) => {
        const dropdownPage = new DropdownPage(page);

        await test.step('Navigate to the Dropdown page', async () => {
            await dropdownPage.gotoDropdownPage();
        });

        await test.step('Select Option 2 and verify', async () => {
            await dropdownPage.selectOption2();
            await dropdownPage.verifyOption2IsSelected();
        });
    });
});
