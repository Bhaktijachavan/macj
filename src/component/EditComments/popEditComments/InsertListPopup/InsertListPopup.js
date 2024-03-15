import React, { useState, useEffect } from "react";
import "./InsertListPopup.css";
const InsertListPopup = ({ onClose, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [savedText, setSavedText] = useState(""); // State to store the text retrieved from local storage

  // Function to handle change in selected option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // Function to retrieve saved text from local storage
  useEffect(() => {
    const textFromLocalStorage = localStorage.getItem("text2");
    if (textFromLocalStorage) {
      setSavedText(textFromLocalStorage);
    }
  }, []);
  // Function to handle Ok button click
  const handleOkClick = () => {
    // Pass the selected option to the parent component
    onSelectOption(selectedOption);
    // Close the popup
    onClose();
  };
  return (
    <>
      <div className="container-for-insert-list-popup-enter-comment-text">
        <div className="width-set-for-insert-list-popup-enter-comment-text">
          <div className="close-button-and-insert-list-popup-header-for-popup-box">
            <p>Insert List</p>
            <p className="close-btn-insert-list-popup" onClick={onClose}>
              X
            </p>
          </div>
          <div className="contains-header-drop-downs-ok-cancl-btn-for-insert-list-popup">
            <div className="selected-drop-down-list-with-question">
              <p>Which Comment list would you like to Insert ?</p>{" "}
              <select
                className="drop-down-for-insert-list-popup"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select an option</option>
                <option value={savedText}>{savedText}</option>{" "}
                <option value="option1">Bathroom Locations</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                {/* Add more options as needed */}
              </select>
              {/* <p>Selected Option: {selectedOption}</p> */}
            </div>
            <div className="button-container-editcomm-insert-list-popup">
              <button
                className="open-button-editcomm-insert-list-popup"
                onClick={handleOkClick}
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
      </div>
    </>
  );
};

export default InsertListPopup;
