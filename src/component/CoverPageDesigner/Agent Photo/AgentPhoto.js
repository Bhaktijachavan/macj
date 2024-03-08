import React from "react";

function AgentPhoto({ text, id }) {
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
        Agent Photo
      </div>
    </>
  );
}

export default AgentPhoto;
