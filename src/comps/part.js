import React,{ Component } from 'react'
import { Link } from 'react-router'
import Header from './header'

const Footer = React.createClass({
  render: () => {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom footer blue-grey lighten-4 ">
        <p className="right-align container">&copy;CopyRight 2017-2018 Powered Wangfan@YunPlus.io </p>
      </nav>
    )
  }
})

const Welcome = React.createClass({
  render: () => {
    return (
      <div className="container">
        <h1>Welcome You</h1>
        <p>This is the admin for the fpm-server,you can do more things with it</p>
        <p><Link to="/dashboard" className="btn">Lets Start</Link></p>
      </div>
    )
  }
})

export {Footer, Header, Welcome}
