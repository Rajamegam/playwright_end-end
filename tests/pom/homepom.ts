import { Locator, Page } from "@playwright/test";
import Productpom from "./productpom";

export default class homepom {

    private productlink: Locator
    private page: Page


    constructor(page: Page) {
        this.page = page
        this.productlink = this.page.locator("//div[@class='listing-tem'][1]/div[2]/a")


    }

    public async clickproductlink(): Promise<Productpom> {
        await this.productlink.click()
        return new Productpom(this.page)

    }

}

