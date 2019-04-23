import React, { Component, Fragment } from 'react';
import axios from 'axios';

import DropZone from '../DropZone';

import './UploadModal.css';

export default class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  state = {
    selectedFile: null,
    imagePreviewUrl: null
  };

  fileSelectedHandler = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    e.target.value = null;
  };

  removeSelectedFile = () => {
    this.setState({
      selectedFile: null,
      imagePreviewUrl: null
    });
  }

  fileUploadHandler = e => {
    if (this.state.selectedFile === null) {
      return console.log('Choose file to upload first');
    }
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post('http://localhost:5000/api/upload', fd, {
        onUploadProgress: progressEvent => {
          console.log(
            'Upload Progress: ' +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              '%'
          );
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          selectedFile: null,
          imagePreviewUrl: null
        })
      });
  };

  clickInput = () => {
    this.fileInput.current.click();
  };

  updateData = value => {
    let reader = new FileReader();
    let file = value[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { isOpen, closeUploadModal } = this.props;
    const { imagePreviewUrl } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <Fragment>
        <div className="modal-overlay" onClick={closeUploadModal} />
        <div className="upload-modal">
          <DropZone updateData={this.updateData}>
            <div className="image-upload-wrap">
              <input
                className="image-upload-input"
                type="file"
                onChange={this.fileSelectedHandler}
                title=" "
                ref={this.fileInput}
              />
              <div className="drag-text">
                <h3>Drag and drop image or select add image</h3>
              </div>
            </div>
          </DropZone>
          {imagePreviewUrl !== null ? (
            <div className="image-preview-wrap">
              <img className="image-preview" src={imagePreviewUrl} alt="" />
              <button className="image-remove-btn" onClick={this.removeSelectedFile}>remove image</button>
              <button className="image-upload-btn" onClick={this.fileUploadHandler}>Upload</button>
            </div>
          ) : (
            ''
          )}
          <button className="image-upload-btn" onClick={this.clickInput}>
            Add image
          </button>
        </div>
      </Fragment>
    );
  }
}
