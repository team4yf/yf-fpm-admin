import React,{ Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Main from './main'
import App from './comps/app'
import {Welcome} from './comps/part'

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="/welcome" component={Welcome} />
      <Route path="/apps" component={App} />
    </Route>
  </Router>
  ),
 document.getElementById('fpm'))
