import React,{ Component } from 'react'
import _ from 'lodash'
import io from 'socket.io-client'
import { Icon } from '../../controls'
import YF from 'yf-fpm-client-nodejs'

class Raspberry extends Component {

  constructor(props) {
    super(props)
    this.state = {
      raspberry: []
    }
  }

  componentDidMount(){
    this.io = io('http://api.yunplus.io:80')
    this.io.on('connect', this._onConnect.bind(this))
    this.io.on('message', this._onMessage.bind(this))
    this.io.on('disconnect', this._onDisconnect.bind(this))
  }

  _onConnect(){
    console.log('connect')
  }

  _onMessage(data){
    let list = this.state.raspberry
    list.push(data)
    this.setState({
      raspberry: list
    })
  }

  _onDisconnect(){
    console.log('_onDisconnect')
  }

  onKeyUpHandler(e){
    if(e.key != 'Enter'){
      return
    }
    let command = this.refs['command'].value
    let func = new YF.Func('websocket.broadcast')
    func.invoke(JSON.parse(command))
      .then((data)=>{
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s12">
            <input id="command" placeholder="command" ref="command" onKeyUp={ this.onKeyUpHandler.bind(this)}/>
            
          </div>
        </div>
        <ul className="collection with-header">
          <li className="collection-header"><h4>Raspberry</h4></li>
          {
            this.state.raspberry.map( (r, i) => {
              return (
              <li key={ 'item-' + i} className="collection-item">{r.ip}
                <span className="secondary-content"><Icon className="green">circle</Icon></span>
              </li>)
            })
          }
            
        </ul>
        
      </div>
    )

  }

}

export { Raspberry }