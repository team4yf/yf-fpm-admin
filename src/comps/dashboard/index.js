import React,{ Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { PageTitle, Panel } from '../../controls'

class Target extends Component {
  render() {
    return (
      <div className="row">

        <div className="col s3">
          <Panel className="teal darken-3">
            <h2 className="left white-text">
              <i className="fa fa-user"></i>
            </h2>
            <div className="right white-text">
              <h4 className="right-align">+ 2</h4>
              <p className="right-align">New Users</p>
            </div>
          </Panel>
        </div>

        <div className="col s3">
          <Panel className="deep-orange accent-2">
            <h2 className="left white-text">
              <i className="fa fa-plug"></i>
            </h2>
            <div className="right white-text">
              <h4 className="right-align">+ 1</h4>
              <p className="right-align">New Apps</p>
            </div>
          </Panel>
        </div>

        <div className="col s3">
          <Panel className="green darken-2">
            <h2 className="left white-text">
              <i className="fa fa-bolt"></i>
            </h2>
            <div className="right white-text">
              <h4 className="right-align">+ 1,000</h4>
              <p className="right-align">Api Calls</p>
            </div>
          </Panel>
        </div>

        <div className="col s3">
          <Panel className="light-blue darken-2">
            <h2 className="left white-text">
              <i className="fa fa-database"></i>
            </h2>
            <div className="right white-text">
              <h4 className="right-align">+ 1,000</h4>
              <p className="right-align">New Data</p>
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
    let func = new YF.Func('system.show')
    func.invoke({})
      .then((json) => {
        self.setState({data: json})
      })
  }

  render() {
    return (
      <table className="table striped">
        <tbody>
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
        </tbody>
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
        "release": "3.10.0-123.4.4.el7.x86_64",
        "freemem": 99,
        "totalmem": 995,
        "uptime": 2706008,
      }

      return (
        <div>
          <PageTitle>Dashboard</PageTitle>
          <div className="container">

            <div id="targets">

              <h5>Targets</h5>
              <Target />

            </div>

            <div id="system-info">
              <h5>System</h5>
              <div className="row">

                <div className="col s7">
                  <Panel title="Mem" className="gray">
                    <div className="">
                      <LineChart width={700} height={365} data={data}
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

                <div className="col s5">
                  <Panel title="OS">
                    <OsInfo data={os}/>
                  </Panel>
                </div>


              </div>
            </div>

          </div>
        </div>
      )
    }
}

export { Dashboard }
