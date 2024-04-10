import React, { useEffect, useState } from "react";
// import "./CompanyInfo.css";
// import "./test.css";

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
        <section
          className="for-flexing-input-and-label-cover-page flex"
          key={key}
        >
          <label htmlFor="">{label}:</label>
          <textarea
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="pl-[5px]  w-[187px] overflow-hidden h-7 resize-none"
          />
        </section>
      );
    }

    return null;
  };

  return (
    <>
      <div
        id={id}
        draggable="true"
        onDragStart={handleDragStart}
        className="draggable-text"
      ></div>

      <div className="other-client-info-flex-direction    flex flex-col gap-4 ml-24">
        <div className="flex items-center content-center justify-center">
          <div className="flex flex-col gap-[10px]">
            {editableText.firstName && (
              <section className="flex">
                <label htmlFor="firstName">First Name:</label>
                <textarea
                  type="text"
                  id="firstName"
                  value={editableText.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="name-input-for-first-name-cover-page pl-[5px]  w-[201px] overflow-hidden h-7 resize-none"
                />
              </section>
            )}
            {editableText.email && (
              <section className="flex">
                <label htmlFor="">Email:</label>
                <textarea
                  type="email"
                  value={editableText.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="email-input-for-cover-page pl-[5px] w-[239px] overflow-hidden h-7 resize-none"
                />
              </section>
            )}

            {renderInputField("Phone", "phone")}
            {renderInputField("Fax", "fax")}
            {renderInputField("Time Of Inspection", "timeOfInspection")}
            {renderInputField("Date Of Inspection", "dateOfInspection")}
            {renderInputField("Age Of Home", "ageOfHome")}
          </div>
          <div className="flex flex-col gap-[10px]">
            {editableText.lastName && (
              <section className="flex">
                {" "}
                <label htmlFor="">Last Name:</label>
                <textarea
                  type="text"
                  value={editableText.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="name-input-for-last-name-cover-page pl-[5px]  w-[201px] overflow-hidden h-7 resize-none"
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
            <section className="only-for-addressLine2-input flex ">
              <label htmlFor="">Address Line 2:</label>
              <textarea
                type="text"
                value={editableText.addressLine2}
                onChange={(e) =>
                  handleInputChange("addressLine2", e.target.value)
                }
                className="addressLine2-input-for-cover-page w-[30em] pl-1 overflow-hidden resize-none"
              />
            </section>
          )}
          {editableText.inspectionAddress && (
            <section className="only-for-inspectionAddress-input   flex  ">
              <label htmlFor="">Inspection Address:</label>
              <textarea
                type="text"
                value={editableText.inspectionAddress}
                onChange={(e) =>
                  handleInputChange("inspectionAddress", e.target.value)
                }
                className="inspectionAddress-input-for-cover-page w-[30em] pl-1 overflow-hidden resize-none"
              />
            </section>
          )}
          {editableText.otherInfo && (
            <section className="only-for-otherInfo-input flex overflow-hidden">
              <label htmlFor="">Other Info:</label>
              <textarea
                type="text"
                value={editableText.otherInfo}
                onChange={(e) => handleInputChange("otherInfo", e.target.value)}
                className="otherInfo-input-for-cover-page w-[30em] pl-1 overflow-hidden resize-none"
              />
            </section>
          )}
        </section>
      </div>
    </>
  );
}

export default CompanyInfo;
