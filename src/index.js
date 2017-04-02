import React,{ Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'

import {Application, App, User, Dashboard, Welcome, Smtp, TemplateList, TemplateEditor, ApiTester} from './comps'

import YF from 'yf-fpm-client-nodejs'

YF.init({mode:'PRODUCT', scope:'api', appkey:'123123', masterKey:'123123'})

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Application }>
      <IndexRoute component={ Welcome } />
      <Route path="/dashboard" component={ Dashboard } />
      <Route path="/apps" component={ App } />
      <Route path="/users" component={ User } />
      <Route path="/setting">
        <Route path="smtp" component={ Smtp } />
        <Route path="template">
          <IndexRoute component={ TemplateList } />
          <Route path="create" component={ TemplateEditor } />
        </Route>
      </Route>
      <Route path="/tools">
        <Route path="apiTester" component={ ApiTester } />
      </Route>
    </Route>
  </Router>
  ),
 document.getElementById('fpm'))
