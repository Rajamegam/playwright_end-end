import { test } from '@playwright/test'
import Loginpom from '../pom/loginpom'
import homepom from '../pom/homepom'
import Productpom from '../pom/productpom'
import cartpom from '../pom/cartpom'
import checkoutPom from '../pom/checkoutPom'

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
    //await page.pause()
    let cartpage: cartpom = await productpage.fillproductdetails('M', 'Green', '1')
    let product: string[][] = await cartpage.getProducts()
    product.forEach((product) => {
        console.log("product details are", product)
    })

    let checkout: checkoutPom = await cartpage.clickcheckoutbutton()
    await checkout.fillform("sheir", "2312313", "adas", "city", "US", "23423", "US-CA")
    await checkout.selectshippingmethod("Standard")
    await checkout.clickcontinuebutton()
    await checkout.selectpaymentmethod("cash on delivery")
    await page.pause()




})