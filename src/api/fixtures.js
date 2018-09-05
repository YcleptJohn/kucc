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

app.get('/api/fixtures/get/:tripId', async (req, res) => {
  if (!req.params) return res.status(400).send('Missing params')
  let r
  try {
    r = await database.query(`
      SELECT * FROM kucc.fixtures WHERE fixtureId = ?
    `, [
      req.params.tripId
    ])
  } catch (e) {
    return res.status(500).send('An error occurred communicating with the database.')
  }
  return res.status(200).send(r)
})
