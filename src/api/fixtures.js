const app = require('../server.js')
const database = require('../lib/database.js')

app.get('/api/fixtures/getAll', async (req, res) => {
  let r
  try {
    r = await database.query(`
      SELECT * FROM kucc.fixtures
    `)
  } catch (e) {
    console.log(e)
    return res.status(500).send('DATABASE_ERROR')
  }
  return res.status(200).send(r)
})
