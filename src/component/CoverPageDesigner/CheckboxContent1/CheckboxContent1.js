import React from "react";
import "./CheckboxContent1.css";

const CheckboxContent1 = () => {
  const uploadedImage = localStorage.getItem("uploadedImage");

  return (
    <>
      <div className="content-for-the-cover-photo-check-box">
        {uploadedImage ? (
          <img src={uploadedImage} alt="Cover Photo" />
        ) : (
          "Cover Photo"
        )}
      </div>
    </>
  );
};

export default CheckboxContent1;

// import React from "react";
// import "./CheckboxContent1.css";

// const CheckboxContent1 = () => {
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

// export default CheckboxContent1;
