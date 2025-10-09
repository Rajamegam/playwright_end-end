import { test } from '@playwright/test'
import Loginpom from '../pom/loginpom'
import homepom from '../pom/homepom'

test("endtoend", async ({ page }) => {

    let loginform = new Loginpom(page)
    let homepage = new homepom(page)
    await loginform.goto()
    /**
     * method chaining 
     */
    await (await (await (await loginform.fillusername("raja@gmail.com")).fillpassword("password")).clicksubmit()).clickproductlink()
    // await loginform.fillpassword("password")
    // await loginform.clicksubmit()
    // await homepage.clickproductlink()
    await page.pause()



})