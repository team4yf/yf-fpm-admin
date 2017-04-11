import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Nav, Header, Footer, Welcome } from './part'
import App from './apps'
import User from './users'
import { Login } from './login'
import { Dashboard } from './dashboard'
import { Smtp, TemplateList, TemplateEditor } from './setting'
import { CollectionList, CollectionEditor } from './collection'
import { VrList, VrEditor } from './vr'
import { ApiTester } from './tools'

class Application extends Component{
  constructor(props) {
    super(props)
  }

  getUserInfo(){
    return JSON.parse(localStorage.getItem('__USER__'))
  }

  isLogin(){
    let user = this.getUserInfo()
    if(user){
      return user.name
    }else{
      return false
    }
  }

  componentDidMount(){
    if(!this.isLogin()){
      browserHistory.push('/login')
    }
  }

  render (){
    return (
      <div>
        <Header />
        <Nav />
        <main>
          <div id="main" className="page-content">
          {this.props.children}
          </div>
        </main>
      </div>
    )
  }
}

export {Application, Login, App, User, Dashboard, Welcome, Smtp, CollectionList, CollectionEditor, TemplateList, TemplateEditor, ApiTester, VrList, VrEditor}

