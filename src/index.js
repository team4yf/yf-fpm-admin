import React,{ Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'
import Main from './main'
import App from './comps/apps'
import {Welcome} from './comps/part'
import Dashboard from './comps/dashboard'
import { Smtp, Template } from './comps/setting'
import User from './comps/users'
import { ApiTester } from './comps/tools'
import YF from 'yf-fpm-client-nodejs'
YF.init({mode:'PRODUCT', scope:'api', appkey:'123123', masterKey:'123123'})

render((
  <Router history={ hashHistory }>
    <Route path="/" component={Main}>
      <IndexRoute component={Welcome} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/apps" component={App} />
      <Route path="/users" component={User} />
      <Route path="/setting">
        <Route path="smtp" component={ Smtp } />
        <Route path="template" component={ Template } />
      </Route>
      <Route path="/tools">
        <Route path="apiTester" component={ ApiTester } />
      </Route>
    </Route>
  </Router>
  ),
 document.getElementById('fpm'))
