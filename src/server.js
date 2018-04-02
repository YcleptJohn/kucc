const express = require('express')
const path = require('path')
const config = require('../config.js')
const database = require('./lib/database.js')

const app = module.exports = express() // Export the express module for ease of route definition from other files

app.use(express.static(path.resolve(__dirname, '..', 'dist')))
app.use(express.json())

app.route('/api/*')
  .get((req, res, next) => {
    if (req && req.query && req.query.token !== process.env.api_token) return res.sendStatus(403)
    next()
  })
  .post((req, res, next) => {
    if (req && req.body && req.body.token !== process.env.api_token) return res.sendStatus(403)
    next()
  })

require('./api/users.js')

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`)
})
