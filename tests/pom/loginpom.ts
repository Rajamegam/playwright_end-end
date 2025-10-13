import { Page, Locator } from "@playwright/test";
import homepom from "./homepom";

export default class Loginpom {

    private usernameTB: Locator
    private passwordTB: Locator
    private submitbutton: Locator
    private page: Page

    constructor(page: Page) {
        this.page=page
        this.usernameTB = this.page.locator("input[name='email']")
        this.passwordTB = this.page.locator("input[name='password']")
        this.submitbutton = this.page.locator("button[type='submit']")

    }

    //methods
    public async goto() {
        await this.page.goto("account/login")
    }

    public async fillusername(username: string): Promise<Loginpom> {
        /*
        this is done for method chaining, as the method returns the promise of the class it can be accessed using method chaining
        */
        await this.usernameTB.fill(username)
        return this

    }

    public async fillpassword(password: string): Promise<Loginpom> {
        await this.passwordTB.fill(password)
        return this
    }

    public async clicksubmit(): Promise<homepom> {
        await this.submitbutton.click()
        return new homepom(this.page)
    }

    public async submitcredentials(Username:string,password:string):Promise<homepom>{
        await this.fillusername(Username)
        await this.fillpassword(password)
        return await this.clicksubmit()
    }
}