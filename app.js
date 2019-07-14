const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const userInfo = require('./userInfo')

async function browserGo() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto(
        'https://logins.daum.net/accounts/signinform.do?url=https%3A%2F%2Fwww.daum.net%2F'
    )
    await page.type('input[type="email"]', userInfo.id)
    await page.type('input[type="password"]', userInfo.password)
    await page.click('#loginBtn')

    const isLoginAfterPage = await page.waitForSelector('.link_num')
    if (isLoginAfterPage) {
        await page.click('.link_num')
    }

    // setTimeout(async () => {
    //     await browser.close()
    // }, 2000)
}
browserGo()

app.listen(3000, () => {
    console.log('server connect ok')
})
