import React,{ Component } from 'react'
import _ from 'lodash'
import map from 'async/map'
import YF from 'yf-fpm-client-nodejs'
import Dropzone from 'react-dropzone'
import { browserHistory } from 'react-router'
import { PageTitle, Table, SearchBar, Icon, FooterFixedModal } from '../../controls'

class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      gallery: [],
      preview: []
    }
  }

  fetchPage(i, e){
    this.page = i
    let self = this
    let uploader = new YF.Func('gallery.list')
    uploader.invoke()
      .then(data=>{
        this.setState({ gallery: _.concat(this.state.gallery, data) })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount(){
    this.fetchPage(1)
    $('.modal').modal();
  }

  readerOnLoad(e, cb) {
    //图片base64数据
    let imgBase64Data = e.target.result
    let pos = imgBase64Data.indexOf("4") + 2
    imgBase64Data = imgBase64Data.substring(pos, imgBase64Data.length - pos);//去掉Base64:开头的标识字符
    cb(imgBase64Data)
  }

  onPageClickHandler(i, e){
    this.fetchPage(i)
  }

  onRowClickHandler(row, e){
    // swal('', row.content, '')
  }
  onDrop(acceptedFiles, rejectedFiles, e) {
    // console.log(acceptedFiles)
    let self = this
    this.setState({ preview: _.concat(this.state.preview, acceptedFiles) })
  }

  renderPreview(image) {
    return (
      <div className="col s3">
        <div className="card">
          <div className="card-image">
            <img src={image.preview} />
          </div>
          <div className="card-action">
            {/*<div>{image.name}</div>*/}
            <a className="btn-floating btn-small waves-effect waves-light red" 
              onClick={this.removePreview.bind(this)}><Icon>trash</Icon></a>
          </div>
        </div>
      </div>
    )
  }
  removePreview(){

  }

  onUploadHandler(){
    let self = this
    let uploader = new YF.Func('gallery.upload')
    map(this.state.preview, 
      (image, cb) => {
        let reader = new FileReader()
        reader.onload = (e) => {
          self.readerOnLoad(e, (base64)=>{
            let d = { name: image.name, size: image.size, type: image.type, data: base64 } 
            cb(null, d)
          })
        }
        reader.readAsDataURL(image)
      },
      (err, result) => {
        console.log(result)
        uploader.invoke(result)
          .then((data) => {
            $('#modal1').modal('close')
            self.setState({ preview: []})
            self.setState({ gallery: _.concat(data, this.state.gallery ) })
          })
          .catch(err=>{
            console.log(err)
          })
         
      } )
    
    
  }

  renderImages(image){
    return (
      <div className="col s3">
        <div className="card">
          <div className="card-image max-200 min-200">
            <img src={image.url + ''} />
          </div>
          <div className="card-action">
            <div>{image.name}&nbsp;</div>
          </div>
        </div>
      </div>
    )

  }
  render() {
    let self = this
    
    return (
      <div>
        <FooterFixedModal id="modal1" 
          title="Upload Images"
          onModalOkHandler={ this.onUploadHandler.bind(this) }>
          <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone grey lighten-4 valign-wrapper" id="upload-container">
            <div className="valign">
              <h5 className="center-align center-block">+ Drop File Or Click To Upload</h5>
            </div>
          </Dropzone>
          <div className="row">
            { this.state.preview.map(this.renderPreview.bind(this)) }
          </div>
        </FooterFixedModal>

        <div className="">
          <h3>Gallery</h3>
          <hr />
          <div className="row">
            <div className="col s4">
              <SearchBar />
            </div>
            <div className="col offset-s4 s4 right-align">
              <button className="waves-effect waves-light btn" data-target="modal1" ><Icon>upload</Icon> Upload</button>
            </div>
          </div>
          <div className="row">
            {this.state.gallery.map(this.renderImages)}            
          </div>                
        </div>
      </div>
    )
  }
}

export { Gallery }
