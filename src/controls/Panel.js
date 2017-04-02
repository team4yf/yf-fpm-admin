import React,{ Component } from 'react'

class PageTitle extends Component{
  render(){
    return (
      <div className="page-title blue lighten-1">
        <h3 className="container white-text">{this.props.children}</h3>
      </div>
    )
  }
}

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
export { PageTitle, Panel }
