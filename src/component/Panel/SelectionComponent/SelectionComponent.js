import React, { useState } from "react";
import "./SelectionComponent.css";
import EditComments from "../../EditComments/EditComments";

const SelectionComponent = (panelData) => {
  const [selectedText, setSelectedText] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleTextSelectionforSelectionChange = () => {
    const selection = window.getSelection();
    const selectedRange = selection.getRangeAt(0);
    const container = selectedRange.commonAncestorContainer;
    const selectedText =
      container.nodeType === 3 ? container.nodeValue : container.innerText;
    setSelectedText(selectedText);
  };
  return (
    <div>
      <div>
        <div className="panel-heading text-center m-2">
          {panelData.selection1}
        </div>
        <div className="pl-2 m-2 flex">
          <div className="Editcomments-and-checkbox-container">
            <EditComments />
            <div className="p-5">
              {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 checkbox-container"
                >
                  <input
                    type="checkbox"
                    id={label}
                    name={label}
                    value={label}
                    style={{ backgroundColor: "#3182ce" }}
                    className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                  />
                  <label htmlFor={label}>{label}</label>
                </div>
              ))}
            </div>
          </div>
          <div
            className="scroll-box-panel2 p-4 bg-gray-100"
            style={{ cursor: "pointer" }}
            onMouseUp={handleTextSelectionforSelectionChange}
          >
            {commentText.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionComponent;
