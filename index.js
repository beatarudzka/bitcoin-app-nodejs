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

  const basicURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
  const finalURL = basicURL + crypto + fiat
  request(finalURL, function (error, response, body) {
    let data = JSON.parse(body)
    let price = data.last
    const currentDate = data.display_timestamp
    res.write("<p>The current date is " + currentDate + "</p>")
    res.write("<h2>The current price of " + crypto + " is " + price + " " + fiat + "</h2>")
    res.send()
  })
})

app.listen(4000, function () {
  console.log("Server is running on port 4000")
})

