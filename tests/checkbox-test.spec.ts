import { test, expect } from '../utils/fixtures';

const URL = 'https://the-internet.herokuapp.com/checkboxes';

test.beforeEach(async ({ checkboxesPage }) => {
    // We can use base page methods now
    await checkboxesPage.goto(URL);
});

test.describe('Checkboxes Page', () => {

    test('Verify able to check the first checkbox', async ({ checkboxesPage }) => {
        // If the first checkbox is already checked, uncheck it first
        if (await checkboxesPage.isCheckboxCheckedByIndex(0)) {
            await checkboxesPage.uncheckCheckboxByIndex(0);
        }
        // Verify that the first checkbox is not checked
        expect(await checkboxesPage.isCheckboxCheckedByIndex(0)).toBeFalsy();

        // Check checkbox1
        await checkboxesPage.checkCheckboxByIndex(0);

        // Verify that the first checkbox is checked 
        expect(await checkboxesPage.isCheckboxCheckedByIndex(0)).toBeTruthy();
    });

    test('Verify able to check the second checkbox', async ({ checkboxesPage }) => {
        // If the second checkbox is already checked, uncheck it first
        if (await checkboxesPage.isCheckboxCheckedByIndex(1)) {
            await checkboxesPage.uncheckCheckboxByIndex(1);
        }
        // Verify that the second checkbox is not checked
        expect(await checkboxesPage.isCheckboxCheckedByIndex(1)).toBeFalsy();

        // Check checkbox2
        await checkboxesPage.checkCheckboxByIndex(1);

        // Verify that the second checkbox is checked 
        expect(await checkboxesPage.isCheckboxCheckedByIndex(1)).toBeTruthy();
    });
});
