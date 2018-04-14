const auth = module.exports = {}
const crypto = require('crypto')
const database = require('../lib/database.js')
const util = require('util')
const moment = require('moment')

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
  } catch(e) {
    return cb(e)
  }
  if (!accExists) return cb(new Error('NO_ACCOUNT'))
  const token = auth._generateResetToken()
  const expiration = moment().add(5, 'hours')
  try {
    const rows = await database.query('INSERT INTO resetTokens (tokenId, email, expirationDate) VALUES (?, ?, ?)', [token, email, expiration.toISOString()])
  } catch (e) {
    return cb(e)
  }
  return cb(null)
})

auth.validatePasswordReset = util.promisify(async (resetToken, cb) => {
  let reset
  try {
    reset = await database.query('SELECT * FROM kucc.resetTokens WHERE tokenId = ?', [resetToken])
  } catch (e) {
    return cb(e)
  }
  if (!reset.length || reset.length !== 1) return cb(new Error('INVALID_RESET_TOKEN'))
  reset = reset[0]
  if (moment().isAfter(reset.expirationDate) || reset.state !== 'unused') return cb (new Error('EXPIRED_RESET_TOKEN'))
  try {
    database.query('UPDATE kucc.resetTokens SET state=\'used\' WHERE tokenId = ?', [resetToken])
  } catch (e) {
    console.log(e, 'occured whilst trying to finalise a password reset')
  }
  return cb(null)
})