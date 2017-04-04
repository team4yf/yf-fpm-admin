import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { PageTitle, TextField, Panel} from '../../controls'

class CollectionEditor extends Component{

  constructor(props){
    super(props)
    this.state = {}
  }
  onSubmitHandler(e){
    e.preventDefault()
    // let obj = new YF.Object('fpm_template', {
    //   name: this.refs.name.getValue(),
    //   content: this.refs.content.getValue()
    // })
    // obj.create()
    //   .then(res => {
    //     Materialize.toast('Add Success!', 4000)
    //   })
    //   .catch(err=>{
    //     swal('', err.message, 'danger')
    //   })
    // return false
  }

  render(){
    return (
      <div>
        <PageTitle>Collection</PageTitle>
        <div className="container white">
          <Panel title="Edit A Collection">
            <form className="form-horizontal" id="collection-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >

                <TextField title="Name"
                  ref="name"
                  placeholder="type your collection name"/>

                <TextField title="Content"
                  multiLine="true"
                  ref="content"
                  placeholder="type your collection content"/>
                
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