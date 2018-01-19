import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Button } from 'semantic-ui-react'

class App extends Component {
  render() {
    return ( 
      <div>
        <Link to='/'>
          <Button primary>
            Home
          </Button>
        </Link>

        <Link to='/about'>
          <Button>
            About
          </Button>
        </Link>

        <Switch>
          <Route exact path='/' component={Home}/>
         <Route path='/about' component={About}/>
        </Switch>
      </div>
    )
  }
}

const Home = (props) => {
  return (
      <div>
        <h2>Home</h2>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <h3>About</h3>
    </div>
  )
}

export default App
