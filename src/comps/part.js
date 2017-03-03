import React,{ Component } from 'react'
import { Link } from 'react-router'
import Header from './header'

const Footer = React.createClass({
  render: () => {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom footer blue-grey lighten-4 ">
        <p className="right-align container">&copy;CopyRight 2017-2018 Powered Wangfan@YunPlus.io </p>
      </nav>
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
