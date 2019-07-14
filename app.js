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

    await page.waitForSelector('.link_num')
    await page.click('.link_num')
    await page.waitForSelector('.info_subject .tit_subject')

    const mailTitle = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.info_subject .tit_subject'),
            ele => ele.textContent
        )
    )
    const mailTitleGapRemove = mailTitle.map(text =>
        text.replace(/\n/g, '').trim()
    )
    console.log(mailTitleGapRemove)

    // setTimeout(async () => {
    //     await browser.close()
    // }, 2000)
}
browserGo()

app.listen(3000, () => {
    console.log('server connect ok')
})
