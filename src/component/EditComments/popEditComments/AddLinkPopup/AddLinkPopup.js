import React, { useState } from "react";
import "./AddLinkPopup.css";

const AddLinkPopup = ({ onClose, value }) => {
  const [Link, setLink] = useState({
    name: "",
    link: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLink({ ...Link, [name]: value });
  };

 const handleSubmit = (e) => {
   e.preventDefault();

   console.log(Link);
   try {
     // Check if TempPanelData already exists in local storage
     let tempPanelData = localStorage.getItem("TempPanelData");
     if (!tempPanelData) {
       // If not, create an empty object
       tempPanelData = {};
     } else {
       // If it exists, parse the JSON string to an object
       tempPanelData = JSON.parse(tempPanelData);
     }

     // Check if value already exists in tempPanelData
     const storedText = tempPanelData[value];
     const newText = storedText
       ? `${storedText}\n${Link.name}: ${Link.link}`
       : `${Link.name}: ${Link.link}`;

     // Update the value under the specified key
     tempPanelData[value] = newText;

     // Save the updated data back to local storage
     localStorage.setItem("TempPanelData", JSON.stringify(tempPanelData));

     console.log("Data saved successfully.");
     setLink({ name: "", link: "" });
   } catch (error) {
     console.error("Error saving data:", error);
   }
 };

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
              <input
                type="text"
                className="input-fields-for-the-add-links"
                name="name"
                value={Link.name}
                onChange={handleOnChange}
              />
            </section>
            <section className="for-input-section">
              <label htmlFor="">Link:</label>
              <input
                type="text"
                className="input-fields-for-the-add-links"
                name="link"
                value={Link.link}
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
    </>
  );
};

export default AddLinkPopup;
