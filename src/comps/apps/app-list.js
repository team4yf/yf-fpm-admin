import React,{ Component } from 'react'
import _ from 'lodash'
import { Table } from '../controls'
import YF from 'yf-fpm-client-nodejs'

class AppList extends Component{
  constructor(props) {
    super(props)
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('api_app')
    query.page(this.page, 10).findAndCount()
      .then(data => {
        data.current = i
        tableRef.notifyDataChangeHandler(data, e)
      })
  }

  componentDidMount(){
    this.fetchPage(1)
  }

  onPageClickHandler(i, e){
    this.fetchPage(i)
  }

  onCreateHandler(e){
    //$('#new-button').openModal()
    alert(1)
  }
  onRemoveHandler(id, e){
    alert(id)
  }
  render() {
    let self = this
    const columns = [
      {key: 'id', title: 'ID'},
      {key: 'appname', title: 'Name'},
      {key: 'apptype', title: 'Type'},
      {key: 'appenvironment', title: 'Env'},
      {key: 'about', title: 'About'},
      {key: 'id', title: 'Oper', filter: (id)=>{
        return (
          <a href="javascript:void(0);" className="red-text lighten-4" onClick={self.onRemoveHandler.bind(this, id)}>Remove</a>
        )
      }},
    ]
    return (
      <div className="container">
        <Table title="Applications" 
          hasCreate="false"
          hasSearch="true"
          onCreateHandler={this.onCreateHandler.bind(this)}
          columns={columns} 
          ref='table'
          onPageClickHandler={this.onPageClickHandler.bind(this)}>

          <div className="clearfix"></div>
        </Table>
      </div>
    );
  }

}

export default AppList