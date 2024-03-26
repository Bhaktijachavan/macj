// import React, { useEffect, useState } from "react";
// import "./CompanyInfo.css";

// function CompanyInfo({ id }) {
//   const [editableText, setEditableText] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     fax: "",
//     inspectionAddress: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     agent: "macj-home-inspector",
//     dateOfInspection: "",
//     timeOfInspection: "",
//     ageOfHome: "",
//     size: "",
//     inspectionFee: "",
//     weather: "",
//     otherInfo: "",
//   });

//   useEffect(() => {
//     const clientInfoDataString = localStorage.getItem("clientInfoData");
//     const clientInfoData = clientInfoDataString
//       ? JSON.parse(clientInfoDataString)
//       : {};
//     setEditableText(clientInfoData);
//   }, []);

//   const handleDragStart = (event) => {
//     event.dataTransfer.setData("text/plain", event.target.id);
//   };

//   const handleInputChange = (key, value) => {
//     console.log("Key:", key);
//     console.log("Value:", value);
//     setEditableText({
//       ...editableText,
//       [key]: value,
//     });
//   };

//   return (
//     <div
//       id={id}
//       draggable="true"
//       onDragStart={handleDragStart}
//       className="draggable-text"
//     >
//       <section className="content-for-the-company-info">
//         <section className="fname-and-lname-content-for-the-company-info">
//           {/* <input
//             type="text"
//             value={`${editableText.firstName} ${editableText.lastName}`}
//             onChange={(e) => {
//               const [firstName, lastName] = e.target.value.split(" ");
//               handleInputChange("firstName", firstName);
//               handleInputChange("lastName", lastName);
//             }}
//           /> */}

//           <input
//             type="text"
//             value={editableText.firstName}
//             onChange={(e) => handleInputChange("firstName", e.target.value)}
//             className="name-input-for-first-name-cover-page"
//           />
//           <input
//             type="text"
//             value={editableText.lastName}
//             onChange={(e) => handleInputChange("lastName", e.target.value)}
//             className="name-input-for-last-name-cover-page"
//           />
//         </section>
//         <section className="email-and-mob-number-section-for-company-info">
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Email:</label>
//             <input
//               type="text"
//               value={editableText.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Phone:</label>
//             <input
//               type="text"
//               value={editableText.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//             />
//           </section>
//         </section>
//         <section className="other-client-info-for-cover-page-genearate-report">
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Fax:</label>
//             <input
//               type="text"
//               value={editableText.fax}
//               onChange={(e) => handleInputChange("fax", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Inspection Address:</label>
//             <input
//               type="text"
//               value={editableText.inspectionAddress}
//               onChange={(e) =>
//                 handleInputChange("inspectionAddress", e.target.value)
//               }
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Address Line-2:</label>
//             <input
//               type="text"
//               value={editableText.addressLine2}
//               onChange={(e) =>
//                 handleInputChange("addressLine2", e.target.value)
//               }
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">City:</label>
//             <input
//               type="text"
//               value={editableText.city}
//               onChange={(e) => handleInputChange("city", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">State: </label>
//             <input
//               type="text"
//               value={editableText.state}
//               onChange={(e) => handleInputChange("state", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Zipcode: </label>
//             <input
//               type="text"
//               value={editableText.zipcode}
//               onChange={(e) => handleInputChange("zipcode", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Date Of Inspection: </label>
//             <input
//               type="text"
//               value={editableText.dateOfInspection}
//               onChange={(e) =>
//                 handleInputChange("dateOfInspection", e.target.value)
//               }
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Time Of Inspection: </label>
//             <input
//               type="text"
//               value={editableText.timeOfInspection}
//               onChange={(e) =>
//                 handleInputChange("timeOfInspection", e.target.value)
//               }
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Age Of Home: </label>
//             <input
//               type="text"
//               value={editableText.ageOfHome}
//               onChange={(e) => handleInputChange("ageOfHome", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Size:</label>
//             <input
//               type="text"
//               value={editableText.size}
//               onChange={(e) => handleInputChange("size", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Inspection Fee: </label>
//             <input
//               type="text"
//               value={editableText.inspectionFee}
//               onChange={(e) =>
//                 handleInputChange("inspectionFee", e.target.value)
//               }
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             <label htmlFor="">Weather: </label>
//             <input
//               type="text"
//               value={editableText.weather}
//               onChange={(e) => handleInputChange("weather", e.target.value)}
//             />
//           </section>
//           <section className="for-flexing-input-and-label-cover-page">
//             {/* <label htmlFor="">Other Info: </label> */}
//             <input
//               type="text"
//               value={editableText.otherInfo}
//               onChange={(e) => handleInputChange("otherInfo", e.target.value)}
//             />
//           </section>
//         </section>
//       </section>
//     </div>
//   );
// }

