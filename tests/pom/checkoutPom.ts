import { Locator, Page } from '@playwright/test'
import { findPackageJSON } from 'module'
import successpom from './successpom'

export default class checkoutPom {


    private page: Page
    private fullname: Locator
    private telephone: Locator
    private address: Locator
    private city: Locator
    private country: Locator
    private postcode: Locator
    private continueToPayment: Locator
    private province: Locator
    private shippingmethodtype: string
    private paymentmethods: Locator
    private placeorder: Locator
    private deliverymethod: string


    constructor(page: Page) {
        this.page = page
        this.fullname = this.page.locator("//input[@name='address[full_name]']")
        this.telephone = this.page.locator("//input[@name='address[telephone]']")
        this.address = this.page.locator("//input[@name='address[address_1]']")
        this.city = this.page.locator("//input[@name='address[city]']")
        this.country = this.page.locator("//select[@name='address[country]']")
        this.postcode = this.page.locator("//input[@name='address[postcode]']")
        this.continueToPayment = this.page.locator("//button/span[text()='Continue to payment']")
        this.province = this.page.locator("//select[@name='address[province]']")
        this.shippingmethodtype = "//div[@class='shipping-methods']//input//following-sibling::span[contains(text(),'$$')]"
        this.paymentmethods = this.page.locator("//div[contains(@class,'payment-method-list')]")
        this.placeorder = this.page.locator("//button/span[text()='Place Order']")
        this.deliverymethod = "//img[@alt='$$']//ancestor::div[contains(@class,'payment-method-list')]//a"

    }

    public async fillform(fullname: string, telephone: string, address: string, city: string, country: string, postcode: string, province: string): Promise<checkoutPom> {
        await this.fullname.fill(fullname)
        await this.telephone.fill(telephone)
        await this.address.fill(address)
        await this.city.fill(city)
        await this.country.selectOption(country)
        await this.postcode.fill(postcode)
        await this.province.waitFor({ state: 'visible' })
        await this.province.selectOption(province)
        return this


    }
    public async selectshippingmethod(shippingtype: string): Promise<checkoutPom> {
        let finalshippingmethod: string
        if (shippingtype.toLocaleLowerCase().includes("standard")) {
            finalshippingmethod = this.shippingmethodtype.replace("$$", "Standard")
        }
        else {
            finalshippingmethod = this.shippingmethodtype.replace("$$", "Express")
        }
        await this.page.locator(finalshippingmethod).waitFor({ state: 'visible' })
        await this.page.locator(finalshippingmethod).click()
        return this

    }

    public async clickcontinuebutton(): Promise<checkoutPom> {
        await this.continueToPayment.click()
        return this

    }

    public async selectpaymentmethod(deliverymethod: string): Promise<successpom> {
        let finaldeliverymethod: string

        await this.paymentmethods.waitFor({ state: 'visible' })
        if (deliverymethod.toLowerCase().includes("Cash")) {
            finaldeliverymethod = this.deliverymethod.replace("$$", "Cash On Delivery")
        }
        else if (deliverymethod.toLowerCase().includes("Pay")) {
            finaldeliverymethod = this.deliverymethod.replace("$$", "Paypal")
        }
        else {
            finaldeliverymethod = this.deliverymethod.replace("$$", "Stripe")
        }
        await this.page.locator(finaldeliverymethod).waitFor({ state: 'visible' })
        await this.page.locator(finaldeliverymethod).click()
        await this.placeorder.click()
        return this
    }

}