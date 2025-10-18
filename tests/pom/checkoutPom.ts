import { Locator, Page } from '@playwright/test'

export default class checkoutPom {


    private page: Page
    private fullname: Locator
    private telephone: Locator
    private address: Locator
    private city: Locator
    private country: Locator
    private postcode: Locator


    constructor(page: Page) {
        this.page = page
        this.fullname = this.page.locator("//input[@name='address[full_name]']")
        this.telephone = this.page.locator("//input[@name='address[telephone]']")
        this.address = this.page.locator("//input[@name='address[address_1]']")
        this.city = this.page.locator("//input[@name='address[city]']")
        this.country = this.page.locator("//select[@name='address[country]']")
        this.postcode = this.page.locator("//input[@name='address[postcode]']")

    }
}