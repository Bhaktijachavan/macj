import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./CoverPhotoPage.css";

const CoverPhotoPage = () => {
  const uploadedImage = localStorage.getItem("uploadedImage");
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
    <div>
      {uploadedImage ? (
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
        <div className="content-for-the-cover-photo-check-box">Cover Photo</div>
      )}
    </div>
  );
};

export default CoverPhotoPage;

// import React from "react";
// import "./CoverPhotoPage.css";

// const CoverPhotoPage = () => {
//   const uploadedImage = localStorage.getItem("uploadedImage");

//   return (
//     <>
//       <div className="content-for-the-cover-photo-check-box">
//         {uploadedImage ? (
//           <img
//             src={uploadedImage}
//             alt="Cover Photo"
//             className="content-for-the-cover-photo-check-box-image-height-width"
//           />
//         ) : (
//           "Cover Photo"
//         )}
//       </div>
//     </>
//   );
// };

// export default CoverPhotoPage;

// import React from "react";
// import "./CoverPhotoPage.css";

// const CoverPhotoPage = () => {
//   const uploadedImage = localStorage.getItem("uploadedImage");
//   const coverphotoImage = localStorage.getItem("coverphotoImage");

//   return (
//     <div className="content-for-the-cover-photo-check-box">
//       {uploadedImage ? (
//         <img src={uploadedImage} alt="Uploaded Image" />
//       ) : coverphotoImage ? (
//         <img src={coverphotoImage} alt="Cover Photo" />
//       ) : (
//         "No photo available"
//       )}
//     </div>
//   );
// };

// export default CoverPhotoPage;
