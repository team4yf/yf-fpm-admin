import React,{ Component } from 'react'
import { Link } from 'react-router'
import Header from './header'

const Footer = React.createClass({
  render: () => {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom footer">
        <p className="text-right">&copy;CopyRight 2017-2018 Powered Wangfan@YunPlus.io </p>
      </nav>
    )
  }
})

const Welcome = React.createClass({
  render: () => {
    return (
      <div className="jumbotron bg-success">
        <h1>Hello, world!</h1>
        <p>...</p>
        <p><a className="btn btn-primary btn-lg" href="dashboard.html" role="button">Learn more</a></p>
      </div>
    )
  }
})

export {Footer, Header, Welcome}
