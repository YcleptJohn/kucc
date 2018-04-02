const app = require('../server.js')
const database = require('../lib/database.js')
const validation = require('../lib/validation.js')

app.post('/api/user/create', (req, res) => {
  if (!validation.hasProperties(req.body, ['firstname', 'surname'])) return res.send(400)
  return res.send('Hello ' + req.body.firstname)
})

app.get('/api/testdb', async (req, res) => {
  let r = await database.query(`SELECT * FROM kucc.trips`, [])
  return res.send(r)
})
