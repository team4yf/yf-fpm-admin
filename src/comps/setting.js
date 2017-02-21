import React,{ Component } from 'react'
import { Link } from 'react-router'
import { TextField, Selector, Modal } from './controls'
import { Panel } from './common'
import fetchData from '../model/fpm-api'
import _ from 'lodash'
import each from 'async/each';

class Setting extends Component{
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
    fetchData('common.find', {table: 'fpm_setting', condition:"scope='smtp'"})
      .then((data)=>{
        if (data.data.length < 1){
          // no data
          this.setState({isCreated: false})
        }else{
          let obj = {}
          data.data.forEach((item) =>{
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
    const _now = _.now()
    if(this.state.isCreated){
      //modify
      let rows = []
      if(this.refs.smtpServer.isChanged()){
        rows.push({ condition: "name='server' and scope='smtp'", row: {content: this.refs.smtpServer.getValue(), updateAt: _now}})
      }
      if(this.refs.smtpUser.isChanged()){
        rows.push({ condition: "name='user' and scope='smtp'", row: {content: this.refs.smtpUser.getValue(), updateAt: _now}})
      }
      if(this.refs.smtpAuth.isChanged()){
        rows.push({ condition: "name='pass' and scope='smtp'", row: {content: this.refs.smtpAuth.getValue(), updateAt: _now}})
      }
      if(rows.length < 1){
        swal('', 'nothing changed', 'warning')
        this.refs.icon.style.display = 'none'
        return false
      }
      each(
        rows, (item, callback) => {
          fetchData('common.update',_.assign(item, { table: 'fpm_setting'}) )
            .then((data)=>{
              callback()
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
      let arg = {
      　table: 'fpm_setting',
      　row:[
          {scope: 'smtp', name: 'server', content: this.refs.smtpServer.getValue(), createAt: _now, updateAt: _now},
          {scope: 'smtp', name: 'user', content: this.refs.smtpUser.getValue(), createAt: _now, updateAt: _now},
          {scope: 'smtp', name: 'pass', content: this.refs.smtpAuth.getValue(), createAt: _now, updateAt: _now},
        ]
      }
      fetchData('common.create', arg)
        .then((data)=>{
          this.setState({isCreated: true })
          this.refs.icon.style.display = 'none'
        })
    }

  }

  render () {

    return (
      <div>
        <div id="smtp">
          <h4>Email Config</h4>
          <div className="row">
            <div className="col s6">
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
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="text" className="btn btn-primary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on left"><span ref="icon" style={{display: 'none'}} ><i className="fa fa-spin fa-circle-o-notch"></i></span> Save</button>
                    </div>
                  </div>
                </form>
              </Panel>
            </div>

            <div className="col s6">
              <Panel type="default" title="Templates">
                <h1>A Table Here</h1>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Setting
