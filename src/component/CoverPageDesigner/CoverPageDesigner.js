import React, { useState, useRef, useReducer, useEffect } from "react";
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
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

import html2canvas from "html2canvas";
import "./CoverPageDesigner.css";

// const exportState = () => {
//   // Get the output container element
//   const outputContainer = document.querySelector(
//     ".content-that-is-draggable-and-adjustable-within-div"
//   );

//   // Use html2canvas to convert the HTML content to a canvas
//   html2canvas(outputContainer).then((canvas) => {
//     // Create a new jsPDF instance
//     const pdf = new jsPDF("p", "mm", "a4");

//     // Calculate the height of the content on the canvas
//     const contentHeight = (canvas.height * 210) / canvas.width;

//     // Add the canvas to the PDF document
//     pdf.addImage(
//       canvas.toDataURL("image/png"),
//       "PNG",
//       0,
//       0,
//       210,
//       contentHeight
//     );

//     // Save the PDF file
//     pdf.save("cover_page_layout.pdf");
//   });
// };
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
  const [isPageBordersChecked, setIsPageBordersChecked] = useState(true);
  const [isBorderApplied, setIsBorderApplied] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompanyLogoChecked, setIsCompanyLogoChecked] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState(null);

  const [checkedCheckboxes, setCheckedCheckboxes] = useState([
    "Inspection Details",
    "Cover Photo",
    "Company Information",
    "Company Logo",
    "Page Borders",
  ]); // State to track checked checkboxes
  useEffect(() => {
    // Add "Page Borders" content to selectedCheckboxContents initially
    if (isPageBordersChecked) {
      const pageBordersContent = renderCheckboxContent("Page Borders");
      setSelectedCheckboxContents([
        ...selectedCheckboxContents,
        pageBordersContent,
      ]);
    }
  }, []);

  // Export state function
  // const exportState = () => {
  //   const exportedState = {
  //     outputContent,
  //     selectedObjects,
  //     editableTexts,
  //     addedImages,
  //   };
  //   const jsonString = JSON.stringify(exportedState);
  //   console.log(jsonString);
  // };
  // Export state function
  const exportState = () => {
    // Get the HTML content of your output container
    const outputContainer = document.querySelector(
      ".all-the-output-screen-with-all-the-changes-reflect-here"
    );
    const content = outputContainer.innerHTML;

    // Convert the HTML content to a PDF document
    html2pdf()
      .from(content)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        // Download the PDF file
        pdf.save("cover_page_layout.pdf");
      });
  };
  const exportStateSave = () => {
    // Get the HTML content of your output container
    const outputContainer = document.querySelector(
      ".all-the-output-screen-with-all-the-changes-reflect-here"
    );
    const content = outputContainer.innerHTML;

    // Save the content to localStorage
    localStorage.setItem("outputContent", content);

    // Convert the HTML content to a PDF document
    html2pdf()
      .from(content)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        // Download the PDF file
        // pdf.save("cover_page_layout.pdf");
      });
  };

  // Function to retrieve data from localStorage
  const getStateFromLocalStorage = () => {
    // Retrieve the content from localStorage
    return localStorage.getItem("outputContent");
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
    if (file) {
      // Set the uploaded logo file
      setUploadedLogo(file);
      // Set the checkbox state to checked
      setIsCompanyLogoChecked(true);
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
    // Check if the label is "Company Logo"
    if (label === "Company Logo") {
      // If checked, trigger image upload process
      if (isChecked) {
        fileInputRef.current.click();
      } else {
        // If unchecked, reset uploaded logo state
        setUploadedLogo(null);
      }
      // Update checkbox state
      setIsCompanyLogoChecked(isChecked);
    }
    // Toggle the checkbox in the checkedCheckboxes state
    if (checkedCheckboxes.includes(label)) {
      setCheckedCheckboxes(checkedCheckboxes.filter((item) => item !== label));
    } else {
      setCheckedCheckboxes([...checkedCheckboxes, label]);
    }
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
      const newContent = renderCheckboxContent(label);
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

  const renderCheckboxContent = (label) => {
    switch (label) {
      case "Inspection Details":
        return <InspectionDetails />;
      case "Cover Photo":
        return <CheckboxContent1 />;
      case "Company Logo":
        return <CheckboxContent2 />;
      case "Company Information":
        return <CompanyInfo />;
      case "Agent Information":
      case "Cover Company":
      case "Report Title":
      case "Inspection Signature":
        return <EditableText initialText={label} />;
      // case "Page Borders":
      //   return <div>Page Borders Content</div>;
      default:
        return null;
    }
  };
  const handleRemoveBoxTextImage = () => {
    // Filter out selected objects from editableTexts array
    const updatedTexts = editableTexts.filter(
      ({ id }) => !selectedObjects.includes(id)
    );

    // Filter out selected objects from addedImages array
    const updatedImages = addedImages.filter(
      ({ id }) => !selectedObjects.includes(id)
    );

    // Filter out selected objects from outputContent array
    const updatedContent = outputContent.filter(
      ({ id }) => !selectedObjects.includes(id)
    );

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
    const updatedContents = outputContent.filter(
      (content) => content.id !== id
    );

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
      <div className="cover-page-container-popup-contains-all-the-info-abt-cover-page">
        <div className="width-set-for-cover-page-container-popup-contains-all-the-info-abt-cover-page">
          <div className="cover-page-header-closer-btn">
            <span className="cover-page-design-header-text">
              Cover Page Design
            </span>
            <button
              onClick={onClose}
              className="close-button-cover-page-design"
            >
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
                <legend className="tag-for-line-draw-through-text">
                  Objects
                </legend>
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
                          checked={checkedCheckboxes.includes("Cover Photo")}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Cover Photo")
                          }
                        />
                        Cover Photo
                      </label>{" "}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          // onChange={(e) =>
                          //   handleCheckboxChange(e, "Company Information")
                          // }
                          checked={checkedCheckboxes.includes(
                            "Company Information"
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Company Information")
                          }
                        />
                        Company Information
                      </label>
                      {/* <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isCompanyLogoChecked}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Company Logo")
                          }
                        />
                        Company Logo
                      </label> */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isCompanyLogoChecked}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Company Logo")
                          }
                        />
                        Company Logo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      {/* <CheckboxContent2 uploadedLogo={uploadedLogo} /> */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checkedCheckboxes.includes(
                            " Inspection Details"
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, " Inspection Details")
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
                          onChange={(e) =>
                            handleCheckboxChange(e, "Cover Company")
                          }
                        />
                        Cover Company
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Report Title")
                          }
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
                          onChange={(e) =>
                            handleCheckboxChange(e, "Agent Photo")
                          }
                          // checked={checkedCheckboxes.includes("Agent Photo")}
                          // onChange={(e) =>
                          //   handleCheckboxChange(e, "Agent Photo")
                          // }
                          // disabled={isAgentPhotoUploaded} // Disable the checkbox if an image is already uploaded
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
                <legend className="tag-for-line-draw-through-text">
                  Controls
                </legend>
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
                          onChange={(e) =>
                            setFontSize(parseInt(e.target.value))
                          }
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
              <fieldset className="bordered-text">
                <legend className="tag-for-line-draw-through-text">
                  Buttons
                </legend>
                <div className="contains-bottom-section-with-buttons-design-cover-page">
                  <div className="buttons-with-apply-export-import-discard-changes-apply">
                    <button
                      onClick={exportStateSave}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
                      Apply Changes <br /> to Template Template
                    </button>{" "}
                    <button
                      onClick={exportState}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
                      Export Layout to a <br /> File for Future Use
                    </button>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
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
              className="w-1/4 relative bg-white all-the-output-screen-with-all-the-changes-reflect-here"
              // className={`w-1/4 relative bg-white all-the-output-screen-with-all-the-changes-reflect-here ${
              //   isBorderApplied ? "with-borders" : ""
              // }`}
              style={{ width: "50%" }}
            >
              {/* <h2 className="text-2xl font-bold mb-4">Output</h2> */}

              <div
                // className="content-that-is-draggable-and-adjustable-within-div"
                className={`bg-white content-that-is-draggable-and-adjustable-within-div ${
                  isBorderApplied ? "with-borders" : ""
                }`}
              >
                {/* Render editable text elements */}
                {editableTexts.map(({ id, text }) => (
                  <div
                    key={id}
                    bounds="parent"
                    className="draggableeeee-for-inspection"
                  >
                    <div>
                      <EditableText initialText={text} />
                    </div>
                  </div>
                ))}
                {checkedCheckboxes.map((label, index) => (
                  <div
                    key={index}
                    bounds="parent"
                    className="draggableeeee cursor-pointer"
                  >
                    <div>{renderCheckboxContent(label)}</div>
                  </div>
                ))}{" "}
                {addedImages.map(({ id, src, height, width }) => (
                  <Draggable bounds="parent">
                    <div key={id} className="draggableeeee">
                      <div>
                        <img
                          src={src}
                          alt={`Image ${id}`}
                          height={height}
                          width={width}
                        />
                        {/* Add a delete button to remove the image */}
                        {/* <button onClick={() => handleDeleteImage(id)}>
                    Delete Image
                  </button> */}
                      </div>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="contains-bottom-section-with-buttons-design-cover-page">
            <div className="buttons-with-apply-export-import-discard-changes-apply">
              <button
                onClick={exportStateSave}
                className="button-for-footer-for-changes-in-cover-page"
              >
                Apply Changes <br /> to Template Template
              </button>{" "}
              <button
                onClick={exportState}
                className="button-for-footer-for-changes-in-cover-page"
              >
                Export Layout to a <br /> File for Future Use
              </button>
              <button
                onClick={() => fileInputRef.current.click()}
                className="button-for-footer-for-changes-in-cover-page"
              >
                Import Layout <br /> from File
              </button>{" "}
              <button
                className="button-for-footer-for-changes-in-cover-page"
                onClick={() => setAddedImages([])}
              >
                Discard <br /> Changes
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default CoverPageDesigner;
