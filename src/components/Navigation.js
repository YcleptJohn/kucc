import React, { Component } from 'react'
import { Button, Container, Menu, Segment, Image, Responsive, Sidebar, Divider, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from './Footer.js'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'n/a',
      mobileLogoRedirect: false,
      showMobileSidebar: false
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this)
    this.getMenuMarkup = this.getMenuMarkup.bind(this)
    this.updateLoginState = this.updateLoginState.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.props.registerLoginStateListenerFn(this.updateLoginState)
  }

  componentWillMount () {
    this.updateLoginState()
  }

  updateLoginState () {
    this.setState({
      user: cookies.get('kucc') ? JSON.parse(Buffer.from(cookies.get('kucc'), 'base64').toString('utf-8')).user : null
    })
  }

  handleLogoutClick () {
    cookies.remove('kucc')
    this.updateLoginState()
    window.location.replace('/logout')
  }

  handleItemClick (e, { name }) {
    if (!name) return this.setState({ activeItem: null })
    this.setState({ activeItem: name, showMobileSidebar: false })
  }

  handleLogoClick () {
    this.setState({ activeItem: 'home' })
  }

  toggleMobileSidebar () {
    this.setState({showMobileSidebar: !this.state.showMobileSidebar})
  }

  getMenuMarkup (platform) {
    if (platform === 'mobile') {
      return (
        <Sidebar as={Menu} animation='slide along' width='thin' visible={this.state.showMobileSidebar} icon='labeled' vertical inverted borderless>
          <Menu.Item as={Link} to='/' name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/committee' name='committee' active={this.state.activeItem === 'committee'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/trips' name='trips' active={this.state.activeItem === 'trips'} onClick={this.handleItemClick} />
          <Divider inverted />
          {
            this.state.user
              ? <Menu.Menu position='right'>
                <Menu.Item header>Logged in as {this.state.user.forename}</Menu.Item>
                <Menu.Item name='Resources' onClick={() => window.alert('This feature is currently unavailable')} />
                <Menu.Item name='Log out' onClick={this.handleLogoutClick} />
              </Menu.Menu>
              : <Menu.Menu position='right'>
                <Menu.Item as={Link} to='/signup' name='sign up' active={this.state.activeItem === 'sign up'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/login' name='log in' active={this.state.activeItem === 'log in'} onClick={this.handleItemClick} />
              </Menu.Menu>
          }
        </Sidebar>
      )
    }
    return (
      <Menu inverted pointing secondary>
        <Image as={Link} to='/' className='nav-logo' src='/img/logo.png' onClick={this.handleLogoClick} />
        <Menu.Item as={Link} to='/' name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/committee' name='committee' active={this.state.activeItem === 'committee'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/trips' name='trips' active={this.state.activeItem === 'trips'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          {
            this.state.user
              ? <Dropdown pointing item text={this.state.user.forename + ' ' + this.state.user.surname}>
                <Dropdown.Menu>
                  <Dropdown.Item icon='file archive outline' text='Resources' onClick={() => window.alert('This feature is currently unavailable')} />
                  <Dropdown.Item icon='log out' text='Log out' onClick={this.handleLogoutClick} />
                </Dropdown.Menu>
              </Dropdown>
              : <Button.Group>
                <Button inverted onClick={this.handleItemClick} as={Link} to='/signup'>Sign Up</Button>
                <Button.Or />
                <Button inverted color='yellow' onClick={this.handleItemClick} as={Link} to='/login'>Log In</Button>
              </Button.Group>
          }
        </Menu.Menu>
      </Menu>
    )
  }

  render () {
    return (
      <div>
        <Responsive minWidth={800} className='flexWrap'>
          <Segment basic inverted fixed='top'>
            <Container>
              {this.getMenuMarkup('desktop')}
            </Container>
          </Segment>
          <div className='contentWrap'>
            {this.props.children}
          </div>
          <Footer />
        </Responsive>
        <Responsive as={Segment} basic maxWidth={799} inverted fixed='top'>
          <Image className='nav-logo-mobile' size='tiny' floated='left' src='/img/logo.png' />
          <Button icon='sidebar' floated='right' onClick={this.toggleMobileSidebar} /><br /><br />
        </Responsive>
        <Responsive maxWidth={799} className='flexWrap'>
          <Sidebar.Pushable as={Segment}>
            {this.getMenuMarkup('mobile')}
            <Sidebar.Pusher>
              <div className='contentWrap'>
                {this.props.children}
              </div>
              <Footer mobile />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Responsive>
      </div>
    )
  }
}

export default Navigation
