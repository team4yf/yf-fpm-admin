import React,{ Component } from 'react'

class TextField extends Component{

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      isChanged: false
    }
  }

  getValue() {
    return this.refs.input.value
  }

  setValue(val){
    this.refs.input.value = val
    this.setState({value: this.refs.input.value})
  }

  isChanged(){
    return this.state.isChanged
  }

  onChangeHandler(){
    this.setState({value: this.refs.input.value, isChanged: true})
  }

  render(){
    let control ;
    if(this.props.multiLine){
      control = (
        <textarea
          className="materialize-textarea" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChangeHandler.bind(this)} />
      )
    }else{
      control = (
        <input type={this.props.type}
          className="input-field" ref="input"
          defaultValue={this.props.default}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChangeHandler.bind(this)} />
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
