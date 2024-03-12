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
    console.log("Key:", key);
    console.log("Value:", value);
    setEditableText({
      ...editableText,
      [key]: value,
    });
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
          {/* <input
            type="text"
            value={`${editableText.firstName} ${editableText.lastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              handleInputChange("firstName", firstName);
              handleInputChange("lastName", lastName);
            }}
          /> */}

          <input
            type="text"
            value={editableText.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="name-input-for-first-name-cover-page"
          />
          <input
            type="text"
            value={editableText.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="name-input-for-last-name-cover-page"
          />
        </section>
        <section className="email-and-mob-number-section-for-company-info">
          <input
            type="text"
            value={editableText.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <input
            type="text"
            value={editableText.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </section>
      </section>
    </div>
  );
}

export default CompanyInfo;
