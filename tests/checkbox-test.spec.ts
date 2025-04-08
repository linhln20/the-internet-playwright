import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkbox-page';

let checkboxesPage: CheckboxesPage;
const URL = 'https://the-internet.herokuapp.com/checkboxes';
test.beforeEach(async ({ page }) => {
    // Navigate to URL before each test
    await page.goto(URL);
    checkboxesPage = new CheckboxesPage(page);
});

test.describe('Checkboxes Page', () => {

    test('Verify able to check the first checkbox', async () => {
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

    test('Verify able to check the second checkbox', async () => {
        // If the second checkbox is already checked, uncheck it first
        if (await checkboxesPage.isSecondCheckboxChecked()) {
            await checkboxesPage.uncheckSecondCheckbox();
        }
        // Verify that the second checkbox is not checked
        expect(await checkboxesPage.isSecondCheckboxChecked()).toBeFalsy();

        // Check checkbox2
        await checkboxesPage.checkSecondCheckbox();

        // Verify that the second checkbox is checked 
        expect(await checkboxesPage.isSecondCheckboxChecked()).toBeTruthy();
    });
});
