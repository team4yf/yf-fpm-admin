import React,{ Component } from 'react'

class Icon extends Component{

  render() {
    return (
      <i className={ "fa fa-" + this.props.children}></i>
    )
  }
}

export { Icon }
