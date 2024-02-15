import React, { useState } from "react";
import "./EditCommentPopup.css";
const EditCommentPopup = ({ onClose }) => {
  return (
    <>
      <div className="container-for-edit-comment-popup-enter-comment-text">
        <div className="width-set-for-edit-comment-popup-enter-comment-text">
          <div className="close-button-and-edit-comment-popup-header-for-popup-box">
            <p>Input</p>
            <p className="close-btn-edit-comment-popup" onClick={onClose}>
              X
            </p>
          </div>
          <div className="contains-header-drop-downs-ok-cancl-btn-for-edit-comment-popup">
            <div className="input-box-and-the-update-message-for-edit-comment">
              <p>Which Comment list would you like to Insert ?</p>{" "}
              <input
                className="input-box-for-edit-comment-popup-box-for-update-comment"
                type="text"
              />
            </div>
            <div className="button-container-editcomm-edit-comment-popup">
              <button className="open-button-editcomm-edit-comment-popup">
                Ok
              </button>
              <button
                className="cancel-button-editcomm-edit-comment-popup"
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

export default EditCommentPopup;
