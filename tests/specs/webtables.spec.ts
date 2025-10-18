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

    //map execution, since map will return promise and not the operation so we need to wrap all those under promise.all
    // Promise.all waits for ALL promises to resolve
    // Only then continues to next line
    // await Promise.all(columns.map(async (column) => {
    //     let columnname = await column.locator("span").innerText()
    //     columnnames.push(columnname)

    // }))
    //normal for loop to iterate through the values in the array
    for (const column of columns) {
        let columnname = await column.locator("span").innerText()
        columnnames.push(columnname)

    }
    console.log(columnnames)
    columnnames.forEach((colNmae) => {
        console.log("column headers are:", colNmae)

    })

    //Row data
    let rowcount = await page.locator("table tbody tr").count()
    console.log("row count is", rowcount)


    let row = await page.locator("table tbody tr").all()

    let rowscontent: string[][] = []

    for (const r of row) {
        let rowcontent: string[] = []

        rowcontent.push(await r.locator("//td[1]//div[@class='cart-tem-info']/a").innerText())
        rowcontent.push(await r.locator("//td[2]//div//span[@class='sale-price']").innerText())
        rowcontent.push(await r.locator("//td[3]//div//input").getAttribute('value') ?? "no data")
        rowcontent.push(await r.locator("//td[4]//span").innerText())

        rowscontent.push(rowcontent)

    }
    rowscontent.forEach((rowvalue) => {
        console.log("the row details are", rowvalue)
    })
})