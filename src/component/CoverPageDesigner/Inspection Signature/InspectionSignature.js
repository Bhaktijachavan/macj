import React from "react";

function InspectionSignature({ text, id }) {
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
        Inspection Signature
      </div>
    </>
  );
}

export default InspectionSignature;
