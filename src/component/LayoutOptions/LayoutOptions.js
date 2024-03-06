import React, { useState } from "react";
import "./LayoutOptions.css"
const LayoutOptions = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("Layout"); // State to track active tab
    const [selectValue, setselectValue] = useState('');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkboxValues, setCheckboxValues] = useState({
        printItemDescription: false,
        indentItemDescription: false,
        showRatings: false,
        printItemNoComments: false,
        printItemNumLetters: false,
        addBlankLine: false,
        splitItems: false,
    });
    const handleCheckboxChange = (checkboxName) => {
        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [checkboxName]: !prevValues[checkboxName],
        }));
    };
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const handleSelectChange = (event) => {
        setselectValue(event.target.value);
    };
    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
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
                                <div className="layoutoptions-itemoptions">
                                    <div className="layoutoptions-itemoptions-para">
                                        <h3>All these settings specific. Make sure to save your current template so that the changes will ne reflected the next time you open it.</h3>
                                    </div>
                                    <div className="layoutoptions-itemoptions-text">
                                        <br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printItemDescription}
                                                onChange={() => handleCheckboxChange('printItemDescription')}
                                            />
                                            Print item description (i.e Comments, Materials) even if no items are selected
                                        </label>
                                        <br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.indentItemDescription}
                                                onChange={() => handleCheckboxChange('indentItemDescription')}
                                            />
                                            Indent item description to line up with comments only show ratings at the top of each section (required in Texas)
                                        </label>
                                        <br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printItemNoComments}
                                                onChange={() => handleCheckboxChange('printItemNoComments')}
                                            />
                                            Print item even if there are no comments selected
                                        </label>
                                        <br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printItemNumLetters}
                                                onChange={() => handleCheckboxChange('printItemNumLetters')}
                                            />
                                            Print item number of letters
                                        </label>
                                        <br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.addBlankLine}
                                                onChange={() => handleCheckboxChange('addBlankLine')}
                                            />
                                            Add a blank line between Selection Panels and Minor/Major Damage Panel narratives
                                        </label>
                                        <br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.splitItems}
                                                onChange={() => handleCheckboxChange('splitItems')}
                                            />
                                            Split single items (within a section) across multiple pages
                                        </label>
                                    </div>
                                    <div className="layoutoptions-itemoptions-text1-btn">
                                        <div className="layoutoptions-itemoptions-text1-btn-col">
                                            <div className="layoutoptions-itemoptions-text1-col">
                                                <p>The default selection panel item separator(used when creating a new selection panel):</p>
                                            </div>
                                            <div className="layoutoptions-itemoptions-btn-col">     
                                                <div className="layoutoptions-itemoptions-btn-dropwon-col">
                                                    <input type="dropdown"/>
                                                </div>  
                                                <div className="layoutoptions-itemoptions-btn-reset-col">
                                                    <button>Reset Selection Panels</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "Security" && (
                                <div className="layoutoptions-security">
                                    <div className="layoutoptions-security-para">
                                        <p>This section affects the security of the PDF report It is highly recommended that you leave encryption on to clients cannot
                                            make changes to the PDF without hacking it. This process of hacking a PDF is arguably ilegal due to the DCMA and other laws and as such provides an extra layer
                                            of security. Whether it's illegal for your clients would depend on the country you in add any loacl laws. This option is not changeable when using the Demo mode of the program. </p>
                                    </div>
                                    <div className="layoutoptions-security-text">
                                        <h2>Leave PDF encryption on so that the PDF can not edited:
                                            <input
                                                type="checkbox"
                                                checked={checkbox1}
                                                onChange={handleCheckbox1Change}
                                            />
                                        </h2>
                                    </div>
                                </div>
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