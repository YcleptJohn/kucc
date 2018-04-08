const app = require('../server.js')
const database = require('../lib/database.js')
const validation = require('../lib/validation.js')
const auth = require('../lib/auth.js')

app.post('/api/user/create', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['forename', 'surname', 'email', 'password'])) return res.status(400).send('Missing params')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('Invalid email')
  const salt = auth.generateSalt()
  const hashedPassword = auth.hashPassword(req.body.password, salt)
  try {
    await database.query(`
      INSERT INTO 
        kucc.users (forename, surname, kentId, email, password, salt) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.body.forename,
      req.body.surname,
      (req.body.kentId || null),
      req.body.email,
      hashedPassword,
      salt
    ]
    )
    const user = (await database.query(`
      SELECT email, kentId, forename, surname FROM kucc.users WHERE email = ?
    `, req.body.email))[0] // Select back from DB to avoid any weird injection potential
    req.session.user = user
    return res.status(200).send('OK')
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).send('This account already exists.')
    return res.status(500).send('Database error')
  }
})

app.post('/api/user/login', async (req, res) => {
  if (req.session.user) return res.status(304).send('Already logged in')
  if (!validation.hasTruthyProperties(req.body, ['email', 'password'])) return res.status(400).send('Missing params')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('Invalid email')
  let user
  try {
    user = await auth.doLogin(req.body.email, req.body.password)
  } catch (e) {
    return res.status(500).send(e.message)
  }
  if (!user) return res.status(500).send('Login check failed')
  req.session.user = user
  return res.status(200).send('OK')
})

app.get('/api/testdb', async (req, res) => {
  return res.send(req.session)
})

app.get('/api/2', (req, res) => {
  return res.send(req.session)
})
