import React, { Component, Fragment } from 'react';
import axios from 'axios';

class ImageUpload extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = event => {

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviwUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  };

  fileUploadHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post('http://localhost:5000/api/images', fd, {
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

  fileLoadHandler = (event) => {
    event.preventDefault();
    axios
      .get('http://localhost:5000/api/get')
      .then(response => {
        console.log(response.data);
        this.props.updateData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Fragment>
        <form>
          <input
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <img className="imgPreview" src={this.state.imagePreviwUrl} alt=""></img>
          <button onClick={this.fileUploadHandler}>Upload</button>
          <button onClick={this.fileLoadHandler}>Load</button>
        </form>
      </Fragment>
    );
  }
}

export default ImageUpload;
