import React from "react";

function OutputComponent({ type, properties, remove }) {
  switch (type) {
    case "button":
      return (
        <p className="btn" onClick={properties.onClick}>
          {properties.label}
        </p>
      );
    case "logo":
      return (
        <p className="logo" onClick={properties.onClick}>
          {properties.label}
        </p>
      );
    case "checkbox":
      return (
        <p className="checkbox" onClick={properties.onClick}>
          {properties.label}
        </p>
      );
    default:
      return null;
  }
}

export default OutputComponent;
