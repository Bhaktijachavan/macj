import React from "react";
import Draggable from "react-draggable";

function OutputComponent({ type, properties, remove }) {
  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    // Update the position of the draggable component here if needed
  };

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }} // Set initial position if needed
      onStop={handleDrag} // Handle drag event
    >
      <div
        className="border p-4 mb-4"
        style={{
          width: `${properties.width}px`,
          height: `${properties.height}px`,
          border: properties.border,
          // Add more styles based on properties (e.g., position)
        }}
      >
        {/* Display the content based on the type */}
        {type === "text" && <span className="text-lg">{properties.text}</span>}
        {type === "image" && (
          <img
            src={properties.src}
            alt={properties.alt}
            className="max-w-full h-auto"
          />
        )}
        {type === "box" && <div className="w-full h-full bg-gray-200"></div>}
        {/* Add controls for resizing, moving, etc. */}
        <button className="btn" onClick={remove}>
          Photo
        </button>
        <button className="btn" onClick={remove}>
          Remove
        </button>
      </div>
    </Draggable>
  );
}

export default OutputComponent;
