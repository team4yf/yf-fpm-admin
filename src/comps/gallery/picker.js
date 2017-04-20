import React,{ Component } from 'react'
import _ from 'lodash'
import map from 'async/map'
import YF from 'yf-fpm-client-nodejs'
import Dropzone from 'react-dropzone'
import { browserHistory } from 'react-router'
import { PageTitle, Table, SearchBar, Icon, FooterFixedModal } from '../../controls'

class ImagePicker extends Component{
  constructor(props) {
    super(props)
    this.state = {
      gallery: [],
      preview: [],
    }
    this.checkedImages = {}
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

  onDrop(acceptedFiles, rejectedFiles, e) {
    let self = this
    this.setState({ preview: _.concat(this.state.preview, acceptedFiles) })
  }

  renderPreview(image, i) {
    return (
      <div className="col s3" key={ 'preview-' + i}>
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

  onOkHandler(){
    $('#modal1').modal('close')
    this.props.onOkHandler(_.values(this.checkedImages))
  }

  onCheckHandler(image, index){    
    
    let images = this.state.gallery
    let flag = !(image.checked === true)
    if(this.props.single){
      images = _.map(images, (i)=>{
        i.checked = false
        return i
      })
    }
    images[index].checked = flag
    if(flag){
      if(this.props.single){
        this.checkedImages = {}
      }
      this.checkedImages['id-' + index] = image

    }else{
      delete this.checkedImages['id-' + index]
    }
    
    this.setState({gallery: images})
    this.props.onCheckHandler(image)
  }

  renderImages(image, index){
    let mask = image.checked === true?(<div className="valign-wrapper mask full-mask"><h3 className="valign center-align"><Icon>check</Icon></h3></div>): ''
    return (
      <div className="col s3" key={ 'image-' + index}>
        <div className="card" onClick={this.onCheckHandler.bind(this, image, index)}>
          <div className="card-image max-150 min-150">
            { mask }
            <img src={image.url + ''} />
          </div>
          <div className="card-action">
            <div>{ image.name }&nbsp;</div>
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
          title="Image Picker"
          ref="modal"
          onModalOkHandler={ this.onOkHandler.bind(this) }>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a className="active" href="#gallery">Gallery</a></li>
                <li className="tab col s3"><a href="#upload">Upload</a></li>
              </ul>
            </div>
            <div id="gallery" className="col s12">
              <div className="row">
                {this.state.gallery.map(this.renderImages.bind(this))}            
              </div>
            </div>
            <div id="upload" className="col s12">
              <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone grey lighten-4 valign-wrapper" id="upload-container">
                <div className="valign">
                  <h5 className="center-align center-block">+ Drop File Or Click To Upload</h5>
                </div>
              </Dropzone>
              <div className="row">
                { this.state.preview.map(this.renderPreview.bind(this)) }
              </div>
            </div>
          </div>
          
        </FooterFixedModal>

        <div className="">
          <button className="waves-effect waves-light btn" data-target="modal1" ><Icon>upload</Icon> Upload</button>          
        </div>
      </div>
    )
  }
}

export { ImagePicker }
