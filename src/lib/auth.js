const auth = module.exports = {}
const crypto = require('crypto')
const database = require('../lib/database.js')
const util = require('util')
const moment = require('moment')
const mail = require('./mail.js')

auth.generateSalt = () => {
  return crypto.randomBytes(512).toString('hex')
}

auth.hashPassword = (password, salt) => {
  salt = salt || auth.generateSalt() // If salt wasn't specified - make one (account creation)
  return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

auth.doLogin = util.promisify(async (email, password, cb) => {
  let account
  try {
    const rows = await database.query('SELECT * FROM kucc.users WHERE email = ?', [email])
    if (!rows.length || rows.length === 0) return cb(new Error('Account not found'), null)
    account = rows[0]
  } catch (e) {
    return cb(e, null)
  }

  const attemptedHash = auth.hashPassword(password, account.salt)
  if (attemptedHash !== account.password) return cb(null, false)
  delete account.password
  delete account.salt
  delete account.stripeCustomerId
  return cb(null, account)
})

auth._generateResetToken = () => {
  return crypto.randomBytes(50).toString('hex')
}

auth.ensureUserExists = util.promisify(async (email, cb) => {
  if (!email) return cb(new Error('No email supplied'), null)
  try {
    const rows = await database.query('SELECT * FROM kucc.users WHERE email = ?', [email])
    if (!rows.length || rows.length === 0) return cb(null, false)
    return cb(null, true)
  } catch (e) {
    return cb(e, null)
  }
})

auth.generatePasswordReset = util.promisify(async (email, cb) => {
  if (!email) return cb(new Error('No email supplied'))
  let accExists = false
  try {
    accExists = await auth.ensureUserExists(email)
  } catch (e) {
    return cb(e)
  }
  if (!accExists) return cb(new Error('NO_ACCOUNT'))
  const token = auth._generateResetToken()
  const expiration = moment().add(12, 'hours')
  try {
    await database.query('INSERT INTO resetTokens (tokenId, email, expirationDate) VALUES (?, ?, ?)', [token, email, expiration.toISOString()])
  } catch (e) {
    return cb(e)
  }
  mail.sendResetEmail(email, token)
  return cb(null)
})

auth.fulfilPasswordReset = util.promisify(async (resetToken, password, cb) => {
  if (!resetToken || !password) cb(new Error('Missing params'))
  let reset
  try {
    reset = await database.query('SELECT * FROM kucc.resetTokens WHERE tokenId = ?', [resetToken])
  } catch (e) {
    return cb(new Error('DB_ERROR'))
  }
  if (!reset.length || reset.length !== 1) return cb(new Error('INVALID_RESET_TOKEN'))
  reset = reset[0]
  if (moment().isAfter(reset.expirationDate) || reset.state !== 'unused') return cb(new Error('EXPIRED_RESET_TOKEN'))
  let user
  try {
    user = (await database.query(`SELECT u.email, u.salt FROM kucc.users u JOIN kucc.resetTokens t ON u.email = t.email WHERE t.tokenId = ?`, [resetToken]))[0]
  } catch (e) {
    return cb(new Error('DB_ERROR'))
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
    return cb(new Error('DB_ERROR'))
  }
  return cb(null)
})
