import { Locator, Page, expect } from "@playwright/test";
import cartpom from "./cartpom";

export default class Productpom {
    private page: Page
    private size: string
    private color: string
    private addToCartbtn: Locator
    private qty: Locator
    private viewcartbutton: Locator
    private productheader: Locator


    constructor(page: Page) {
        this.page = page
        this.qty = this.page.locator("input[name='qty']")
        this.addToCartbtn = this.page.locator("//button[@type='button']/span[text()='ADD TO CART']")
        this.color = "(//ul[contains(@class,'variant-option-list')])[2]/li/a[text()='$$']"
        this.size = "//div[contains(@class,'variant-container')]/div[1]/ul/li/a[text()='$$']"
        //--//div[contains(@class,'variant-container')]/div[1]/ul/li/a[text()='M']
        this.viewcartbutton = this.page.locator(".add-cart-popup-button")
        this.productheader = this.page.locator(".product-single-name")


    }

    private createsizeLocator(sizevalue: string): Locator {
        let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        return sizetypelocator

    }

    public async selectsize(sizevalue: string): Promise<Productpom> {
        // let sizetypelocator: Locator = this.page.locator(this.size.replace('$$', sizevalue))
        let sizelocator = this.createsizeLocator(sizevalue)
        await sizelocator.click()
        await sizelocator.locator("//parent::li[@class='selected']").waitFor({ state: 'visible' })
        return this
    }

    private createcolorLocator(colorvalue: string): Locator {
        let colortypelocator: Locator = this.page.locator(this.color.replace("$$", colorvalue))
        return colortypelocator
    }

    public async selectcolor(colorvalue: string): Promise<Productpom> {
        //let colortypelocator: Locator = this.page.locator(this.color.replace('$$', colorvalue))
        let colorlocator = this.createcolorLocator(colorvalue)
        await colorlocator.click()
        await colorlocator.locator("//parent::li[@class='selected']").waitFor({ state: 'visible' })
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
        await this.productheader.waitFor({ state: 'visible', timeout: 10000 })
        await this.selectsize(size)
        await this.selectcolor(color)
        await this.fillquantity(quantity)
        await this.clickaddtocartbutton()
        await this.viewcartpage()
        return new cartpom(this.page)

    }
}