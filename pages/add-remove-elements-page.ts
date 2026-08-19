import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AddRemoveElementsPage extends BasePage {
    readonly addElementBtn: Locator;
    readonly deleteBtns: Locator;

    constructor(page: Page) {
        super(page);
        // Nút "Add Element"
        this.addElementBtn = page.locator('button[onclick="addElement()"]');
        // Tập hợp tất cả các nút "Delete" đang có trên màn hình
        this.deleteBtns = page.locator('button[class="added-manually"]');
    }

    /**
     * Click vào nút Add Element
     */
    async clickAddElement() {
        await this.addElementBtn.click();
    }

    /**
     * Lấy tổng số lượng nút Delete đang hiển thị
     */
    async getDeleteButtonsCount(): Promise<number> {
        return await this.deleteBtns.count();
    }

    /**
     * Click vào nút Delete ở vị trí cụ thể (0-based)
     * Mặc định sẽ click vào nút đầu tiên nếu không truyền index
     */
    async clickDeleteElement(index: number = 0) {
        await this.deleteBtns.nth(index).click();
    }
}
