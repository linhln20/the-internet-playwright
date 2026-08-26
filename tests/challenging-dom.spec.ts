import { test, expect } from '@playwright/test';
import { ChallengingDomPage } from '../pages/challenging-dom-page';

test.describe('Challenging DOM Test', () => {
    let challengingDomPage: ChallengingDomPage;

    test.beforeEach(async ({ page }) => {
        challengingDomPage = new ChallengingDomPage(page);
        await challengingDomPage.gotoPage();
    });

    test('should click all buttons successfully', async ({ page }) => {
        // Every time a button is clicked, the page might reload or canvas content might change
        // Here we test if we can locate and click the buttons without relying on IDs
        await challengingDomPage.blueButton.click();
        await challengingDomPage.redButton.click();
        await challengingDomPage.greenButton.click();

        // Verify that the buttons can still be located after clicks
        await expect(challengingDomPage.blueButton).toBeVisible();
        await expect(challengingDomPage.redButton).toBeVisible();
        await expect(challengingDomPage.greenButton).toBeVisible();
    });

    test('should log button texts across 3 sequential clicks', async () => {
        // Execute the click cycle 3 times using the newly implemented utility method
        const clickIterations = 3;
        const textsHistory = await challengingDomPage.getButtonTextsAcrossClicks(clickIterations);

        // Log the text values for each iteration in a highly readable and structured format
        console.log(`\n--- Button Text States Across ${clickIterations} Clicks ---`);
        textsHistory.forEach((textState, index) => {
            console.log(`Click Iteration ${index + 1}`);
            console.log(`Blue Button  : ${textState.blueButtonText}`);
            console.log(`Red Button   : ${textState.redButtonText}`);
            console.log(`Green Button : ${textState.greenButtonText}`);
            console.log('--------------------------------------');
        });

        // Ensure the operation successfully recorded states for all 3 iterations
        expect(textsHistory.length).toBe(clickIterations);
    });


    test('should get data from specific table cell', async () => {
        // Get data at row 0 (first row), column 0 (first column)
        const cellText = await challengingDomPage.getCellText(0, 0);

        // Based on the page's sample data, it should start with 'Iuvaret'
        expect(cellText).toContain('Iuvaret');
    });

    test('should click edit and delete in specific row', async ({ page }) => {
        // The URL hash changes when clicking (this page uses #edit, #delete)

        // Click Edit on row index 2 (3rd row)
        await challengingDomPage.clickEditInRow(2);
        expect(page.url()).toContain('#edit');

        // Click Delete on row index 5 (6th row)
        await challengingDomPage.clickDeleteInRow(5);
        expect(page.url()).toContain('#delete');
    });
});
