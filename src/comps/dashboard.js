import React,{ Component } from 'react'
import { Panel } from './common'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
class Dashboard extends Component {
    render ()  {
      const data = [
        {name: '00 : 00', uv: 4000, pv: 2400, amt: 2400},
        {name: '01 : 00', uv: 3000, pv: 1398, amt: 2210},
        {name: '02 : 00', uv: 2000, pv: 99, amt: 2290},
        {name: '03 : 00', uv: 2780, pv: 3908, amt: 2000},
        {name: '04 : 00', uv: 1890, pv: 4800, amt: 2181},
        {name: '05 : 00', uv: 2390, pv: 3800, amt: 2500},
        {name: '06 : 00', uv: 3490, pv: 4300, amt: 2100},
      ]
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
                <Panel title="Mem">
                  <div className="">
                    <LineChart width={650} height={300} data={data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <Tooltip/>
                     <Legend />
                     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </div>
                </Panel>
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
