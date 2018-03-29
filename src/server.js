const express = require('express')
const path = require('path')
const config = require('../config.js')

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.route('/api/?*')
  .get((req, res) => {
    res.sendStatus(403)
  })
  .post((req, res) => {
    res.sendStatus(403)
  })
  .put((req, res) => {
    res.sendStatus(403)
  })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`)
})
