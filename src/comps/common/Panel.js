import React,{ Component } from 'react'

class Panel extends Component{

  render(){
    let title = ''
    if(this.props.title){
      title = (<div><h5 className="card-title ">{this.props.title}</h5><div className="divider"></div></div>)
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
export default Panel
