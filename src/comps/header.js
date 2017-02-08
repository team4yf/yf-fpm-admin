import React,{ Component } from 'react'
import { Link } from 'react-router'

const Header = React.createClass({
  render: () => {
    return (
      <div id="header">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">FPM Admin</a>
            </div>

            <div className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
                <li><Link to="/apps" activeClassName="active">Apps</Link></li>
                <li><Link to="/users" activeClassName="active">Users</Link></li>
                <li><Link to="/setting" activeClassName="active">Setting</Link></li>
              </ul>


            </div>
          </div>
        </nav>
      </div>
    )
  }
})

export default Header
