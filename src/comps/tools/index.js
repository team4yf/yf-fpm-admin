import React,{ Component } from 'react'
import ApiTester from './api-tester'

class Tools extends Component{
    render (){
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
}

export { ApiTester ,Tools }
