import React,{ Component } from 'react'
import fetchData from '../../model/fpm-api'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import {Table, TableHeader, TableBody} from '../controls'


class Template extends Component{
  constructor(props) {
    super(props)
  }

  onPageClickHandler(i){
    alert('from template: ' + i)
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
    const DATA = [
      {id: 1, name: '123', type: '1', env: '123', about: '123', operate: '123'},
      {id: 2, name: '123', type: '1', env: '123', about: '123', operate: '123'},
    ]
    const page = {}
    return (
      <div className="container">
        <Table title="Templates" columns={columns} list={DATA} 
          onPageClickHandler={this.onPageClickHandler}
        />
      </div>
    )
  }
}

export default Template
