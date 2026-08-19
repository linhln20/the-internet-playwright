import { test as base } from '@playwright/test';
import { CheckboxesPage } from '../pages/checkbox-page';
import { ApiHelper } from './api-helper';

// Declare the types of your fixtures
type MyFixtures = {
    checkboxesPage: CheckboxesPage;
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
    
    apiHelper: async ({ request }, use) => {
        const apiHelper = new ApiHelper(request);
        await use(apiHelper);
    }
});

export { expect } from '@playwright/test';
