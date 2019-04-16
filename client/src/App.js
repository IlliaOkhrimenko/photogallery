import React, { Component } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import ImageUpload from './components/ImageUpload';

class App extends Component {
  state = {
    imgUrls: []
  };
  
updateData = (value) => {
  this.setState({imgUrls: value})
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
