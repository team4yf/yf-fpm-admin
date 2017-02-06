import React,{ Component } from 'react'

class Dashboard extends Component {
    render ()  {
      return (
        <div id="container" className="center-block">

          <div id="targets">

            <h5>Targets</h5>
            <div className="row">
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left text-3x">
                      <i className="fa fa-users text-primary"></i>
                    </div>
                    <div className="pull-right">
                      <h4 className="text-right">+ 2000</h4>
                      <p>New Users</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left text-3x">
                      <i className="fa fa-users text-primary"></i>
                    </div>
                    <div className="pull-right">
                      <h4 className="text-right">+ 2000</h4>
                      <p>New Users</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left text-3x">
                      <i className="fa fa-users text-primary"></i>
                    </div>
                    <div className="pull-right">
                      <h4 className="text-right">+ 2000</h4>
                      <p>New Users</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left text-3x">
                      <i className="fa fa-users text-primary"></i>
                    </div>
                    <div className="pull-right">
                      <h4 className="text-right">+ 2000</h4>
                      <p>New Users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div id="charts">
            <h5>Charts</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">CPU
                    <button className="btn btn-sm pull-right">
                      <i className="fa fa-refresh"></i>
                    </button>
                  </div>
                  <div className="panel-body">
                    <div className="bg-success empty-chart"></div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Mem
                    <button className="btn btn-sm pull-right">
                      <i className="fa fa-refresh"></i>
                    </button>
                  </div>
                  <div className="panel-body">
                    <div className="bg-danger empty-chart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="events">
            <h5>Events</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">App Apply
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <label className="checkbox" htmlFor="checkbox1">
                          <input type="checkbox" value="" id="checkbox1" />
                          Event 1
                        </label>
                      </li>
                      <li className="list-group-item">
                        <label className="checkbox" htmlFor="checkbox2">
                          <input type="checkbox" value="" id="checkbox2" />
                          Dapibus ac facilisis in
                        </label>
                      </li>
                      <li className="list-group-item">
                        <label className="checkbox" htmlFor="checkbox3">
                          <input type="checkbox" value="" id="checkbox3" />
                          Morbi leo risus
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )
    }
}

export default Dashboard
