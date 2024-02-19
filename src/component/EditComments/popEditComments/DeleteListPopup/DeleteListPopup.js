import React, { useState } from "react";
import "./DeleteListPopup.css";
const DeleteListPopup = ({ onClose }) => {
  return (
    <>
      <div className="container-for-delete-list-popup-enter-comment-text">
        <div className="width-set-for-delete-list-popup-enter-comment-text">
          <div className="close-button-and-delete-list-popup-header-for-popup-box">
            <p>Confirm Delete</p>
            <p className="close-btn-delete-list-popup" onClick={onClose}>
              X
            </p>
          </div>
          <div className="contains-header-drop-downs-ok-cancl-btn-for-delete-list-popup">
            <p>Are you sure want to Delete this List ?</p>
            <div className="button-container-editcomm-delete-list-popup">
              <button className="open-button-editcomm-delete-list-popup">
                Ok
              </button>
              <button
                className="cancel-button-editcomm-delete-list-popup"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteListPopup;
