import React,{ Component } from 'react'
import fetchData from '../model/fpm-api'
import PubSub from 'pubsub-js'
import { TextField, Selector, Modal } from './controls'

class AppEditer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      app: {
        appname: '',
        apptype: 'web',
        appenvironment: 'dev',
        approot: '*',
        appurl: 'http://fpmadmin.yunplus.io',
        about: 'For FPMADMIN@YUNPLUS.IO'
      },
      type: [{title: 'iOS', value: 'ios'}, {title: 'Android', value: 'android'}, {title: 'WEB', value: 'web'} ],
      env: [{title: 'DEV', value: 'dev'}, {title: 'STAGING', value: 'staging'}, {title: 'PRODUCT', value: 'product'}],

    }
  }

  onSubmitHandler(e){
    e.preventDefault()
    let data = {
      appname: this.refs.appname.getValue(),
      apptype: this.refs.apptype.getValue(),
      appenvironment: this.refs.appenvironment.getValue(),
      approot: this.refs.approot.getValue(),
      appurl: this.refs.appurl.getValue(),
      about: this.refs.about.getValue(),
      appkey: '123123213',
      secretkey: '12123121232848312783',
    }
    fetchData('common.create', { table: 'api_app', row: data})
      .then(function(json) {
        // hide modal
        $('#app-editer').modal('hide')
        // refresh the list Component
        data.id = json.data.id
        PubSub.publishSync( 'AppList.appendData', data );
      })
    return false
  }

  render() {
    return (
      <div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#app-editer">Create</button>
        </div>
        <Modal id="app-editer" title="App Detail">
          <form className="form-horizontal" id="app-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >

            <TextField title="Name"
              default={this.state.app.appname}
              ref="appname"
              placeholder="type your app name"/>

            <Selector title="Type"
              default={this.state.app.apptype}
              values={this.state.type}
              ref="apptype" />

            <Selector title="Env"
              default={this.state.app.appenvironment}
              values={this.state.env}
              ref="appenvironment" />

            <TextField title="Root"
              default={this.state.app.approot}
              ref="approot" />

            <TextField title="Url"
              default={this.state.app.appurl}
              ref="appurl" />

            <TextField title="About"
              multiLine="true"
              default={this.state.app.about}
              ref="about" />

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="text" className="btn btn-primary">Save</button>
              </div>
            </div>

          </form>
        </Modal>
      </div>
    )
  }
}
export default AppEditer
