import React, { Component } from 'react'
import { Dimmer, Header, Divider, Icon } from 'semantic-ui-react'

class MaintenancePage extends Component {
  render () {
    return (
      <Dimmer
        active
        page
      >
        <Header as='h2' icon inverted>
          KUCC's new website is coming very soon!
          <Header.Subheader>In the meantime please keep up to date with the club on our facebook page below!</Header.Subheader>
        </Header>
        <Divider horizontal />
        <a href='https://www.facebook.com/groups/363156430381405/'>
          <Icon name='facebook f' size='huge' color='blue' circular inverted />
        </a>
      </Dimmer>
    )
  }
}

export default MaintenancePage
