const mail = module.exports = {}
const nodemailer = require('nodemailer')

let transport

mail.init = () => {
  if (transport) return
  let poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
  transport = nodemailer.createTransport(poolConfig)
  transport.verify((error, success) => {
    if (error) {
      return console.log(error, 'Error setting up SMTP')
    }
    console.log('SMTP Ready')
  })
}

mail.sendResetEmail = (target, resetToken) => {
  if (!transport) mail.init()
  let mailOptions = {
    from: 'Kent University Caving Club <YcleptJohn@gmail.com>',
    to: target,
    subject: 'Reset your KentCaving password', 
    text: `To reset your password for KentCaving please visit the following link: https://kentcaving.co.uk/reset/${resetToken}`,
    html: `To reset your password for KentCaving please visit the following link: <a href='https://kentcaving.co.uk/reset/${resetToken}'>https://kentcaving.co.uk/reset/${resetToken}</a>`
  }
  transport.sendMail(mailOptions, (e, info) => {
    if (e) {
      return console.log(e)
    }
    console.log('Password Reset Email sent: ', info);
  })
}