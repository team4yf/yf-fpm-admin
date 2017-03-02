import React,{ Component } from 'react'
import fetchData from '../../model/fpm-api'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import {Table, TableHeader, TableBody} from '../controls'


class Template extends Component{
  constructor(props) {
    super(props)
    this.list = [
      {id: 1, name: '123', type: '1', env: '123', about: '123', operate: '123'},
      {id: 2, name: '123', type: '1', env: '123', about: '123', operate: '123'},
      {id: 3, name: '33', type: '1', env: '123', about: '123', operate: '123'},
      {id: 4, name: '44', type: '1', env: '123', about: '123', operate: '123'},
    ]
  }

  onPageClickHandler(i, e){
    i--
    this.list = [
        {id: i*4 + 1, name: '123', type: '1', env: '123', about: '123', operate: '123'},
        {id: i*4 + 2, name: '123', type: '1', env: '123', about: '123', operate: '123'},
        {id: i*4 + 3, name: '33', type: '1', env: '123', about: '123', operate: '123'},
        {id: i*4 + 4, name: '44', type: '1', env: '123', about: '123', operate: '123'},
      ]
    this.refs.table.notifyDataChangeHandler(this.list, e)
  }
  
  render() {
    const columns = [
      { key: 'id', title: 'ID', filter: false},
      { key: 'name', title: 'Name', filter: false},
      { key: 'type', title: 'Type', filter: false},
      { key: 'env', title: 'Env', filter: false},
      { key: 'about', title: 'About', filter: false},
      { key: 'operate', title: 'Operate', filter: false},
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
