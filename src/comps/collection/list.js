import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { browserHistory } from 'react-router'
import { PageTitle, Table } from '../../controls'

class CollectionList extends Component{
  constructor(props) {
    super(props)
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('_sys_collection')
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
    browserHistory.push('/setting/collection/create')
  }
  onRemoveHandler(id, e){
    let self = this
    e.stopPropagation()
    swal({
      title: 'Are you sure?',
      text: 'Remove The Data.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
    })
  }
  onRowClickHandler(row, e){
    // swal('', row.content, '')
  }
  render() {
    let self = this
    const columns = [
      {key: 'id', title: 'ID'},
      {key: 'name', title: 'Name'},
      {key: 'title', title: 'Title'},
      {key: 'view', title: 'View'},
      {key: 'enable', title: 'Enable', filter: (enable)=>{
        return enable == 1? '启用': '禁用'
      }},
      {key: 'id', title: 'Oper', filter: (id)=>{
        return (
          <span>
            <a href="javascript:void(0);" className="blue-text lighten-4" onClick={self.onRemoveHandler.bind(this, id)}>Edit</a>
            &nbsp;&nbsp;<a href="javascript:void(0);" className="red-text lighten-4" onClick={self.onRemoveHandler.bind(this, id)}>Remove</a>
          </span>
        )
      }},
    ]
    return (
      <div>
        <PageTitle>Collection</PageTitle>
        <div className="">
          <Table title="Collection" 
            hasCreate={true}
            hasSearch={true}
            onCreateHandler={this.onCreateHandler.bind(this)}
            columns={columns} 
            ref='table'
            onRowClickHandler={this.onRowClickHandler}
            canRowClick={false}
            onPageClickHandler={this.onPageClickHandler.bind(this)}>

            <div className="clearfix"></div>
          </Table>
        </div>
      </div>
    );
  }

}

export { CollectionList }
