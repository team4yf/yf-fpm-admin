import React,{ Component } from 'react'

class TextField extends Component{

  getValue() {
    return this.refs.input.value;
  }

  render(){
    let control ;
    if(this.props.multiLine){
      control = (
        <textarea
          className="form-control" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder} />
      )
    }else{
      control = (
        <input type={this.props.type}
          className="form-control" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder}/>
      )
    }
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{this.props.title}</label>
        <div className="col-sm-10">
          {control}
        </div>
      </div>
    )
  }
}

export default TextField
