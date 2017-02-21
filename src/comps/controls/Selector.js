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
      <div className="">
        <label>{this.props.title}</label>
        <select className="browser-default" ref="input">
          {options}
        </select>

      </div>
    )
  }
}

export default Selector
