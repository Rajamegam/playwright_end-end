import { Locator, Page } from "@playwright/test";
import checkoutPom from "./checkoutPom";

export default class cartpom {
    private page: Page
    private checkoutbutton: Locator
    private columns: Locator
    private rows: Locator
    private productName: string
    private productprice: string
    private productQty: string
    private totalprice: string

    constructor(page: Page) {
        this.page = page
        this.checkoutbutton = this.page.locator("//a/span[text()='CHECKOUT']")
        this.columns = this.page.locator("table thead tr td")
        this.rows = this.page.locator("table tbody tr")
        this.productName = "//td[1]//div[@class='cart-tem-info']/a"
        this.productprice = "//td[2]//div//span[@class='sale-price']"
        this.productQty = "//td[3]//div//input"
        this.totalprice = "//td[4]//span"

    }

    public async getColumnCount(): Promise<number> {
        return await this.columns.count()

    }

    public async getColumnNames(): Promise<string[]> {
        let columnnames: string[] = []
        let columns = await this.columns.all()
        for (const column of columns) {
            let columnname = await column.locator("span").innerText()
            columnnames.push(columnname)

        }
        return columnnames

    }

    public async getRowCount(): Promise<number> {
        return await this.rows.count()

    }
    public async getProducts(): Promise<string[][]> {
        let row = await this.rows.all()

        let rowscontent: string[][] = []

        for (const r of row) {
            let rowcontent: string[] = []

            rowcontent.push(await r.locator(this.productName).innerText())
            rowcontent.push(await r.locator(this.productprice).innerText())
            rowcontent.push(await r.locator(this.productQty).getAttribute('value') ?? "no data")
            rowcontent.push(await r.locator(this.totalprice).innerText())
            rowscontent.push(rowcontent)

        }
        return rowscontent

    }
    public async clickcheckoutbutton(): Promise<checkoutPom> {
        await this.checkoutbutton.click()
        await this.page.waitForLoadState('load')
        return new checkoutPom(this.page)
    }

}