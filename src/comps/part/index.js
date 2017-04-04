import React,{ Component } from 'react'
import { Link } from 'react-router'
import Header from './header'


const Footer = React.createClass({
  render: () => {
    return (
      <footer className="page-footer grey darken-1">
        <div className="container grey darken-1">
          <div className="row grey darken-1">
            <div className="col l6 s12">
              <h5 className="white-text">Thanks</h5>
              <p className="grey-text text-lighten-4">1. you can create an <a className="grey-text text-lighten-1" target="_blank" href="https://github.com/team4yf/yf-fpm-admin/issues">ISSUES</a> if you find any bugs or ideas</p>
              <p className="grey-text text-lighten-4">2. visit our <a className="grey-text text-lighten-1" target="_blank" href="http://blog.yunplus.io">BLOG</a> for more infomations </p>
              <p className="grey-text text-lighten-4">3. improve this with us <a className="grey-text text-lighten-1" target="_blank" href="https://github.com/team4yf/yf-fpm-admin/pulls">PULLS</a> .We are waiting for you </p>
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
      <div className="">
        <div className="welcome blue darken-1 white-text ">
          <div className="container ">
            <div className="row">
              <h3>FAST PLATFORM ADMIN</h3>
            </div>
            <div className="row">
              <h5>This is an common admin build on react,react-router</h5>
            </div>
            <div className="row center">
              <Link to="/dashboard" className="btn-large blue lighten-2">Get Start</Link>
            </div>
            <p className="right-align">Easy to Build An Admin UI</p>
          </div>
        </div>
        <div className="container ">
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
        <Footer />
      </div>
    )
  }
})

export {Footer, Header, Welcome}
