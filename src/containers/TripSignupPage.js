import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { Container, Segment, Rail, Header, Icon, Divider, Responsive, List, Card, Form } from 'semantic-ui-react'
import { Elements } from 'react-stripe-elements';
import TripPaymentForm from '../components/TripPaymentForm.js'

class TripSignupPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      queryComplete: false,
      queryFailed: false
    }
  }

  async componentWillMount () {
    let res
    try {
      res = await fetch(`/api/fixtures/get/${this.props.match.params.tripId}?token=${process.env.API_TOKEN}`)
      if (res.status !== 200) throw new Error('API request failed')
      let obj = (await res.json())[0]
      this.setState({
        data: obj
      })
    } catch (e) {
      this.setState({
        queryFailed: true
      })
    } finally {
      this.setState({
        queryComplete: true
      })
    }
  }

  render () {
    const { data } = this.state
    if (this.state.queryFailed) {
      return (
        <div>Something went wrong whilst talking to our database...</div>
      )
    }

    if (!this.state.queryComplete) {
      return (
        <Container as={Segment} loading>
          <br />
          <br />
          <br />
        </Container>
      )
    }

    return (
      <Container as={Segment}>
        <Responsive maxWidth={1799}>
          <Header as={'h5'} textAlign='center'>You are signing up for...</Header>
          <Card fluid>
            <Card.Content>
              <Card.Header>{data.name}</Card.Header>
              <Card.Meta><Icon name='globe'/> Mendip Hills, Somerset</Card.Meta>
              <Card.Meta><Icon name='calendar' color='blue'/> 25th Aug '18 - 27th Aug '18</Card.Meta>
              <Card.Meta><Icon name='pound' color='green'/> {data.costDescription}</Card.Meta>
              <Card.Description>{data.description}</Card.Description>
            </Card.Content>
          </Card>
        </Responsive>

        <Header as='h2'>
          Sign-up Form
          <Header.Subheader>Please fill out the form below and pay your deposit to sign up</Header.Subheader>
        </Header>

        <Responsive minWidth={1800}> {/* Hide side-rail from any screensize where it starts to be covered */}
          <Rail close position='left'>
           <Segment>
             <Header as={'h5'} textAlign='center'>You are signing up for...</Header>
             <Header as={'h2'} textAlign='center'>{data.name}</Header>
             <Header as={'h5'} textAlign='center'><Icon name='globe'/> Mendip Hills, Somerset</Header>
             <Header as={'h5'} textAlign='center'><Icon name='calendar' color='blue'/> 25th Aug '18 - 27th Aug '18</Header>
             <Header as={'h5'} textAlign='center'><Icon name='pound' color='green'/> {data.costDescription}</Header>
             <Divider/>
             {data.description}
           </Segment>
          </Rail>
        </Responsive>
        <Divider />

        <Elements locale='en'>
          <TripPaymentForm
            cost={data.costDeposit}
          />
        </Elements>
      </Container>
    )

  }
}

export default TripSignupPage
