import React,{ Component } from 'react'
import _ from 'lodash'


class Page extends Component {

  constructor(props){
    super(props)
    this.state = this.props
  }

  onClickHandler(i, e){
    this.props.onClickHandler(i, e);
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
    var type = this.state.type || 'normal',
        page = this.state.page;
    switch(type){
      case 'previous':
        return (
          <li className="previous"><a onClick={this.onClickHandler.bind(this, page - 1)}><i className="fa fa-caret-left"></i></a></li>
        );
      case 'active':
        return (
          <li className="active"><a onClick={this.onClickHandler.bind(this, page)}>{page}</a></li>
        );
      case 'next':
        return (
          <li className="next"><a onClick={this.onClickHandler.bind(this, page + 1)}><i className="fa fa-caret-right"></i></a></li>
        );
      case 'normal':
      default:
        return (
          <li><a onClick={this.onClickHandler.bind(this, page)}>{page}</a></li>
        );

    }
  }
}

class Pager extends Component {

  constructor(props){
    super(props)
    this.state = {
      current: this.props.current,
      total: this.props.total,
    }
  }

  getCurrent(){
    return this.current
  }

  onClickHandler(i, e){
    this.props.onClickHandler(i, e);
    this.refs['page-' + this.state.current].notifyPageChangeHandler('normal')
    this.setState({
      current: i
    })
  }

  render () {
    let pages = [];
    pages.push(<Page key={0} type="previous" ref="page-0" onClickHandler={this.onClickHandler.bind(this)} />);
    for(let i = 1; i <= this.state.total; i++){
      pages.push(
        <Page 
          key={i} 
          ref={'page-' + i}
          type={(this.state.current == i)?'active':'normal'} 
          onClickHandler={this.onClickHandler.bind(this)} 
          page={i}/>
      )
    }
    pages.push(<Page key={this.state.total+1} ref={'page-' + (this.state.total+1)} type="next" onClickHandler={this.onClickHandler.bind(this)} />);
    return (
      <ul className="pagination">
        {pages}
      </ul>
    )
  }
}

export {Page, Pager}
