import { test, expect } from '@playwright/test';

test.describe('Broken Images', () => {
    test('Verify and count broken images', async ({ page }) => {
        // Navigate to the broken images page
        await page.goto('https://the-internet.herokuapp.com/broken_images');

        // 1. Get the list of all <img> elements on the page
        const images = await page.locator('img').all();
        
        let brokenImagesCount = 0;
        let validImagesCount = 0;

        // 2. Loop through each element and execute JS to check naturalWidth
        for (const [index, image] of images.entries()) {
            const naturalWidth = await image.evaluate((node: HTMLImageElement) => node.naturalWidth);
            const src = await image.getAttribute('src');

            // 3. Assertion: > 0 means normal, === 0 means broken
            if (naturalWidth > 0) {
                expect(naturalWidth).toBeGreaterThan(0);
                validImagesCount++;
            } else if (naturalWidth === 0) {
                expect(naturalWidth).toBe(0);
                brokenImagesCount++;
                console.log(`Broken image found at index ${index} with src: ${src}`);
            }
        }

        // 4. Log the total count of broken images
        console.log(`Total broken images: ${brokenImagesCount}`);
        console.log(`Total valid images: ${validImagesCount}`);
    });
});
