import React, { Component } from 'react'
import { Form, Container, Segment, Header, Divider, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      formErrors: [],
      successfulSubmission: false,
      fields: {
        email: {
          value: '',
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isValid: false,
          message: 'You must provide your email address in a valid format.'
        },
        password: {
          value: '',
          regex: /.{1,}/,
          isValid: false,
          message: 'You must provide your password.'
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
    fetch('/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(Object.assign({}, { token: process.env.API_TOKEN }, formValues)),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.text()) // Parse response as text
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response === 'Incorrect password') {
          this.setState({ formErrors: [<p key='IncorrectPass'>Incorrect Password. <Link to='/reset'>Reset?</Link></p>] })
          this.setState({ successfulSubmission: false })
        } else if (response === 'Account not found') {
          this.setState({ formErrors: [<p key='NoAccount'>There isn't an account attached to this email address <Link to='/signup'>Sign up?</Link></p>] })
          this.setState({ successfulSubmission: false })
        } else if (response === 'OK' || response === 'Already logged in') {
          this.setState({ formErrors: [] })
          this.setState({ successfulSubmission: true })
        } else {
          this.setState({ formErrors: [response] })
          this.setState({ successfulSubmission: false })
        }
        this.setState({ isLoading: false })
      })
  }

  render () {
    return (
      <div>
        <Container as={Segment}>
          <Header as='h2'>
            Login
            <Header.Subheader>Fill out the form below to sign in to your account</Header.Subheader>
          </Header>
          <Divider />
          <Form loading={this.state.isLoading} error={this.state.formErrors.length > 0} success={this.state.successfulSubmission}>
            <Form.Input fluid label='Email' placeholder='Email...' id='email' onChange={this.handleChange} autoComplete='email' />
            <Form.Input fluid label='Password' type='password' placeholder='Password...' id='password' onChange={this.handleChange} />
            <Message
              error
              floating
              header='Something went wrong with your submission:'
              list={this.state.formErrors} />
            <Message
              success
              floating
              icon='checkmark'
              header='Logged in successfully'
            />
            <Form.Button onClick={this.handleSubmit} primary>Login</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default LoginPage
