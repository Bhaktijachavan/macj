import React, { useState } from "react";
import "./ApplicationSettingPopup.css";
import uparrow from "../../../Assets/icons/arrow-up.png";
import downarrow from "../../../Assets/icons/down-arrow.png";
const ApplicationSettingPopup = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Controls"); // State to track active tab
  const [count1, setCount1] = useState(0); // State for the first counter
  const [count2, setCount2] = useState(0); // State for the second counter

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to increment the count for the first counter
  const incrementCount1 = () => {
    setCount1(count1 + 1);
  };

  // Function to decrement the count for the first counter
  const decrementCount1 = () => {
    if (count1 > 0) {
      setCount1(count1 - 1);
    }
  };

  // Function to increment the count for the second counter
  const incrementCount2 = () => {
    setCount2(count2 + 1);
  };

  // Function to decrement the count for the second counter
  const decrementCount2 = () => {
    if (count2 > 0) {
      setCount2(count2 - 1);
    }
  };
  return (
    <>
      {/* container for the Application setting for the Macj project button in the footer component */}
      <div className="container-for-the-application-setting-popup-footer">
        {/* width set for the popup */}
        <div className="width-set-for-the-application-setting-popup">
          <div className="close-button-and-application-header-for-popup-box">
            <p>Application Setting</p>
            <p
              className="close-btn-application-setting-popup"
              onClick={onClose}
            >
              X
            </p>
          </div>
          {/* tablist section for the controls and appearance */}
          <div className="tablist-section-for-the-controls-and-appearance">
            {/* Horizontal Tab List */}
            <div className="horizontal-tab-list-application-setting">
              <div
                className={`active-tab-list-application-setting tab-item ${
                  activeTab === "Controls" ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick("Controls")}
              >
                Controls
              </div>
              <div
                className={`active-tab-list-application-setting tab-item ${
                  activeTab === "Appearance" ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick("Appearance")}
              >
                Appearance
              </div>
            </div>

            {/* Content Area */}
            <div className="tab-content-area-application-setting">
              {/* Content for Controls tab */}
              {activeTab === "Controls" && (
                <div className="avtive-tab-content-for-control-section">
                  <div className="main-para-secton-for-the-control-tab">
                    Application Settings apply to all templates and inspections,
                    and are saved automatically upon exit. You may need to
                    restart the Home Inspector Pro application for the changes
                    to take effect
                  </div>
                  <div className="checkbox-container-application-setting">
                    {/* <div className="checkbox-item"> */}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Left-click for multi-select Lists (default is
                        right-click)
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Ctrl+Tab for forward navigation in panel tabs (default
                        is Tab)
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Ctrl+Tab for forward navigation in photo tabs (default
                        is Tab)
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Scroll Panel Tabs instead of Wrapping
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Scroll Photo Tabs instead of Wrapping
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Make narrative searches case-sensitive (default is
                        case-insensitive)
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Enable Icons Overlay
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Enable RecallChek photo feature
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Enable Spelling and Grammar check
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Show Photo Captions on top of Photo Quadrants
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>{" "}
                    <section className="for-the-counter-boxes-and-content">
                      <label className="checkbox-label">
                        Number of quick access icon overlay buttons to show in
                        Photo Panel
                      </label>
                      <div className="count-button-control-section-application">
                        {/* Left section for displaying the count */}
                        <div className="count-section">
                          <span>{count1}</span>
                        </div>

                        {/* Right section with up and down arrows */}
                        <div className="arrow-section-control-section-application">
                          <button
                            className="arrow-button"
                            onClick={incrementCount1}
                          >
                            <i>
                              <img
                                className="fa-fa-chevron-up"
                                src={uparrow}
                                alt=""
                                srcset=""
                              />
                            </i>
                          </button>
                          <button
                            className="arrow-button"
                            onClick={decrementCount1}
                          >
                            <i>
                              <img
                                className="fa-fa-chevron-down"
                                src={downarrow}
                                alt=""
                                srcset=""
                              />
                            </i>
                          </button>
                        </div>
                      </div>
                    </section>{" "}
                    <section className="for-the-counter-boxes-and-content">
                      <label className="checkbox-label">
                        Image Popup Zoom Percentage
                      </label>
                      <div className="count-button-control-section-application">
                        {/* Left section for displaying the count */}
                        <div className="count-section">
                          <span>{count2}</span>
                        </div>

                        {/* Right section with up and down arrows */}
                        <div className="arrow-section-control-section-application">
                          <button
                            className="arrow-button"
                            onClick={incrementCount2}
                          >
                            <i>
                              <img
                                className="fa-fa-chevron-up"
                                src={uparrow}
                                alt=""
                                srcset=""
                              />
                            </i>
                          </button>
                          <button
                            className="arrow-button"
                            onClick={decrementCount2}
                          >
                            <i>
                              <img
                                className="fa-fa-chevron-down"
                                src={downarrow}
                                alt=""
                                srcset=""
                              />
                            </i>
                          </button>
                        </div>
                      </div>
                    </section>
                    <section className="ok-btn-for-the-application-panel">
                      <button className="ok-button-application-setting">
                        OK
                      </button>
                    </section>
                  </div>
                </div>
              )}

              {/* Content for Appearance tab */}
              {activeTab === "Appearance" && (
                <div className="avtive-tab-content-for-Appearance-section">
                  <div className="main-para-secton-for-the-Appearance-tab">
                    All these settings are application specific and are saved
                    automatically. You may need to restart the application for
                    the changes to reflect.
                  </div>
                  <div className="checkbox-container-application-setting">
                    {/* <div className="checkbox-item"> */}
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Use Normal/Serious Damage Font report settings for
                        display
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>
                    <section className="for-the-check-boxes-and-content">
                      <label className="checkbox-label">
                        Enable row spacing in Damage and Selection panels
                        (available on 2k and 4k screens only)
                      </label>
                      <input type="checkbox" className="checkbox-input" />
                    </section>
                    <section className="for-the-check-boxes-and-content-with-color-pallet">
                      <label className="checkbox-label">
                        Narrative search highlight color
                      </label>
                      <input type="color" className="checkbox-input" />
                    </section>
                    <section className="for-the-check-boxes-and-content-with-color-pallet ">
                      <label
                        className="checkbox-label"
                        id="check-box-and-color-palet-inputtt"
                      >
                        Use a specific color for Notes in selection and damage
                        panels
                        <input type="checkbox" className="checkbox-input" />
                      </label>
                      <input type="color" className="checkbox-input" />
                    </section>
                  </div>
                  <div className="radio-buttons-in-fieldset-border-inline-section">
                    <fieldset className="bordered-text">
                      <legend className="tag-for-line-draw-through-text">
                        Display of selected entries in Lists (comment list view)
                      </legend>
                      <div className="contains-all-the-radio-button-text-section">
                        <section className="section-contains-radio-btn-and-text">
                          <input type="radio" name="" id="" />
                          <label htmlFor="">
                            No entries displayed (List title only)
                          </label>
                        </section>{" "}
                        <section className="section-contains-radio-btn-and-text">
                          <input type="radio" name="" id="" />
                          <label htmlFor="">
                            Only count of selected entries displayed
                          </label>
                        </section>{" "}
                        <section className="section-contains-radio-btn-and-text">
                          <input type="radio" name="" id="" />
                          <label htmlFor="">
                            Entry displayed if single selection, count displayed
                            for multiple selections
                          </label>
                        </section>{" "}
                        <section className="section-contains-radio-btn-and-text">
                          <input type="radio" name="" id="" />
                          <label htmlFor="">
                            Entry displayed if single selection,
                          </label>
                        </section>{" "}
                        <section className="section-contains-radio-btn-and-text">
                          <input type="radio" name="" id="" />
                          <label htmlFor="">
                            first selected entry, followed by the count of other
                            selected entries for multiple selections
                          </label>
                        </section>
                      </div>
                    </fieldset>{" "}
                  </div>
                  <section className="ok-btn-for-the-application-panel">
                    <button className="ok-button-application-setting">
                      OK
                    </button>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationSettingPopup;
