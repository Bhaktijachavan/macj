import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./CoverPhotoPage.css";

const CoverPhotoPage = () => {
  const uploadedImage = localStorage.getItem("uploadedImage");
  const clientInfoImage = localStorage.getItem("clientInfoImage"); // Retrieve clientInfoImage
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 }); // Initial size

  useEffect(() => {
    // Optionally, you can retrieve saved image size from local storage or a backend service
    const savedSize = localStorage.getItem("imageSize");
    if (savedSize) {
      setImageSize(JSON.parse(savedSize));
    }
  }, []);

  const handleResize = (event, { element, size }) => {
    setImageSize(size);
    // Optionally, save the resized image dimensions to local storage or a backend service
    localStorage.setItem("imageSize", JSON.stringify(size));
  };

  return (
    <div className="content-for-the-cover-photo-check-box">
      {clientInfoImage ? ( // Check if clientInfoImage exists
        <ResizableBox
          width={imageSize.width}
          height={imageSize.height}
          minConstraints={[100, 100]} // Minimum size
          maxConstraints={[800, 800]} // Maximum size
          onResize={handleResize}
          resizeHandles={["se"]} // Only allow resizing from the bottom right corner
        >
          <img
            src={clientInfoImage} // Use clientInfoImage instead of uploadedImage
            alt="Cover Photo"
            className="content-for-the-cover-photo-check-box-image"
            style={{ width: "100%", height: "100%" }}
          />
        </ResizableBox>
      ) : uploadedImage ? (
        <ResizableBox
          width={imageSize.width}
          height={imageSize.height}
          minConstraints={[100, 100]} // Minimum size
          maxConstraints={[800, 800]} // Maximum size
          onResize={handleResize}
          resizeHandles={["se"]} // Only allow resizing from the bottom right corner
        >
          <img
            src={uploadedImage}
            alt="Cover Photo"
            className="content-for-the-cover-photo-check-box-image"
            style={{ width: "100%", height: "100%" }}
          />
        </ResizableBox>
      ) : (
        "Cover Photo"
      )}
    </div>
  );
};

export default CoverPhotoPage;
