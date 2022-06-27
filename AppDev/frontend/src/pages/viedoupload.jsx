import React from 'react';
import {  Storage } from 'aws-amplify';

//window.Buffer = window.Buffer || require("buffer").Buffer;

function VideoUpload() {
  const onFileChange = async (file) => {
    const result = await Storage.put(`${file.name}`, file);
  }

  return (
      <div className="App">
        <h1>Hello React</h1>
        <input type="file" onChange={(e)=>onFileChange(e.target.files[0])} />
      </div>
  );
}

export default VideoUpload;