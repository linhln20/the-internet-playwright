import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    readonly page: Page;
    readonly checkBox: Locator;


    constructor(page: Page) {
        this.page = page;
    }

}