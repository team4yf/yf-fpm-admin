import React,{ Component } from 'react'
import { Panel } from './common'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import fetchData from '../model/fpm-api'
import _ from 'lodash'

class Target extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Panel className="palette palette-carrot">
            <div className="pull-left text-3x">
              <i className="fa fa-user"></i>
            </div>
            <div className="pull-right">
              <h4 className="text-right">+ 2</h4>
              <p className="text-right">New Users</p>
            </div>
          </Panel>
        </div>

        <div className="col-md-3">
          <Panel className="palette palette-wisteria">
            <div className="pull-left text-3x">
              <i className="fa fa-plug"></i>
            </div>
            <div className="pull-right">
              <h4 className="text-right">+ 1</h4>
              <p className="text-right">New Apps</p>
            </div>
          </Panel>
        </div>

        <div className="col-md-3">
          <Panel className="palette palette-alizarin">
            <div className="pull-left text-3x">
              <i className="fa fa-bolt"></i>
            </div>
            <div className="pull-right">
              <h4 className="text-right">+ 1,000</h4>
              <p className="text-right">Api Calls</p>
            </div>
          </Panel>
        </div>

        <div className="col-md-3">
          <Panel className="palette palette-concrete">
            <div className="pull-left text-3x">
              <i className="fa fa-database"></i>
            </div>
            <div className="pull-right">
              <h4 className="text-right">+ 1,000</h4>
              <p className="text-right">New Data</p>
            </div>
          </Panel>
        </div>

      </div>
    )
  }
}

class OsInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      os: [
        { title: 'Platfom', key: 'platform'},
        { title: 'Arch', key: 'arch'},
        { title: 'Version', key: 'release'},
        { title: 'CPU', key: 'type'},
        { title: 'Mem(Mb)', key: 'totalmem'},
        { title: 'HostName', key: 'hostname'},
        { title: 'FPM-Version', key: 'server.version'},
        { title: 'Online', key: 'startTime'},
      ],
      data: {}
    }
  }

  componentDidMount(){
    // subcribe one event
    // var token = PubSub.subscribe( 'AppList.appendData', this.appendData );
    let self = this
    fetchData('system.show', { })
      .then((json) => {
        console.log(json)
        self.setState({data: json.data})
      })
  }

  render() {

    return (
      <table className="table table-bordered">
      {
        this.state.os.map((item)=>{
          let v = ''
          if(item.key.indexOf('.')>0){
            const keys = item.key.split('.')
            let tempV = this.state.data[keys[0]]
            for(let i = 1; i<keys.length ; i++){
              if(tempV === undefined)
                break
              tempV = tempV[keys[i]]
            }
            v = tempV
          }else if(item.key === 'startTime'){
            v = parseInt((_.now() - this.state.data[item.key]) / 1000 / 60 / 60) + ' H'
          }else{
            v = this.state.data[item.key]
          }
          return (
            <tr key={item.key}>
              <th width="25%">{item.title}</th>
              <td>{v}</td>
            </tr>
          )
        })
      }
      </table>
    )
  }
}

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

      const os = {
        "arch": "x64",
        "hostname": "10-9-184-52",
        "platform": "linux",
        "type": "Linux",
        "release": "3.10.0-123.4.4.el7.x86_64",
        "freemem": 99,
        "totalmem": 995,
        "uptime": 2706008,
      }

      return (
        <div id="container" className="center-block">

          <div id="system-info">
            <h6>System</h6>
            <div className="row">

              <div className="col-md-7">
                <Panel title="Mem">
                  <div className="">
                    <LineChart width={750} height={316} data={data}
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

              <div className="col-md-5">
                <Panel title="OS">
                  <OsInfo data={os}/>
                </Panel>
              </div>


            </div>
          </div>


          <div id="targets">

            <h6>Targets</h6>
            <Target />

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
