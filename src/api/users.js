const app = require('../server.js')
const database = require('../lib/database.js')

app.post('/api/user/create', (req, res) => {
  
})

app.get('/api/testdb', async (req, res) => {
  let r = await database.query('DESCRIBE kucc.users', [])
  return res.send(r)
})


