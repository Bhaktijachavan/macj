import React from "react";

function AgentInformation({ text, id }) {
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
        <p>Inspector: Nitin Gujarathi</p>
        <p>Phone: +919890002635</p>
        <p>Email: niting@macj.in</p>
      </div>
    </>
  );
}

export default AgentInformation;
