import { test, expect } from '../utils/fixtures';

const URL = 'https://the-internet.herokuapp.com/add_remove_elements/';

test.describe('Add/Remove Elements Page', () => {

    test('Verify able to add and remove an element', async ({ addRemoveElementsPage }) => {
        // Go to URL
        await addRemoveElementsPage.goto(URL);

        // 1. Click add element
        await addRemoveElementsPage.clickAddElement();

        // 2. Count how many Delete buttons exist
        const initialCount = await addRemoveElementsPage.getDeleteButtonsCount();
        expect(initialCount).toBeGreaterThan(0); // Ensure at least 1 exists

        // 3. Click Delete to remove element
        // Removing the first delete button (index 0)
        await addRemoveElementsPage.clickDeleteElement(0);

        // 4. Count again to make sure it decreased by 1
        const finalCount = await addRemoveElementsPage.getDeleteButtonsCount();
        expect(finalCount).toBe(initialCount - 1);
    });

    test('Verify able to add multiple elements and remove them all', async ({ addRemoveElementsPage }) => {
        await addRemoveElementsPage.goto(URL);

        // Click Add Element 3 times
        await addRemoveElementsPage.clickAddElement();
        await addRemoveElementsPage.clickAddElement();
        await addRemoveElementsPage.clickAddElement();

        // Verify count is 3
        expect(await addRemoveElementsPage.getDeleteButtonsCount()).toBe(3);

        // Remove all elements (click first button 3 times)
        await addRemoveElementsPage.clickDeleteElement(0);
        await addRemoveElementsPage.clickDeleteElement(0);
        await addRemoveElementsPage.clickDeleteElement(0);

        // Verify count is 0
        expect(await addRemoveElementsPage.getDeleteButtonsCount()).toBe(0);
    });
});
