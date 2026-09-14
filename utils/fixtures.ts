import { test as base } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkbox-page';
import { AddRemoveElementsPage } from '../pages/add-remove-elements-page';
import { ContextMenuPage } from '../pages/context-menu-page';
import { ApiHelper } from './api-helper';

// Declare the types of your fixtures
type MyFixtures = {
    checkboxesPage: CheckboxesPage;
    addRemoveElementsPage: AddRemoveElementsPage;
    contextMenuPage: ContextMenuPage;
    apiHelper: ApiHelper;
};

// Extend basic test by providing a "checkboxesPage" and "apiHelper" fixture.
export const test = base.extend<MyFixtures>({
    checkboxesPage: async ({ page }, use) => {
        // Set up the fixture.
        const checkboxesPage = new CheckboxesPage(page);
        // Use the fixture value in the test.
        await use(checkboxesPage);
    },

    addRemoveElementsPage: async ({ page }, use) => {
        const addRemoveElementsPage = new AddRemoveElementsPage(page);
        await use(addRemoveElementsPage);
    },
    
    contextMenuPage: async ({ page }, use) => {
        const contextMenuPage = new ContextMenuPage(page);
        await use(contextMenuPage);
    },

    apiHelper: async ({ request }, use) => {
        const apiHelper = new ApiHelper(request);
        await use(apiHelper);
    }
});

export { expect } from '@playwright/test';

