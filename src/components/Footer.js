import React, { Component } from 'react'
import { Segment, List, Modal, Header, Button, Icon, Image } from 'semantic-ui-react'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showContactUs: false,
      showPrivacyPolicy: false,
      showTerms: false
    }
  }

  open (modalName) {
    modalName = modalName.toLowerCase()
    if (modalName === 'contactus') this.setState({ showContactUs: true })
    if (modalName === 'privacypolicy') this.setState({ showPrivacyPolicy: true })
    if (modalName === 'terms') this.setState({ showTerms: true })
  }

  close (modalName) {
    modalName = modalName.toLowerCase()
    if (modalName === 'contactus') this.setState({ showContactUs: false })
    if (modalName === 'privacypolicy') this.setState({ showPrivacyPolicy: false })
    if (modalName === 'terms') this.setState({ showTerms: false })
  }

  getContactUsModal () {
    return (
      <Modal open={this.state.showContactUs} onClose={() => { this.close('ContactUs') }}>
        <Modal.Header>Contact Us <Icon name='comments' /></Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Header>Email</Header>
            <List>
              <List.Item>
                <Image avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <List.Content>
                  <List.Header as='a' href='mailto:tripsec@kentcaving.co.uk'>President</List.Header>
                  <List.Description>
                    John Taylor
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <List.Content>
                  <List.Header as='a' href='mailto:tripsec@kentcaving.co.uk'>Secretary</List.Header>
                  <List.Description>
                    Elif Okutan
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <List.Content>
                  <List.Header as='a' href='mailto:tripsec@kentcaving.co.uk'>Trip Secretary</List.Header>
                  <List.Description>
                    Helen Felemegos
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <List.Content>
                  <List.Header as='a' href='mailto:tripsec@kentcaving.co.uk'>Social Secretary</List.Header>
                  <List.Description>
                    Thomas Mcneil
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <List.Content>
                  <List.Header as='a' href='mailto:tripsec@kentcaving.co.uk'>Treasurer</List.Header>
                  <List.Description>
                    Alex Colenutt
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => { this.close('ContactUs') }}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  getPrivacyPolicyModal () {
    return (
      <Modal open={this.state.showPrivacyPolicy} onClose={() => { this.close('PrivacyPolicy') }}>
        <Modal.Header>Privacy Policy <Icon name='spy' /></Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Header>Data Collection</Header>
            <p>We collect and store only information that is imperative to the function of the site. No tracking, no nonsense.</p>
            <Header>Data Retention</Header>
            <p>The small amount of data we do ask for is kept indefinitely because it's necessary to maintain an account. You can delete your account entirely at any time, here.</p>
            <Header>Your Right To Be Forgotten</Header>
            <p>With full respect of your right to be forgotten deleting your account here will remove all information we hold about you.</p>
            <Header>Data Usage</Header>
            <p>All data that we do hold is only used by us and for the purposes of the sites core functionality. Information will never be sold to a 3rd party to swing an election.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => { this.close('PrivacyPolicy') }}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  getTermsModal () {
    return (
      <Modal open={this.state.showTerms} onClose={() => { this.close('Terms') }}>
        <Modal.Header>Terms &amp; Conditions <Icon name='law' /></Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Header>Deposit Collection</Header>
            <p>When signing up for a trip we will collect a deposit online. Anyone who is selected for the trip will have this discounted from their trip price.</p>
            <p><strong>If you have to drop out</strong> of a trip you've been placed on then your deposit will <strong>only</strong> be returned if your space gets filled by someone else.</p>
            <p>This is unfortunately necessary to cover the costs of transport, accommodation, food and equipment over the weekend in the event of dropouts.</p>
            <p><strong>If you don't get selected for a trip</strong> that you applied for due to space limitations you will be automatically refunded.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => { this.close('Terms') }}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  render () {
    return (
      <Segment inverted textAlign='center'>
        <List inverted horizontal divided relaxed>
          <List.Item className='underline-hover' onClick={() => { this.open('ContactUs') }}>
            Contact Us
          </List.Item>
          <List.Item className='underline-hover' onClick={() => { this.open('PrivacyPolicy') }}>
            Privacy Policy
          </List.Item>
          <List.Item className='underline-hover' onClick={() => { this.open('Terms') }}>
            {this.props.mobile ? 'Terms' : 'Terms and Conditions'}
          </List.Item>
        </List>
        {this.getContactUsModal()}
        {this.getPrivacyPolicyModal()}
        {this.getTermsModal()}
      </Segment>
    )
  }
}

export default Footer
