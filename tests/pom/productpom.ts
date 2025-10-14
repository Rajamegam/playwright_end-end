import { Locator, Page } from "@playwright/test";
import cartpom from "./cartpom";

export default class Productpom {
    private page: Page
    private size: string
    private color: string
    private addToCartbtn: Locator
    private qty: Locator
    private viewcartbutton: Locator


    constructor(page: Page) {
        this.page = page
        this.qty = this.page.locator("input[name='qty']")
        this.addToCartbtn = this.page.locator("//button[@type='button']/span[text()='ADD TO CART']")
        this.color = "(//ul[contains(@class,'variant-option-list')])[2]/li/a[text()='$$']"
        this.size = "(//ul[contains(@class,'variant-option-list')])[1]/li/a[text()='$$']"
        this.viewcartbutton = this.page.locator(".add-cart-popup-button")


    }

    private createsizeLocator(sizevalue: string): Locator {
        let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        return sizetypelocator

    }

    public async selectsize(sizevalue: string): Promise<Productpom> {
        // let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        await this.createsizeLocator(sizevalue).click()
        return this
    }

    private createcolorLocator(colorvalue: string): Locator {
        let colortypelocator: Locator = this.page.locator(this.color.replace("$$", colorvalue))
        return colortypelocator
    }

    public async selectcolor(colorvalue: string): Promise<Productpom> {
        //let colortypelocator: Locator = this.page.locator(this.color.replace('$$', colorvalue))
        await this.createcolorLocator(colorvalue).click()
        return this
    }

    public async fillquantity(quantityvalue: string): Promise<Productpom> {
        await this.qty.fill(quantityvalue)
        return this
    }

    public async clickaddtocartbutton(): Promise<Productpom> {
        await this.addToCartbtn.click()
        return this
    }

    public async viewcartpage(): Promise<cartpom> {
        await this.viewcartbutton.click()
        return new cartpom(this.page)
    }

    public async fillproductdetails(size: string, color: string, quantity: string): Promise<cartpom> {
        await this.selectsize(size)
        await this.selectcolor(color)
        await this.fillquantity(quantity)
        await this.clickaddtocartbutton()
        await this.viewcartpage()
        return new cartpom(this.page)

    }
}