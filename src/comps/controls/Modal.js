import React,{ Component } from 'react'

class Modal extends Component{

  render() {
    return (
      <div className="modal" id={this.props.id}>
        <div className="modal-content">
          <h4>
            {this.props.title}
            <span className="right modal-action modal-close waves-effect waves-green btn-flat">x</span>
          </h4>
          <div className="clearfix"></div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Modal
