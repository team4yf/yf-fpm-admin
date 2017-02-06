import React,{ Component } from 'react'
import {Header, Footer, Welcome} from './comps/part'
import App from './comps/app'

class Application extends Component{
    render (){
      return (
        <div>
          <Header />
          <div className="center-block">
          {this.props.children}
          </div>
          <Footer />
        </div>
      )
    }
}

export default Application
