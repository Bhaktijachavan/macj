import React from "react";
import "./CompanyInfo.css";
function CompanyInfo({ text, id }) {
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
            Inspector : Nitin Gujarathi <br />
            Phone : +91-9890002635 <br />
            Email: nitin@Macj.in
          </p>
        </section>
      </div>
    </>
  );
}

export default CompanyInfo;
