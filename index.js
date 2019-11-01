//jshint esversion :6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  const fiat = req.body.fiat
  const crypto = req.body.crypto
  const basicURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/'
  request('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', function (error, response, body) {
    let data = JSON.parse(body)
    let price = data.last
    res.send("<h2>The current price of " + crypto + " is " + price + " " + fiat + "</h2>")
  })
})

app.listen(4000, function () {
  console.log("Server is running on port 4000")
})

