import React, { Component } from 'react'
import { Button, Container, Menu, Segment, Image, Responsive, Sidebar, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'home',
      mobileLogoRedirect: false,
      showMobileSidebar: false,
      children: this.props.children
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this)
    this.getMenuMarkup = this.getMenuMarkup.bind(this)
  }

  handleItemClick (e, { name }) {
    this.setState({ activeItem: name, showMobileSidebar: false })
  }

  handleLogoClick () {
    this.setState({ activeItem: 'home' })
  }

  toggleMobileSidebar () {
    this.setState({showMobileSidebar: !this.state.showMobileSidebar})
  }

  getMenuMarkup () {
    return (
      <Menu inverted pointing secondary>
        <Image as={Link} to='/' className='nav-logo' src='https://i.imgur.com/prbTzQs.png' onClick={this.handleLogoClick} />
        <Menu.Item as={Link} to='/' name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/trips' name='trips' active={this.state.activeItem === 'trips'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Button.Group>
            <Button inverted>Sign  Up</Button>
            <Button.Or />
            <Button inverted color='yellow'>Log In</Button>
          </Button.Group>
        </Menu.Menu>
      </Menu>
    )
  }

  render () {
    let activeItem = this.state.activeItem
    return (
      <div>
        <Responsive minWidth={800}>
          <Segment basic inverted fixed='top'>
            <Container>
              {this.getMenuMarkup()}
            </Container>
          </Segment>
          {this.props.children}
        </Responsive>
        <Responsive as={Segment} basic maxWidth={799} inverted fixed='top'>
          <Image className='nav-logo-mobile' size='tiny' floated='left' src='https://i.imgur.com/prbTzQs.png' />
          <Button icon='sidebar' floated='right' onClick={this.toggleMobileSidebar} /><br /><br />
        </Responsive>
        <Responsive maxWidth={799}>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='slide along' width='thin' visible={this.state.showMobileSidebar} icon='labeled' vertical inverted>
              <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
              <Menu.Item as={Link} to='/trips' name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick} />
              <Divider inverted />
              <Menu.Menu position='right'>
                <Button.Group>
                  <Button inverted>Sign  Up</Button>
                  <Button.Or />
                  <Button inverted color='yellow'>Log In</Button>
                </Button.Group>
              </Menu.Menu>
            </Sidebar>
            <Sidebar.Pusher>
              {this.state.children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Responsive>
      </div>
    )
  }
}

export default Navigation
