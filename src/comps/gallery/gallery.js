import React,{ Component } from 'react'
import _ from 'lodash'
import YF from 'yf-fpm-client-nodejs'
import Dropzone from 'react-dropzone'
import { browserHistory } from 'react-router'
import { PageTitle, Table, SearchBar, Icon, FooterFixedModal } from '../../controls'

class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      gallery: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
      preview: []
    }
  }

  fetchPage(i, e){
    this.page = i
    let tableRef = this.refs.table
    let query = new YF.Query('_udf_vr_list')
    query.page(this.page, 10).findAndCount()
      .then(data => {
        data.current = i
        // tableRef.notifyDataChangeHandler(data, e)
      })
  }

  componentDidMount(){
    // this.fetchPage(1)
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
    let form = new FormData()
    // _.map(acceptedFiles){
      form.append('file', acceptedFiles[0])
    // }
    console.log(form)
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
    _.map(this.state.preview, file => {
      let reader = new FileReader()
      reader.onload = (e) => {
        self.readerOnLoad(e, (base64)=>{
          console.log(base64.length)
          $('#modal1').modal('close');
        })
      }
      reader.readAsDataURL(file)
    })
    this.setState({ preview: []})
  }

  renderImages(image){
    return (
      <div className="col s3">
        <div className="card">
          <div className="card-image">
            <img src="http://olk3bzfd5.bkt.clouddn.com/snap2017-04-14-15-17-12.png?imageView2/1/w/400/h/200/interlace/1/q/75|imageslim" />
          </div>
          <div className="card-action">
            <div>Image1</div>
            <div>200 * 200</div>
            <div>http://88888888.png</div>
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
