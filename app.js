const puppeteer = require('puppeteer')
const express = require('express')
const app = express()

async function browserGo() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://example.com')
}
browserGo()

app.listen(3000, () => {
    console.log('server connect ok')
})
