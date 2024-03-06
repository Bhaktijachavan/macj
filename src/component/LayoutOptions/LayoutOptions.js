import React, { useState } from "react";
import "./LayoutOptions.css"
const LayoutOptions = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("Layout"); // State to track active tab
    const [selectValue, setselectValue] = useState('');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const handleSelectChange = (event) => {
        setselectValue(event.target.value);
    };
    return (
        <>
            {/* container for the Application setting for the Macj project button in the footer component */}
            <div className="container-for-the-layout-option-popup-footer">
                {/* width set for the popup */}
                <div className="width-set-for-the-option-popup-popup">
                    <div className="close-button-and-option-popup-header-for-popup-box">
                        <p>Layout Options</p>
                        <p
                            className="close-btn-option-popup-popup"
                            onClick={onClose}
                        >
                            X
                        </p>
                    </div>
                    <div className="tablist-section-for-the-controls-and-appearance">
                        {/* Horizontal Tab List */}
                        <div className="horizontal-tab-list-option-popup">
                            <div
                                className={`active-tab-list-option-popup tab-item ${activeTab === "Layout" ? "active-tab" : ""
                                    }`}
                                onClick={() => handleTabClick("Layout")}
                            >
                                Layout
                            </div>
                            <div
                                className={`active-tab-list-option-popup tab-item ${activeTab === "Item Options" ? "active-tab" : ""
                                    }`}
                                onClick={() => handleTabClick("Item Options")}
                            >
                                Item Options
                            </div>
                            <div
                                className={`active-tab-list-option-popup tab-item ${activeTab === "Security" ? "active-tab" : ""
                                    }`}
                                onClick={() => handleTabClick("Security")}
                            >
                                Security
                            </div>
                            <div
                                className={`active-tab-list-option-popup tab-item ${activeTab === "Auto Save" ? "active-tab" : ""
                                    }`}
                                onClick={() => handleTabClick("Auto Save")}
                            >
                                Auto Save
                            </div>
                        </div>
                        <div className="tab-content-area-option-popup">
                            {/* Content for Controls tab */}
                            {activeTab === "Layout" && (
                                <h1>Layout</h1>
                            )}
                            {activeTab === "Item Options" && (
                                <h1>Item Options</h1>
                            )}
                            {activeTab === "Security" && (
                                <h1>Security</h1>
                            )}
                            {activeTab === "Auto Save" && (
                                <div className="Loptions-Auto-save">
                                    <div className="Loptions-Auto-save-para">
                                        <p>How often do you want the uto save feature to pop open and save the inspection?</p>
                                    </div>
                                    <div className="Loptions-Auto-save-dropsdown">
                                        <select
                                            id="dropdown"
                                            value={selectValue}
                                            onChange={handleSelectChange}
                                            className="Loptions-Auto-save-dropsdown-select">
                                            <option value="option1">Disable</option>
                                            <option value="option2">10 Minutes</option>
                                            <option value="option2">20 Minutes</option>
                                            <option value="option2">10 Minutes</option>
                                            <option value="option2">Hourly</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LayoutOptions;