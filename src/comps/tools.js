import React,{ Component } from 'react'
import { Panel } from './common'
import { TextField } from './controls'
import fetchData from '../model/fpm-api'
import _ from 'lodash'

class Tools extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: { code: 0, now: _.now() }
    }
  }

  onSubmitHandler(){
    let method = this.refs.method.getValue()
    let args = this.refs.args.getValue() || '{}'
    fetchData(method, args)
      .then((data)=>{
        this.setState({result: data })
      })
  }

  render() {
    return (
      <Panel title="Api Client Simple">
        <form className="form-horizontal" onSubmit={this.onSubmitHandler.bind(this)} >
          <TextField
            title="Method:"
            ref="method"
            placeholder="ex: common.find"
          />
          <TextField
            title="Arguments:"
            multiLine="true"
            ref="args"
            placeholder="should be json syntx"
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-1">
              <button type="text" className="btn btn-primary">Go</button>
            </div>
            <div className="col-sm-3">
              <button type="reset" className="btn btn-default">Reset</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-sm-2 text-right">
            Result:
          </div>
          <div className="col-sm-10">
            <pre className="bg-warning prettyprint lang-javascript">
              { JSON.stringify(this.state.result, null, 2) }
            </pre>
          </div>
        </div>
      </Panel>
    )
  }
}

export default Tools
