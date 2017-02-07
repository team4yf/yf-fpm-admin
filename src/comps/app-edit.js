import React,{ Component } from 'react'
import fetchData from '../model/fpm-api'
import PubSub from 'pubsub-js'

class TextField extends Component{

  getValue() {
    return this.refs.input.value;
  }

  render(){
    let control ;
    if(this.props.multiLine){
      control = (
        <textarea
          className="form-control" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder} />
      )
    }else{
      control = (
        <input type={this.props.type}
          className="form-control" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder}/>
      )
    }
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{this.props.title}</label>
        <div className="col-sm-10">
          {control}
        </div>
      </div>
    )
  }
}

class AppEditer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      app: {
        appname: '',
        apptype: 'WEB',
        appenvironment: 'DEV',
        approot: '*',
        appurl: 'http://fpmadmin.yunplus.io',
        about: 'For FPMADMIN@YUNPLUS.IO'
      }
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
        <div className="modal" id="app-editer" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h6 className="modal-title">App Detail</h6>
              </div>
              <div className="modal-body">
                <form className="form-horizontal" id="app-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >

                  <TextField title="Name"
                    default={this.state.app.appname}
                    ref="appname"
                    placeholder="type your app name"/>

                  <TextField title="Type"
                    default={this.state.app.apptype}
                    ref="apptype" />

                  <TextField title="Env"
                      default={this.state.app.appenvironment}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AppEditer
