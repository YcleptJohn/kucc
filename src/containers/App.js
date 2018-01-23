import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Router from './Router.js'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='*' component={Router}/>
        </Switch>
      </div>
    )
  }
}

export default App
