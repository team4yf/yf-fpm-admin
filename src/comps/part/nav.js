import React,{ Component } from 'react'
import { Link, IndexLink } from 'react-router'

class CollapsibleNav extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>
        <div className="collapsible-header"><i className={"left icon fa fa-" + this.props.icon}></i> {this.props.title} <i className="right icon fa fa-plus"></i></div>
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
      <li>
        <Link to={this.props.to} className="collapsible-header waves-effect waves-blue" activeClassName="active">
          <i className={"fa fa-" + this.props.icon}></i> {this.props.children}
        </Link>
      </li>
    )
  }
}

class Nav extends Component{

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <aside id="nav-mobile" className="side-nav fixed" >
        <ul className="sidebar-menu">
          <li>
            <ul className="collapsible" data-collapsible="accordion">
              <li className="nav-title">Main Navi</li>
              <NavLink to="/dashboard" icon="dashboard">Dashboard</NavLink>
              <NavLink to="/apps" icon="tasks">Apps</NavLink>
              <NavLink to="/users" icon="user-circle-o">Users</NavLink>

              <li className="nav-title">VR Navi</li>
              <NavLink to="/vr" icon="street-view">VR</NavLink>

              <li className="nav-title">Extra Navi</li>
              <CollapsibleNav icon="wrench" title="Tool">
                <NavLink to="/tools/apiTester" icon="plug">ApiTester</NavLink>
                <NavLink href="#!" icon="paper-plane">Pusher</NavLink>
              </CollapsibleNav> 
              <CollapsibleNav icon="cog" title="Setting">
                <NavLink to="/setting/smtp" icon="send-o">Smtp</NavLink>
                <NavLink to="/setting/template" icon="file-text">Template</NavLink>
                <NavLink to="/setting/collection" icon="list">Collection</NavLink>
              </CollapsibleNav>
            </ul>
          </li>
          
        </ul>
        <div className="nav-footer">
          <ul>
            <li className="left"><a className="center-block" href="">FPM</a></li>
            <li className="left"><a className="center-block" href="">v0.0.1</a></li>
          </ul>
          <div className="clearfix"></div>
        </div>
      </aside>
    )
  }
}

export default Nav
