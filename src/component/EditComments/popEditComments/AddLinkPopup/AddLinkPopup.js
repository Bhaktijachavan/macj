import React from "react";
import "./AddLinkPopup.css";
const AddLinkPopup = ({ onClose }) => {
  return (
    <>
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
              <input type="text" className="input-fields-for-the-add-links" />
            </section>{" "}
            <section className="for-input-section">
              <label htmlFor="">Link:</label>
              <input type="text" className="input-fields-for-the-add-links" />
            </section>
          </div>
          <div className="button-container-editcomm-insert-list-popup">
            <button className="open-button-editcomm-insert-list-popup">
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
    </>
  );
};

export default AddLinkPopup;
