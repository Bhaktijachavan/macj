import React, { useEffect, useState } from "react";
// import "./CompanyInfo.css";
// import "./test.css";

function CompanyInfo({ id, onDiscardChanges }) {
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
    agent: "",
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

    // Destructure the clientInfoData object and set default values
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      fax = "",
      inspectionAddress = "",
      addressLine2 = "",
      city = "",
      state = "",
      zipCode = "",
      agent = "",
      dateOfInspection = "",
      timeOfInspection = "",
      ageOfHome = "",
      size = "",
      inspectionFee = "",
      weather = "",
      otherInfo = "",
    } = clientInfoData;

    // Update the state with retrieved data
    setEditableText({
      firstName,
      lastName,
      email,
      phone,
      fax,
      inspectionAddress,
      addressLine2,
      city,
      state,
      zipCode,
      agent,
      dateOfInspection,
      timeOfInspection,
      ageOfHome,
      size,
      inspectionFee,
      weather,
      otherInfo,
    });
  }, []);

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
        <section
          className="for-flexing-input-and-label-cover-page flex items-center"
          key={key}
        >
          <label htmlFor="">{label}:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="pl-[5px] w-[187px] overflow-hidden flex items-center h-[2.2em] resize-none"
          />
        </section>
      );
    }

    return null;
  };

  return (
    <>
      <div className="other-client-info-flex-direction flex flex-col ml-24 text-[13.3px]">
        <div className="flex items-center content-center justify-center">
          <div className="flex flex-col gap-[5px]">
            {editableText.firstName && (
              <section className="flex items-center">
                <p>First Name:</p>
                <input
                  type="text"
                  value={editableText.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="name-input-for-first-name-cover-page pl-[5px] w-[201px] h-[2.2em] overflow-hidden resize-none flex items-center"
                />
              </section>
            )}
            {editableText.email && (
              <section className="flex items-center">
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  value={editableText.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="email-input-for-cover-page pl-[5px] w-[239px] overflow-hidden flex items-center h-[2.2em] resize-none"
                />
              </section>
            )}

            {renderInputField("Phone", "phone")}
            {renderInputField("Fax", "fax")}
            {renderInputField("Time Of Inspection", "timeOfInspection")}
            {renderInputField("Date Of Inspection", "dateOfInspection")}
            {renderInputField("Age Of Home", "ageOfHome")}
          </div>
          <div className="flex flex-col gap-[5px]">
            {editableText.lastName && (
              <section className="flex items-center">
                <label htmlFor="">Last Name:</label>
                <input
                  type="text"
                  value={editableText.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="name-input-for-last-name-cover-page pl-[5px] w-[201px] overflow-hidden resize-none flex items-center h-[2.2em]"
                />
              </section>
            )}
            {renderInputField("Size", "size")}
            {renderInputField("Inspection Fee", "inspectionFee")}
            {renderInputField("Weather", "weather")}
            {renderInputField("City", "city")}
            {renderInputField("State", "state")}
            {renderInputField("Zipcode", "zipCode")}
          </div>
        </div>
        <section className="other-client-info-for-cover-page-genearate-report  flex flex-col gap-[10px] ">
          {editableText.addressLine2 && (
            <section className="only-for-addressLine2-input flex items-center">
              <label htmlFor="">Address Line 2:</label>
              <input
                type="text"
                value={editableText.addressLine2}
                onChange={(e) =>
                  handleInputChange("addressLine2", e.target.value)
                }
                className="addressLine2-input-for-cover-page w-[30em] pl-1 flex overflow-hidden resize-none items-center h-[2.2em]"
              />
            </section>
          )}
          {editableText.inspectionAddress && (
            <section className="only-for-inspectionAddress-input flex items-center ">
              <label htmlFor="">Inspection Address:</label>
              <input
                type="text"
                value={editableText.inspectionAddress}
                onChange={(e) =>
                  handleInputChange("inspectionAddress", e.target.value)
                }
                className="inspectionAddress-input-for-cover-page w-[30em] pl-1 overflow-hidden resize-none flex items-center h-[2.2em]"
              />
            </section>
          )}
          {editableText.otherInfo && (
            <section className="only-for-otherInfo-input flex overflow-hidden items-center">
              <label htmlFor="">Other Info:</label>
              <input
                type="text"
                value={editableText.otherInfo}
                onChange={(e) => handleInputChange("otherInfo", e.target.value)}
                className="otherInfo-input-for-cover-page w-[30em] pl-1 overflow-hidden resize-none items-center h-[2.2em]"
              />
            </section>
          )}
        </section>
      </div>
    </>
  );
}

export default CompanyInfo;
