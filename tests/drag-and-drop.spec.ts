import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../pages/drag-and-drop-page';

test.describe('Drag and Drop Functionality', () => {
    test('should drag column A to column B successfully', async ({ page }) => {
        const dragAndDropPage = new DragAndDropPage(page);

        await test.step('Navigate to the Drag and Drop page', async () => {
            await dragAndDropPage.gotoDragAndDropPage();
        });

        await test.step('Verify initial state: Column A contains Header A and Column B contains Header B', async () => {
            await expect(dragAndDropPage.headerA).toHaveText('A');
            await expect(dragAndDropPage.headerB).toHaveText('B');
        });

        await test.step('Drag Column A to Column B', async () => {
            await dragAndDropPage.dragColumnAToColumnB();
        });

        await test.step('Verify swapped state: Column A contains Header B and Column B contains Header A', async () => {
            await dragAndDropPage.verifyHeaderBIsInColumnA();
            await dragAndDropPage.verifyHeaderAIsInColumnB();
        });
    });
});
