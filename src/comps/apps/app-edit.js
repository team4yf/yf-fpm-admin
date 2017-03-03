import React,{ Component } from 'react'
import { TextField, Selector, Modal } from '../controls'

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

  onCreateNewHandler(e){
    Materialize.toast('I am a toast!', 4000)
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
        Materialize.toast('Add Success!', 4000)
        // refresh the list Component
        data.id = json.data.id
        PubSub.publishSync( 'AppList.appendData', data );
      })
    return false
  }

  render() {
    return (
      <div>
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

            <div className="col offset-s2 s10">
              <button type="submit" className="btn modal-close">Save</button>
            </div>

          </form>
        </Modal>
      </div>
    )
  }
}
export default AppEditer
