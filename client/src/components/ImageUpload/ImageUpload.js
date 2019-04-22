import React, { Component } from 'react';
import axios from 'axios';

import './ImageUpload.css';

export default class ImageUpload extends Component {
  state = {
    selectedFile: null,
    imagePreviwUrl: null
  };

  fileSelectedHandler = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviwUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  fileUploadHandler = e => {
    e.preventDefault();
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
      });
  };

  fileLoadHandler = e => {
    e.preventDefault();
    axios
      .get('http://localhost:5000/api/images')
      .then(response => {
        this.props.updateData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form>
        <input type="file" onChange={this.fileSelectedHandler} />
        <img className="img-preview" src={this.state.imagePreviwUrl} alt="" />
        <button onClick={this.fileUploadHandler}>Upload</button>
        <button onClick={this.fileLoadHandler}>Load</button>
      </form>
    );
  }
}