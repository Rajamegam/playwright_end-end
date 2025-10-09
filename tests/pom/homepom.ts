import { Locator, Page } from "@playwright/test";

export default class homepom {

    private productlink: Locator
    private page: Page


    constructor(page: Page) {
        this.page = page
        this.productlink = this.page.getByRole("link", { name: "Nike react infinity run flyknit" })


    }

    public async clickproductlink() {
        await this.productlink.first().click()
    }

}

