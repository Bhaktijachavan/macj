import React from "react";

function AgentInformation({ text, id }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  return (
    <>
      <div>
        <p contentEditable={true} suppressContentEditableWarning={true}>
          Inspector: Nitin Gujarathi
        </p>
        <p contentEditable={true} suppressContentEditableWarning={true}>
          Phone: +919890002635
        </p>
        <p contentEditable={true} suppressContentEditableWarning={true}>
          Email: niting@macj.in
        </p>
      </div>
    </>
  );
}

export default AgentInformation;
