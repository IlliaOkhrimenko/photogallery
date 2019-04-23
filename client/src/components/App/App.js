import React, { Component } from 'react';
import axios from 'axios';

import Gallery from '../Gallery';
import UploadModal from '../UploadModal';

import './App.css';

export default class App extends Component {
  state = {
    imgUrls: [],
    isUploadModalOpen: false
  };

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  fetchData = () => {
    axios
      .get('/api/images')
      .then(response => {
        this.updateData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateData = value => {
    this.setState({ imgUrls: value });
  };

  toggleUploadModal(e) {
    this.setState(state => {
      return {
        isUploadModalOpen: !state.isUploadModalOpen
      };
    });
  }

  closeUploadModal = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ isUploadModalOpen: false });
  }

  render() {
    return (
      <div className="App">
        <button className="upload-btn" onClick={e => this.toggleUploadModal(e)}>Upload image</button>
        <UploadModal
          isOpen={this.state.isUploadModalOpen}
          closeUploadModal={this.closeUploadModal}
        />
        <Gallery imgUrls={this.state.imgUrls} />
      </div>
    );
  }
}
