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

class FooterFixedModal extends Component{

  render() {
    return (
      <div className="modal modal-fixed-footer" {...this.props}>
        <div className="modal-content">
          <h4>
            {this.props.title}
            <span className="right modal-action modal-close waves-effect waves-green btn-flat"
              onClick={ this.props.onModalCloseHandler }>x</span>
          </h4>
          <div className="clearfix"></div>
          { this.props.children }
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat"
            onClick={ this.props.onModalCloseHandler }>Close</a>
          <a href="#!" className="modal-action waves-effect waves-green btn-flat" 
            onClick={ this.props.onModalOkHandler }>Ok</a>
        </div>
      </div>
    )
  }
}


export { Modal, FooterFixedModal }
