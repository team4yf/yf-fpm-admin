import React,{ Component } from 'react'
import _ from 'lodash'
import { Table } from './controls'
import { Panel } from './common'
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

  onClickHandler(){
    //$('#new-button').openModal()
  }
  render() {
    const columns = [
      {key: 'id', title: 'ID'},
      {key: 'appname', title: 'Name'},
      {key: 'apptype', title: 'Type'},
      {key: 'appenvironment', title: 'Env'},
      {key: 'about', title: 'About'},
      {key: 'oper', title: 'Oper', filter: ()=>{return 123}},
    ]
    return (
      <div className="container">
        <Table title="Applications" 
          columns={columns} 
          list={[]} 
          ref='table'
          onPageClickHandler={this.onPageClickHandler.bind(this)}>
          <div className="left" >
            <div className="input-field">
              <button type="button"
                id="new-button"
                className="btn modal-trigger"
                data-target="app-editer"
                onClick={this.onClickHandler.bind(this)}
                >Create</button>
            </div>
          </div>
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
    );
  }

}

export default AppList
