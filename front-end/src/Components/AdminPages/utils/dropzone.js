import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    this.setState({
      files
    }) 
    // send data to parent
    this.sendData()
  }

  sendData = () => {
    this.props.handleOnDrop(this.state.files)
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    )); 
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DragAndDrop