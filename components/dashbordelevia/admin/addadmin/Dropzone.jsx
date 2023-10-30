//*Dropzone.js*//
import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =useDropzone({accept: 'image/*',onDrop,});
  const lists = acceptedFiles.map((list) => (
    <li key={list.path}>
      {list.path} - {list.size} bytes
    </li>
  ));

  return (
    <div>
        <div {...getRootProps({className: 'dropzone'})}>
       <div className="col-lg-12">
        <div className="portfolio_upload">
          <input type="file" className="input-zone" {...getInputProps()} name="myfile" />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          {isDragActive ? (
            <p className="dropzone-content">
              Release to drop the files here
            </p>
          ) : (
            <p className="dropzone-content">
              Drag and drop images here or click to select files
            </p>
          )}
        </div>
      </div>
      </div>
      <aside>
        <p>{lists}</p>
      </aside>
    </div>
    
  );
}

export default Dropzone;


