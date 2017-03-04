import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { Panel, TextField } from '../../controls'

class ApiTester extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: { code: 0, now: _.now() }
    }
  }

  onSubmitHandler(e){
    e.preventDefault()
    let method = this.refs.method.getValue()
    if(_.isEmpty(method)){
      return false
    }
    let args = this.refs.args.getValue() || '{}'
    let func = new YF.Func(method)
    func.invoke(args)
      .then((data)=>{
        this.setState({result: data })
      })
  }

  render() {
    return (
      <div className="container">
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
            <div className="row">
              <div className="col s2">
                <button type="text" className="btn btn-primary">Go</button>
              </div>
              <div className="col s3">
                <button type="reset" className="btn grey">Reset</button>
              </div>
            </div>
          </form>

          <div className="divider"></div>
          <div className="">
            <pre className="bg-warning prettyprint lang-javascript">
              { JSON.stringify(this.state.result, null, 1) }
            </pre>
          </div>
        </Panel>
      </div>
    )
  }
}

export default ApiTester
