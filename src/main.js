import React,{ Component } from 'react'
import {Header, Footer, Welcome} from './comps/part'

class Application extends Component{
    render (){
      return (
        <div>
          <Header />
          <div id="container" className="center-block">
          {this.props.children}
          </div>
        </div>
      )
    }
}

export default Application
