const auth = module.exports = {}
const crypto = require('crypto')
const database = require('../lib/database.js')
const util = require('util')

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
