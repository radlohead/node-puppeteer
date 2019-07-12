const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const userInfo = require('./userInfo')

async function browserGo() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://www.daum.net/?t__nil_navi=daum')
    await page.click('.link_login')
    await page.goto(
        'https://logins.daum.net/accounts/signinform.do?url=https%3A%2F%2Fwww.daum.net%2F'
    )
    await page.type('input[type="email"]', userInfo.id)
    await page.type('input[type="password"]', userInfo.password)
    await page.click('#loginBtn')
}
browserGo()

app.listen(3000, () => {
    console.log('server connect ok')
})
