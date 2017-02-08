import React,{ Component } from 'react'

class Selector extends Component{

  getValue() {
    return this.refs.input.value;
  }

  render(){
    let options = [];

    this.props.values.forEach((item)=>{
      options.push(
        <option key={item.value} value={item.value}>{item.title}</option>
      )
    })
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{this.props.title}</label>
        <div className="col-sm-10">
        <select className="form-control" ref="input">
          {options}
        </select>
        </div>
      </div>
    )
  }
}

export default Selector
