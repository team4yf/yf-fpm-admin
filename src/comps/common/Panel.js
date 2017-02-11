import React,{ Component } from 'react'

class Panel extends Component{

  render(){
    let title = ''
    if(this.props.title){
      title = (<div className="panel-heading">{this.props.title}</div>)
    }
    return (
      <div className="panel panel-default" {...this.props}>
        {title}
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Panel
