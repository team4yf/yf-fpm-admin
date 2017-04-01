import React,{ Component } from 'react'
import { Link, IndexLink } from 'react-router'

class CollapsibleNav extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>
        <div className="collapsible-header">{this.props.title}</div>
        <div className="collapsible-body">
          <ul>
            {this.props.children}
          </ul>
        </div>
      </li>
    )
  }
}

class NavLink extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li><Link to={this.props.to} className="collapsible-header waves-effect waves-teal" activeClassName="active">{this.props.children}</Link></li>
    )
  }
}

class Nav extends Component{

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <ul id="nav-mobile" className="side-nav fixed" >
        <li className="logo">
          <a id="logo-container" 
            href="/" 
            className="brand-logo block blue-text grey lighten-3 center-align">FPM Admin</a>
        </li>
        <li>
          <ul className="collapsible" data-collapsible="accordion">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/apps">Apps</NavLink>
            <NavLink to="/users">Users</NavLink>
            <CollapsibleNav title="Setting">
              <NavLink to="/setting/smtp">Smtp</NavLink>
              <NavLink to="/setting/template">Template</NavLink>
            </CollapsibleNav>
            <CollapsibleNav title="Tool">
              <NavLink to="/tools/apiTester">ApiTester</NavLink>
              <NavLink href="#!">Pusher</NavLink>
            </CollapsibleNav> 
          </ul>
        </li>
      </ul>
    )
  }
}

export default Nav
