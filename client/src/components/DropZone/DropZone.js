import React, { Component } from 'react';

import './DropZone.css';

export default class DropZone extends Component {

  state = {
      className: 'drop-zone-hide'
    }
  
  componentDidMount() {
    window.addEventListener('mouseup', this.onDragLeave);
    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragover', this.onDragOver);
    document.getElementById('dragbox').addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('drop', this.onDrop);
  }
  
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragLeave);
    window.removeEventListener('dragenter', this._nDragEnter);
    window.addEventListener('dragover', this.onDragOver);
    document.getElementById('dragbox').removeEventListener('dragleave', this.onDragLeave);
    window.removeEventListener('drop', this.onDrop);
  }
  
  onDragEnter = (e) => {
    this.setState({ className: 'drop-zone-show' });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  
  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  
  onDragLeave = (e) => {
    this.setState({className: 'drop-zone-hide'});
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  
  onDrop = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files;
    this.props.updateData(files);
    this.setState({className: 'drop-zone-hide'});
    return false;
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div id="dragbox" className={this.state.className}>
          Drop a file to Upload
        </div>
      </div>
    )
  }
}