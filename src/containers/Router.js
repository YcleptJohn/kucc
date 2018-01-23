import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import MaintenancePage from './MaintenancePage.js'
import { Button } from 'semantic-ui-react'
import config from '../../config.js'

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
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/comingsoon' component={MaintenancePage}/>
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
