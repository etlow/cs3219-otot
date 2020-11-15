const functions = require('firebase-functions')
const express = require('express')
const app = express()
const port = 3000

const quotes = {}
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/quote', (req, res) => {
  res.json({ success: true, items: Object.keys(quotes) })
})

app.post('/quote', (req, res) => {
  if (!req.body.item) {
    res.json({ success: false, message: 'Item not provided' })
  } else if (quotes[req.body.item]) {
    res.json({ success: false, message: 'Item already exists' })
  } else {
    quotes[req.body.item] = {}
    res.json({ success: true })
  }
})

app.get('/quote/:item', (req, res) => {
  if (!quotes[req.params.item]) {
    res.json({ success: false, message: `Item ${req.params.item} does not exist` })
  } else {
    res.json({ success: true, quotes: quotes[req.params.item] })
  }
})

app.put('/quote/:item', (req, res) => {
  if (!quotes[req.params.item]) {
    res.json({ success: false, message: `Item ${req.params.item} does not exist` })
  } else if (!req.body.company) {
    res.json({ success: false, message: 'Item not provided' })
  } else if (req.body.remove) {
    if (!quotes[req.params.item][req.body.company]) {
      res.json({ success: false, message: 'Company does not exist'})
    } else {
      delete quotes[req.params.item][req.body.company]
      res.json({ success: true })
    }
  } else if (req.body.price === undefined) {
    res.json({ success: false, message: 'Price not provided' })
  } else {
    quotes[req.params.item][req.body.company] = req.body.price
    res.json({ success: true })
  }
})

app.delete('/quote/:item', (req, res) => {
  if (!quotes[req.params.item]) {
    res.json({ success: false, message: `Item ${req.params.item} does not exist` })
  } else {
    delete quotes[req.params.item]
    res.json({ success: true })
  }
})

exports.quote = functions.https.onRequest(app)
