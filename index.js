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
  const amount = req.body.amount

  const basicURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
  const finalURL = basicURL + crypto + fiat
  const options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }
  request(options, function (error, response, body) {
    let data = JSON.parse(body)
    let price = data.price
    const currentDate = data.time
    res.write("<p>The current date is " + currentDate + "</p>")
    res.write("<h2> " + amount + " " + crypto + " is worth now " + price + " " + fiat + "</h2>")
    res.send()
  })
})

app.listen(4000, function () {
  console.log("Server is running on port 4000")
})

