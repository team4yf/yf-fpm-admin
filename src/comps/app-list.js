import React,{ Component } from 'react'
import fetchData from '../model/fpm-api'
import PubSub from 'pubsub-js'
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

class Page extends Component {
  render () {
    var type = this.props.type || 'normal',
        page = this.props.page;
    switch(type){
      case 'previous':
        return (
          <li className="previous"><a href="#"><i className="fa fa-caret-left"></i></a></li>
        );

      case 'active':
        return (
          <li className="active"><a href="#">{page}</a></li>
        );
      case 'next':
        return (
          <li className="next"><a href="#"><i className="fa fa-caret-right"></i></a></li>
        );
      case 'normal':
      default:
        return (
          <li><a href="#">{page}</a></li>
        );

    }
  }
}

class Pager extends Component {
  render () {
    let total = this.props.total;
    let current = this.props.current;
    let pages = [];
    pages.push(<Page key={0} type="previous" />);
    for(let i = 1; i <= total; i++){
      pages.push(
        <Page key={i} type={(current == i)?'active':'normal'} page={i}/>
      )
    }
    pages.push(<Page key={total+1} type="next" />);
    return (
      <ul className="pagination">
        {pages}
      </ul>
    )
  }
}

class AppRow extends Component {
  render () {
    let app = this.props.app;
    return (
      <tr>
        <td>{app.id}</td>
        <td>{app.appname}</td>
        <td>{app.apptype}</td>
        <td>{app.appenvironment}</td>
        <td>{app.about}</td>
        <td></td>
      </tr>

    )
  }
}

var apps = [
  {
    id: 1,
    appname: 'test',
    apptype: 'web',
    appenvironment: 'STAGING',
    about: 'for test',
  }
]


class AppList extends Component{
  constructor(props) {
    super(props)
    this.state = {data: apps, loading: false , pager: {total: 1, current: 1}}
    this.appendData = this.appendData.bind(this)
  }
  appendData(msg, row){
    let origin = this.state.origin
    origin.rows.push(row)
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
    fetchData('common.findAndCount', { table: 'api_app'})
      .then((json) => {
        self.notifyDataSet(json.data)
      })
  }
  render() {
    let rows = []
    if(this.state.loading === true){
      rows.push(<LoadingDataRow key={-1} cols="6"/>)
    }else{
      this.state.data.forEach(function(app) {
        rows.push(<AppRow key={app.id} app={app} />)
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
            <b className="pull-left table-title">Applications</b>
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

export default AppList
