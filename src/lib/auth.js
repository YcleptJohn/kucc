const auth = module.exports = {}
const crypto = require('crypto')
const database = require('../lib/database.js')
const moment = require('moment')
const mail = require('./mail.js')

auth.generateSalt = () => {
  return crypto.randomBytes(512).toString('hex')
}

auth.hashPassword = (password, salt) => {
  salt = salt || auth.generateSalt() // If salt wasn't specified - make one (account creation)
  return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

auth.doLogin = async (email, password) => {
  let account
  const rows = await database.query('SELECT * FROM kucc.users WHERE email = ?', [email])
  if (!rows.length || rows.length === 0) throw new Error('Account not found')
  account = rows[0]

  const attemptedHash = auth.hashPassword(password, account.salt)
  if (attemptedHash !== account.password) return false
  delete account.password
  delete account.salt
  delete account.stripeCustomerId
  return account
}

auth._generateResetToken = () => {
  return crypto.randomBytes(50).toString('hex')
}

auth.ensureUserExists = async (email) => {
  if (!email) throw new Error('No email supplied')
  const rows = await database.query('SELECT * FROM kucc.users WHERE email = ?', [email])
  if (!rows.length || rows.length === 0) return false
  return true
}

auth.generatePasswordReset = async (email) => {
  if (!email) throw new Error('No email supplied')
  let accExists = false
  accExists = await auth.ensureUserExists(email)
  if (!accExists) throw new Error('NO_ACCOUNT')
  const token = auth._generateResetToken()
  const expiration = moment().add(12, 'hours')
  await database.query('INSERT INTO resetTokens (tokenId, email, expirationDate) VALUES (?, ?, ?)', [token, email, expiration.toISOString()])
  mail.sendResetEmail(email, token)
}

auth.fulfilPasswordReset = async (resetToken, password) => {
  if (!resetToken || !password) throw new Error('Missing params')
  let reset
  try {
    reset = await database.query('SELECT * FROM kucc.resetTokens WHERE tokenId = ?', [resetToken])
  } catch (e) {
    throw new Error('DB_ERROR')
  }
  if (!reset.length || reset.length !== 1) throw new Error('INVALID_RESET_TOKEN')
  reset = reset[0]
  if (moment().isAfter(reset.expirationDate) || reset.state !== 'unused') throw new Error('EXPIRED_RESET_TOKEN')
  let user
  try {
    user = (await database.query(`SELECT u.email, u.salt FROM kucc.users u JOIN kucc.resetTokens t ON u.email = t.email WHERE t.tokenId = ?`, [resetToken]))[0]
  } catch (e) {
    throw new Error('DB_ERROR')
  }
  const newPassHashed = auth.hashPassword(password, user.salt)
  try {
    await database.query('UPDATE kucc.resetTokens SET state=\'used\' WHERE tokenId = ?', [resetToken])
  } catch (e) {
    console.log(e, 'Failed to update token after resetting password')
  }
  try {
    await database.query('UPDATE kucc.users SET password=? WHERE email = ?', [newPassHashed, user.email])
  } catch (e) {
    throw new Error('DB_ERROR')
  }
}
