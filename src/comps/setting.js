import React,{ Component } from 'react'
import { Link } from 'react-router'
import { TextField, Selector, Modal } from './controls'
import { Panel } from './common'

class Setting extends Component{
  constructor(props) {
    super(props)
    this.state = {
      smtp: {
        server: 'qq',
      }
    }

  }

  onSubmitHandler(){

  }

  render () {
    return (
      <div>
        <div id="smtp">
          <h6>Email Config</h6>
          <div className="row">
            <div className="col-md-6">
              <Panel type="default" title="SMTP">
                <form className="form-horizontal" onSubmit={this.onSubmitHandler.bind(this)}>
                  <TextField title="Server"
                    default={this.state.smtp.server}
                    ref="smtpServer"/>
                  <TextField title="User"
                    ref="smtpUser"
                    placeholder="xxxxx@qq.com"/>
                  <TextField title="AuthCode"
                    ref="smtpAuth"
                    placeholder="Server Auth Code"/>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="text" className="btn btn-primary">Save</button>
                    </div>
                  </div>
                </form>
              </Panel>
            </div>

            <div className="col-md-6">
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
