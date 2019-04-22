import React, { Component } from 'react';

import './GalleryModal.css';

export default class GalleryModal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
  };

  render() {
    const {
      closeModal,
      hasNext,
      hasPrev,
      findNext,
      findPrev,
      src
    } = this.props;

    if (!src) {
      return null;
    }

    return (
      <div>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="modal">
          <div className="modal-body">
            <button
              className="modal-close"
              onClick={closeModal}
              onKeyDown={this.handleKeyDown}
            >
              &times;
            </button>
            {hasPrev && (
              <button
                className="modal-prev"
                onClick={findPrev}
                onKeyDown={this.handleKeyDown}
              >
                &lsaquo;
              </button>
            )}
            {hasNext && (
              <button
                className="modal-next"
                onClick={findNext}
                onKeyDown={this.handleKeyDown}
              >
                &rsaquo;
              </button>
            )}
            <img src={src} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
