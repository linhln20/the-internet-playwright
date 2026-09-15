import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DropdownPage extends BasePage {
    readonly dropdown: Locator;
    readonly option1: Locator;
    readonly option2: Locator;

    constructor(page: Page) {
        super(page);
        this.dropdown = page.locator('#dropdown');
        this.option1 = this.dropdown.locator('option[value="1"]');
        this.option2 = this.dropdown.locator('option[value="2"]');
    }

    /**
     * Navigate to the Dropdown page
     */
    async gotoDropdownPage() {
        await this.goto('https://the-internet.herokuapp.com/dropdown');
    }

    /**
     * Select Option 1
     */
    async selectOption1() {
        await this.dropdown.selectOption('1');
    }

    /**
     * Select Option 2
     */
    async selectOption2() {
        await this.dropdown.selectOption('2');
    }

    /**
     * Verify Option 1 is selected
     */
    async verifyOption1IsSelected() {
        await expect(this.dropdown).toHaveValue('1');
        await expect(this.option1).toHaveAttribute('selected', 'selected');
    }

    /**
     * Verify Option 2 is selected
     */
    async verifyOption2IsSelected() {
        await expect(this.dropdown).toHaveValue('2');
        await expect(this.option2).toHaveAttribute('selected', 'selected');
    }
}
