import React from 'react'
import ReactDOM from 'react-dom'
import Router from './containers/Router.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
  , document.getElementById('appContainer'))
