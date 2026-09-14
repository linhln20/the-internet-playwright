import { test, expect } from '../utils/fixtures';

const URL = 'https://the-internet.herokuapp.com/checkboxes';

test.beforeEach(async ({ checkboxesPage }) => {
    // Navigate to the target URL before each test execution
    await checkboxesPage.goto(URL);
});

test.describe('Checkboxes Page Operations and Validations', () => {

    test('Should successfully count the total number of checkboxes present', async ({ checkboxesPage }) => {
        const expectedMinimumCheckboxes = 0;
        const totalCheckboxes = await checkboxesPage.getTotalCheckboxesCount();
        
        // Assert that the total number of checkboxes is greater than 0
        expect(totalCheckboxes).toBeGreaterThan(expectedMinimumCheckboxes);
    });

    test('Should dynamically update the checked count upon checking a checkbox', async ({ checkboxesPage }) => {
        const targetCheckboxIndex = 0;

        // Ensure the target checkbox is unchecked to establish a reliable baseline state
        if (await checkboxesPage.isCheckboxCheckedByIndex(targetCheckboxIndex)) {
            await checkboxesPage.uncheckCheckboxByIndex(targetCheckboxIndex);
        }

        const initialCheckedCount = await checkboxesPage.getCheckedCheckboxesCount();
        
        // Perform the check action
        await checkboxesPage.checkCheckboxByIndex(targetCheckboxIndex);
        
        const subsequentCheckedCount = await checkboxesPage.getCheckedCheckboxesCount();
        
        // Validate that the checked count has incremented exactly by 1
        expect(subsequentCheckedCount).toBe(initialCheckedCount + 1);
    });

    test('Should accurately reflect a decrement in checked count upon unchecking', async ({ checkboxesPage }) => {
        const targetCheckboxIndex = 1;

        // Ensure the target checkbox is checked to establish a reliable baseline state
        // (Note: The second checkbox is checked by default on this specific page)
        if (!await checkboxesPage.isCheckboxCheckedByIndex(targetCheckboxIndex)) {
            await checkboxesPage.checkCheckboxByIndex(targetCheckboxIndex);
        }

        const initialCheckedCount = await checkboxesPage.getCheckedCheckboxesCount();
        
        // Perform the uncheck action
        await checkboxesPage.uncheckCheckboxByIndex(targetCheckboxIndex);
        
        const subsequentCheckedCount = await checkboxesPage.getCheckedCheckboxesCount();
        
        // Validate that the checked count has decremented exactly by 1, simulating the "old checked count - 1 -> pass" logic
        expect(subsequentCheckedCount).toBe(initialCheckedCount - 1);
    });
});
