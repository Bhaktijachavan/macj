import React, { useState, useRef, useReducer, useEffect } from "react";
import OutputComponent from "./OutputComponent/OutputComponent";
import DraggableText from "./CompanyInfo/CompanyInfo";
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
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./CoverPageDesigner.css";
import Alert from "../Alert/Alert";
import CoverPhotoPage from "./CoverPhotoPage/CoverPhotoPage";

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
  const uploadedImage = localStorage.getItem("uploadedImage");
  const [imageSize, setImageSize] = useState({ width: 200, height: 150 }); // Initial size
  const [discardChanges, setDiscardChanges] = useState(false);

  useEffect(() => {
    // Optionally, you can retrieve saved image size from local storage or a backend service
    const savedSize = localStorage.getItem("imageSize");
    if (savedSize) {
      setImageSize(JSON.parse(savedSize));
    }
  }, []);
  const removeCompanyLogo = () => {
    setCompanyLogo(null);
  };
  const handleResize = (event, { element, size }) => {
    setImageSize(size);
    // Optionally, save the resized image dimensions to local storage or a backend service
    localStorage.setItem("imageSize", JSON.stringify(size));
  };
  //alert
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color: "",
  });
  const handleAddImageManually = () => {
    // Prompt the user to select an image file
    fileInputRef.current.click();
  };
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([
    "Inspection Details",
    "Cover Photo",
    "Company Information",
    "Agent Information",
    // "Company Logo",
    // "Page Borders",
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
    setShowAlert({
      showAlert: true,
      message: "successfully saved ",
    });
    setTimeout(() => {
      setShowAlert({
        showAlert: false,
        message: "",
      }); // Hide the alert after 3 seconds
    }, 3000);

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
        return <CoverPhotoPage />;
      // case "Company Logo":
      //   return <CheckboxContent2 />;
      case "Company Information":
        return <CompanyInfo id="someId" key={discardChanges.toString()} />;
      case "Agent Information":
        return <AgentInformation />;
      // case "Cover Company":
      // case "Report Title":
      // case "Inspection Signature":
      //   return <EditableText initialText={label} />;
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
  const handleRemovePhoto = () => {
    const coverphoto = localStorage.removeItem("uploadedImage");
    localStorage.removeItem("ClientInfoImage");
    if (coverphoto === null) {
      setShowAlert({
        showAlert: true,
        message: "Do you really want to remove cover photo",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
    } else {
      setShowAlert({
        showAlert: true,
        message: "No Cover Photo is Removed ",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
    }
  };
  const handleDiscardChanges = () => {
    // Reset all the states that hold the changes made by the user
    setEditableTexts([]); // Reset editable text elements
    setAddedImages([]); // Reset added images
    setSelectedObjects([]); // Reset selected objects
    setSelectedCheckboxContents([]); // Reset selected checkbox contents
    setCompanyLogo("");
    setDiscardChanges(!discardChanges);

    // Reset any other states that hold changes if needed

    // Optionally, you can also reset the checkbox states to their initial values
    setCheckedCheckboxes([
      "Inspection Details",
      "Cover Photo",
      "Company Information",
      "Agent Information",
      // "Company Logo",
      "Page Borders",
    ]);
  };

  const [companyLogo, setCompanyLogo] = useState(null);
  const logoInputRef = useRef(null); // Reference for logo file input

  const handleAddCompanyLogo = () => {
    logoInputRef.current.click();
  };

  const handleCompanyLogoUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert the file to a data URL
      reader.onloadend = () => {
        const newImage = {
          id: `logo_${new Date().getTime()}`,
          src: reader.result, // Use the data URL as image source
          height: "10em", // You can set default height and width here
          width: "100%",
        };
        setCompanyLogo(newImage);
      };
    }
  };
  const renderCompanyLogo = () => {
    if (companyLogo) {
      return (
        <ResizableBox
          width={imageSize.width}
          height={imageSize.height}
          minConstraints={[100, 100]} // Minimum size
          maxConstraints={[800, 800]} // Maximum size
          onResize={handleResize}
          resizeHandles={["se"]} // Only allow resizing from the bottom right corner
        >
          <img
            src={companyLogo.src}
            alt="Company Logo"
            // style={{ height: companyLogo.height, width: companyLogo.width }}
            style={{ width: "100%", height: "100%" }}
            className="company-logo-image"
          />
        </ResizableBox>
      );
    } else {
      return (
        <p className="text-center m-auto w-[11em] h-[7em] border-2 border-black flex items-center justify-center">
          Company Logo
        </p>
      );
    }
  };

  return (
    <>
      <div className="cover-page-container-popup-contains-all-the-info-abt-cover-page">
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
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
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      /> */}
                      {/* <CheckboxContent2 uploadedLogo={uploadedLogo} /> */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checkedCheckboxes.includes(
                            "Inspection Details"
                          )}
                          // onChange={(e) =>
                          //   handleCheckboxChange(e, "Inspection Details")
                          // }
                        />
                        Inspection Details
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          checked
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Agent Information")
                          }
                        />
                        Agent Information
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          checked
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Cover Company")
                          }
                        />
                        Cover Company
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          checked
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Report Title")
                          }
                        />
                        Report Title
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          checked
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Inspection Signature")
                          }
                        />
                        Inspection Signature
                      </label>
                      {/* <label className="flex items-center gap-2">
                        <input
                          checked
                          type="checkbox"
                          onClick={() => fileInputRef.current.click()}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Agent Photo")
                          }
                        />
                        Agent Photo
                      </label> */}
                      {/* ... Add more checkboxes for other template components */}
                    </div>
                  </fieldset>
                  {/* Design Components */}
                  <fieldset className="bordered-text Design-Components-sectiion-cover-page">
                    <legend className="tag-for-line-draw-through-text">
                      Design Components
                    </legend>
                    <div className="Buttons-and-check-boxes-for-Design-Component-ss">
                      {/* <h3 className="text-lg font-semibold mb-2">Design Components</h3> */}
                      <div className="check-boxes-and-buttons-for-adding-text-box-and-image">
                        <div className="lables-check-boxes-for-page-border-cover-page-stationary">
                          <label className="flex items-center gap-2 w-28">
                            <input
                              checked
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
                          {/* <p className="no-stationary-loaded-text-button">
                            No Stationary Loaded
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </fieldset>
              <fieldset className="bordered-text">
                <legend className="tag-for-line-draw-through-text">
                  Buttons
                </legend>
                <div className="contains-bottom-section-with-buttons-design-cover-page">
                  <div className="buttons-with-apply-export-import-discard-changes-apply">
                    <button
                      onClick={handleAddCompanyLogo}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
                      Add Company Logo
                    </button>
                    <button
                      className="button-for-footer-for-changes-in-cover-page"
                      onClick={handleRemovePhoto}
                    >
                      Remove Cover Photo
                    </button>
                    {/* <div className="buttons-for-add-text-box-and-imagess">
                      <section className="section-for-btnss-of-text-add-imgs"> */}
                    {/* Buttons for adding box, text, image, etc. */}
                    {/* <button className="btn">Add Box</button> */}
                    {/* <button className="btn" onClick={handleAddText}>
                          Add/Edit <br /> Text
                        </button> */}
                    {/* <button onClick={handleAddImageManually}>
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
                    </div> */}
                    <button
                      onClick={removeCompanyLogo}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
                      Remove Company Logo
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={logoInputRef}
                      style={{ display: "none" }}
                      onChange={handleCompanyLogoUpload}
                    />
                    <button
                      onClick={exportStateSave}
                      className="button-for-footer-for-changes-in-cover-page"
                    >
                      Apply Changes <br /> to Template
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
                    {/* <button
                      className="button-for-footer-for-changes-in-cover-page"
                      onClick={() => handleDiscardChanges()}
                    >
                      Discard <br /> Changes
                    </button> */}
                    <div>
                      {/* <CompanyInfo
                        id="someId"
                        key={discardChanges.toString()}
                      /> */}
                      <button
                        onClick={handleDiscardChanges}
                        className="button-for-footer-for-changes-in-cover-page"
                      >
                        Discard Changes
                      </button>
                    </div>
                    {/* {addedImages.map(({ id, height, width }) => (
                      <div key={id} className="image-adjustment-container">
                        <p className="font-bold">Resize the Logo(in pxl):</p>
                        <div className="flex gap-2 pb-1">
                          <span>Height:</span>
                          <input
                            className="text-center"
                            style={{ width: "3.1em" }}
                            type="number"
                            value={height}
                            onChange={(e) => {
                              const newHeight = parseInt(e.target.value);
                              setAddedImages((prevImages) =>
                                prevImages.map((image) =>
                                  image.id === id
                                    ? { ...image, height: newHeight }
                                    : image
                                )
                              );
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <span>Width:</span>
                          <input
                            className="text-center"
                            type="number"
                            style={{ width: "3.4em" }}
                            value={width}
                            onChange={(e) => {
                              const newWidth = parseInt(e.target.value);
                              setAddedImages((prevImages) =>
                                prevImages.map((image) =>
                                  image.id === id
                                    ? { ...image, width: newWidth }
                                    : image
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))} */}
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
                {checkedCheckboxes.map((label, index) => (
                  <div key={index} className="draggableeeee cursor-pointer">
                    <div>{renderCheckboxContent(label)}</div>
                  </div>
                ))}
                {/* {addedImages.map(({ id, src, height, width }) => (
                  <div key={id} className="draggableeeee">
                    <div>
                      <img
                        src={src}
                        alt={`Image ${id}`}
                        style={{ height: `${height}px`, width: `${width}px` }}
                      />
                    </div>
                  </div>
                ))} */}
                <div className="company-logo-section m-auto justify-center text-center items-center flex">
                  {renderCompanyLogo()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoverPageDesigner;
