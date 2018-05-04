import React, { Component } from 'react'
import { Segment, List } from 'semantic-ui-react'

class Footer extends Component {
  render () {
    return (
      <Segment inverted textAlign='center'>
        <List inverted horizontal divided relaxed>
          <List.Item>
            Contact Us
          </List.Item>
          <List.Item>
            Privacy Policy
          </List.Item>
          <List.Item>
            {this.props.mobile ? 'Terms' : 'Terms and Conditions'}
          </List.Item>
        </List>
      </Segment>
    )
  }
}

export default Footer
