// import React, { useState } from "react";
// import "./EditImageTabList.css";
// import PropTypes from "prop-types";
// import Editor from "../Editor/Editor";
// import AdjustBrightnessContent from "./AdjustBrightnessContent/AdjustBrightnessContent";
// import AdjustContrastContent from "./AdjustContrast/AdjustContrastContent";
// import RotateClockwiseContent from "./RotateClockwiseContent/RotateClockwiseContent";
// import CropImageContent from "./CropImageContent/CropImageContent";
// import DrawLineContent from "./DrawLineContent/DrawLineContent";
// import DrawArrowContent from "./DrawArrowContent/DrawArrowContent";
// import DrawRectangleContent from "./DrawRectangleContent/DrawRectangleContent";
// import DrawOvalContent from "./DrawOvalContent/DrawOvalContent";
// import OverLayImage from "./OverLayImage/OverLayImage";

// const EditImageTabList = ({ isOpen, onRequestClose, uploadedImageUrl }) => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [textFromEditor, setTextFromEditor] = useState("");
//   const [editorKey, setEditorKey] = useState(1);

//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [rotationAngle, setRotationAngle] = useState(0);
//   const [drawnArrows, setDrawnArrows] = useState([]);
//   const [drawnLines, setDrawnLines] = useState([]);
//   const [drawnRectangles, setRectangle] = useState([]);
//   const [drawnOvals, setOval] = useState([]);
//   const [croppedImageUrl, setCroppedImage] = useState(null);

//   const handleCrop = (croppedImageData) => {
//     // Store cropped image data in state
//     setCroppedImage(croppedImageData);
//   };
//   const handleImageCrop = (croppedImageData) => {
//     setCroppedImage(croppedImageData);
//   };

//   const handleDrawnRectangle = (rectangles) => {
//     setRectangle(rectangles);
//   };
//   const handleDrawnOval = (ovals) => {
//     setOval(ovals);
//   };
//   const handleDrawnLines = (lines) => {
//     setDrawnLines(lines);
//   };

//   const handleDrawnArrows = (arrows) => {
//     setDrawnArrows(arrows);
//   };

//   const handleBrightnessChange = (newBrightness) => {
//     setBrightness(newBrightness);
//   };

//   const handleRotateClockwise = (newRotate) => {
//     setRotationAngle(newRotate);
//   };

//   const handleContrastChange = (newContrast) => {
//     setContrast(newContrast);
//   };

//   const handleTabClick = (tabNumber) => {
//     setActiveTab(tabNumber);

//     if (tabNumber === 9) {
//       setEditorKey((prevKey) => prevKey + 1);
//     }
//     if (tabNumber === 10) {
//       setEditorKey((prevKey) => prevKey + 1);
//     }
//   };

//   const handleClosePopup = () => {
//     onRequestClose();
//   };

//   const handleTextChange = (newTexts) => {
//     setTextFromEditor(newTexts);
//   };

//   const tabNames = [
//     "Crop Image",
//     "Adjust Brightness",
//     "Adjust Contrast",
//     "Rotate Clockwise",
//     "Draw Line",
//     "Draw Arrow",
//     "Draw Rectangle",
//     "Draw Oval",
//     "Add Text",
//     "Overlay Image",
//   ];

//   const tabContentComponents = {
//     1: (
//       <CropImageContent
//         imageUrl={uploadedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onImageCrop={handleImageCrop}
//         onCrop={handleCrop}
//         croppedImageUrl={croppedImageUrl}
//       />
//     ),
//     2: (
//       <AdjustBrightnessContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onBrightnessChange={handleBrightnessChange}
//       />
//     ),
//     3: (
//       <AdjustContrastContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         contrast={contrast}
//         brightness={brightness}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onContrastChange={handleContrastChange}
//       />
//     ),
//     4: (
//       <RotateClockwiseContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         rotationAngle={rotationAngle}
//         contrast={contrast}
//         brightness={brightness}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onRotateClockwise={handleRotateClockwise}
//       />
//     ),
//     5: (
//       <DrawLineContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onDrawLines={handleDrawnLines}
//       />
//     ),
//     6: (
//       <DrawArrowContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         contrast={contrast}
//         brightness={brightness}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onDrawArrow={handleDrawnArrows}
//       />
//     ),
//     7: (
//       <DrawRectangleContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnRectangles={drawnRectangles}
//         drawnOvals={drawnOvals}
//         onDrawRectangles={handleDrawnRectangle}
//       />
//     ),
//     8: (
//       <DrawOvalContent
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//         onDrawOvals={handleDrawnOval}
//       />
//     ),
//     9: (
//       <Editor
//         key={editorKey}
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         onTextChange={handleTextChange}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//       />
//     ),
//     10: (
//       <OverLayImage
//         key={editorKey}
//         imageUrl={uploadedImageUrl}
//         croppedImageUrl={croppedImageUrl}
//         texts={textFromEditor}
//         brightness={brightness}
//         contrast={contrast}
//         drawnArrows={drawnArrows}
//         drawnLines={drawnLines}
//         drawnOvals={drawnOvals}
//         drawnRectangles={drawnRectangles}
//       />
//     ),
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="flex-container-for-tablist-for-edit-img">
//           <div className="width-set-for-the-popup-windows-edit-image-section">
//             <div className="edit-image-header-text-and-close-Button">
//               <p className="edit-image-header-popup-window">Edit Image</p>
//               <p
//                 className="edit-image-popup-close-image"
//                 onClick={handleClosePopup}
//               >
//                 X
//               </p>
//             </div>
//             <div className="flex">
//               <div className="tab-list-buttons-aa-bb">
//                 {tabNames.map((tabName, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => handleTabClick(index + 1)}
//                     className={
//                       activeTab === index + 1
//                         ? "tab-list-active"
//                         : "tab-list-button"
//                     }
//                   >
//                     {tabName}
//                   </button>
//                 ))}
//                 <div className="undo-redo-button-and-color-picker-combine">
//                   <section className="undeo-redo-btns-after-tablist">
//                     <button className="Btns-current-color">
//                       Current Color
//                     </button>
//                   </section>
//                   <section className="color-picker-heading-and-color-picker">
//                     <button className="color-pickkkker"></button>
//                   </section>
//                 </div>
//               </div>
//               <div className="tab-list-content">
//                 {tabNames.map((tabName, index) => (
//                   <div
//                     style={{ width: "100%" }}
//                     key={index + 1}
//                     className={
//                       activeTab === index + 1
//                         ? "tab-list-pane tab-list-active"
//                         : "tab-list-pane"
//                     }
//                   >
//                     {tabContentComponents[activeTab]}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="footer-for-Eidt-image-tabelist-btns">
//               <div className="footer-for-Eidt-image-tabelist-btns-container">
//                 <button className="footer-for-Eidt-image-tabelist-btns-save-and-discard">
//                   Save Changes
//                 </button>
//                 <button className="footer-for-Eidt-image-tabelist-btns-save-and-discard">
//                   Discard Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// EditImageTabList.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onRequestClose: PropTypes.func.isRequired,
//   uploadedImageUrl: PropTypes.string.isRequired,
// };

