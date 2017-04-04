import React, { Component } from 'react'
import { Header, Footer, Welcome } from './part'
import App from './apps'
import User from './users'
import { Dashboard } from './dashboard'
import { Smtp, TemplateList, TemplateEditor } from './setting'
import { CollectionList, CollectionEditor } from './collection'
import { ApiTester } from './tools'

class Application extends Component{
  render (){
    return (
      <div>
        <Header />
        <main>
          <div id="main" className="">
          {this.props.children}
          </div>
        </main>
      </div>
    )
  }
}

export {Application, App, User, Dashboard, Welcome, Smtp, CollectionList, CollectionEditor, TemplateList, TemplateEditor, ApiTester}

