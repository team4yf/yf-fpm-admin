import React,{ Component } from 'react'
import _ from 'lodash'


class Page extends Component {

  constructor(props){
    super(props)
    this.state = {
      type: this.props.type || 'normal',
    }
  }

  onClickHandler(i, e){
    if(i === -1){
      return false
    }
    this.props.onClickHandler(i, e);
    if(this.props.type == 'previous' || this.props.type == 'next' ){
      return
    }
    this.setState({
      type: 'active'
    })
  }

  notifyPageChangeHandler(type){
    this.setState({
      type: type
    })
  }

  render () {
    
    let page = this.props.page
    switch(this.state.type){
      case 'previous':
        return (
          <li className="previous"><a href="javascript:void(0)" onClick={this.onClickHandler.bind(this, page)}><i className="fa fa-caret-left"></i></a></li>
        );
      case 'active':
        return (
          <li className="active"><a href="javascript:void(0)" onClick={this.onClickHandler.bind(this, page)}>{page}</a></li>
        );
      case 'next':
        return (
          <li className="next"><a href="javascript:void(0)" onClick={this.onClickHandler.bind(this, page)}><i className="fa fa-caret-right"></i></a></li>
        );
      case 'normal':
      default:
        return (
          <li><a href="javascript:void(0)" onClick={this.onClickHandler.bind(this, page)}>{page}</a></li>
        );

    }
  }
}

class Pager extends Component {

  constructor(props){
    super(props)
    this.state = {
      total: this.props.total || 10,
      rows: this.props.rows || 10,  // 10 every page
      current: this.props.current || 1,
    }
    this.state.pages = Math.ceil(this.state.total/this.state.rows)
  }

  getCurrent(){
    return this.state.current
  }

  onClickHandler(i, e){
    this.props.onClickHandler(i, e);
    this.refs['page-' + this.state.current].notifyPageChangeHandler('normal')
    this.setState({
      current: i
    })
  }

  notifyPageChangeHandler(total, current){
    this.setState({
      total: total,
      current: current,
      pages: Math.ceil(total/this.state.rows),
    })
    this.refs['page-' + current].notifyPageChangeHandler('active')
  }

  render () {
    let pages = []
    if(this.state.pages > 1){
      //calc the previous & next
      let prevPage = this.state.current > 1? this.state.current - 1: -1
      
      pages.push(<Page key={'prevPage'} type="previous" page={prevPage} ref={'page-prevPage'} onClickHandler={this.onClickHandler.bind(this)} />);
    }
    
    for(let i = 1; i <= this.state.pages; i++){
      pages.push(
        <Page 
          key={i} 
          ref={'page-' + i}
          type={(this.state.current == i)?'active':'normal'} 
          onClickHandler={this.onClickHandler.bind(this)} 
          page={i}/>
      )
    }
    if(this.state.pages > 1){
      //calc the previous & next
      let nextPage = this.state.current >= this.state.pages ? -1: this.state.current + 1
      pages.push(<Page key={'nextPage'} page={nextPage}  ref={'page-nextPage'} type="next" onClickHandler={this.onClickHandler.bind(this)} />);
    }
    
    return (
      <ul className="pagination">
        {pages}
      </ul>
    )
  }
}

export {Page, Pager}
