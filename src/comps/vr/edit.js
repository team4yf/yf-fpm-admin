import React, { Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import FormData from 'form-data'
import Dropzone from 'react-dropzone'
import { PageTitle, TextField, Selector, Panel } from '../../controls'

class VrEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {imagesHtml: ''}
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
  onDrop(acceptedFiles, rejectedFiles, e) {
    // console.log('Accepted files: ', acceptedFiles)
    let file = new YF.File()
    let form = new FormData(document.getElementById('collection-editer-form'))
    let image = acceptedFiles[0]
    console.log(image)
    console.log(form)
    file.upload(form)
      .then(res => {
        console.log(res)
      })

    this.setState({
      imagesHtml: this.renderImages(acceptedFiles)
    })
  }

  renderImages(images) {
    let imageDivs = []
    images.map((image, i) => {
      imageDivs.push(
        <div className="col s6" key={"image-" + i}>
          <div className="card">
            <div className="card-image">
              <img src={image.preview} />
              <a className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="fa fa-trash"></i>
              </a>
            </div>
            <div className="card-content">
              <p>{image.name}</p>
            </div>
          </div>
        </div>
      )
    })
    return imageDivs
  }

  render() {
    return (
      <div>
        <PageTitle></PageTitle>
        <div className="white">
          <Panel title="Edit A Vr">
            <form className="form-horizontal" id="collection-editer-form" onSubmit={this.onSubmitHandler.bind(this)} >
              <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone grey lighten-4 valign-wrapper" id="upload-container">
                <div className="valign">
                  <h3 className="center-align center-block">+ Drop File Or Click To Upload</h3>
                </div>
              </Dropzone>
              <div className="row images-preview">
                {this.state.imagesHtml}
              </div>
              <div className="clearfix"></div>
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