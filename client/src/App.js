import React, { Component } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import ImageUpload from './components/ImageUpload';
import axios from 'axios';

class App extends Component {
  state = {
    imgUrls: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/images')
      .then(response => {
        console.log(response.data);
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

export default App;
