import React,{ Component } from 'react'
import { Link } from 'react-router'

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

const Header = React.createClass({
  render: () => {
    return (
      <div id="header">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html">FPM Admin</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/welcome" activeClassName="active">dashboard</Link></li>
                <li><Link to="/apps" activeClassName="active">Apps</Link></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">List</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Create New One</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav pull-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Setting</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
})
export {Footer, Header, Welcome}
