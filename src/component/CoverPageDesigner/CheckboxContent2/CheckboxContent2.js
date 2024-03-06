// import React from "react";
// import "./CheckboxContent2.css";
// import CompanyLogo from "../../../Assets/icons/download.jpeg";
// const CheckboxContent2 = () => {
//   return (
//     <>
//       <div className="content-for-the-company-logo-check-box">
//         {/* <img src={CompanyLogo} alt="" srcset="" /> */}
//         Logo
//       </div>
//     </>
//   );
// };

// export default CheckboxContent2;
// CheckboxContent2.js

import React from "react";
import "./CheckboxContent2.css";

const CheckboxContent2 = ({ uploadedLogo }) => {
  return (
    <>
      <div className="content-for-the-company-logo-check-box">
        {uploadedLogo ? (
          <img src={URL.createObjectURL(uploadedLogo)} alt="Company Logo" />
        ) : (
          "Logo"
        )}
      </div>
    </>
  );
};

export default CheckboxContent2;
