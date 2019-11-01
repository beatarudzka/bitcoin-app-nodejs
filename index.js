//jshint esversion :6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

request('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', function (err, res, body) {
  const data = JSON.parse(body)
  const price = data.last
  console.log(price)
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  console.log(req.body.crypto)
})

app.listen(4000, function () {
  console.log("Server is running on port 4000")
})

