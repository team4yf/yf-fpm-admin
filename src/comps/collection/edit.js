import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { PageTitle, TextField, Panel} from '../../controls'

class CollectionEditor extends Component{

  constructor(props){
    super(props)
    this.state = {
      columns: [{}]
    }
  }
  onSubmitHandler(e){
    e.preventDefault()
    let name = this.refs['name'].getValue()

    alert(name)
    return false
  }

  onMoreColumnHandler(){
    let columns = this.state.columns
    this.setState({
      columns: _.concat(columns, {})
    })
  }

  onColumnRender(column, index){
    return (
      <tr key={'column-' + index}>
        <td><input placeholder="required" /></td>
        <td>
          <select className="browser-default">
            <option value="1">TINYINT</option>
            <option value="1">INT</option>
            <option value="2">BIGINT</option>
            <option value="3">VARCHAR(50)</option>
            <option value="3">VARCHAR(200)</option>
            <option value="3">VARCHAR(2000)</option>
            <option value="3">VARCHAR(4000)</option>
          </select>
        </td>
        <td>
          <input type="checkbox" id={"column-null-" + index} className="filled-in"/>
          <label htmlFor={"column-null-" + index}></label>
        </td>
        <td><input placeholder="not required"/></td>
        <td><input placeholder="not required"/></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
        <PageTitle>Collection</PageTitle>
        <div className="white">
          <Panel title="Edit A Collection">
            <form className="form-horizontal" id="collection-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >

                <TextField title="Name"
                  ref="name"
                  placeholder="type your collection name"/>

                <p>Columns</p>
                <div>
                  <table className="bordered">
                    <thead>
                      <tr>
                          <th data-field="name">Name</th>
                          <th data-field="type">Type</th>
                          <th data-field="isnull">IsNull</th>
                          <th data-field="default">Default</th>
                          <th data-field="comment">Comment</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        this.state.columns.map(this.onColumnRender.bind(this))
                      }
                      <tr>
                        <td colSpan="5">
                          <button className="grey btn"
                            onClick={this.onMoreColumnHandler.bind(this)}>+</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
                
                <div className="space-20"></div>
                <div className="col offset-s2 s10">
                  <button type="submit" className="btn modal-close">Save</button>
                </div>
              </form>
            </Panel>
        </div>
      </div>
    )
  }
}
export { CollectionEditor }