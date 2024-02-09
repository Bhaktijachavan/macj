import React from "react";

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
        className="draggable-text"
      >
        Inspection Details
      </div>
    </>
  );
}

export default InspectionDetails;
