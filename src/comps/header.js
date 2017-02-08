import React,{ Component } from 'react'
import { Link } from 'react-router'

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
              <a className="navbar-brand" href="/">FPM Admin</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
                <li><Link to="/apps" activeClassName="active">Apps</Link></li>
                <li><Link to="/apps" activeClassName="active">Users</Link></li>
                <li><Link to="/apps" activeClassName="active">DataSet</Link></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">Setting <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Email</a></li>
                    <li><a href="#">Notification</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Sechdual</a></li>
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

export default Header