// export default EditImageTabList;

import React, { useState } from "react";
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

const EditImageTabList = ({ isOpen, onRequestClose, uploadedImageUrl }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [textFromEditor, setTextFromEditor] = useState("");
  const [editorKey, setEditorKey] = useState(1);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [drawnArrows, setDrawnArrows] = useState([]);
  const [drawnLines, setDrawnLines] = useState([]);
  const [drawnRectangles, setRectangle] = useState([]);
  const [drawnOvals, setOval] = useState([]);
  const [croppedImageUrl, setCroppedImage] = useState(null);
  const [modifiedImageUrl, setModifiedImageUrl] = useState(null);

  const handleSaveChanges = () => {
    // Gather all relevant data about the modified image
    const modifiedData = {
      brightness,
      contrast,
      rotationAngle,
      drawnArrows,
      drawnLines,
      drawnRectangles,
      drawnOvals,
      croppedImageUrl,
    };

    // Save the modified image data
    console.log("Saving changes...", modifiedData);

    // Assuming modifiedImageUrl is the URL of the modified image, set it to the state
    const modifiedImageUrl = "new_image_url_here"; // Replace "new_image_url_here" with the actual modified image URL
    setModifiedImageUrl(modifiedImageUrl);
  };

  const handleCrop = (croppedImageData) => {
    // Store cropped image data in state
    setCroppedImage(croppedImageData);
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

    if (tabNumber === 9) {
      setEditorKey((prevKey) => prevKey + 1);
    }
    if (tabNumber === 10) {
      setEditorKey((prevKey) => prevKey + 1);
    }
  };

  const handleClosePopup = () => {
    onRequestClose();
  };

  const handleTextChange = (newTexts) => {
    setTextFromEditor(newTexts);
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
    "Overlay Image",
  ];

  const tabContentComponents = {
    1: (
      <CropImageContent
        imageUrl={uploadedImageUrl}
        texts={textFromEditor}
        brightness={brightness}
        contrast={contrast}
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
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
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
        texts={textFromEditor}
        contrast={contrast}
        brightness={brightness}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onContrastChange={handleContrastChange}
      />
    ),
    4: (
      <RotateClockwiseContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
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
        texts={textFromEditor}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onDrawLines={handleDrawnLines}
      />
    ),
    6: (
      <DrawArrowContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
        contrast={contrast}
        brightness={brightness}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onDrawArrow={handleDrawnArrows}
      />
    ),
    7: (
      <DrawRectangleContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnRectangles={drawnRectangles}
        drawnOvals={drawnOvals}
        onDrawRectangles={handleDrawnRectangle}
      />
    ),
    8: (
      <DrawOvalContent
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
        onDrawOvals={handleDrawnOval}
      />
    ),
    9: (
      <Editor
        key={editorKey}
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        onTextChange={handleTextChange}
        brightness={brightness}
        contrast={contrast}
        drawnArrows={drawnArrows}
        drawnLines={drawnLines}
        drawnOvals={drawnOvals}
        drawnRectangles={drawnRectangles}
      />
    ),
    10: (
      <OverLayImage
        key={editorKey}
        imageUrl={uploadedImageUrl}
        croppedImageUrl={croppedImageUrl}
        texts={textFromEditor}
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
                    <button className="color-pickkkker"></button>
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
                <button
                  className="footer-for-Eidt-image-tabelist-btns-save-and-discard"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button className="footer-for-Eidt-image-tabelist-btns-save-and-discard">
                  Discard Changes
                </button>
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
