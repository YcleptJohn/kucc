const app = require('../server.js')
const database = require('../lib/database.js')
const validation = require('../lib/validation.js')
const auth = require('../lib/auth.js')

app.post('/api/user/create', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['forename', 'surname', 'email', 'password'])) return res.status(400).send('Some of the required fields were not filled out')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('The email address provided was invalid')
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
    ])
    const user = (await database.query(`
      SELECT email, kentId, forename, surname FROM kucc.users WHERE email = ?
    `, req.body.email))[0] // Select back from DB to avoid any weird injection potential
    req.session.user = user
    return res.status(200).send('OK')
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).send('This email address is already in use')
    console.log(e)
    return res.status(500).send('An error occurred communicating with our database. Please let us know if this perists.')
  }
})

app.post('/api/user/login', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email', 'password'])) return res.status(400).send('Missing params')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('Invalid email')
  let user
  try {
    user = await auth.doLogin(req.body.email, req.body.password)
  } catch (e) {
    if (e.message === 'Account not found') return res.status(500).send('Account not found')
    return res.status(500).send('Something went wrong whilst trying to verify your credentials. Please contact us if this persists')
  }
  if (!user) return res.status(500).send('Incorrect password')
  req.session.user = user
  return res.status(200).send('OK')
})

app.post('/api/user/reset/request', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email'])) return res.status(400).send('Missing params')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('Invalid email')
  try {
    await auth.generatePasswordReset(req.body.email)
    return res.status(200).send('OK')
  } catch (e) {
    if (e.message === 'NO_ACCOUNT') return res.status(400).send('Account not found')
    return res.status(500).send('Something went wrong whilst trying to generate a reset for you. Please contact us if this persists')
  }
})

app.get('/api/user/reset/validate', async (req, res) => {
  if (!validation.hasTruthyProperties(req.query, ['resetToken'])) return res.status(400).send('Missing params')
  try {
    await auth.validatePasswordReset(req.query.resetToken)
    return res.status(200).send('OK')
  } catch (e) {
    if (e.message === 'INVALID_RESET_TOKEN') return res.status(500).send('The reset link given was invalid')
    return res.status(500).send(e.message)
  }
})

app.get('/api/2', (req, res) => {
  return res.send(req.session)
})
