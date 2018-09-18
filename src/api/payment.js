const app = require('../server.js')
const stripe = require('stripe')(process.env.STRIPE_TOKEN)

app.post('/api/payment/take', async (req, res) => {
  if (req.body.paymentToken) {
    let stripeRes
    try {
      stripeRes = await stripe.charges.create({
        amount: 1000,
        currency: 'gbp',
        description: 'KUCC Trip Payment',
        source: req.body.paymentToken
      })
      console.log(stripeRes.code, 'stripe status')
    } catch (e) {
      console.log(e)
      console.log('Failed to create stripe charge')
    }
  }
  return res.status(200).send('OK')
})
