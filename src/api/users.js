const app = require('../server.js')
const database = require('../lib/database.js')

app.post('/api/user/create', (req, res) => {
  
})

app.get('/api/testdb', async (req, res) => {
  let r = await database.query(`SELECT * FROM kucc.trips`, [])
  return res.send(r)
})


