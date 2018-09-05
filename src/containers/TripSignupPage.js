import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { Container, Segment, Rail, Header, Icon, Divider } from 'semantic-ui-react'

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
      res = await fetch(`/api/fixtures/get/${this.props.match.params.tripId}`)
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
        <div>Failed to query db</div>
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
        <Header as='h2'>
          Sign-up for {data.name}
          <Header.Subheader>Please fill out the form below and pay your deposit to sign up</Header.Subheader>
        </Header>

        <Rail close position='left'>
         <Segment>
           <Header as={'h2'} textAlign='center'>{data.name}</Header>
           <Header as={'h5'} textAlign='center'><Icon name='globe'/> Mendip Hills, Somerset</Header>
           <Header as={'h5'} textAlign='center'><Icon name='calendar' color='blue'/> 25th Aug '18 - 27th Aug '18</Header>
           <Header as={'h5'} textAlign='center'><Icon name='pound' color='green'/> {data.costDescription}</Header>
           <Divider/>
           {data.description}
         </Segment>
       </Rail>
       <Divider />
      </Container>
    )

  }
}

export default TripSignupPage
