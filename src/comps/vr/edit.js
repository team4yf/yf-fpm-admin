import React, { Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import Dropzone from 'react-dropzone'
import { ImagePicker } from '../gallery'
import { PageTitle, TextField, Selector, Panel } from '../../controls'

class VrEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {images: []}
  }
  componentDidMount(e) {

  }
  onSubmitHandler(e) {
    e.preventDefault()
    let data = {
      name: this.refs.name.getValue(),
      tag: this.refs.tag.getValue(),
      sky: this.refs.sky.getValue(),
      tmp: this.refs.tmp.getValue(),
    }
    let obj = new YF.Object('_udf_vr_list',data)
    obj.create()
      .then(res => {
        Materialize.toast('Add Success!', 4000)
      })
      .catch(err=>{
        console.log(err)
        // swal('', err.message, 'danger')
      })
    return false
  }
  
  onRemoveImageHandler(i, e) {
    console.log(i)
    this.state.images.splice(i, 1)
    this.setState({ images: this.state.images })
  }

  renderImage(image, i) {
    return (<div className="col s6" key={"image-" + i}>
        <div className="card">
          <div className="card-image">
            <img src={image.url} />
            <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={ this.onRemoveImageHandler.bind(this, i) }>
              <i className="fa fa-trash"></i>
            </a>
          </div>
          <div className="card-content">
            <p>{image.name}</p>
          </div>
        </div>
      </div>)
  }

  onCheckHandler(image){
    //console.log(image)
  }

  onOkHandler(images){
    if(images.length < 1){ return }
    this.setState({images: images})
    this.refs.sky.setValue(images[0].url)
  }

  render() {
    return (
      <div>
        <PageTitle></PageTitle>
        <div className="white">
          <Panel title="Edit A Vr">
            <form className="form-horizontal" id="collection-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >
              
              <TextField title="Name"
                ref="name"
                placeholder="type your vr name" />

              <TextField title="Tag"
                ref="tag"
                placeholder="tag" />

              <Selector title="Template"
                values={[
                  {title: 'Sample', value: 'sample'}, 
                  {title: 'Model', value: 'model'}, 
                  {title: 'Multi', value: 'multi'},
                  {title: 'Floor', value: 'floor'} ]}
                ref="tmp" />

              <TextField title="Sky"
                ref="sky"
                placeholder="http://" />

              <ImagePicker 
                single={true}
                onCheckHandler={this.onCheckHandler.bind(this)}
                onOkHandler={ this.onOkHandler.bind(this) }/>
              <div className="row images-preview">
                {this.state.images.map(this.renderImage.bind(this))}
              </div>
              <div className="clearfix"></div>

              <TextField title="Content"
                multiLine="true"
                ref="content"
                placeholder="type your collection content" />

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
export { VrEditor }