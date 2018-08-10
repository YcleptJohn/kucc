import React, { Component } from 'react'
import { Form, Container, Segment, Header, Divider, Message } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'

class SignUpPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      formErrors: [],
      successfulSubmission: false,
      fields: {
        forename: {
          value: '',
          regex: /.{1,}/,
          isValid: false,
          message: 'You must provide your first name.'
        },
        surname: {
          value: '',
          regex: /.{1,}/,
          isValid: false,
          message: 'You must provide your last name.'
        },
        kentId: {
          value: '',
          regex: /[a-zA-Z0-9]*/,
          isValid: true,
          message: 'You must provide a valid Kent ID. (e.g jjt24)'
        },
        email: {
          value: '',
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isValid: false,
          message: 'You must provide a valid email address.'
        },
        password: {
          value: '',
          regex: /.{10,}/,
          isValid: false,
          message: 'You must enter a password that is at least 10 characters, come on this is 2018.'
        },
        confirmPassword: {
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
    if (fields.password.value !== fields.confirmPassword.value) {
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
    fetch('/api/user/create', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(Object.assign({}, { token: process.env.API_TOKEN }, formValues)),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.text()) // Parse response as text
      .catch(error => console.error('Error:', error))
      .then(response => {
        this.setState({ isLoading: false })
        if (response !== 'OK') {
          this.setState({ formErrors: [response] })
          this.setState({ successfulSubmission: false })
        } else {
          this.setState({ formErrors: [] })
          this.setState({ successfulSubmission: true })
          this.props.updateLoginState()
        }
      })
  }

  render () {
    return (
      <Container as={Segment}>
        <Header as='h2'>
          Create Account
          <Header.Subheader>Fill out the form below to create your account</Header.Subheader>
        </Header>
        <Divider />
        <Form loading={this.state.isLoading} error={this.state.formErrors.length > 0} success={this.state.successfulSubmission}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name...' id='forename' onChange={this.handleChange} autoComplete='given-name' />
            <Form.Input fluid label='Last name' placeholder='Last name...' id='surname' onChange={this.handleChange} autoComplete='family-name' />
            <Form.Input fluid label='Kent ID' placeholder='e.g jjt24' id='kentId' onChange={this.handleChange} />
          </Form.Group>
          <Form.Input fluid label='Email' placeholder='Email...' id='email' onChange={this.handleChange} autoComplete='email' />
          <Form.Input fluid label='Password' type='password' placeholder='Password...' id='password' onChange={this.handleChange} />
          <Form.Input fluid label='Confirm Password' type='password' placeholder='Retype password...' id='confirmPassword' onChange={this.handleChange} />
          <Message
            error
            floating
            header='Something went wrong with your submission:'
            list={this.state.formErrors}
          />
          <Message
            success
            floating
            header='Account created succesfully'
          />
          <Form.Button onClick={this.handleSubmit} primary>Create Account</Form.Button>
        </Form>
      </Container>
    )
  }
}

export default SignUpPage
