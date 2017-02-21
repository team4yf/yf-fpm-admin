import React,{ Component } from 'react'
import { Link } from 'react-router'

const Header = React.createClass({
  render: () => {
    return (
      <div className="navbar-fixed" id="header">
        <nav>
          <div className="nav-wrapper blue-grey darken-1">
            <a href="#!" className="left brand">FPM Admin</a>

            <ul className="left hide-on-med-and-down">
              <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
              <li><Link to="/apps" activeClassName="active">Apps</Link></li>
              <li><Link to="/users" activeClassName="active">Users</Link></li>
              <li><Link to="/setting" activeClassName="active">Setting</Link></li>
              <li><Link to="/tools" activeClassName="active">Tools</Link></li>
            </ul>

            <ul id="dropdown1" className="dropdown-content">
              <li><a href="#!">Profile</a></li>
              <li><a href="#!">Config</a></li>
              <li className="divider"></li>
              <li><a href="#!">Logout</a></li>
            </ul>

            <ul className="right hide-on-med-and-down">
              <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Admin
                  <i className="fa fa-caret-down right"></i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
})

export default Header
