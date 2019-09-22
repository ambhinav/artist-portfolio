import React from 'react';
import Dropzone from 'react-dropzone';

const DragAndDrop = (props) => {
  
  return (
    <div>
      <h1>Drag and drop to upload!</h1>
      <Dropzone onDrop={props.handleOnDrop} accept='image/*' multiple={false}>Drop here</Dropzone>
    </div>
  );
}

export default DragAndDrop;