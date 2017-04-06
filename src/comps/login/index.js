import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import YF from 'yf-fpm-client-nodejs'

import { TextField, Selector, Modal } from '../../controls'

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
    }
  }

  componentDidMount(){

  }

  onSubmitHandler(e){
    e.preventDefault()
    localStorage.setItem('__USER__', JSON.stringify({name:'abc'}))
    browserHistory.push('/')
  }

  render (){
    return (
      <div className="">
        <div className="container margin-top-5em login-form">
          <h2 className="center"><b>Welcome</b></h2>
          <form className="white padding-3em form-horizontal" onSubmit={this.onSubmitHandler.bind(this)} >
            <TextField title="Username"
              ref="username"/>
            <TextField title="Password"
              ref="password"
              type="password"/>

            <div className="col ">
              <button type="submit" className="waves-effect waves-light btn btn-large block">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export { Login }