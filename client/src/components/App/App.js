import React, { Component } from 'react';
import axios from 'axios';

import Gallery from '../Gallery';
import ImageUpload from '../ImageUpload';

import './App.css';

export default class App extends Component {
  state = {
    imgUrls: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/images')
      .then(response => {
        this.updateData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateData = value => {
    this.setState({ imgUrls: value });
  }

  render() {
    return (
      <div className="App">
        <ImageUpload updateData={this.updateData} />
        <Gallery imgUrls={this.state.imgUrls} />
      </div>
    );
  }
}