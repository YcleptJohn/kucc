import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Router from './Router.js'

class App extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route path='*' component={Router} />
        </Switch>
      </div>
    )
  }
}

export default App
