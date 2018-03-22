import React, { Component } from 'react'
import { Button, Container, Menu, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'home' }
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleLogoClick = this.handleLogoClick.bind(this)
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    handleLogoClick(e) {
        this.setState({ activeItem: 'home' })
    }

    render() {
        let activeItem = this.state.activeItem
        return (
            <div>
                <Segment inverted fixed='top'>
                    <Container>
                        <Menu inverted pointing secondary>
                            <Image as={Link} to='/' className='nav-logo' src='https://i.imgur.com/prbTzQs.png' onClick={this.handleLogoClick} />
                            <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                            <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                            <Menu.Item as={Link} to='/trips' name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick} />
                            <Menu.Menu position='right'>
                                <Button.Group>
                                    <Button inverted>Sign  Up</Button>
                                    <Button.Or />
                                    <Button inverted color='yellow'>Log In</Button>
                                </Button.Group>
                            </Menu.Menu>
                        </Menu>
                    </Container>
                </Segment>
            </div>
        )
    }
}

export default Navigation