import { test } from '@playwright/test'
import Loginpom from '../pom/loginpom'
import homepom from '../pom/homepom'
import Productpom from '../pom/productpom'
import cartpom from '../pom/cartpom'

test("endtoend", async ({ page }) => {

    let loginform = new Loginpom(page)
    //let homepage = new homepom(page)
    await loginform.goto()
    /**
     * method chaining 
     */
    // await (await (await (await loginform.fillusername("raja@gmail.com")).fillpassword("password")).clicksubmit()).clickproductlink()
    // await loginform.fillpassword("password")
    // await loginform.clicksubmit()
    // await homepage.clickproductlink()

    let homepage: homepom = await loginform.submitcredentials("raja1@gmail.com", "password")
    let productpage: Productpom = await homepage.clickproductlink()
    await page.pause()
    let cartpage: cartpom = productpage.fillproductdetails('M', 'Green', '1')
    



})