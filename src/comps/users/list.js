import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { PageTitle, Table } from '../../controls'

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('fpm_user')
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

  onClickHandler(){
    //$('#new-button').openModal()
  }
  render() {
    const columns = [
      {key: 'id', title: 'ID'},
      {key: 'name', title: 'Name'},
      {key: 'phone', title: 'Phone'},
      {key: 'email', title: 'Email'},
      {key: 'oper', title: 'Oper', filter: ()=>{return 123}},
    ]
    return (
      <div>
        <PageTitle>Users</PageTitle>
        <div className="">
          <Table title="Users" 
            columns={columns} 
            list={[]} 
            ref='table'
            onPageClickHandler={this.onPageClickHandler.bind(this)}>
            <div className="right">
              <div className="input-field">
                <i className="teal-text fa fa-search prefix"></i>
                <input id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
              </div>
            </div>
            <div className="clearfix"></div>
          </Table>
        </div>
      </div>
    );
  }
}

export {UserList}