const express = require('express')
const index = require('./index')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))

app.all('/*', index.quote)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.app = app
