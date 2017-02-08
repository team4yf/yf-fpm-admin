import React,{ Component } from 'react'
import _ from 'lodash'


class Page extends Component {
  render () {
    var type = this.props.type || 'normal',
        page = this.props.page;
    switch(type){
      case 'previous':
        return (
          <li className="previous"><a href="#"><i className="fa fa-caret-left"></i></a></li>
        );

      case 'active':
        return (
          <li className="active"><a href="#">{page}</a></li>
        );
      case 'next':
        return (
          <li className="next"><a href="#"><i className="fa fa-caret-right"></i></a></li>
        );
      case 'normal':
      default:
        return (
          <li><a href="#">{page}</a></li>
        );

    }
  }
}

class Pager extends Component {
  render () {
    let total = this.props.total;
    let current = this.props.current;
    let pages = [];
    pages.push(<Page key={0} type="previous" />);
    for(let i = 1; i <= total; i++){
      pages.push(
        <Page key={i} type={(current == i)?'active':'normal'} page={i}/>
      )
    }
    pages.push(<Page key={total+1} type="next" />);
    return (
      <ul className="pagination">
        {pages}
      </ul>
    )
  }
}

export {Page, Pager}
