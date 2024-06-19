import React, { useState, useEffect } from "react";
import "./InsertListPopup.css";
const InsertListPopup = ({ onClose, onSelectOption, onSelectiontext }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [keyys, Setkeys] = useState([]); // State to store the text retrieved from local storage

  // Function to handle change in selected option
  const handleOptionChange = (event) => {
    const Selectedkey = event.target.value;
    setSelectedOption(Selectedkey);
  };
  // Function to retrieve saved text from local storage
  useEffect(() => {
    const textFromLocalStorage = localStorage.getItem("text2");

    if (textFromLocalStorage) {
      try {
        const parsedData = JSON.parse(textFromLocalStorage);
        console.log("parsedData", parsedData);

        const keys = Object.keys(parsedData);
        Setkeys(keys);

        keys.forEach((key) => {
          if (selectedOption === key) {
            const text = parsedData[key].text;
            onSelectOption(selectedOption);
            onSelectiontext(text);
          }
        });
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        // Handle error, e.g., set default values or show an error message
      }
    } else {
      // Handle case where localStorage item is empty or not found
      console.log("No data available in localStorage for 'text2'");
      // You might want to clear keys or set to an empty array
      Setkeys([]);
      // Handle what should happen when there's no data
      // e.g., onSelectOption(selectedOption);  // Depends on your logic
    }
  }, [selectedOption]);

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
                {keyys.map((keyName, index) => (
                  <option key={index} value={keyName}>
                    {keyName}
                  </option>
                ))}{" "}
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
