import { Locator, Page } from "@playwright/test";

export default class Productpom {
    private page: Page
    private size: string
    private color: string
    private addToCartbtn: Locator
    private qty: Locator


    constructor(page: Page) {
        this.page = page
        this.qty = this.page.locator("input[name='qty']")
        this.addToCartbtn = this.page.locator("//button[@type='button']/span[text()='ADD TO CART']")
        this.color = "(//ul[contains(@class,'variant-option-list')])[2]/li/a[text()='$$']"
        this.size = "(//ul[contains(@class,'variant-option-list')])[1]/li/a[text()='$$']"


    }

    private createsizeLocator(sizevalue: string): Locator {
        let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        return sizetypelocator

    }

    private createcolorLocator(colorvalue: string): Locator {
        let colortypelocator: Locator = this.page.locator(this.color.replace("$$", colorvalue))
        return colortypelocator
    }


    public async selectsize(sizevalue: string) {
        // let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        await this.createsizeLocator(sizevalue).click()
    }

    public async selectcolor(colorvalue: string) {
        //let colortypelocator: Locator = this.page.locator(this.color.replace('$$', colorvalue))
        await this.createcolorLocator(colorvalue).click()
    }
}