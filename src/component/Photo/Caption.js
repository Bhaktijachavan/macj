import React, { useEffect, useState } from "react";
import img7 from "./icons/notes.png";
import img8 from "./icons/down-chevron.png";
import close from "./icons/close_2997911.png";
import "./Caption.css";
import Buttons from "./Buttons";
import Alert from "../Alert/Alert";

const Caption = ({
  setCap,
  caption,
  id,
  index,
  selectedTabName,
  selectedDamage,
}) => {
  const [captionValue, setCaptionValue] = useState(caption);
  const [popupCaptionValue, setPopupCaptionValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [damageValue, setDamageValue] = useState("");

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  // useEffect(() => {
  //   console.log("captionValue", captionValue);
  //   console.log("selectedTabName", selectedTabName);
  //   console.log("selectedDamage", selectedDamage);
  //   console.log("isChecked", isChecked);
  // }, [captionValue, selectedTabName, selectedDamage, isChecked]);

  useEffect(() => {
    if (isChecked && isChecked === true) {
      setCaptionValue(selectedTabName + "," + selectedDamage);
    }
  }, [isChecked]);
  useEffect(() => {
    let damageCaptions = [];
    const damageDataString = localStorage.getItem("DamageData") || "{}";
    const damageData = JSON.parse(damageDataString);

    Object.keys(damageData).forEach((key) => {
      const damageObject = damageData[key];
      if (id === key) {
        const processDamage = (damage) => {
          if (typeof damage === "string") {
            return damage.split("\n").filter((item) => item.trim() !== "");
          } else if (Array.isArray(damage)) {
            return damage.flatMap((d) =>
              d.split("\n").filter((item) => item.trim() !== "")
            );
          }
          return [];
        };

        damageCaptions = damageCaptions.concat(
          processDamage(damageObject.Damage1black)
        );
        damageCaptions = damageCaptions.concat(
          processDamage(damageObject.Damage1red)
        );
      }
    });

    // Debugging output to verify the content of damageCaptions before setting state
    // console.log("Processed damageCaptions:", damageCaptions);

    setDamageValue(damageCaptions);
  }, [id]);
  useEffect(() => {
    setCaptionValue(captionValue);
  }, [captionValue]);

  const handlePopupOpen = () => {
    setPopupCaptionValue(captionValue);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    try {
      let imageData = localStorage.getItem("coverphotoImage");
      if (!imageData) {
        setShowAlert({
          showAlert: true,
          message: "No Image Data Found ",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
        return;
      }

      imageData = JSON.parse(imageData);

      if (!Array.isArray(imageData[id])) {
        setShowAlert({
          showAlert: true,
          message: "No Image found for Provided Id ",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          });
        }, 3000);
        return;
      }

      if (index < 0 || index >= imageData[id].length) {
        setShowAlert({
          showAlert: true,
          message: "Invalid Index ",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          });
        }, 3000);
        return;
      }

      // Update the caption at the specified index
      imageData[id][index].caption = captionValue;
      setCaptionValue(captionValue);

      // Save the updated image data to local storage
      localStorage.setItem("coverphotoImage", JSON.stringify(imageData));
      setShowAlert({
        showAlert: true,
        message: "Caption Updated Successfully",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error updating caption:", error);
    }
  }, [captionValue]);

  // const handleSaveChanges = (newCaption) => {
  //   try {
  //     let imageData = localStorage.getItem("coverphotoImage");
  //     if (!imageData) {
  //       setShowAlert({
  //         showAlert: true,
  //         message: "No Image Data Found ",
  //       });
  //       setTimeout(() => {
  //         setShowAlert({
  //           showAlert: false,
  //           message: "",
  //         }); // Hide the alert after 3 seconds
  //       }, 3000);
  //       return;
  //     }

  //     imageData = JSON.parse(imageData);

  //     if (!Array.isArray(imageData[id])) {
  //       setShowAlert({
  //         showAlert: true,
  //         message: "No Image found for Provided Id ",
  //       });
  //       setTimeout(() => {
  //         setShowAlert({
  //           showAlert: false,
  //           message: "",
  //         });
  //       }, 3000);
  //       return;
  //     }

  //     if (index < 0 || index >= imageData[id].length) {
  //       setShowAlert({
  //         showAlert: true,
  //         message: "Invalid Index ",
  //       });
  //       setTimeout(() => {
  //         setShowAlert({
  //           showAlert: false,
  //           message: "",
  //         });
  //       }, 3000);
  //       return;
  //     }

  //     // Update the caption at the specified index
  //     imageData[id][index].caption = captionValue;
  //     setCaptionValue(captionValue);

  //     // Save the updated image data to local storage
  //     localStorage.setItem("coverphotoImage", JSON.stringify(imageData));
  //     setShowAlert({
  //       showAlert: true,
  //       message: "Caption Updated Successfully",
  //     });
  //     setTimeout(() => {
  //       setShowAlert({
  //         showAlert: false,
  //         message: "",
  //       }); // Hide the alert after 3 seconds
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error updating caption:", error);
  //   }
  // };

  const handleDiscardChanges = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setCaptionValue(e.target.value);
  };

  // const handlePopupInputChange = (e) => {
  //   setPopupCaptionValue(e.target.value);
  // };
  const handleCaptionSelect = (event) => {
    const redblack = event.target.value;
    setCaptionValue(redblack);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
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
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="agree"
            className="PhotoReview-Location-Checkbox-label"
          >
            Use Location As Caption
          </label>
        </section>
      </div>
      <fieldset className="bordered-text-caption ">
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
        {/* <legend className="tag-for-line-draw-through-text">Caption</legend> */}

        <div className="caption-main-input-field-container">
          <div className="flex">
            <div>
              <img
                src={img8}
                alt=""
                title="Edit caption"
                className="Caption-image-toopen-popupbox"
                onClick={toggleDropdown}
              />
            </div>
            <div className="relative">
              <div>
                <input
                  className="Caption-main-input-filed"
                  value={captionValue}
                  placeholder="Caption:  "
                  title="Add Caption"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {isDropdownVisible && (
                  <div>
                    <select
                      className="w-[670px]"
                      onChange={handleCaptionSelect}
                    >
                      {Array.isArray(damageValue) &&
                        damageValue.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <img
              src={img7}
              alt=""
              title="Edit caption"
              className="Caption-image-toopen-popupbox"
              onClick={handlePopupOpen}
            />
          </div>
        </div>
      </fieldset>

      {isPopupOpen && (
        <div className="Caption-main-popup-container">
          <div className="caption-popup-caption-editor-container">
            <label className="caption-popup-caption-editor">
              Caption Editor
            </label>
            <div className="caption-popup-close-image-container">
              <p
                className="caption-popup-close-image"
                onClick={handleClosePopup}
              >
                X
              </p>
            </div>
          </div>

          <br />

          <textarea
            className="caption-popupbox-input-filed"
            value={captionValue}
            onChange={handleInputChange}
          />
          <br />
          <div className="caption-popupbox-buttons-main-container">
            <div className="caption-popupbox-Buttons">
              {/* <button
                className="caption-popupbox-btns"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button> */}
            </div>
            <div className="caption-popupbox-Buttons">
              <button
                className="caption-popupbox-btns"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Caption;
