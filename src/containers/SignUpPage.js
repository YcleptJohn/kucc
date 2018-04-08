import React, { Component } from 'react'
import { Form, Container, Segment, Header, Divider, Message } from 'semantic-ui-react'

class SignUpPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      formErrors: [],
      fields: {
        forename: {
          value: '',
          regex: /.{1,}/,
          isValid: false,
          message: 'You must enter a valid forename like JOHN'
        },
        surname: {
          value: '',
          regex: /.{1,}/,
          isValid: false,
          message: 'You must enter a valid surname like TAYLOR'
        },
        kentId: {
          value: '',
          regex: /[a-zA-Z0-9]*/,
          isValid: false,
          message: 'You must enter a valid kent-ish ID'
        },
        email: {
          value: '',
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isValid: false,
          message: 'You must enter a valid email address'
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
    let errors = (Object.keys(this.state.fields).map((k, v) => !this.state.fields[k].isValid ? this.state.fields[k].message : null)).filter(f => f !== null)
    const fields = this.state.fields
    if (fields.password.value !== fields.confirmPassword.value) {
      errors.push('The passwords enterred must match')
    }
    return errors
  }

  handleSubmit (e) {
    if (this.checkForm().length !== 0) {
      this.setState({
        formErrors: this.checkForm()
      })
    }
    // SET LOADING STATE - POST - WAIT - DISPLAY RESPONSE ETC
  }

  render () {
    return (
      <div>
        <Container as={Segment}>
          <Header as='h2'>
            Create Account
            <Header.Subheader>Fill out the form below to create your account</Header.Subheader>
          </Header>
          <Divider />
          <Form loading={this.state.isLoading} error={this.state.formErrors.length > 0}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First name' placeholder='First name...' id='forename' onChange={this.handleChange} />
              <Form.Input fluid label='Last name' placeholder='Last name...' id='surname' onChange={this.handleChange} />
              <Form.Input fluid label='Kent ID' placeholder='e.g jjt24' id='kentId' onChange={this.handleChange} />
            </Form.Group>
            <Form.Input fluid label='Email' placeholder='Email...' id='email' onChange={this.handleChange} />
            <Form.Input fluid label='Password' placeholder='Password...' id='password' onChange={this.handleChange} />
            <Form.Input fluid label='Confirm Password' placeholder='Retype password...' id='confirmPassword' onChange={this.handleChange} />
            <Message
              error
              floating
              header={this.state.formErrors === 1 ? 'There was an error in your submission:' : 'There are a few errors in your submission:'}
              list={this.state.formErrors}
            />
            <Form.Button onClick={this.handleSubmit} primary>Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default SignUpPage
