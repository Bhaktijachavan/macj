import React from "react";

function DraggableText({ text, id }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={handleDragStart}
      className="draggable-text"
    >
      {text}
    </div>
  );
}

export default DraggableText;
