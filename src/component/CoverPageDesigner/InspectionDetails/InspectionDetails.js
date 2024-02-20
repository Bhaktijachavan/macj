import React from "react";
import './InspectionDetails.css'
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
        style={{

        }}
      >
        Inspection Details
      </div>
    </>
  );
}

export default InspectionDetails;
