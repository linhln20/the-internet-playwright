import { test, expect } from '@playwright/test';
import { DynamicContentPage } from '../pages/dynamic-content-page';

test.describe('Dynamic Content Functionality', () => {
    test('should verify dynamic content changes after clicking hyperlink', async ({ page }) => {
        const dynamicContentPage = new DynamicContentPage(page);

        await test.step('Navigate to the Dynamic Content page', async () => {
            await dynamicContentPage.gotoDynamicContentPage();
        });

        let initialContent: string[];
        await test.step('Step 1: Get all content on the page after initial access', async () => {
            initialContent = await dynamicContentPage.getAllContentTexts();
            expect(initialContent.length).toBeGreaterThan(0);
        });

        let contentAfterFirstClick: string[];
        await test.step('Step 2 & 3: Click static hyperlink and confirm content changes', async () => {
            await dynamicContentPage.clickStaticHyperlink();
            contentAfterFirstClick = await dynamicContentPage.getAllContentTexts();
            
            // Verify the content changed compared to initial content
            expect(contentAfterFirstClick).not.toEqual(initialContent);
            // Specifically, for static content mode, the 3rd row should change, but let's assert the whole array is different
        });

        let contentAfterSecondClick: string[];
        await test.step('Step 4: Click hyperlink again and confirm content changes compared to Step 3', async () => {
            await dynamicContentPage.clickStaticHyperlink();
            contentAfterSecondClick = await dynamicContentPage.getAllContentTexts();
            
            // Verify the content changed compared to the first click's content
            expect(contentAfterSecondClick).not.toEqual(contentAfterFirstClick);
        });
    });
});