// export default CompanyInfo;
import React, { useEffect, useState } from "react";
import "./CompanyInfo.css";

function CompanyInfo({ id }) {
  const [editableText, setEditableText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fax: "",
    inspectionAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    agent: "macj-home-inspector",
    dateOfInspection: "",
    timeOfInspection: "",
    ageOfHome: "",
    size: "",
    inspectionFee: "",
    weather: "",
    otherInfo: "",
  });

  useEffect(() => {
    const clientInfoDataString = localStorage.getItem("clientInfoData");
    const clientInfoData = clientInfoDataString
      ? JSON.parse(clientInfoDataString)
      : {};
    setEditableText(clientInfoData);
  }, []);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleInputChange = (key, value) => {
    setEditableText({
      ...editableText,
      [key]: value,
    });
  };

  const renderInputField = (label, key) => {
    const value = editableText[key];

    // Only render if the value is not empty
    if (value !== undefined && value !== null && value !== "") {
      return (
        <section className="for-flexing-input-and-label-cover-page" key={key}>
          <label htmlFor="">{label}:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </section>
      );
    }

    return null;
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={handleDragStart}
      className="draggable-text"
    >
      <section className="content-for-the-company-info">
        <section className="fname-and-lname-content-for-the-company-info">
          <div className="first-name-and-last-name-inputs">
            {" "}
            <label htmlFor="">First Name:</label>
            <input
              type="text"
              value={editableText.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="name-input-for-first-name-cover-page"
            />{" "}
            <label htmlFor="">Last Name:</label>
            <input
              type="text"
              value={editableText.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="name-input-for-last-name-cover-page"
            />
          </div>
          <section className="only-for-email-input">
            {" "}
            <label htmlFor="">Email:</label>
            <input
              type="text"
              value={editableText.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="email-input-for-cover-page"
            />
          </section>
        </section>
        <div className="other-client-info-flex-direction">
          <section className="email-and-mob-number-section-for-company-info">
            {/* {renderInputField("Email", "email")} */}
            {renderInputField("Time Of Inspection", "timeOfInspection")}
            {renderInputField("Age Of Home", "ageOfHome")}
            {renderInputField("Size", "size")}
            {renderInputField("Inspection Fee", "inspectionFee")}
            {renderInputField("Weather", "weather")}
            {renderInputField("Other Info", "otherInfo")}{" "}
            {renderInputField("Date Of Inspection", "dateOfInspection")}
            {renderInputField("Address Line-2", "addressLine2")}
          </section>
          <section className="other-client-info-for-cover-page-genearate-report">
            {renderInputField("Phone", "phone")}{" "}
            {renderInputField("Fax", "fax")}
            {renderInputField("City", "city")}
            {renderInputField("State", "state")}
            {renderInputField("Zipcode", "zipCode")}
            {renderInputField("Inspection Address", "inspectionAddress")}
          </section>
        </div>
      </section>
    </div>
  );
}

export default CompanyInfo;
