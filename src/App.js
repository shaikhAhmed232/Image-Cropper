import "./App.css";
import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { generateDownload } from "./utils/cropImages";

const App = () => {
  const inputRef = useRef();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);

  const fileChangeHandle = (event) => {
    const { files } = event.target;
    setSrc(URL.createObjectURL(files[0]));
  };

  const onCropCompleted = (cropPercentage, cropPixels) => {
    setCroppedArea(cropPixels);
  };

  const onDownloaded = () => {
    generateDownload(src, croppedArea);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={fileChangeHandle}
        />
        <button onClick={() => inputRef.current.click()}>Upload</button>
      </div>
      <div className="image-container">
        {src && (
          <>
            <div className="cropper-container">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={(c) => setCrop(c)}
                onZoomChange={(z) => setZoom(z)}
                onCropComplete={onCropCompleted}
              />
            </div>
            <div className="slider">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
            <button className="download-btn" onClick={onDownloaded}>
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
