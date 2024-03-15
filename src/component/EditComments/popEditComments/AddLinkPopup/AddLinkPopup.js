import React, { useState } from "react";
import "./AddLinkPopup.css";

const AddLinkPopup = ({ onClose, setText }) => {
  const [link, setLink] = useState({
    name: "",
    link: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLink({ ...link, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const newLinkText = `${link.name}: ${link.link} `;
      setText((prevText) => prevText + newLinkText);
      onClose(); // Close the popup after updating the text
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="container-for-add-link-popup-enter-comment-text">
      <div className="width-set-for-add-link-popup-enter-comment-text">
        <div className="close-button-and-add-link-popup-header-for-popup-box">
          <p>Add Link</p>
          <p className="close-btn-add-link-popup" onClick={onClose}>
            X
          </p>
        </div>
        <div className="for-content-section-in-the-add-link-popup">
          <section className="for-input-section">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              className="input-fields-for-the-add-links"
              name="name"
              value={link.name}
              onChange={handleOnChange}
            />
          </section>
          <section className="for-input-section">
            <label htmlFor="">Link:</label>
            <input
              type="text"
              className="input-fields-for-the-add-links"
              name="link"
              value={link.link}
              onChange={handleOnChange}
            />
          </section>
        </div>
        <div className="button-container-editcomm-insert-list-popup">
          <button
            className="open-button-editcomm-insert-list-popup"
            onClick={handleSubmit}
          >
            Ok
          </button>
          <button
            className="cancel-button-editcomm-insert-list-popup"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkPopup;
