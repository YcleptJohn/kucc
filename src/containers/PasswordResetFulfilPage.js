import React, { Component } from 'react'
import { Form, Container, Segment, Header, Divider, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

class PasswordResetFulfilPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resetToken: this.props.match.params.tokenId,
      isLoading: false,
      formErrors: [],
      successfulSubmission: false,
      fields: {
        newPassword: {
          value: '',
          regex: /.{10,}/,
          isValid: false,
          message: 'Your new password must be at least 10 characters, come on this is 2018.'
        },
        confirmNewPassword: {
          value: '',
          regex: /.*/,
          isValid: false,
          message: null // Ignore this validation because the matching password handles it
        }
      }
    }
    this.checkRegex = this.checkRegex.bind(this)
    this.checkForm = this.checkForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  checkRegex (val, regex) {
    return !!('' + val).match(regex)
  }

  handleChange (e) {
    let f = this.state.fields[e.target.id]
    f.value = e.target.value
    const valid = this.checkRegex(e.target.value, f.regex)
    f.isValid = valid
  }

  checkForm () {
    let errors = (Object.keys(this.state.fields).map(k => !this.state.fields[k].isValid ? this.state.fields[k].message : null)).filter(f => f !== null)
    const fields = this.state.fields
    if (fields.newPassword.value !== fields.confirmNewPassword.value) {
      errors.push('The passwords enterred must match')
    }
    return errors
  }

  handleSubmit (e) {
    if (this.checkForm().length !== 0) {
      return this.setState({
        formErrors: this.checkForm()
      })
    }
    this.setState({ isLoading: true })
    let formValues = {}
    Object.keys(this.state.fields).map(k => {
      let curr = {}
      curr[k] = this.state.fields[k].value
      Object.assign(formValues, curr)
    })
    fetch('/api/user/reset/fulfil', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(Object.assign({}, { token: process.env.API_TOKEN }, formValues, { resetToken: this.state.resetToken })),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.text()) // Parse response as text
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response === 'INVALID_RESET_TOKEN') {
          this.setState({ formErrors: ['The given password reset token was invalid. Please click the link directly from your reset email.'] })
          this.setState({ successfulSubmission: false })
        } else if (response === 'EXPIRED_RESET_TOKEN') {
          this.setState({ formErrors: [<p key='EXPIRED_RESET_TOKEN'>This reset link has expired. <Link to='/reset'>Request a new one?</Link></p>] })
          this.setState({ successfulSubmission: false })
        } else if (response !== 'OK') {
          this.setState({ formErrors: [response] })
        } else {
          this.setState({ formErrors: [] })
          this.setState({ successfulSubmission: true })
        }
        this.setState({ isLoading: false })
      })
  }

  render () {
    return (
      <div>
        <Container as={Segment}>
          <Header as='h2'>
            Change Password
            <Header.Subheader>Please supply a new password for your account below</Header.Subheader>
          </Header>
          <Divider />
          <Form loading={this.state.isLoading} error={this.state.formErrors.length > 0} success={this.state.successfulSubmission}>
            <Form.Input fluid label='Password' type='password' placeholder='Password...' id='newPassword' onChange={this.handleChange} />
            <Form.Input fluid label='Confirm Password' type='password' placeholder='Retype password...' id='confirmNewPassword' onChange={this.handleChange} />
            <Message
              error
              floating
              header='Something went wrong with your submission:'
              list={this.state.formErrors}
            />
            <Message
              success
              floating
              header='Password reset successfully'
            />
            <Form.Button onClick={this.handleSubmit} primary>Change Password</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default PasswordResetFulfilPage
