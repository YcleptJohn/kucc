import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import config from '../../config.js'

import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'

import MaintenancePage from './MaintenancePage.js'
import HomePage from './HomePage.js'
import TripsPage from './TripsPage.js'
import Navigation from '../components/Navigation.js'

class Router extends Component {
  render() {
    if(config.HIDE_SITE) {
      return(
        <div>
          <Switch>
            <Route path='*' component={MaintenancePage}/>
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact patch='/trips' component={TripsPage}/>
            <Route path='/comingsoon' component={MaintenancePage}/>
            <Route path='/test' component={ThemingLayout}/>
          </Switch>
        </div>
      )
    }
  }
}

const Home = (props) => {
  return (
      <div>
        <Link to='/'>
          <Button primary>Home *</Button>
        </Link>
        <Link to='/about'>
          <Button>About</Button>
        </Link>
        <h2>Home</h2>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <Link to='/'>
        <Button primary>Home</Button>
      </Link>
      <Link to='/about'>
        <Button>About *</Button>
      </Link>
      <h3>About</h3>
    </div>
  )
}

export default Router
