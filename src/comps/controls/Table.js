import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {Page, Pager} from './Pager'

class TablePanel extends Component{

  render(){
    let title = '',
      createButton = this.props.hasCreate? (<button className="right btn green lighten-4" onClick={this.props.onCreateHandler}>+ Create</button>):''
    
    if(this.props.title){
      title = (
        <div>
          <h5 className="card-title left">{this.props.title} </h5>
          {createButton}
          <div className="clearfix"></div>
          <div className="divider"></div>
        </div>
      )
    }
    return (
        <div className={"card-panel " + this.props.className }>
          <div className="card-content">
            {title}
            {this.props.children}
            <div className="clearfix"></div>
          </div>
        </div>
    )
  }
}

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
    
    this.setState({list: this.props.list || [], cols: cols, titles: titles}) 
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
    let searchBar = this.props.hasSearch? 
      (
        <div className="right">
          <SearchBar />
        </div>
      ) :''
    return (
      <TablePanel 
        title={this.props.title}
        hasCreate={this.props.hasCreate}
        onCreateHandler={this.props.onCreateHandler}>
        {this.props.children}
        {searchBar}
        <div className="clearfix"></div>
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
      </TablePanel>
    )
  }
}

export { Table, TableBody, TableHeader, LoadingDataRow, SearchBar }



