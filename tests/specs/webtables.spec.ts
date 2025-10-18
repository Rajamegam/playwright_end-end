import { test } from '@playwright/test'

test("handling web tables", async ({ page }) => {
    await page.goto("https://demo.evershop.io/account/login")
    await page.locator("input[name='email']").fill("raja1@gmail.com")
    await page.locator("input[name='password']").fill("password")
    await page.locator("button[type='submit']").click()
    let shopkidsbutton = page.locator("//a/span[text()='Shop kids']")
    await shopkidsbutton.waitFor({ state: 'visible', timeout: 50000 })
    await page.goto("https://demo.evershop.io/cart")
    let columncount = await page.locator("table thead tr td").count()
    console.log(columncount)

    let columnnames: string[] = []
    let columns = await page.locator("table thead tr td").all()
    for (const column of columns) {
        let columnname = await column.locator("span").innerText()
        columnnames.push(columnname)

    }
    console.log(columnnames)
})