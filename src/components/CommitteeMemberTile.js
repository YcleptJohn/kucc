import React, { Component } from 'react'
import { Container, Segment, Responsive, Card, Icon, Image, Label, Divider } from 'semantic-ui-react'

class CommitteeMemberTile extends Component {
  render () {
    const { data } = this.props
    return (
      <Card>
        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
        <Card.Header>{data.name}</Card.Header>
        {data.roles.map((d, i) => <Card.Meta key={data.name + '-role-' + i}>{d}</Card.Meta>)}
        <Divider/>
        <Card.Description>{data.description}</Card.Description>
        <Card.Content extra>
          <Icon name='envelope'/>
          <Icon name='facebook'/>
        </Card.Content>
      </Card>
    )
  }
}

export default CommitteeMemberTile
