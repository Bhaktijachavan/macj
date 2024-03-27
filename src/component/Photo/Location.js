import React, { useCallback, useEffect, useState } from "react";
import "./Location.css";
import "./PhotoReview.css";
import Buttons from "./Buttons";
import Caption from "./Caption";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { PanalSelect } from "../Function/function";

const Location = ({ imageUrl }) => {
  const [uploadedFile, setUploadedFile] = useState(!imageUrl ? null : imageUrl);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedSubmenuId, setSelectedSubmenuId] = useState(null);
  const [submenuDetails, setSubmenuDetails] = useState(null);
  const [TabData, setTabData] = useState(null);
  const [panelId, setPanelId] = useState(null);
  const [panel, setPanel] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [imageIndex, SetImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (imageUrl != null) {
      console.log(imageUrl);
      return setUploadedFile(imageUrl);
    }
  }, []);

  const handleImageSet = () => {
    // uploadedFile(null);
    setUploadedFile(null);
  };

  useEffect(() => {
    console.log("image index", imageIndex);
    // Retrieve image data from local storage based on the imageIndex
    const imageData = localStorage.getItem("coverphotoImage");
    if (imageData) {
      const parsedImageData = JSON.parse(imageData);
      const imagesArray = parsedImageData[panelId] || [];
      console.log("imagesArray", imagesArray);
      const selectedImage = imagesArray[imageIndex];
      console.log("selectedImage", selectedImage);
      if (selectedImage) {
        // Set the selected image to state
        setSelectedImage(selectedImage);
        setCaption(selectedImage.caption);
      }
    }
  }, [imageIndex, selectedMenuId]);
  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };
  const handleIconPreview = (icon) => {
    setSelectedIcon(icon);
    // console.log("gfhjkjk", selectedIcon);
  };

  useEffect(() => {
    const fetchData = () => {
      const storedMenuData = localStorage.getItem("menuData");
      if (storedMenuData) {
        setMenuData(JSON.parse(storedMenuData));
      }
    };

    // Call fetchData initially
    fetchData();

    // Set interval to call fetchData every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedSubmenuId && menuData && menuData[selectedMenuId]) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedSubmenuId]);
    } else {
      setSubmenuDetails(null);
    }
  }, [selectedSubmenuId, menuData, selectedMenuId]);
  // useEffect(() => {
  //   if ((selectedIcon && selectedImage) || (selectedIcon && uploadedFile)) {
  //     const imageUrl = selectedImage
  //       ? selectedImage.url
  //       : typeof uploadedFile === "string"
  //       ? uploadedFile
  //       : URL.createObjectURL(uploadedFile);
  //     setImageURL(imageUrl);
  //     console.log("Generated URL:", imageUrl); // Console log the URL
  //   } else {
  //     setImageURL(null);
  //   }
  // }, [selectedIcon, selectedImage, uploadedFile]);

  const handleMenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedMenuId(selectedId);
    setSelectedSubmenuId(null);
  };

  const handleSubmenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSubmenuId(selectedId);
    setPanelId(null); // Reset panelId when submenu changes
    // Update submenu details based on selected submenu ID
    if (
      menuData &&
      menuData[selectedMenuId] &&
      menuData[selectedMenuId].subdetails[selectedId]
    ) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedId]);
    } else {
      setSubmenuDetails(null);
    }
  };

  const handleTabChange = (e) => {
    const panelId = e.target.value;
    setPanelId(panelId);

    setTabData(submenuDetails[panelId]);
  };

  const handlePanel = () => {
    if (!panelId || !TabData) {
      return alert("please select panel ");
    }

    setPanel(PanalSelect(TabData.Radiopanal, TabData));
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="PhotoReview-rectangular-container-super">
        <div className="PhotoReview-rectangular-container-main-container">
          <div className="PhotoReview-rectangle">
            <div className="PhotoReview-Location-container">
              {/* <label htmlFor="menuDropdown">Location</label> */}
              <fieldset className=" border-1 border-gray-400 px-[4px] py-[4px]  ">
                <legend className="ml-2 text-[17px]">Location</legend>

                <div>
                  <select
                    id="menuDropdown"
                    className="PhotoReview-Location-first-inputfields"
                    onChange={handleMenuChange}
                  >
                    <option value="">Select Menu</option>
                    {menuData &&
                      Object.keys(menuData).map((menuId) => (
                        <option key={menuId} value={menuId}>
                          {menuData[menuId].name}
                        </option>
                      ))}
                  </select>
                  <br />
                  <label htmlFor="submenuDropdown"></label>

                  <select
                    id="submenuDropdown"
                    className="PhotoReview-Location-first-inputfields"
                    onChange={handleSubmenuChange}
                    disabled={!selectedMenuId}
                  >
                    <option value="">Select Submenu</option>
                    {selectedMenuId &&
                      Object.keys(menuData[selectedMenuId].subitems).map(
                        (subkey) => (
                          <option
                            key={subkey}
                            value={menuData[selectedMenuId].subitems[subkey].si}
                          >
                            {menuData[selectedMenuId].subitems[subkey].subName}
                          </option>
                        )
                      )}
                  </select>

                  <label htmlFor="damageDropdown"></label>
                  <br />
                  <select
                    id="damageDropdown"
                    className="PhotoReview-Location-first-inputfields"
                    disabled={!selectedSubmenuId}
                    onChange={handleTabChange}
                  >
                    <option value="">Select Damage</option>
                    {submenuDetails &&
                      Object.keys(submenuDetails)
                        .filter(
                          (subdetailkey) => !["id", "si"].includes(subdetailkey)
                        )
                        .filter(
                          (subdetailkey) =>
                            ![3, 4].includes(
                              submenuDetails[subdetailkey].Radiopanal
                            )
                        )
                        .map((subdetailkey) => (
                          <option key={subdetailkey} value={subdetailkey}>
                            {submenuDetails[subdetailkey].tabname}
                          </option>
                        ))}
                  </select>
                </div>
              </fieldset>
              <div className="PhotoReview-Location-button">
                {/* <Link> */}
                <button onClick={handlePanel} title="Navigate to Panel">
                  @
                </button>
                {/* </Link> */}
              </div>
              <div className="PhotoReview-Location-Checkbox-Container">
                <section className="Section-for-label-and-checkbox">
                  <input type="checkbox" name="agree" />
                  <label
                    htmlFor="agree"
                    className="PhotoReview-Location-Checkbox-label"
                  >
                    Print At End
                  </label>
                </section>
                <section className="Section-for-label-and-checkbox">
                  <input
                    type="checkbox"
                    className="PhotoReview-Location-Checkbox-label"
                    name="agree"
                  />
                  <label
                    htmlFor="agree"
                    className="PhotoReview-Location-Checkbox-label"
                  >
                    Summary
                  </label>
                </section>
                <section className="Section-for-label-and-checkbox">
                  <input type="checkbox" id="agree" name="agree" />
                  <label
                    htmlFor="agree"
                    className="PhotoReview-Location-Checkbox-label"
                  >
                    Use Location As Caption
                  </label>
                </section>
              </div>
            </div>

            <div className="PhotoReview-Drag-Drop-Box">
              {selectedImage ? (
                <img
                  src={selectedImage.url}
                  alt="Selected Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : uploadedFile ? (
                <img
                  src={
                    typeof uploadedFile === "string"
                      ? uploadedFile
                      : URL.createObjectURL(uploadedFile)
                  }
                  alt="Uploaded Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <p className="Drag-Drop-Box-Para">
                  The Selected Image will Appear Here !
                </p>
              )}
              {selectedIcon && (
                <img
                  src={selectedIcon}
                  alt="Selected Icon"
                  style={{
                    position: "absolute",
                  }}
                />
              )}
            </div>
            <Buttons
              caption={caption}
              url={!uploadedFile ? null : uploadedFile}
              id={panelId}
              SetImageIndex={SetImageIndex}
              onFileSelect={handleFileSelect}
              onIconPreview={handleIconPreview}
              onSelectedImage={setSelectedImage}
              onDeleteBulk={setUploadedFile}
            />
          </div>
          <button onClick={handleImageSet} title="Navigate to Panel">
            Delete
          </button>
          {/* Display selected icon on top of the image */}
        </div>
        <Caption
          id={panelId}
          setCap={setCaption}
          caption={caption}
          index={imageIndex}
        />
      </div>

      {/* Popup container */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-gray-300 border border-gray-400  relative w-[99%] p-0">
            <div className=" flex items-center content-between justify-between  class-for-header-color px-1   ">
              <p>Panel</p>
              <p
                className="BatchAddPhots-close-image   hover:text-white"
                onClick={handleClosePopup}
              >
                X
              </p>
            </div>

            {panel}
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
