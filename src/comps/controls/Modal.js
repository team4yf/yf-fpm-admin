import React,{ Component } from 'react'

class Modal extends Component{

  render() {
    return (
      <div className="modal" id={this.props.id} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h6 className="modal-title">{this.props.title}</h6>
            </div>
            <div className="modal-body">
            { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
