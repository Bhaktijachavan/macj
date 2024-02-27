import React from "react";
import "./CompanyInfo.css";
function CompanyInfo({ text, id }) {
  const clientInfoDataString = localStorage.getItem("clientInfoData");
  const clientInfoData = clientInfoDataString
    ? JSON.parse(clientInfoDataString)
    : {};

  const { firstName, lastName, email, phone } = clientInfoData;

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };
  return (
    <>
      <div
        id={id}
        draggable="true"
        onDragStart={handleDragStart}
        className="draggable-text"
      >
        <section className="content-for-the-company-info">
          <p>
            {firstName && lastName && `Client Name: ${firstName} ${lastName}`}
          </p>
          <p> {email && `Email: ${email}`}</p>

          <p>{phone && `Phone: ${phone}`}</p>
        </section>
      </div>
    </>
  );
}

export default CompanyInfo;
