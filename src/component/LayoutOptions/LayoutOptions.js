// Importing necessary dependencies
import React, { useState } from "react";
import "./LayoutOptions.css"; // Importing the stylesheet
import { flatMap } from "lodash"; // Importing the flatMap function from lodash

// Functional component definition
const LayoutOptions = ({ onClose }) => {
    // State variables for tracking the active tab and various input values
    const [activeTab, setActiveTab] = useState("Layout");
    const [selectValue, setselectValue] = useState('');
    const [selectValue1, setselectValue1] = useState('');
    const [selectValue2, setselectValue2] = useState('');
    const [selectValue3, setselectValue3] = useState('');
    const [selectValue4, setselectValue4] = useState('');
    const [selectValue5, setselectValue5] = useState('');
    const [selectValue6, setselectValue6] = useState('');
    const [inputValue, setInputValue] = useState('Report Summary');
    const [inputValue1, setInputValue1] = useState('Property Inspection Report');
    const [inputValue2, setInputValue2] = useState('Table Of Contents');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkboxValues, setCheckboxValues] = useState({
        printItemDescription: false,
        indentItemDescription: false,
        showRatings: false,
        printItemNoComments: false,
        printItemNumLetters: false,
        addBlankLine: false,
        splitItems: false,
        reportPageContinuously: false,
        addContinuedendSectionFirstPage: false,
        romanNumerals: false,
        insteadNumber: false,
        texasFromat: false,
        printSummaryPage: false,
        printCompanyName: false,
        printClientAddress: false,
        printBorderlessSummary: false,
    });

    // Event handler for input changes
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    };

    // Event handler for checkbox changes
    const handleCheckboxChange = (checkboxName) => {
        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [checkboxName]: !prevValues[checkboxName],
        }));
    };

    // Event handler for tab clicks
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    // Event handler for select changes
    const handleSelectChange = (event) => {
        setselectValue(event.target.value);
    };
    const handleSelectChange1 = (event) => {
        setselectValue1(event.target.value);
    };
    const handleSelectChange2 = (event) => {
        setselectValue2(event.target.value);
    };
    const handleSelectChange3 = (event) => {
        setselectValue3(event.target.value);
    };
    const handleSelectChange4 = (event) => {
        setselectValue4(event.target.value);
    };
    const handleSelectChange5 = (event) => {
        setselectValue5(event.target.value);
    };
    const handleSelectChange6 = (event) => {
        setselectValue6(event.target.value);
    };

    // Event handler for a specific checkbox
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
                                <div className="layoutoptions-layout">
                                    <div className="layoutoptions-itemoptions-para">
                                        <h3>All these settings specific. Make sure to save your current template so that the changes will ne reflected the next time you open it.</h3>
                                    </div>
                                    <div className="layoutoptions-layout-text-chechbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.reportPageContinuously}
                                                onChange={() => handleCheckboxChange('reportPageContinuously')}
                                            />
                                            Print report pages continuously. Do not give each section its own page
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.addContinuedendSectionFirstPage}
                                                onChange={() => handleCheckboxChange('addContinuedendSectionFirstPage')}
                                            />
                                            Add "Continued" to the end of the section name after the first page
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.romanNumerals}
                                                onChange={() => handleCheckboxChange('romanNumerals')}
                                            />
                                            Use roman numerals instead of intergers for labeling area(requried for texas)
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.insteadNumber}
                                                onChange={() => handleCheckboxChange('insteadNumber')}
                                            />
                                            Use letters instead of numbers when listing items within an areas(required for texas)
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.texasFromat}
                                                onChange={() => handleCheckboxChange('texasFromat')}
                                            />
                                            Use the texas format cover page
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printSummaryPage}
                                                onChange={() => handleCheckboxChange('printSummaryPage')}
                                            />
                                            Print summary page at the end of the report(required in texas)
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printCompanyName}
                                                onChange={() => handleCheckboxChange('printCompanyName')}
                                            />
                                            Print the company name on the cover page
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printClientAddress}
                                                onChange={() => handleCheckboxChange('printClientAddress')}
                                            />
                                            Print the client address on every page
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printClientAddress}
                                                onChange={() => handleCheckboxChange('printClientAddress')}
                                            />
                                            Enable custom cover layouts on reports
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.printBorderlessSummary}
                                                onChange={() => handleCheckboxChange('printBorderlessSummary')}
                                            />
                                            Print borderless summary
                                        </label><br /><br />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkboxValues.pageNumber}
                                                onChange={() => handleCheckboxChange('pageNumber')}
                                            />
                                            Start page Number on the Cover Page
                                        </label>
                                    </div>
                                    <div className="layoutoptions-layout-text2-input">
                                        <div className="layoutoptions-layout-text2-inputfileds">
                                            <div className="layoutoptions-layout-text2">
                                                <p>Summary Page and item format</p>
                                            </div>
                                            <div className="layoutoptions-layout-inputfileds">
                                                <select
                                                    id="dropdown"
                                                    value={selectValue5}
                                                    onChange={handleSelectChange5}
                                                    className="layoutoptions-layout-btn-dropwon">
                                                    <option value="option1">Page and item in separate columns</option>
                                                    <option value="option2">Page and item listed vertically in one column</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="layoutoptions-layout-text2-inputfileds">
                                            <div className="layoutoptions-layout-text2">
                                                <p>Summary Page Title:</p>
                                            </div>
                                            <div className="layoutoptions-layout-inputfileds">
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={handleInputChange}
                                                    className="layoutoptions-layout-btn-dropwon"
                                                />
                                            </div>
                                        </div>
                                        <div className="layoutoptions-layout-text2-inputfileds">
                                            <div className="layoutoptions-layout-text2">
                                                <p>Cover Page Title:</p>
                                            </div>
                                            <div className="layoutoptions-layout-inputfileds">
                                                <input
                                                    type="text"
                                                    value={inputValue1}
                                                    onChange={handleInputChange1}
                                                    className="layoutoptions-layout-btn-dropwon"
                                                />
                                            </div>
                                        </div>
                                        <div className="layoutoptions-layout-text2-inputfileds">
                                            <div className="layoutoptions-layout-text2">
                                                <p>Header & Footer</p>
                                            </div>
                                            <div className="layoutoptions-layout-inputfileds">
                                                <select
                                                    id="dropdown"
                                                    value={selectValue6}
                                                    onChange={handleSelectChange6}
                                                    className="layoutoptions-layout-btn-dropwon">
                                                    <option value="option1">Top: Comapny Name/Client Address, Bottom:Empty</option>
                                                    <option value="option2">Top: Client Name/Job Address,Bottom Company Name/Inspector</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="layoutoptions-layout-text2-inputfileds">
                                            <div className="layoutoptions-layout-text2">
                                                <p>Table Of Contents Title:</p>
                                            </div>
                                            <div className="layoutoptions-layout-inputfileds">
                                                <input
                                                    type="text"
                                                    value={inputValue2}
                                                    onChange={handleInputChange2}
                                                    className="layoutoptions-layout-btn-dropwon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="layoutoptions-itemoptions-okbtn">
                                        <button className="layoutoptions-itemoptions-btn-ok">Ok</button>
                                    </div>
                                </div>
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
                                                    <div className="Loptions-Auto-save-dropsdown">
                                                        <select
                                                            id="dropdown"
                                                            value={selectValue1}
                                                            onChange={handleSelectChange1}
                                                            className="layoutoptions-itemoptions-btn-dropwon">
                                                            <option value="option1">Bullet</option>
                                                            <option value="option2">Comma</option>
                                                            <option value="option3">Period</option>
                                                            <option value="option4">New Line</option>
                                                            <option value="option5">New Line & Bullet </option>
                                                            <option value="option6">New & Blank Line</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="layoutoptions-itemoptions-btn-reset-col">
                                                    <button className="layoutoptions-itemoptions-btn-reset">Reset Selection Panels</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="layoutoptions-itemoptions-text1-btn-col">
                                            <div className="layoutoptions-itemoptions-text1-col">
                                                <p>The default damage panel item separator(used when creating a new damage panel):</p>
                                            </div>
                                            <div className="layoutoptions-itemoptions-btn-col">
                                                <div className="layoutoptions-itemoptions-btn-dropwon-col">
                                                    <div className="Loptions-Auto-save-dropsdown">
                                                        <select
                                                            id="dropdown"
                                                            value={selectValue2}
                                                            onChange={handleSelectChange2}
                                                            className="layoutoptions-itemoptions-btn-dropwon">
                                                            <option value="option1">Bullet</option>
                                                            <option value="option2">Comma</option>
                                                            <option value="option3">Period</option>
                                                            <option value="option4">New Line</option>
                                                            <option value="option5">New Line & Bullet </option>
                                                            <option value="option6">New & Blank Line</option>
                                                            <option value="option6">Numbering</option>
                                                            <option value="option6">New Line & Numbering</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="layoutoptions-itemoptions-btn-reset-col">
                                                    <button className="layoutoptions-itemoptions-btn-reset">Reset Damage Panels</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="layoutoptions-itemoptions-text1-btn-col">
                                            <div className="layoutoptions-itemoptions-text1-col">
                                                <p>The default number of column narratives displayed in a new selection panel:
                                                </p>
                                            </div>
                                            <div className="layoutoptions-itemoptions-btn-col">
                                                <div className="layoutoptions-itemoptions-btn-dropwon-col">
                                                    <div className="Loptions-Auto-save-dropsdown">
                                                        <select
                                                            id="dropdown"
                                                            value={selectValue3}
                                                            onChange={handleSelectChange3}
                                                            className="layoutoptions-itemoptions-btn-dropwon">
                                                            <option value="option1">Auto Adjust</option>
                                                            <option value="option2">1</option>
                                                            <option value="option3">2</option>
                                                            <option value="option4">3</option>
                                                            <option value="option5">4 </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="layoutoptions-itemoptions-btn-reset-col">
                                                    <button className="layoutoptions-itemoptions-btn-reset">Reset Selection Panels</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="layoutoptions-itemoptions-text1-btn-col">
                                            <div className="layoutoptions-itemoptions-text1-col">
                                                <p>The default number of column narratives displayed in a new damage panel:
                                                </p>
                                            </div>
                                            <div className="layoutoptions-itemoptions-btn-col">
                                                <div className="layoutoptions-itemoptions-btn-dropwon-col">
                                                    <div className="Loptions-Auto-save-dropsdown">
                                                        <select
                                                            id="dropdown"
                                                            value={selectValue4}
                                                            onChange={handleSelectChange4}
                                                            className="layoutoptions-itemoptions-btn-dropwon">
                                                            <option value="option1">1</option>
                                                            <option value="option2">2</option>
                                                            <option value="option3">3</option>
                                                            <option value="option4">4</option>                                                    </select>
                                                    </div>
                                                </div>
                                                <div className="layoutoptions-itemoptions-btn-reset-col">
                                                    <button className="layoutoptions-itemoptions-btn-reset">Reset Damage Panels</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="layoutoptions-itemoptions-okbtn">
                                        <button className="layoutoptions-itemoptions-btn-ok">Ok</button>
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
                                            <option value="option3">20 Minutes</option>
                                            <option value="option4">10 Minutes</option>
                                            <option value="option5">Hourly</option>
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