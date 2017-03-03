import React,{ Component } from 'react'
import fetchData from '../../model/fpm-api'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import {Table, TableHeader, TableBody} from '../controls'
import YF from 'yf-fpm-client-nodejs'


class Template extends Component{
  constructor(props) {
    super(props)
    this.list = []
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('fpm_template')
    query.page(this.page, 10).findAndCount()
      .then(data => {
        tableRef.notifyDataChangeHandler(data, e)
      })
  }

  onPageClickHandler(i, e){
    this.fetchPage(i, e)
  }
  
  componentDidMount(){
    this.fetchPage(1)
  }
  
  render() {
    const truncateFunc = (src) => {
      return _.truncate(src, {
          'length': 18,
        })
    }
    const columns = [
      { key: 'id', title: 'ID', filter: false},
      { key: 'name', title: 'Name', filter: false},
      { key: 'content', title: 'Content', filter: truncateFunc, className: []},
    ]
    
    const page = {}
    return (
      <div className="container">
        <Table title="Templates" 
          columns={columns} 
          list={this.list} 
          ref='table'
          onPageClickHandler={this.onPageClickHandler.bind(this)}
        />
      </div>
    )
  }
}

export default Template
