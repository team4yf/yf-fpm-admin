import React,{ Component } from 'react'
import {Header, Footer, Welcome} from './comps/part'

class Application extends Component{
    render (){
      return (
        <div>
          <Header />
          <main>
            <div id="main" className="">
            {this.props.children}
            </div>
          
            <Footer />
          </main>
        </div>
      )
    }
}

export default Application
