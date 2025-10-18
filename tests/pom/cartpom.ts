import { Locator, Page } from "@playwright/test";

export default class cartpom {
    private page: Page
    private checkoutbutton: Locator
    constructor(page: Page) {
        this.page=page
        this.checkoutbutton = this.page.locator("//a[contains(@href,'checkout')]")



    }
    public async clickcheckoutbutton(): Promise<cartpom> {
        await this.checkoutbutton.click()
        return this
    }
}