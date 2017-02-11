import React,{ Component } from 'react'
import fetchData from '../model/fpm-api'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import {Pager, Page} from './controls'

class NoDataRow extends Component {
    render ()  {
      return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><h5>No Data Found</h5></td></tr>);
    }
}

class LoadingDataRow extends Component {
  render ()  {
    return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><i className="fa fa-circle-o-notch fa-spin"></i> Loading.</td></tr>);
  }
}

class DataRow extends Component {
  render () {
    let data = this.props.data;
    return (
      <tr>
        {
          _.map(data, (item)=>{
            return (
              <td>{item}</td>
            )
          })
        }
        <td><a href="">Check</a> <a href="">Reset</a></td>
      </tr>

    )
  }
}

var user = [
  {
    id: 1,
    appname: 'test',
    apptype: 'web',
    appenvironment: 'STAGING',
    about: 'for test',
  }
]


class DataList extends Component{
  constructor(props) {
    super(props)
    this.state = {data: user, loading: false , pager: {total: 1, current: 1}}
    this.appendData = this.appendData.bind(this)
  }
  appendData(msg, row){
    let origin = this.state.origin
    _.drop(origin.rows)
    origin.rows.splice(origin.rows.length - 1, 1)
    origin.rows.splice(0, 0, row)
    origin.count ++
    this.notifyDataSet(origin)
  }
  notifyDataSet(data){
    let total = Math.ceil(data.count/10)
    this.setState({origin: data, data: data.rows, loading: false ,pager: {count: data.count, total: total, current: 1}})
  }
  componentDidMount(){
    // subcribe one event
    var token = PubSub.subscribe( 'AppList.appendData', this.appendData );
    let self = this
    // fetchData('common.findAndCount', { table: 'api_app'})
    //   .then((json) => {
    //     self.notifyDataSet(json.data)
    //   })
  }
  render() {
    let rows = []
    if(this.state.loading === true){
      rows.push(<LoadingDataRow key={-1} cols="6"/>)
    }else{
      this.state.data.forEach(function(data) {
        rows.push(<DataRow key={data.id} data={data} />)
      })
      if(rows.length === 0){
        //NoDatas
        rows.push(<NoDataRow key={-1} cols="6"/>)
      }
    }
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <b className="pull-left table-title">Users</b>
            <div className="pull-right form-inline">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">Go!</button>
                </span>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="panel-body">
            <table className="table table-bordered table-hover ">
              <thead>
              <tr className="info">
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Env</th>
                <th>About</th>
                <th>Operate</th>
              </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
            <div className="text-center">
              <Pager total={this.state.pager.total} current={this.state.pager.current} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default DataList