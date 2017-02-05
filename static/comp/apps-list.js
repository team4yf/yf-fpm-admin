var NoDataRow = React.createClass({
    render: function() {
      return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><h5>No Data Found</h5></td></tr>);
    }
});

var LoadingDataRow = React.createClass({
  render: function() {
    return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><i className="fa fa-circle-o-notch fa-spin"></i> Loading.</td></tr>);
  }
});

var Page = React.createClass({
  render: function(){
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
})

var Pager = React.createClass({
  render: function(){
    var total = this.props.total;
    var current = this.props.current;
    var pages = [];
    pages.push(<Page key={0} type="previous" />);
    for(var i = 1; i <= total; i++){
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
})

var AppRow = React.createClass({
  render: function() {
    var app = this.props.app;
    return (
      <tr>
        <td>{app.id}</td>
        <td>{app.appname}</td>
        <td>{app.apptype}</td>
        <td>{app.appenvironment}</td>
        <td>{app.about}</td>
        <td></td>
      </tr>

    );
  }
});

var apps = [
  {
    id: 1,
    appname: 'test',
    apptype: 'web',
    appenvironment: 'STAGING',
    about: 'for test',
  }
]

function fetchData(method, param){
  return fetch('http://api.yunplus.io/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify ({
      appkey: '123123',
      method: method,
      v: '0.0.1',
      sign: 123123123,
      timestamp: 123123123,
      param: JSON.stringify(param)
    })
  })
}
window.AppsTable = React.createClass({
  loadDataFromServer: function(){
    var self = this;
    fetchData('common.find', { table: 'api_app'})
    .then(function(response) {
      response.json().then(function(json) {
        self.setState({data: json.data, loading: false});
      })
    });
  },
  getInitialState: function() {
    return {data: apps, loading: true};
  },
  componentDidMount: function(){
    var self = this;
    self.loadDataFromServer();
  },
  render: function() {
    var rows = [];
    if(this.state.loading === true){
      rows.push(<LoadingDataRow key={-1} cols="6"/>);
    }else{
      this.state.data.forEach(function(app) {
        rows.push(<AppRow key={app.id} app={app} />);
      });
      if(rows.length === 0){
        //NoDatas
        rows.push(<NoDataRow key={-1} cols="6"/>);
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
              <Pager total="3" current="1"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
