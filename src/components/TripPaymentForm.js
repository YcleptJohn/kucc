import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Divider, Form, Message, Checkbox } from 'semantic-ui-react'

class TripPaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentStatus: 'pending',
      formSubmissionStatus: 'pending',
      isProcessing: false
    }

    this.submit = this.submit.bind(this)
  }

  async submit(e) {
    this.setState({ isProcessing: true })
    let { token } = await this.props.stripe.createToken({name: 'KuccTripPaymentToken'})
    if (!token) return this.setState({ paymentStatus: 'invalid', isProcessing: false })
    this.setState({ paymentStatus: 'valid' })
    console.log(token)


    // Validate token
    // Validate form submission
    // THEN Call both APIs
    // Try not to charge pre-checking the form submission
    // Call storage API first
    // If the charge API is successful, update databse to certify paid deposit

    let res
    try {
      res = await fetch('/api/payment/take', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(Object.assign({}, { token: process.env.API_TOKEN }, { paymentToken: token.id })),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = await res.text()
    } catch(e) {
      console.log('error caught')
    }
    console.log(res)

    this.setState({ isProcessing: false })
  }

  render () {
    return (
      <Form
        warning={this.state.paymentStatus === 'invalid'}
        error={this.state.paymentStatus === 'failed' || this.state.formSubmissionStatus === 'failed'}
        success={this.state.paymentStatus === 'complete' && this.state.formSubmissionStatus === 'complete'}
        >
        <Form.Input fluid label='Forename' placeholder='Forename...' id='forename' autoComplete='email' />
        <Form.Input fluid label='Surname' placeholder='Surname...' id='surname' />
        <Divider horizontal>Payment</Divider>
        <label>
          Please provide your card details to pay the £{this.props.cost} deposit for this trip. If you are unable to pay by card please get in touch with us to arrange something else.
          <CardElement />
        </label>
        <Checkbox label='I have read and agree to the terms and conditions'/>

        <Message
          warning
          floating
          header='The card details provided seem to be invalid.'
        />
        <Message
          success
          floating
          icon='checkmark'
          header='Signup was succesful'
        />

        <Form.Button
          onClick={this.submit}
          loading={this.state.isProcessing}
          disabled={this.state.isProcessing || this.state.paymentStatus === 'complete'}
          primary>
          Submit & Pay deposit
        </Form.Button>
      </Form>
    )
  }
}

export default injectStripe(TripPaymentForm)
