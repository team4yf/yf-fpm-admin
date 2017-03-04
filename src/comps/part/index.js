import React,{ Component } from 'react'
import { Link } from 'react-router'
import Header from './header'

const Footer = React.createClass({
  render: () => {
    return (
      <footer className="page-footer grey darken-3">
        <div className="container grey darken-3">
          <div className="row grey darken-3">
            <div className="col l6 s12">
              <h5 className="white-text">Thanks</h5>
              <p className="grey-text text-lighten-4">1. you can create an <a className="grey-text text-darken-1" target="_blank" href="https://github.com/team4yf/yf-fpm-admin/issues">ISSUES</a> if you find any bugs or ideas</p>
              <p className="grey-text text-lighten-4">2. visit our <a className="grey-text text-darken-1" target="_blank" href="http://blog.yunplus.io">BLOG</a> for more infomations </p>
              <p className="grey-text text-lighten-4">3. improve this with us <a className="grey-text text-darken-1" target="_blank" href="https://github.com/team4yf/yf-fpm-admin/pulls">PULLS</a> .We are waiting for you </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="http://blog.yunplus.io">Blog</a></li>
                <li><a className="grey-text text-lighten-3" href="https://github.com/team4yf/yf-fpm-admin">GitHub</a></li>
                <li><a className="grey-text text-lighten-3" href="http://www.yunplus.io">YunPlus.IO</a></li>
                <li><a className="grey-text text-lighten-3" href="https://github.com/team4yf/yf-fpm-server">FPM-Server</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2017 Copyright YunPlus.IO
          </div>
        </div>
      </footer>
    )
  }
})

const Welcome = React.createClass({
  render: () => {
    return (
      <div className="container">
        <h1>Welcome You</h1>
        <h6>This is the admin for the fpm-server,you can do more things with it.<Link to="/dashboard" className="btn">Lets Start</Link></h6>
        <h2>Colors</h2>
        <p>Using Materials Colors : <a className="waves-effect waves-light btn blue lighten-2" target="_blank" href="http://www.materialscss.com/color">http://www.materialscss.com/color</a></p>
        <h2>ICons</h2>
        <p>Using font-awesome@4.7.0 : <a className="waves-effect waves-light btn teal darken-4" target="_blank" href="http://fontawesome.dashgame.com/">http://fontawesome.dashgame.com/</a></p>
        <h2>Webpack</h2>
        <h2>React</h2>
        <h2>React-Router</h2>
        <h2>FPM-Server</h2>
        <h2>FPM-Client4Node</h2>
        <h2>SweetAlert</h2>
      </div>
    )
  }
})

export {Footer, Header, Welcome}
