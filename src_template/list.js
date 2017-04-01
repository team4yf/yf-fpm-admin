import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { PageTitle, Table } from '../../controls'

class {{ name }}List extends Component{
  constructor(props) {
    super(props)
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('{{ name }}')
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
  }
  onRemoveHandler(id, e){
  }
  onRowClickHandler(row, e){
    swal('', row.content, '')
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
      <div>
        <PageTitle>{{ name }}</PageTitle>
        <div className="container">
          <Table title="{{ name }}" 
            hasCreate="false"
            hasSearch="true"
            onCreateHandler={this.onCreateHandler.bind(this)}
            columns={columns} 
            ref='table'
            onRowClickHandler={this.onRowClickHandler}
            canRowClick="true"
            onPageClickHandler={this.onPageClickHandler.bind(this)}>

            <div className="clearfix"></div>
          </Table>
        </div>
      </div>
    );
  }

}

export default {{ name }}List
