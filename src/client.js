import React from 'react'
import ReactDOM from 'react-dom'
import Router from './containers/Router.js'
import { BrowserRouter } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(
  <StripeProvider apiKey={process.env.STRIPE_TOKEN}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StripeProvider>
  , document.getElementById('appContainer'))
