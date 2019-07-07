const creds = require('creds')
const puppeteer = require('puppeteer')
const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('server connect ok')
})
