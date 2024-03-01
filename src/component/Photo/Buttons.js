import React, { useRef, useState } from "react";
import img1 from "./icons/gallery.png";
import img2 from "./icons/document.png";
// import img5 from "./icons/camera-48.png";
import img6 from "./icons/trash.png";
// import img7 from "./icons/notes.png";
import img8 from "./icons/diskette.png";
import img9 from "./icons/search-in-browser-64.png";
import img10 from "./icons/preview-48.png";
import img11 from "./icons/delete.png";
// import check from "./icons/check-mark.png";
import close from "./icons/close_2997911.png";
import "./Buttons.css";
import EditImageTabList from "./../EditImageTabList/EditImageTabList";
import Editor from "./../Editor/Editor";
import PropTypes from "prop-types";

const Buttons = ({ onFileSelect, id }) => {
  // tablistconst [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // close popup for edit image

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Define custom tab names
  const tabNames = [
    "Crop Image",
    "Adjust Brightness",
    "Adjust Contrass",
    "Rotate Clockwise",
    "Draw Line",
    "Draw Arrow",
    "Draw Rectangle",
    "Draw Oval",
    "Add Text",
    "Overlay Image",
  ];

  const [captionValue, setCaptionValue] = useState("");
  const fileInputRef = useRef(null);
  const uploadedFileRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedPreviewIcon, setSelectedPreviewIcon] = useState(null);
  const isImageUploaded = !!uploadedFileRef.current;
  const [uploadedIconNames, setUploadedIconNames] = useState([]);
  const handleIconClick = (icon) => {
    // Check which icon is clicked
    if (icon !== img9) {
      setSelectedPreviewIcon(icon);
      openPopup(); // Open the popup when a non-img9 icon is clicked
    }
  };
  const handleDeletePreviewIcon = () => {
    // Delete the previewed icon
    setSelectedPreviewIcon(null);
  };

  const [uploadedIcon, setUploadedIcon] = useState([]);
  const handleImg1Click = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setUploadedImageUrl(imageUrl);
      uploadedFileRef.current = e.target.files[0];
      onFileSelect(uploadedFileRef.current);
    }
  };

  const handleImg6Click = () => {
    // Delete the uploaded file
    uploadedFileRef.current = null;
    onFileSelect(null); // Notify parent component that no file is selected
    localStorage.removeItem("uploadedImage");
    // Clear the download URL state
    onFileSelect(null);
  };

  const handleImg8Click = () => {
    // Check if an image is uploaded
    if (uploadedFileRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Get the base64 data of the uploaded image
        const imageData = event.target.result;

        // Save the image data to local storage
        localStorage.setItem("uploadedImage", imageData);
        console.log("Uploaded image data saved to local storage.");
      };
      // Read the uploaded image file as a data URL
      reader.readAsDataURL(uploadedFileRef.current);
    } else {
      console.log("No image uploaded to save.");
    }
  };

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setIsPopupOpen(false);
  };

  const handleInputSubmit = () => {
    // Handle the input value as needed
    console.log("Input value:", inputValue);
    closePopup();
  };
  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handleFileChangeInAddTab = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newIcons = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setUploadedIcon((prevIcons) => [...prevIcons, ...newIcons]);
      setUploadedIconNames((prevNames) => [
        ...prevNames,
        ...Array.from(e.target.files).map((file) => file.name),
      ]);
    }
  };
  const handleIconNameChange = (name, index) => {
    // Update the name of the icon at the specified index
    setUploadedIconNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = name;
      return newNames;
    });
  };

  // TO search and filter icons in Search Tab
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter icons based on the search query
  const filteredIcons = uploadedIcon.filter((icon, index) =>
    uploadedIconNames[index].toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <input
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="jkdshfkjashfkjahksalk">
        <ul className="Buttons-unorderlist-container">
          <li>
            <div
              className={`Buttons-orderlist-to-adjust-images img1 ${
                activeTab === 1 ? "active" : ""
              }`}
              onClick={handleImg1Click}
            >
              <img src={img1} alt="gallery" />
            </div>
          </li>
          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-to-adjust-images ${
                  isImageUploaded ? "active" : ""
                }`}
              >
                <img
                  src={img2}
                  alt=""
                  onClick={isImageUploaded ? handlePopupOpen : undefined}
                />
                {isPopupOpen && (
                  <div className="edit-image-main-popup-container-css">
                    <EditImageTabList
                      isOpen={isPopupOpen}
                      onRequestClose={closePopup}
                      uploadedImageUrl={uploadedImageUrl}
                      id={id}
                    />
                  </div>
                )}
              </div>
            </a>
          </li>

          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-to-adjust-images ${
                  isImageUploaded ? "active" : ""
                }`}
                onClick={isImageUploaded ? handleImg6Click : undefined}
              >
                <img src={img6} alt="" />
              </div>
            </a>
          </li>

          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-to-adjust-images ${
                  isImageUploaded ? "active" : ""
                }`}
                onClick={isImageUploaded ? handleImg8Click : undefined}
              >
                <img src={img8} alt="" />
              </div>
            </a>
          </li>
        </ul>

        <label>Caption</label>
      </div>

      <div>
        <ul className="Buttons-unoorderlist-for-icons-buttons">
          {/* ... other list items */}
          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-for-icons-buttons ${
                  isImageUploaded ? "active" : ""
                }`}
              >
                <img
                  src={img9}
                  alt=""
                  onClick={isImageUploaded ? openPopup : undefined}
                />
              </div>
            </a>
          </li>
          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-for-icons-buttons ${
                  isImageUploaded ? "active" : ""
                }`}
              >
                {selectedPreviewIcon ? (
                  <img src={selectedPreviewIcon} alt="" />
                ) : (
                  <img src={img10} alt="" />
                )}
              </div>
            </a>
          </li>
          <li>
            <a href="#file">
              <div
                className={`Buttons-orderlist-for-icons-buttons ${
                  isImageUploaded ? "active" : ""
                }`}
              >
                <img src={img11} alt="" onClick={handleDeletePreviewIcon} />
              </div>
            </a>
          </li>
        </ul>
      </div>

      {showPopup && (
        <div className="Add-Icons-popup-main-container">
          <div className="Add-Icons-Popup-header-container">
            <p className="Add-Icons-Popup-header-AddIcons">
              Select and click on the icons to Add
            </p>
            <div className="divAdd-IconsPopup-close-image">
              <p className="Add-IconsPopupmage-close-i" onClick={closePopup}>
                X
              </p>
            </div>
          </div>
          <div className="Add-Icons-Search-button-main-contaier">
            <div
              className={`Tab ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
              id="Add-Icons-Search-Button"
            >
              Search
            </div>
            <div
              className={`Tab ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
              id="Add-Icons-Search-Button"
            >
              Add
            </div>
          </div>
          {activeTab === 1 && (
            // Add your search tab content here
            <div className="Search-Tab">
              <div className="Add-icon-input-filed-to-search-icons-container">
                <input
                  className="Add-icon-input-filed-to-search-icons"
                  placeholder="Search Icons By Name"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>

              {/* <div>
                {uploadedIcon.length > 0 ? (
                  <div className="Add-icons-user-uploaded-icons">
                    {uploadedIcon.map((icon, index) => (
                      <img
                        className="Add-icons-user-uploaded-icons-img-to-be-uploaded"
                        key={index}
                        src={icon}
                        alt={`Uploaded Icon ${index}`}
                        onClick={() => handleIconClick(icon)}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="Add-icons-No-Icons-found">
                    No Icons found
                  </span>
                )}
              </div> */}
              <div>
                {filteredIcons.length > 0 ? (
                  <div className="Add-icons-user-uploaded-icons">
                    {filteredIcons.map((icon, index) => (
                      <img
                        className="Add-icons-user-uploaded-icons-img-to-be-uploaded"
                        key={index}
                        src={icon}
                        alt={`Uploaded Icon ${index}`}
                        onClick={() => handleIconClick(icon)}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="Add-icons-No-Icons-found">
                    No Icons found
                  </span>
                )}
              </div>

              <div className="Add-Icons-cancel-btn-zz">
                {/* <hr className="Add-icon-horizonatl-line2" /> */}
                <button
                  className="Add-Icons-cancel-btn-yy"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            // Add your add tab content here
            <div className="Add-Tab">
              <div className="Add-icon-horizonatl-line1">
                <hr className="" />
              </div>
              <div className="Add-icons-user-uploaded-icons-after-uploaded">
                {uploadedIcon.length > 0 ? (
                  <p className="Add-icons-No-Icons-found-after-uploaded-para">
                    You can add tags to the icon here for searching later.
                    <br />
                    File names are added as tags by default.You can enter any
                    additional tags.
                    <br />
                    Add comma seperated tags for each icon below
                  </p>
                ) : (
                  <p className="Add-icons-No-Icons-found-after-uploaded-para">
                    Add Icons
                  </p>
                )}
                <div className="kjcbdavcdkvykhcbd">
                  <input
                    className="input-file-choose-file-to-add-icons"
                    type="file"
                    onChange={handleFileChangeInAddTab}
                    multiple
                  />
                </div>
              </div>
              <div className="Add-icons-user-uploaded-icons-container-rrr">
                {uploadedIcon.length > 0 && (
                  <div className="Add-icons-user-uploaded-icons-add-tab">
                    {uploadedIcon.map((icon, index) => (
                      <div key={index} className="Add-icon-item">
                        <img
                          className="Add-icons-user-uploaded-icons-img-to-be-uploaded"
                          src={icon}
                          alt={`Uploaded Icon ${index}`}
                          onClick={() => handleIconClick(icon)}
                        />
                        <input
                          className="label-name-for-Added-icons"
                          type="text"
                          placeholder="Icon Name"
                          value={uploadedIconNames[index] || ""}
                          onChange={(e) =>
                            handleIconNameChange(e.target.value, index)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <div className="kjcbdavcdkvykhcbd">
                <input
                  className="input-file-choose-file-to-add-icons"
                  type="file"
                  onChange={handleFileChangeInAddTab}
                  multiple
                />
              </div> */}

              <div className="Add-Icons-cancel-btn-zz">
                <button
                  className="Add-Icons-cancel-btn-yy"
                  onClick={closePopup}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
Buttons.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};
export default Buttons;
