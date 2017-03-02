import React, {Component, PropTypes} from 'react'
import { Panel } from '../common'
import _ from 'lodash'
import {Page, Pager} from './Pager'

class TableHeader extends Component{

  render(){
    let titles = []
    this.props.titles.map((title, i)=>{
      titles.push(<th key={i}>{title}</th>)
    })

    return (
      <thead>
        <tr className="info">
          {titles}
        </tr>
      </thead>
    )
  }
}
class TableBody extends Component{
  constructor(props) {
    super(props)
    
  }
  componentWillMount(){
    this.setState({list: this.props.list}) 
  }
  createRows(){
    let rows = []

    this.state.list.map((row, index) => {
      let cols = []
      this.props.cols.map((col, i) => {
        cols.push(
          <td key={'col-' + i}>{row[col]}</td>
        )
      })
      rows.push(
        <tr className="hoverable" key={'row-' + index}>{cols}</tr>
      )
    })

    if(rows.length<1){
      return <NoDataRow cols={this.props.cols.length}/>
    }

    return rows
  }

  notifyDataChangeHandler(list, e){
    this.setState({list: list}) 
  }

  render(){
    return (
      <tbody>
        {this.createRows()}
      </tbody>
    )
  }
}

class NoDataRow extends Component {
    render ()  {
      return (<tr className="red lighten-5"><td className="center" colSpan={this.props.cols}><h5>No Data Found</h5></td></tr>);
    }
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRowsSelected: false,
      pager: {
        total: 3,
        current: 1,
      }
    }
  }

  componentWillMount(){
    let titles = [],
        cols = []
    _.map(this.props.columns, column => {
      titles.push(column.title)
      cols.push(column.key)
    })
    
    this.setState({list: this.props.list, cols: cols, titles: titles}) 
  }

  notifyDataChangeHandler(list, e){
    this.refs.tableBody.notifyDataChangeHandler(list, e)
  }

  render(){
    return (
      <Panel title={this.props.title}>
        <table className="table bordered striped">
          <TableHeader titles={this.state.titles} />
          <TableBody 
            cols={this.state.cols} 
            list={this.state.list} 
            ref="tableBody"/>
        </table>
        <div className="center">
          <Pager 
            total={this.state.pager.total} 
            current={this.state.pager.current} 
            onClickHandler={this.props.onPageClickHandler}
            ref="pager"/>
        </div>
      </Panel>
    )
  }
}

export { Table, TableBody, TableHeader }



