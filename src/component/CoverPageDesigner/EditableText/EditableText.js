import React, { useState, useRef } from "react";
import "./EditableText.css";

const EditableText = ({ initialText, fontSize }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const textRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  const handleSelectionChange = () => {
    if (textRef.current) {
      // Check if textRef.current is not null
      if (window.getSelection().toString() === text) {
        textRef.current.style.fontSize = `${fontSize}px`;
      } else {
        textRef.current.style.fontSize = ""; // Reset font size if selection changes
      }
    }
  };

  const textStyle = {
    fontSize: `${fontSize}px`, // Apply the font size dynamically
  };

  return (
    <div
      className="all-the-editable-text-in-the-component"
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleSelectionChange}
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <p
          className="text-that-passed-through-props"
          ref={textRef}
          style={textStyle}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default EditableText;
