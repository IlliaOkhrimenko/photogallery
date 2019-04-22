import React, { Component } from 'react';

import GalleryModal from '../GalleryModal';

import './Gallery.css';

export default class Gallery extends Component {
 
  state = { currentIndex: null }

  renderImageContent = (src, index) => {
    return (
      <div className="image-item" key={src} onClick={e => this.openModal(e, index)}>
        <img src={src}  alt="" />
      </div>
    );
  }

  openModal(e, index) {
    this.setState({ currentIndex: index });
  }

  closeModal = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  }

  findPrev = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  }

  findNext = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  
  render() {
    const {imgUrls} = this.props;
    const {currentIndex} = this.state;

    return (
      <div className="gallery-container">
        <div className="gallery-grid">
          {imgUrls.map(this.renderImageContent)}
        </div>
        <GalleryModal
          closeModal={this.closeModal}
          findPrev={this.findPrev}
          findNext={this.findNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex + 1 < imgUrls.length}
          src={imgUrls[currentIndex]}
        />
      </div>
    );
  }
}