import React from "react";
import "./InspectionDetails.css";
function InspectionDetails({ text, id }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  return (
    <>
      <div
        id={id}
        draggable="true"
        onDragStart={handleDragStart}
        className="draggable-text-inspection"
        style={{}}
      >
        <p
          className="N-G-Home-Inspection-Services"
          style={{
            fontSize: "20px",
          }}
        >
          N G Home Inspection Services <br />
        </p>
        <p
          className=" Property-Inspection-Report"
          style={{
            fontSize: "15px",
          }}
        >
          Property Inspection Report
        </p>
      </div>
    </>
  );
}

export default InspectionDetails;
