import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import { browserHistory } from 'react-router'
import { PageTitle, Table, TextField, Panel} from '../../controls'

class TemplateList extends Component{
  constructor(props) {
    super(props)
    this.list = []
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('fpm_template')
    query.page(this.page, 10).findAndCount()
      .then(data => {
        data.current = i
        tableRef.notifyDataChangeHandler(data, e)
      })
  }

  onPageClickHandler(i, e){
    this.fetchPage(i, e)
  }
  
  componentDidMount(){
    this.fetchPage(1)
  }

  onCreateHandler(e){
    browserHistory.push('/setting/template/create')
  }

  onRowClickHandler(row, e){
    swal('', row.content, '')
  }

  onDeleteHandler(id, e){
    let self = this
    e.stopPropagation()
    // e.preventDefault()
    swal({
      title: 'Are you sure?',
      text: 'Remove The Data.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
    },
    function(isConfirm){
      if (isConfirm) {
        //Delete
        let obj = new YF.Object('fpm_template')
        obj.remove(id)
          .then(res=>{
            Materialize.toast('Remove Success!', 4000)
            self.fetchPage(self.page)
          })
          .catch(err=>{
            swal('', err.message, 'warning')
          })

      }
    })


  }
  
  render() {
    const truncateFunc = (src) => {
      return _.truncate(src, {
          'length': 18,
        })
    }
    const operFunc = (src) => {
      return (
        <a href="javascript:void(0)" className="red-text" onClick={this.onDeleteHandler.bind(this, src)}>Delete</a>
      )
    }
    const columns = [
      { key: 'id', title: 'ID', filter: false},
      { key: 'name', title: 'Name', filter: false},
      { key: 'content', title: 'Content', filter: truncateFunc, className: []},
      { key: 'id', title: 'Oper', filter: operFunc},
    ]
    
    const page = {}
    return (
      <div>
        <PageTitle>Template</PageTitle>
        <div className="">
          <Table title="Templates" 
            hasCreate="true"
            onCreateHandler={this.onCreateHandler.bind(this)}
            columns={columns} 
            ref='table'
            onPageClickHandler={this.onPageClickHandler.bind(this)}
            onRowClickHandler={this.onRowClickHandler}
            canRowClick="true"
          />
        </div>
      </div>
    )
  }
}

class TemplateEditor extends Component{

  constructor(props){
    super(props)
    this.state = {
      template: {
        name: '',
        content: '',
      }
    }
  }
  onSubmitHandler(e){
    e.preventDefault()
    let obj = new YF.Object('fpm_template', {
      name: this.refs.name.getValue(),
      content: this.refs.content.getValue()
    })
    obj.create()
      .then(res => {
        Materialize.toast('Add Success!', 4000)
      })
      .catch(err=>{
        swal('', err.message, 'danger')
      })
    return false
  }

  render(){
    return (
      <div>
        <PageTitle>Template</PageTitle>
        <div className="container white">
          <Panel title="Edit A Template">
            <form className="form-horizontal" id="template-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >

                <TextField title="Name"
                  default={this.state.template.name}
                  ref="name"
                  placeholder="type your template name"/>

                <TextField title="Content"
                  default={this.state.template.content}
                  multiLine="true"
                  ref="content"
                  placeholder="type your template content"/>
                
                <div className="grey lighten-4">
                  <p className="prettyprint lang-javascript">
                    //Example
                  </p>
                  <p>
                    //1. output var [name] Code: &#123;&#123; name &#125;&#125;
                  </p>
                  <p>
                    //2. if 
                  </p>
                  <p>
                    //3. for 
                  </p>
                  <p>Tip: Template Content Use [Nunjucks] , How to Use ? Check It Out: <a target="_blank" href="https://mozilla.github.io/nunjucks/">https://mozilla.github.io/nunjucks/</a></p>
                  
                </div>
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
export { TemplateList, TemplateEditor}
