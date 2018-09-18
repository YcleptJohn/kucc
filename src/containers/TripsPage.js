import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import TripTile from '../components/TripTile.js'
import { Container, Segment, Item, Divider } from 'semantic-ui-react'

class TripsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        trips: []
      },
      queryComplete: false,
      queryFailed: false
    }
  }

  async componentWillMount () {
    let res
    try {
      res = await fetch('/api/fixtures/getAll?token=' + process.env.API_TOKEN)
      if (res.status !== 200) throw new Error('API request failed')
      let arr = await res.json()
      this.setState({
        data: {
          trips: [].concat(arr, arr, arr)
        }
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
    if (this.state.queryFailed) {
      return (
        <div>
          <p>Failed to query db</p>
        </div>
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
        <Divider horizontal>Autumn Term</Divider>
        <Item.Group>
          {this.state.data.trips.map((trip, i) => <TripTile key={i} data={trip} isLast={i === (this.state.data.trips.length - 1)}/>)}
        </Item.Group>
        <Divider horizontal>Spring Term</Divider>
        <Item.Group>
          {this.state.data.trips.map((trip, i) => <TripTile key={i} data={trip} isLast={i === (this.state.data.trips.length - 1)}/>)}
        </Item.Group>
      </Container>
    )
  }
}

export default TripsPage
