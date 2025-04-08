import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkbox-page';

let checkboxesPage: CheckboxesPage;

test.beforeEach(async ({ page }) => {
    // Navigate to URL before each test
    await checkboxesPage.navigate();
    checkboxesPage = new CheckboxesPage(page);

});

test.describe('Checkboxes Page', () => {

    test('Check the first checkbox if not already checked', async () => {
        // If the first checkbox is already checked, uncheck it first
        if (await checkboxesPage.isFirstCheckboxChecked()) {
            await checkboxesPage.uncheckFirstCheckbox();
        }
        // Verify that the first checkbox is not checked
        expect(await checkboxesPage.isFirstCheckboxChecked()).toBeFalsy();

        // Check checkbox1
        await checkboxesPage.checkFirstCheckbox();

        // Verify that the first checkbox is checked 
        expect(await checkboxesPage.isFirstCheckboxChecked()).toBeTruthy();
    });

    test('Check the second checkbox if not already checked', async () => {
        // If the first checkbox is already checked, uncheck it first
        if (await checkboxesPage.isSecondCheckboxChecked()) {
            await checkboxesPage.uncheckSecondCheckbox();
        }
        // Verify that the first checkbox is not checked
        expect(await checkboxesPage.isSecondCheckboxChecked()).toBeFalsy();

        // Check checkbox1
        await checkboxesPage.checkSecondCheckbox();

        // Verify that the first checkbox is checked 
        expect(await checkboxesPage.isSecondCheckboxChecked()).toBeTruthy();
    });
});
