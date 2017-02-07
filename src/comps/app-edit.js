import React,{ Component } from 'react'

class AppEditer extends Component{
  constructor(props) {
    super(props)
    this.state = {app: {
      appname: 'defaultName',
      apptype: 'defaulttype'
    }}
  }

  onClickHandler(){
    console.log(this.state.app)
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
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" defaultValue={this.state.app.appname} value={this.state.app.appname}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" defaultValue={this.state.app.apptype} value={this.state.app.apptype}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Env</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" defaultValue={this.state.app.appenvironment} value={this.state.app.appenvironment}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Root</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" defaultValue={this.state.app.approot} value={this.state.app.approot}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Url</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" defaultValue={this.state.app.appurl} value={this.state.app.appurl}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">About</label>
                    <div className="col-sm-10">
                      <textarea className="form-control" defaultValue={this.state.app.about} value={this.state.app.about}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <label className="checkbox">
                        <input type="checkbox" /> Remember me
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="text" onClick={this.onClickHandler} className="btn btn-primary">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AppEditer
