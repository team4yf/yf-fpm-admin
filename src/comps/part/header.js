import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import Nav from './nav'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header id="top-bar">
        <div className="navbar-fixed">
          <nav className="blue">
            <div className="nav-wrapper">
              <div className="logo-wrapper center-align left">
                <Link to="/" className="">FPM-ADMIN</Link>
              </div>
              <ul className="right col s9 m3 nav-right-menu">
                <li>
                  <a className="dropdown-button dropdown-right" href="#" data-activates="dropdown">
                    <i className="fa fa-user"></i> Admin
                  </a>
                  
                  <ul id="dropdown" className="dropdown-content profile-dropdown">
                    <li><a href="#!">Profile</a></li>
                    <li><a href="#!">Settings</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Logout</a></li>
                  </ul>
                </li>
              </ul>

              {/*<form className="right search col s6 hide-on-med-and-down">
                <div className="input-field">
                  <input id="search" type="search" placeholder="Search" autocomplete="off" />
                  <label htmlFor="search" className="active">
                    <i className="fa fa-search">search</i>
                  </label>
                </div>
              </form>*/}

            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
