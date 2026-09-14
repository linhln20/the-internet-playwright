import { test, expect } from '../utils/fixtures';

const URL = 'https://the-internet.herokuapp.com/context_menu';

test.beforeEach(async ({ contextMenuPage }) => {
    // Navigate to the Context Menu page prior to test execution
    await contextMenuPage.goto(URL);
});

test.describe('Context Menu Validation', () => {

    test('Should display a JavaScript alert with the expected text when the hot-spot is right-clicked', async ({ contextMenuPage }) => {
        const expectedAlertText = 'You selected a context menu';
        
        // Perform the right-click action and simultaneously capture the alert dialog text
        const actualAlertText = await contextMenuPage.rightClickHotSpotAndGetAlertText();
        
        // Assert that the captured alert text accurately matches the expected requirement
        expect(actualAlertText).toBe(expectedAlertText);
    });

});
