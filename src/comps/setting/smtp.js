import React,{ Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import each from 'async/each'
import { TextField, Selector, Modal } from '../controls'
import { Panel } from '../common'

class Smtp extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isCreated: false,
      smtp: {
        server: 'qq',
        user: 'user',
        pass: 'pass'
      }
    }

  }

  componentDidMount(){
    let query = new YF.Query('fpm_setting')
    query.condition({scope: 'smtp'}).find()
      .then((data)=>{
        if (data.length < 1){
          // no data
          this.setState({isCreated: false})
        }else{
          let obj = {}
          data.forEach((item) =>{
            obj[item.name] = item.content
          })
          this.setState({isCreated: true, smtp: obj})
          this.refs.smtpServer.setValue(obj.server)
          this.refs.smtpUser.setValue(obj.user)
          this.refs.smtpAuth.setValue(obj.pass)
        }
      })
  }
  onSubmitHandler(e){
    e.preventDefault()
    this.refs.icon.style.display = 'inline'
    if(this.state.isCreated){
      //modify
      let rows = []
      if(this.refs.smtpServer.isChanged()){
        rows.push({ condition: "name='server' and scope='smtp'", row: {content: this.refs.smtpServer.getValue()}})
      }
      if(this.refs.smtpUser.isChanged()){
        rows.push({ condition: "name='user' and scope='smtp'", row: {content: this.refs.smtpUser.getValue()}})
      }
      if(this.refs.smtpAuth.isChanged()){
        rows.push({ condition: "name='pass' and scope='smtp'", row: {content: this.refs.smtpAuth.getValue()}})
      }
      if(rows.length < 1){
        swal('', 'nothing changed', 'warning')
        this.refs.icon.style.display = 'none'
        return false
      }
      each(
        rows, (item, callback) => {
          let query = new YF.Query('fpm_setting')
          query.first(item)
            .then( data => {
              return new YF.Object('fpm_setting', _.assign(data, item.row)).save()
            })
            .then( data => {
              callback()
            })
            .catch( err => {
              callback(err)
            })
      },(error) => {
        if(error){
          swal('', _.isString(error)? error: error.error , 'error')
        }else{
          //update ok
          this.refs.icon.style.display = 'none'
          Materialize.toast('Update Success!', 3000)
        }
      })
    }else{
      let row = [
        {scope: 'smtp', name: 'server', content: this.refs.smtpServer.getValue(), },
        {scope: 'smtp', name: 'user', content: this.refs.smtpUser.getValue(), },
        {scope: 'smtp', name: 'pass', content: this.refs.smtpAuth.getValue(), },
      ]
      let batch = new YF.Batch('fpm_setting')
      batch.insert(row)
        .then((data)=>{
          this.setState({isCreated: true })
          this.refs.icon.style.display = 'none'
        })
    }

  }

  render () {

    return (
      <div id="smtp" className="container">
        <Panel title="SMTP">
          <form className="form-horizontal" onSubmit={this.onSubmitHandler.bind(this)}>
            <TextField title="Server"
              default={this.state.smtp.server}
              ref="smtpServer"/>
            <TextField title="User"
              default={this.state.smtp.user}
              ref="smtpUser"
              placeholder="xxxxx@qq.com"/>
            <TextField title="AuthCode"
              default={this.state.smtp.pass}
              ref="smtpAuth"
              placeholder="Server Auth Code"/>
            <div className="form-group">
              <div className="col offset-s2 s10">
                <button type="text" className="btn"><span ref="icon" style={{display: 'none'}} ><i className="fa fa-spin fa-circle-o-notch"></i></span> Save</button>
              </div>
            </div>
          </form>
        </Panel>
      </div>
    )
  }
}

export default Smtp
