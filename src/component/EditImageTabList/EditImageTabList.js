import React, { useState, useContext, useEffect, useRef } from "react";
import "./EditImageTabList.css";
import PropTypes from "prop-types";
import Editor from "../Editor/Editor";
import AdjustBrightnessContent from "./AdjustBrightnessContent/AdjustBrightnessContent";
import AdjustContrastContent from "./AdjustContrast/AdjustContrastContent";
import RotateClockwiseContent from "./RotateClockwiseContent/RotateClockwiseContent";
import CropImageContent from "./CropImageContent/CropImageContent";
import DrawLineContent from "./DrawLineContent/DrawLineContent";
import DrawArrowContent from "./DrawArrowContent/DrawArrowContent";
import DrawRectangleContent from "./DrawRectangleContent/DrawRectangleContent";
import DrawOvalContent from "./DrawOvalContent/DrawOvalContent";
import OverLayImage from "./OverLayImage/OverLayImage";

const EditImageTabList = ({
  isOpen,
  onRequestClose,
  uploadedImageUrl,
  id,
  SetImageIndex,
  caption,
  subnames,
}) => {
  const overlayImageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(10);
  // const [textFromEditor, setTextFromEditor] = useState(null);
  const [overLayImage, setOverLayImage] = useState([]);

  const [originalImage, setOriginalImage] = useState(null);
  const [editorKey, setEditorKey] = useState(1);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [drawnArrows, setDrawnArrows] = useState([]);
  const [drawnLines, setDrawnLines] = useState([]);
  const [drawnRectangles, setRectangle] = useState([]);
  const [drawnOvals, setOval] = useState([]);
  const [textsWithPositions, setTextsWithPositions] = useState([]);
  const [croppedImageUrl, setCroppedImage] = useState(null);

  const [arrowColor, setArrowColor] = useState("Black");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleColorChange = (color) => {
    setArrowColor(color);
  };
  // useEffect(() => {
  console.log("subname in editinmage", subnames);
  // }, [subnames]);
  console.log("edit image id ", id);

  const handleSaveChanges = () => {
    // Call the handleDownload function in OverLayImage component
    // You can access it through a ref or any other method
    // For simplicity, I'm assuming you have a ref to OverLayImage component
    if (overlayImageRef.current) {
      overlayImageRef.current.handleDownload();
    }
  };
  // const handleSaveChanges = () => {
  //   console.log("Changes:", {
  //     textsWithPositions,

  //     drawnArrows,
  //     drawnLines,
  //     drawnOvals,
  //     drawnRectangles,
  //   });
  // };

  const handleDiscardChanges = () => {
    // Remove the image from local storage
    localStorage.removeItem("coverphotoImage");
    // Clear the download URL state
    setDownloadUrl(null);
  };

  const handleDownloadUrlChange = (url, setIdIndex) => {
    try {
      if (!id) {
        return alert("Please Select Valid Image Location");
      }

      let imageData = localStorage.getItem("coverphotoImage");
      if (!imageData) {
        imageData = {};
      } else {
        imageData = JSON.parse(imageData);
      }

      // Check if there's already an array for the given id
      if (!Array.isArray(imageData[id])) {
        // If not, initialize it as an empty array
        imageData[id] = [];
      }

      // Get the next index for the new image object
      const index = imageData[id].length;

      imageData[id].push({
        id: index,
        subnames: subnames,
        caption: caption,
        url: url,
      });

      // Call the setIndex callback with the index of the newly saved image
      SetImageIndex(index);

      // Save the updated image data to local storage
      localStorage.setItem("coverphotoImage", JSON.stringify(imageData));
      alert("Image data saved successfully.");
    } catch (error) {
      // console.error("Error saving image data:", error);
    }
  };

  const handleCrop = (croppedImageData) => {
    // Store cropped image data in state
    setCroppedImage(croppedImageData);
  };
  const handleOverLayImage = (updatedImage) => {
    // Store cropped image data in state
    setOverLayImage(updatedImage);
  };
  const handleImageCrop = (croppedImageData) => {
    setCroppedImage(croppedImageData);
  };

  const handleDrawnRectangle = (rectangles) => {
    setRectangle(rectangles);
  };
  const handleDrawnOval = (ovals) => {
    setOval(ovals);
  };
  const handleDrawnLines = (lines) => {
    setDrawnLines(lines);
  };

  const handleDrawnArrows = (arrows) => {
    setDrawnArrows(arrows);
  };

  const handleBrightnessChange = (newBrightness) => {
    setBrightness(newBrightness);
  };

  const handleRotateClockwise = (newRotate) => {
    setRotationAngle(newRotate);
  };

  const handleContrastChange = (newContrast) => {
    setContrast(newContrast);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);

    // if (tabNumber === 9) {
    //   setEditorKey((prevKey) => prevKey + 1);
    // }
    if (tabNumber === 10) {
      setEditorKey((prevKey) => prevKey + 1);
    }
  };

  const handleClosePopup = () => {
    onRequestClose();
  };

  const handleTextChange = (newTexts) => {
    setTextsWithPositions(newTexts);
  };

  const tabNames = [
    "Crop Image",
    "Adjust Brightness",
    "Adjust Contrast",
    "Rotate Clockwise",
    "Draw Line",
    "Draw Arrow",
    "Draw Rectangle",
    "Draw Oval",
    "Add Text",
    "Overlay Image  ",
  ];

  const tabContentComponents = {
    1: (
      <CropImageContent
        imageUrl={uploadedImageUrl}
        textsWithPositions={textsWithPositions}
        brightness={brightness}
        contrast={contrast}
        rotationAngle={rotationAngle}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onImageCrop={handleImageCrop}
        onCrop={handleCrop}
        croppedImageUrl={croppedImageUrl}
      />
    ),
    2: (
      <AdjustBrightnessContent
        imageUrl={uploadedImageUrl}
        rotationAngle={rotationAngle}
        croppedImageUrl={croppedImageUrl}
        textsWithPositions={textsWithPositions}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onBrightnessChange={handleBrightnessChange}
      />
    ),
    3: (
      <AdjustContrastContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        textsWithPositions={textsWithPositions}
        contrast={contrast}
        brightness={brightness}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        rotationAngle={rotationAngle}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        overLayImage={overLayImage}
        onOverlayChange={handleOverLayImage}
        onContrastChange={handleContrastChange}
      />
    ),
    4: (
      <RotateClockwiseContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        textsWithPositions={textsWithPositions}
        rotationAngle={rotationAngle}
        contrast={contrast}
        brightness={brightness}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onRotateClockwise={handleRotateClockwise}
      />
    ),
    5: (
      <DrawLineContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        rotationAngle={rotationAngle}
        textsWithPositions={textsWithPositions}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        arrowColor={arrowColor}
        onDrawLines={handleDrawnLines}
      />
    ),
    6: (
      <DrawArrowContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        rotationAngle={rotationAngle}
        textsWithPositions={textsWithPositions}
        contrast={contrast}
        brightness={brightness}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        arrowColor={arrowColor}
        onDrawArrow={handleDrawnArrows}
      />
    ),
    7: (
      <DrawRectangleContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        rotationAngle={rotationAngle}
        drawnLines={drawnLines}
        textsWithPositions={textsWithPositions}
        drawnRectangles={drawnRectangles}
        drawnOvals={drawnOvals}
        arrowColor={arrowColor}
        onDrawRectangles={handleDrawnRectangle}
      />
    ),
    8: (
      <DrawOvalContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        textsWithPositions={textsWithPositions}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        rotationAngle={rotationAngle}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        arrowColor={arrowColor}
        onDrawOvals={handleDrawnOval}
      />
    ),
    9: (
      <Editor
        // key={editorKey}
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        // textFromEditor={textFromEditor}
        textsWithPositions={textsWithPositions}
        onTextChange={handleTextChange}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        rotationAngle={rotationAngle}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
      />
    ),
    10: (
      <OverLayImage
        key={editorKey}
        overLayImage={overLayImage}
        originalImage={originalImage}
        onDownloadUrlChange={handleDownloadUrlChange}
        ref={overlayImageRef}
        onOverlayChange={handleOverLayImage}
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        textsWithPositions={textsWithPositions}
        rotationAngle={rotationAngle}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
      />
    ),
  };

  return (
    <>
      <button></button>
      {isOpen && (
        <div className="flex-container-for-tablist-for-edit-img">
          <div className="width-set-for-the-popup-windows-edit-image-section">
            <div className="edit-image-header-text-and-close-Button">
              <p className="edit-image-header-popup-window">Edit Image</p>
              <p
                className="edit-image-popup-close-image"
                onClick={handleClosePopup}
              >
                X
              </p>
            </div>
            <div className="flex">
              <div className="tab-list-buttons-aa-bb">
                {tabNames.map((tabName, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleTabClick(index + 1)}
                    className={
                      activeTab === index + 1
                        ? "tab-list-active"
                        : "tab-list-button"
                    }
                  >
                    {tabName}
                  </button>
                ))}
                <div className="undo-redo-button-and-color-picker-combine">
                  <section className="undeo-redo-btns-after-tablist">
                    <button className="Btns-current-color">
                      Current Color
                    </button>
                  </section>
                  <section className="color-picker-heading-and-color-picker">
                    <button></button>
                    <input
                      className="color-pickkkker"
                      type="color"
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                  </section>
                </div>
              </div>
              <div className="tab-list-content">
                {tabNames.map((tabName, index) => (
                  <div
                    style={{ width: "100%" }}
                    key={index + 1}
                    className={
                      activeTab === index + 1
                        ? "tab-list-pane tab-list-active"
                        : "tab-list-pane"
                    }
                  >
                    {tabContentComponents[activeTab]}
                  </div>
                ))}
              </div>
            </div>
            <div className="footer-for-Eidt-image-tabelist-btns">
              <div className="footer-for-Eidt-image-tabelist-btns-container">
                {/* Conditionally render Save and Discard buttons only for Overlay Image tab */}
                {activeTab === 10 && (
                  <>
                    <button
                      className="footer-for-Eidt-image-tabelist-btns-save-and-discard"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                    <button
                      className="footer-for-Eidt-image-tabelist-btns-save-and-discard"
                      onClick={handleDiscardChanges}
                    >
                      Discard Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

EditImageTabList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  uploadedImageUrl: PropTypes.string.isRequired,
};

export default EditImageTabList;
