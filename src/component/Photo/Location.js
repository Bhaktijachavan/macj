import React, { useCallback, useEffect, useState } from "react";
import "./Location.css";
import "./PhotoReview.css";
import Buttons from "./Buttons";
import Caption from "./Caption";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { PanalSelect } from "../Function/function";
import Alert from "../Alert/Alert";
import img7 from "../Photo/icons/greater-than.png";

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
  const [subnames, setSubnames] = useState([]);
  const [NewTabs, setNewTabs] = useState();
  const [selectedText, setSelectedText] = useState();
  const [submenus, setSubmenus] = useState([]);
  const [selectedTabName, setSelectedtabName] = useState();
  const [damageNames, setDamageNames] = useState([]);
  const [damageId, setDamageId] = useState(null);
  const [selectedDamage, setSelectedDamage] = useState();

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
  });

  // useEffect(() => {
  //   console.log("damageId", damageId);
  // }, [damageId]);

  useEffect(() => {
    if (imageUrl != null) {
      console.log(imageUrl);
      return setUploadedFile(imageUrl);
    }
  }, []);
  // useEffect(() => {
  //   try {
  //     if (!damageId || !imageUrl) {
  //       setShowAlert({
  //         showAlert: true,
  //         message: "Please Select valid Location & Image ",
  //       });
  //       setTimeout(() => {
  //         setShowAlert({
  //           showAlert: false,
  //           message: "",
  //         }); // Hide the alert after 3 seconds
  //       }, 3000);
  //       return;
  //     }

  //     let imageData = localStorage.getItem("coverphotoImage");
  //     if (!imageData) {
  //       imageData = {};
  //     } else {
  //       imageData = JSON.parse(imageData);
  //     }

  //     // Check if there's already an array for the given id
  //     if (!Array.isArray(imageData[damageId])) {
  //       // If not, initialize it as an empty array
  //       imageData[damageId] = [];
  //     }

  //     // Get the next index for the new image object
  //     const index = imageData[damageId].length;

  //     imageData[damageId].push({
  //       url: imageUrl,
  //     });

  //     // Call the setIndex callback with the index of the newly saved image
  //     SetImageIndex(index);

  //     // Save the updated image data to local storage
  //     localStorage.setItem("coverphotoImage", JSON.stringify(imageData));
  //     setShowAlert({
  //       showAlert: true,
  //       message: "Image data saved successfully.",
  //     });
  //     setTimeout(() => {
  //       setShowAlert({
  //         showAlert: false,
  //         message: "",
  //       }); // Hide the alert after 3 seconds
  //     }, 3000);
  //   } catch (error) {
  //     // console.error("Error saving image data:", error);
  //   }
  // }, [damageId, imageUrl]);

  const handleImageSet = () => {
    // uploadedFile(null);
    setUploadedFile(null);
  };

  useEffect(() => {
    console.log("image index", imageIndex);
    // Retrieve image data from local storage based on the imageIndex
    const imageData = localStorage.getItem("coverphotoImage");
    // console.log("coverphotoImage", imageData);
    if (imageData) {
      const parsedImageData = JSON.parse(imageData);
      const imagesArray = parsedImageData[panelId] || [];
      // console.log("imagesArray", imagesArray);
      const selectedImage = imagesArray[imageIndex];
      // console.log("selectedImage", selectedImage);
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
      // console.log("menudata from local", storedMenuData);
      if (storedMenuData) {
        setMenuData(JSON.parse(storedMenuData));
        // const parsedMenuData = JSON.parse(storedMenuData);
        // const extractedSubnames = Object.values(parsedMenuData).flatMap(
        //   (item) => item.subitems.map((subitem) => subitem.subName)
        // );
        // console.log("extractedSubnames", extractedSubnames);
        // setSubnames(extractedSubnames);
      }
    };

    // Call fetchData initially
    fetchData();

    // Set interval to call fetchData every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const tabNamesArray = [];
  useEffect(() => {
    // Step 1: Retrieve menuData from localStorage
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      return;
    }

    // Step 2: Parse menuData and set it to the state
    const parsedMenuData = JSON.parse(menuDataString);
    // setMenuData(parsedMenuData);
    // console.log("parsedMenuData ", parsedMenuData);

    // Extract submenus from parsedMenuData

    for (const key in parsedMenuData) {
      const menuItem = parsedMenuData[key];
      const subdetails = menuItem.subdetails;

      for (const subKey in subdetails) {
        const subdetail = subdetails[subKey];

        for (const key in subdetail) {
          const subkey = subdetail[key];
          tabNamesArray.push(subkey.tabname);
        }
      }
    }

    // console.log(tabNames);
    setSubmenus(tabNamesArray);
  }, []);

  useEffect(() => {
    if (selectedSubmenuId && menuData && menuData[selectedMenuId]) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedSubmenuId]);
    } else {
      setSubmenuDetails(null);
    }
  }, [selectedSubmenuId, menuData, selectedMenuId]);

  const handleMenuChange = (e) => {
    const selectedSubmenu = e.target.value;
    // console.log("selectedId,", selectedSubmenu);
    setSelectedtabName(selectedSubmenu);
    setSelectedSubmenuId(null);
    let selectedMenu = "";
    const menuDataString = localStorage.getItem("menuData");
    const parsedMenuData = JSON.parse(menuDataString);

    // Check if selectedSubmenu is Table of Content or Summary

    // Iterate over the keys of parsedMenuData
    for (const key in parsedMenuData) {
      const menuItem = parsedMenuData[key];
      const subdetails = menuItem.subdetails;
      for (const subKey in subdetails) {
        const subdetail = subdetails[subKey];
        for (const subkey in subdetail) {
          const subKeyData = subdetail[subkey];

          if (subKeyData && subKeyData.tabname === selectedSubmenu) {
            selectedMenu = subkey;
          }
        }
      }
    }
    setSelectedMenuId(selectedMenu);
  };
  useEffect(() => {
    const menuDataString = localStorage.getItem("menuData");
    const parsedMenuData = JSON.parse(menuDataString);
    let damageNames = [];
    if (selectedMenuId) {
      Object.keys(parsedMenuData).forEach((key) =>
        Object.keys(parsedMenuData[key].subdetails).forEach((subKey) =>
          Object.keys(parsedMenuData[key].subdetails[subKey]).forEach(
            (mainkey) => {
              if (mainkey === selectedMenuId) {
                damageNames.push(
                  parsedMenuData[key].subdetails[subKey][mainkey].damage1
                );
                damageNames.push(
                  parsedMenuData[key].subdetails[subKey][mainkey].damage2
                );
              }
            }
          )
        )
      );
    }
    setDamageNames(damageNames);
  }, [selectedMenuId]);

  const handleSubmenuChange = (e) => {
    const selectedId = e.target.value;
    // console.log("selectedId", selectedId);
    setSelectedDamage(selectedId);
    const menuDataString = localStorage.getItem("menuData");
    const parsedMenuData = JSON.parse(menuDataString);

    // Check if selectedSubmenu is Table of Content or Summary
    let subdetailkey = "";
    let maindamageid = "";
    let damageid = "";
    // Iterate over the keys of parsedMenuData
    for (const key in parsedMenuData) {
      const menuItem = parsedMenuData[key];
      const subdetails = menuItem.subdetails;
      for (const subKey in subdetails) {
        const subdetail = subdetails[subKey];
        for (const subkey in subdetail) {
          const subKeyData = subdetail[subkey];

          if (subKeyData && subKeyData.damage1 === selectedId) {
            subdetailkey = subkey;
            maindamageid = subKeyData;
            damageid = subKeyData.Damage1Data;
          } else if (subKeyData && subKeyData.damage2 === selectedId) {
            subdetailkey = subkey;
            maindamageid = subKeyData;
            damageid = subKeyData.Damage2Data;
          }
        }
      }
    }
    setDamageId(damageid);
    setTabData(maindamageid);
    setPanelId(subdetailkey);
  };

  const handlePanel = () => {
    if (!panelId) {
      setShowAlert({
        showAlert: true,
        message: "Please select Panal",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      return;
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
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
        <div className="PhotoReview-rectangular-container-main-container">
          <div className="PhotoReview-rectangle">
            <div className="PhotoReview-Location-container">
              <fieldset className=" border-1 border-gray-400 px-[4px] py-[4px]  ">
                <legend className="ml-2 text-[17px]">Location</legend>

                <div>
                  <select
                    id="menuDropdown"
                    className="PhotoReview-Location-first-inputfields"
                    onChange={handleMenuChange}
                  >
                    <option>Select Menu</option>
                    <option>Cover Photo</option>
                    {submenus.map((tabName, index) => (
                      <option key={index} value={tabName}>
                        {tabName}
                      </option>
                    ))}{" "}
                  </select>
                  <br />
                  <label htmlFor="submenuDropdown"></label>

                  <select
                    id="submenuDropdown"
                    className="PhotoReview-Location-first-inputfields"
                    onChange={handleSubmenuChange}
                    disabled={!selectedMenuId}
                  >
                    <option value="">Select Damage</option>

                    {damageNames.map((damage, index) => (
                      <option key={index} value={damage}>
                        {damage}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="damageDropdown"></label>
                  <br />
                </div>
              </fieldset>
              <div className="PhotoReview-Location-button">
                <img
                  src={img7}
                  alt=""
                  onClick={handlePanel}
                  title="Navigate to Panel"
                  className="size-5 "
                />
              </div>
              {/* <div className="PhotoReview-Location-Checkbox-Container">
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
              </div> */}
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
              id={damageId}
              SetImageIndex={SetImageIndex}
              onFileSelect={handleFileSelect}
              onIconPreview={handleIconPreview}
              onSelectedImage={setSelectedImage}
              onDeleteBulk={setUploadedFile}
              subnames={subnames}
              NewTabs={NewTabs}
              selectedText={selectedText}
              imageurl={imageUrl}
              selectedTabName={selectedTabName}
            />
          </div>
        </div>
        <Caption
          id={damageId}
          selectedDamage={selectedDamage}
          selectedTabName={selectedTabName}
          setCap={setCaption}
          caption={caption}
          index={imageIndex}
        />
      </div>

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
