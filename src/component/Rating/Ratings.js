import React, { useState } from "react";
import "./Ratings.css"; // Corrected the import statement for CSS
import img1 from "../../Assets/icons/folder.png";

const Ratings = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("Ratings");
    // State variables to track the checked state of each checkbox
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [inputValue, setInputValue] = useState('Good');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    // Event handlers to update the state when a checkbox is clicked
    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
    };

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
    };

    return (
        <div className="container-for-the-ratings">
            <div className="width-set-for-the-ratings">
                <div className="close-button-and-ratings-header-for-popup-box">
                    <p>Application Setting</p>
                    <p className="close-btn-ratings" onClick={onClose}>
                        X
                    </p>
                </div>
                <div className="tablist-section-for-the-Ratings-and-RatingsOptions">
                    <div className="horizontal-tab-list-ratings">
                        <div
                            className={`active-tab-list-ratings tab-item ${activeTab === "Ratings" ? "active-tab" : ""
                                }`}
                            onClick={() => handleTabClick("Ratings")}
                        >
                            Ratings
                        </div>
                        <div
                            className={`active-tab-list-ratings tab-item ${activeTab === "RatingsOptions" ? "active-tab" : ""
                                }`}
                            onClick={() => handleTabClick("RatingsOptions")}
                        >
                            Ratings Options
                        </div>
                    </div>

                    <div className="tab-content-area-ratings">
                        {activeTab === "Ratings" && (
                            <div className="main-conat-ratings">
                                <div className="text-ratings">
                                    <p>Specify the Ratings to appear to the left of each item in the report. To change a Rating Name, double-click on the Rating Name, type in the new name, then click on another entry.</p><br />
                                    <p>Ratings should be limited to limited to 5-6 characters to fit in available space on the report</p><br />
                                    <p>Rating Icons may be selected to use in place of the Ratings Name on the reports. If using the Ratings icons, an icon must be specified for each Rating to be used in the report Rating Icon images must be a valid image file (gif, png, or jpg) and a maximum of 64 pixels high or wide</p><br />
                                    <p>Include Ratings in the Report
                                        <input
                                            type="checkbox"
                                            checked={checkbox1}
                                            onChange={handleCheckbox1Change}
                                        />
                                    </p><br />
                                    <p>Use Rating Icons Instead of Rating Name(all icons must be seleted frist)
                                        <input
                                            type="checkbox"
                                            checked={checkbox2}
                                            onChange={handleCheckbox2Change}
                                        />
                                    </p>
                                </div>
                                <div className="ranting-box">
                                    <div className="name-icon-box-rating">
                                        <div className="name-rating">
                                            <h2>Rating Name (Double click to edit)</h2>
                                        </div>
                                        <div className="icon-rating">
                                            <h2>Rating Icon (Click to select/changes)</h2>
                                        </div>
                                    </div>
                                    <div className="name-icon-box-rating">
                                        <div className="name-rating">
                                            <input
                                                type="text"
                                                id="helloInput"
                                                value={inputValue}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="icon-rating">
                                        <img src={img1} alt="" style={{ width: 30, height: 30 }}/>
                                        </div>
                                    </div>
                                    <div className="name-icon-box-rating">
                                    <div className="name-rating">
                                        <input
                                            type="text"
                                            id="helloInput"
                                            value={inputValue}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="icon-rating">
                                    <img src={img1} alt="" style={{ width: 30, height: 30 }}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "RatingsOptions" && (
                            <div>
                                hi2

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ratings;
