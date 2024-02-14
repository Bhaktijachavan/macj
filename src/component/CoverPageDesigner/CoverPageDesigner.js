import React, { useState, useRef, useReducer } from "react";
import OutputComponent from "./OutputComponent/OutputComponent";
import DraggableText from "./CompanyInfo/CompanyInfo";
import CheckboxContent1 from "./CheckboxContent1/CheckboxContent1";
import CheckboxContent2 from "./CheckboxContent2/CheckboxContent2";
import DefaultContent from "./DefaultContent/DefaultContent";
import Draggable from "react-draggable"; // Import Draggable component
import InspectionDetails from "./InspectionDetails/InspectionDetails";
import AgentInformation from "./AgentInformation/AgentInformation";
import CoverCompany from "./CoverCompany/CoverCompany";
import ReportTitle from "./ReportTitle/ReportTitle";
import InspectionSignature from "./Inspection Signature/InspectionSignature";
import AgentPhoto from "./Agent Photo/AgentPhoto";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import EditableText from "./EditableText/EditableText";

import "./CoverPageDesigner.css";

function CoverPageDesigner({ onClose }) {
  const fileInputRef = useRef(null);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [outputContent, setOutputContent] = useState([]);
  const [isCoverPhotoChecked, setIsCoverPhotoChecked] = useState(false);
  const [selectedCheckboxContents, setSelectedCheckboxContents] = useState([]);
  const [editableTexts, setEditableTexts] = useState([]); // State to hold editable text elements
  const [addedImages, setAddedImages] = useState([]); // State to hold added images
  const [setContentT, setContentText] = useState([]); // State to hold added images
  const [isAgentPhotoUploaded, setIsAgentPhotoUploaded] = useState(false);
  // State to track whether "Page Borders" checkbox is checked
  const [isPageBordersChecked, setIsPageBordersChecked] = useState(false);
  const [isBorderApplied, setIsBorderApplied] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHovered, setIsHovered] = useState(false);




  // Export state function
  const exportState = () => {
    const exportedState = {
      outputContent,
      selectedObjects,
      editableTexts,
      addedImages,
    };
    const jsonString = JSON.stringify(exportedState);
    console.log(jsonString);
  };

  // Import state function
  const importState = (jsonString) => {
    try {
      const importedState = JSON.parse(jsonString);
      setOutputContent(importedState.outputContent || []);
      setSelectedObjects(importedState.selectedObjects || []);
      setEditableTexts(importedState.editableTexts || []);
      setAddedImages(importedState.addedImages || []);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  // Handle file import
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = () => {
        const importedJsonString = reader.result;
        importState(importedJsonString);
      };
    }
  };


  const addObjectToOutput = (objectType, properties) => {
    setOutputContent([...outputContent, { type: objectType, properties }]);
  };
  const handleAddText = () => {
    // Here you can implement logic to get the text to add, such as from a text input
    // For demonstration purposes, I'll just set a static text
    const newText = "Add new text here ...";

    // Generate a unique identifier for the new text
    const id = `text_${editableTexts.length + 1}`;

    // Add the new editable text element to the state
    setEditableTexts([...editableTexts, { id, text: newText }]);
  };
  // Modify the handleImageUpload function to set the state when an image is uploaded for Agent Photo
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert the file to a data URL
      reader.onloadend = () => {
        // After reading the file, create a new image object
        const newImage = {
          id: `image_${addedImages.length + 1}`,
          src: reader.result, // Use the data URL as image source
          file: file, // Store the file object for later use
          height: 100, // You can set default height and width here
          width: 150,
        };
        // Add the new image to the state
        setAddedImages([...addedImages, newImage]);

        // Set the state to indicate that an image is uploaded for Agent Photo
        setIsAgentPhotoUploaded(true);
      };
    }
  };

  const handleAddImage = () => {
    // Here you can implement logic to get image properties, such as from a file input
    // For demonstration purposes, I'll set static properties
    const newImage = {
      id: `image_${addedImages.length + 1}`,
      src: "path/to/image.jpg", // Replace with the actual source path
      height: 100, // Set the desired height
      width: 150, // Set the desired width
    };

    // Add the new image element to the state
    setAddedImages([...addedImages, newImage]);
  };
  // Modify the handleDeleteImage function to reset the state related to Agent Photo checkbox
  const handleDeleteImage = (id) => {
    // Remove the image with the specified id from the state
    const updatedImages = addedImages.filter((image) => image.id !== id);
    setAddedImages(updatedImages);

    // Check if the deleted image corresponds to the Agent Photo
    const deletedAgentPhoto = addedImages.find((image) => image.id === id);
    if (deletedAgentPhoto) {
      // Reset the state related to the Agent Photo checkbox
      setIsAgentPhotoUploaded(false);
    }
  };

  const removeObjectFromOutput = (index) => {
    const updatedOutput = [...outputContent];
    updatedOutput.splice(index, 1);
    setOutputContent(updatedOutput);
  };

  const handleCheckboxChange = (event, label) => {
    const isChecked = event.target.checked;
    // Update the state based on the checkbox label
    if (isChecked) {
      setSelectedObjects([...selectedObjects, label]); // Add the label to selectedObjects if checkbox is checked
    } else {
      setSelectedObjects(selectedObjects.filter((obj) => obj !== label)); // Remove the label from selectedObjects if checkbox is unchecked
    }
    if (label === "Page Borders") {
      setIsPageBordersChecked(isChecked);
      setIsBorderApplied(isChecked); // Apply border if "Page Borders" checkbox is checked
    }
    // If checkbox is checked, add the content to the array
    if (isChecked) {
      const newContent = getContentForLabel(label);
      setSelectedCheckboxContents([...selectedCheckboxContents, newContent]);
    } else {
      // If checkbox is unchecked, remove the content from the array
      const updatedContents = selectedCheckboxContents.filter(
        // (content) => content.label !== label
        (content) => content && content.label !== label // Check if content exists before accessing its label property
      );
      setSelectedCheckboxContents(updatedContents);
    }

    // Ensure label is valid before proceeding
    if (label) {
      // If checkbox is checked, set the state accordingly
      if (label === "Agent Photo") {
        setIsAgentPhotoUploaded(isChecked);
      } else {
        // Handle other checkboxes as before
      }
    } else {
      console.error("Invalid label:", label);
    }
  };


  const getContentForLabel = (label) => {
    let content = null;
    switch (label) {
      case "Cover Photo":
        content = <CheckboxContent1 />;
        break;
      case "Company Logo":
        content = <CheckboxContent2 />;
        break;
      case "Company Information":
      case "Inspection Details":
      case "Agent Information":
      case "Cover Company":
      case "Report Title":
      case "Inspection Signature":
        content = <EditableText initialText={label} />;
        break;
      default:
        content = null;
    }
    return content;
  };
  const handleRemoveBoxTextImage = () => {
    // Filter out selected objects from editableTexts array
    const updatedTexts = editableTexts.filter(({ id }) => !selectedObjects.includes(id));

    // Filter out selected objects from addedImages array
    const updatedImages = addedImages.filter(({ id }) => !selectedObjects.includes(id));

    // Filter out selected objects from outputContent array
    const updatedContent = outputContent.filter(({ id }) => !selectedObjects.includes(id));

    // Update the state with the filtered arrays
    setEditableTexts(updatedTexts);
    setAddedImages(updatedImages);
    setOutputContent(updatedContent);

    // Clear the selected objects after removal
    setSelectedObjects([]);
    setSelectedCheckboxContents([]);
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = (id) => {
    // Filter out the selected object from various states based on its id
    const updatedTexts = editableTexts.filter((text) => text.id !== id);
    const updatedImages = addedImages.filter((image) => image.id !== id);
    const updatedContents = outputContent.filter((content) => content.id !== id);

    // Update the state with the filtered arrays
    setEditableTexts(updatedTexts);
    setAddedImages(updatedImages);
    setOutputContent(updatedContents);

    // Clear the selected objects after removal
    setSelectedObjects([]);
    setSelectedCheckboxContents([]);
  };

  return (
    <>
      <div className="cover-page-header-closer-btn">
        <span className="cover-page-design-header-text">Cover Page Design</span>
        <button onClick={onClose} className="close-button-cover-page-design">
          X
        </button>
      </div>
      <div
        className="flex justify-center gap-3 p-2 bg-gray-200 main-container-for-the-cover-page-designer-popup-page"
      // style={{ height: "100vh" }}
      >
        <div className="container-for-Object-and-control-section-for-design-cover-page-grid">
          {/* Objects Column */}
          {/* <p>objects</p> */}{" "}
          <fieldset className="bordered-text">
            <legend className="tag-for-line-draw-through-text">Objects</legend>
            <div className="contains-template-and-design-components-for-cover-page-design-OBJECTS ">
              {/* <h2 className="text-2xl font-bold mb-4">Objects</h2> */}
              {/* Template Components */}
              <fieldset className="bordered-text">
                <legend className="tag-for-line-draw-through-text">
                  Template Components
                </legend>
                <div className="div-contains-all-the-check-boxes-regarding-cover-page">
                  {/* <h3 className="text-lg font-semibold mb-2">Template Components</h3> */}
                  {/* Checkbox for cover photo */}
                  {/* <p>objects</p> */}
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, "Cover Photo")}
                    />
                    Cover Photo
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, "Company Logo")}
                    />
                    Company Logo
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Company Information")
                      }
                    />
                    Company Information
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Inspection Details")
                      }
                    />
                    Inspection Details
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Agent Information")
                      }
                    />
                    Agent Information
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, "Cover Company")}
                    />
                    Cover Company
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, "Report Title")}
                    />
                    Report Title
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Inspection Signature")
                      }
                    />
                    Inspection Signature
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onClick={() => fileInputRef.current.click()}
                      onChange={(e) => handleCheckboxChange(e, "Agent Photo")}
                      disabled={isAgentPhotoUploaded} // Disable the checkbox if an image is already uploaded
                    />
                    Agent Photo
                  </label>
                  {/* ... Add more checkboxes for other template components */}
                </div>
              </fieldset>
              {/* Design Components */}
              <fieldset className="bordered-text">
                <legend className="tag-for-line-draw-through-text">
                  Design Components
                </legend>
                <div className="Buttons-and-check-boxes-for-Design-Component-ss">
                  {/* <h3 className="text-lg font-semibold mb-2">Design Components</h3> */}
                  <div className="check-boxes-and-buttons-for-adding-text-box-and-image">
                    <div className="lables-check-boxes-for-page-border-cover-page-stationary">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Page Borders")
                          }
                        />
                        Page Borders
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Cover Page Stationary")
                          }
                        />
                        Cover Page Stationary
                      </label>
                      <p className="no-stationary-loaded-text-button">
                        No Stationary Loaded
                      </p>
                    </div>
                  </div>
                  <div className="buttons-for-add-text-box-and-imagess">
                    <section className="section-for-btnss-of-text-add-imgs">
                      {/* Buttons for adding box, text, image, etc. */}
                      <button className="btn">Add Box</button>
                      <button className="btn" onClick={handleAddText}>
                        Add/Edit <br /> Text
                      </button>
                      <button onClick={() => fileInputRef.current.click()}>
                        Add Image
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </section>
                  </div>
                </div>
              </fieldset>
            </div>
          </fieldset>
          <fieldset className="bordered-text">
            <legend className="tag-for-line-draw-through-text">Controls</legend>
            <div className="contains-controls-for-the-design-cover-page">
              {/* Controls Section */}
              <fieldset className="bordered-text">
                <legend className="tag-for-line-draw-through-text">
                  Controls
                </legend>
                <div className="contains-all-the-button-that-appear-in-control-section">
                  {/* <h3 className="text-lg font-semibold mb-2">Controls</h3> */}
                  {/* Controls for attribute */}
                  <button className="btn-for-control-section-design-page">
                    Show Actual <br /> Font Size
                  </button>
                  <button className="btn-for-control-section-design-page">
                    Font Setting
                  </button>
                  <button className="btn-for-control-section-design-page">
                    Color Setting
                  </button>
                  <button className="btn-for-control-section-design-page">
                    Border Style
                  </button>
                  <button
                    onClick={handleRemoveBoxTextImage}
                    className="btn-for-control-section-design-page"
                  >
                    Remove <br /> Box/Text/Image
                  </button>
                  {/* ... Add more controls for size and position */}
                </div>
              </fieldset>

              <div className="contains-position-and-size-controls-with-this-div">
                <fieldset className="bordered-text">
                  <legend className="tag-for-line-draw-through-text">
                    Controls
                  </legend>
                  {/* <div className="contains-size-control-for-cover-page-design">
                    Size Control
                  </div> */}
                  <div className="contains-size-control-for-cover-page-design">
                    <label htmlFor="fontSize">Font Size:</label>
                    <input
                      type="range"
                      id="fontSize"
                      name="fontSize"
                      min="10" // Minimum font size
                      max="30" // Maximum font size
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                    />
                    <span>{fontSize}px</span>
                  </div>
                </fieldset>{" "}
                <fieldset className="bordered-text">
                  <legend className="tag-for-line-draw-through-text">
                    Controls
                  </legend>
                  <div className="contains-position-control-for-cover-page-design">
                    <section>Movement Shortcut</section>
                    <section>Object Alignment</section>
                    <section>Object Alignment</section>
                  </div>
                </fieldset>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Layering Column */}
        <fieldset className="bordered-text w-1/4">
          <legend className="tag-for-line-draw-through-text">Layers</legend>
          <div className="contains-the-list-of-selected-objects-and-thier-layer">
            {/* <h2 className="text-2xl font-bold mb-4">Layering</h2> */}
            {/* ... Display the list of selected objects and their layers */}

            <ul>
              {selectedObjects.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        </fieldset>
        {/* Output Column */}
        <div
          className={`w-1/4 border border-gray-300 relative bg-white all-the-output-screen-with-all-the-changes-reflect-here ${isBorderApplied ? "with-borders" : ""
            }`}
          style={{ width: "50%" }}
        >
          {/* <h2 className="text-2xl font-bold mb-4">Output</h2> */}

          <div className="content-that-is-draggable-and-adjustable-within-div">
            {/* Display the text input field if editing text */}
            {selectedCheckboxContents.map((content, index) => (
              <Draggable
                key={index}
                bounds="parent"
                className={`draggableeeee cursor-pointer ${isHovered ? 'hovered' : ''}`}
                style={{
                  border: selectedObjects.includes(content.id) ? '2px solid red !important' : 'none',
                  padding: '5px !important',
                  borderRadius: '5px !important',
                }}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  {content}
                  {isHovered && (
                    <div
                      className="delete-icon"
                      onClick={() => handleDelete(content.id)}
                    >
                      🗑️
                    </div>
                  )}
                </div>
              </Draggable>
            ))}
            {/* Render editable text elements */}
            {editableTexts.map(({ id, text }) => (
              <Draggable
                key={id}
                bounds="parent"
                className="draggableeeee"
                style={{
                  border: selectedObjects.includes(id) ? '2px solid #007BFF' : 'none',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                <div>
                  <EditableText initialText={text} />
                </div>
              </Draggable>
            ))}
            {addedImages.map(({ id, src, height, width }) => (
              <Draggable
                key={id}
                bounds="parent"
                className="draggableeeee"
                style={{
                  border: selectedObjects.includes(id) ? '2px solid #007BFF' : 'none',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                <div>
                  <img
                    src={src}
                    alt={`Image ${id}`}
                    height={height}
                    width={width}
                  />
                  {/* Add a delete button to remove the image */}
                  <button onClick={() => handleDeleteImage(id)}>
                    Delete Image
                  </button>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>
      <div className="contains-bottom-section-with-buttons-design-cover-page">
        <div className="buttons-with-apply-export-import-discard-changes-apply">
          <button className="button-for-footer-for-changes-in-cover-page">
            Apply Changes <br /> to Template Template
          </button>{" "}
          <button onClick={exportState} className="button-for-footer-for-changes-in-cover-page">
            Export Layout to a <br /> File for Future Use
          </button>{" "}
          <button onClick={() => fileInputRef.current.click()} className="button-for-footer-for-changes-in-cover-page">
            Import Layout <br /> from File
          </button>{" "}
          <button
            className="button-for-footer-for-changes-in-cover-page"
            onClick={() => setAddedImages([])}
          >
            Discard <br /> Changes
          </button>
        </div>
      </div>

    </>
  );
}

export default CoverPageDesigner;
