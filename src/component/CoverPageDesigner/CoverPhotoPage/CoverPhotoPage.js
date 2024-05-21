import React from "react";
import "./CoverPhotoPage.css";

const CoverPhotoPage = () => {
  const uploadedImage = localStorage.getItem("uploadedImage");

  return (
    <>
      <div className="content-for-the-cover-photo-check-box">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Cover Photo"
            className="content-for-the-cover-photo-check-box-image-height-width"
          />
        ) : (
          "Cover Photo"
        )}
      </div>
    </>
  );
};

export default CoverPhotoPage;

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
