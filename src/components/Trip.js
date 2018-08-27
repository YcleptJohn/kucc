import React, { Component } from 'react'
import { Item, Button, Icon, Grid, Divider, Header, Responsive } from 'semantic-ui-react'

class Trip extends Component {
  render () {
    const { data } = this.props
    // fixtureId
    // name
    // description
    // startDate
    // endDate
    // recurring
    // recurringText
    // costType
    // costDescription
    // costTotal
    // costDeposit
    // type
    // link
    // signupsOpenAt
    return (
      <div>
        <Responsive as={Item} maxWidth={799}>
          <Item.Content>
            <Item.Header>
              <Header as={'h2'}>{data.name}</Header>
            </Item.Header>
            <Item.Meta>
              <Icon name='globe' /> Mendip Hills, Somerset<br />
              <Icon name='calendar' /> 25th Aug '18 - 27th Aug '18<br />
              <Icon name='pound' /> {data.costDescription}<br />
            </Item.Meta>
            <Item.Description>
              {data.description}
            </Item.Description>
            <Header as={'h6'} textAlign='center'>Signups open 28th may</Header>
            <Item.Extra>
              <Button positive fluid disabled>
                Sign Up
                <Icon name='right chevron' />
              </Button>
            </Item.Extra>
          </Item.Content>
          {
            this.props.isLast
              ? null
              : <Divider />
          }
        </Responsive>
        <Responsive as={Item} minWidth={800}>
          <Item.Content>
            <Item.Header>
              <Grid>
                <Grid.Column width={5}>
                  <Header as={'h2'}>{data.name}</Header>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Header as={'h5'}><Icon name='calendar' color='blue' /> 25th Aug '18 - 27th Aug '18</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header as={'h5'}><Icon name='pound' color='green' /> {data.costDescription}</Header>
                </Grid.Column>
              </Grid>
            </Item.Header>
            <Item.Meta>
              <Icon name='globe' />Mendip Hills, Somerset
            </Item.Meta>
            <Item.Description>
              <Grid>
                <Grid.Column width={14}>
                  {data.description}
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button positive floated='right' disabled>
                    Sign Up
                    <Icon name='right chevron' />
                  </Button>
                  <Header as={'h6'} textAlign='center'>Signups open 28th may</Header>
                </Grid.Column>
              </Grid>
            </Item.Description>
          </Item.Content>
          {
            this.props.isLast
              ? null
              : <Divider />
          }
        </Responsive>
      </div>
    )
  }
}

export default Trip
