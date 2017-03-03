import React, {Component, PropTypes} from 'react'
import { Panel } from '../common'
import _ from 'lodash'
import {Page, Pager} from './Pager'

class TableHeader extends Component{

  render(){
    let titles = []
    this.props.columns.map((column, i)=>{
      titles.push(<th key={i}>{column.title}</th>)
    })

    return (
      <thead>
        <tr className="teal lighten-4">
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

    _.map(this.state.list, (row, index) => {
      let cols = []
      this.props.columns.map((col, i) => {
        let ceil = row[col.key]
        // run filter
        if(col.filter){
          ceil = col.filter(ceil)
        }
        cols.push(
          <td key={'col-' + i}>{ceil}</td>
        )
      })
      rows.push(
        <tr className="" key={'row-' + index}>{cols}</tr>
      )
    })

    if(rows.length<1){
      return <NoDataRow cols={this.props.columns.length}/>
    }else if(rows.length< 10){
      //fill the empty
      for(let i = rows.length; i < 10 ; i++)
      rows.push(
        <tr className="" key={'row-' + i}><td colSpan={this.props.columns.length}>&nbsp;</td></tr>
      )
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

class LoadingDataRow extends Component {
  render ()  {
    return (<tr className="warning"><td className="text-center" colSpan={this.props.cols}><i className="fa fa-circle-o-notch fa-spin"></i> Loading.</td></tr>);
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div className={this.props.direction}>
        <div className="input-field">
          <i className="teal-text fa fa-search prefix"></i>
          <input id="icon_prefix" type="text" className="validate" />
          <label htmlFor="icon_prefix">Search</label>
        </div>
      </div>
    )
  }
}

class NoDataRow extends Component {
    render ()  {
      return (<tr className="blue-grey lighten-5"><td className="center" colSpan={this.props.cols}><h5 className="grey-text lighten-3">No Data Found</h5></td></tr>);
    }
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRowsSelected: false,
      pager: {
        total: 1,
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
    if(_.isObject(list)){
      this.refs.pager.notifyPageChangeHandler(list.count, list.current)
      this.refs.tableBody.notifyDataChangeHandler(list.rows, e)
    }else{
      this.refs.tableBody.notifyDataChangeHandler(list, e)
    }
  }

  render(){
    return (
      <Panel title={this.props.title}>
        {this.props.children}
        <table className="table striped">
          <TableHeader columns={this.props.columns} />
          <TableBody 
            columns={this.props.columns} 
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

export { Table, TableBody, TableHeader, LoadingDataRow, SearchBar }



