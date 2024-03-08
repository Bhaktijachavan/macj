import React, { useState } from "react";
import "./Ratings.css"; // Corrected the import statement for CSS
import img1 from "../../Assets/icons/folder.png";
const Ratings = ({ onClose }) => {
  //state to track the active `
  const [activeTab, setActiveTab] = useState("Ratings");
  // State variables to track the checked state of each checkbox
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueMark, setSelectedValueMark] = useState("");
  const [selectedValueOption, setSelectedValueOption] = useState("");
  // Separate state variables for the input fields
  const [ratingName1, setRatingName1] = useState("Acceptable");
  const [ratingName2, setRatingName2] = useState("Monitor");
  const [ratingName3, setRatingName3] = useState("Safety");
  const [ratingName4, setRatingName4] = useState("Repair/Replace");
  const [ratingName5, setRatingName5] = useState("Access Restricted");
  //handler funcation to update the rating name state base on the ratingNumber
  const handleChange = (e, ratingNumber) => {
    // Update the respective rating name state based on ratingNumber
    switch (ratingNumber) {
      case 1:
        setRatingName1(e.target.value);
        break;
      case 2:
        setRatingName2(e.target.value);
        break;
      case 3:
        setRatingName3(e.target.value);
        break;
      case 4:
        setRatingName4(e.target.value);
        break;
      case 5:
        setRatingName5(e.target.value);
        break;
      default:
        break;
    }
  };
  //hander funcation to update the state when a chechbox is clicked
  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setCheckbox3(!checkbox3);
    } else if (checkboxNumber === 2) {
      setCheckbox4(!checkbox4);
    }
  };
  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSelectChangeMark = (eventmark) => {
    setSelectedValueMark(eventmark.target.value);
  };
  const handleSelectChangeOptions = (evenoptions) => {
    setSelectedValueOption(evenoptions.target.value);
  };
  //hander funcation to update the active tab
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
  const handleDone = () => {
    // Create an object to store the rating names
    const ratingsData = {
      ratingName1,
      ratingName2,
      ratingName3,
      ratingName4,
      ratingName5,
    };

    // Convert the object to a JSON string and store it in localStorage
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
    alert("the data has been saved " , JSON.stringify(ratingsData))
  };

  return (
    <div className="container-for-the-ratings">
      <div className="width-set-for-the-ratings">
        <div className="close-button-and-ratings-header-for-popup-box">
          <p>Rating</p>
          <p className="close-btn-ratings" onClick={onClose}>
            X
          </p>
        </div>
        <div className="tablist-section-for-the-Ratings-and-RatingsOptions">
          <div className="horizontal-tab-list-ratings">
            {/*Tab for Ratinngs */}
            <div
              className={`active-tab-list-ratings tab-item ${
                activeTab === "Ratings" ? "active-tab" : ""
              }`}
              onClick={() => handleTabClick("Ratings")}
            >
              Ratings
            </div>
            {/*Tab for Ratinngs Options*/}
            <div
              className={`active-tab-list-ratings tab-item ${
                activeTab === "RatingsOptions" ? "active-tab" : ""
              }`}
              onClick={() => handleTabClick("RatingsOptions")}
            >
              Ratings Options
            </div>
          </div>
          {/*content area for ratings and ratings options */}
          <div className="tab-content-area-ratings">
            {activeTab === "Ratings" && (
              <div className="main-conat-ratings">
                <div className="text-ratings">
                  <p>
                    Specify the Ratings to appear to the left of each item in
                    the report. To change a Rating Name, double-click on the
                    Rating Name, type in the new name, then click on another
                    entry.
                  </p>
                  <br />
                  <p>
                    Ratings should be limited to limited to 5-6 characters to
                    fit in available space on the report
                  </p>
                  <br />
                  <p>
                    Rating Icons may be selected to use in place of the Ratings
                    Name on the reports. If using the Ratings icons, an icon
                    must be specified for each Rating to be used in the report
                    Rating Icon images must be a valid image file (gif, png, or
                    jpg) and a maximum of 64 pixels high or wide
                  </p>
                  <br />
                  <p>
                    Include Ratings in the Report
                    <input
                      type="checkbox"
                      checked={checkbox1}
                      onChange={handleCheckbox1Change}
                    />
                  </p>
                  <br />
                  <p>
                    Use Rating Icons Instead of Rating Name(all icons must be
                    seleted frist)
                    <input
                      type="checkbox"
                      checked={checkbox2}
                      onChange={handleCheckbox2Change}
                    />
                  </p>
                </div>
                <div className="ranting-box">
                  {/* Input fields for rating names and corresponding icons */}
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
                        id="ratingInput1"
                        value={ratingName1}
                        onChange={(e) => handleChange(e, 1)}
                      />
                    </div>
                    <div className="icon-rating">
                      <img
                        src={img1}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                  <div className="name-icon-box-rating">
                    <div className="name-rating">
                      <input
                        type="text"
                        id="ratingInput2"
                        value={ratingName2}
                        onChange={(e) => handleChange(e, 2)}
                      />
                    </div>
                    <div className="icon-rating">
                      <img
                        src={img1}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                  <div className="name-icon-box-rating">
                    <div className="name-rating">
                      <input
                        type="text"
                        id="ratingInput3"
                        value={ratingName3}
                        onChange={(e) => handleChange(e, 3)}
                      />
                    </div>
                    <div className="icon-rating">
                      <img
                        src={img1}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                  <div className="name-icon-box-rating">
                    <div className="name-rating">
                      <input
                        type="text"
                        id="ratingInput4"
                        value={ratingName4}
                        onChange={(e) => handleChange(e, 4)}
                      />
                    </div>
                    <div className="icon-rating">
                      <img
                        src={img1}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                  <div className="name-icon-box-rating">
                    <div className="name-rating">
                      <input
                        type="text"
                        id="ratingInput5"
                        value={ratingName5}
                        onChange={(e) => handleChange(e, 5)}
                      />
                    </div>
                    <div className="icon-rating">
                      <img
                        src={img1}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                </div>
                {/* Button to complete Ratings configuration */}
                <div className="Ratings-done-btn">
                  <button className="rating-done-btn" onClick={handleDone}>Done</button>
                </div>
              </div>
            )}
            {activeTab === "RatingsOptions" && (
              <div className="ratingoptions">
                {/*rating mark option section*/}
                <div className="Rating-mark-options">
                  <h1 className="Rating-mark-options-Title">
                    Rating Mark Options
                  </h1>
                  <div className="Rating-mark-options-text-boxes">
                    <div className="rating-mark-options-text">
                      <p>
                        <br />
                        Number of Pixels (spacing) Between Rating Boxes:
                      </p>
                      <br />
                      <p>Color of the Rating Boxes:</p>
                      <br />
                      <p>Type of the Rating Mark:</p>
                      <br />
                    </div>
                    <div className="rating-mark-options-boxes">
                      <div className="rating-mark-options-text-dropdown">
                        <select
                          id="dropdown"
                          value={selectedValue}
                          onChange={handleSelectChange}
                          className="rating-mark-options-text-dropdown1"
                        >
                          <option value="option1">1</option>
                          <option value="option2">2</option>
                          <option value="option3">3</option>
                          <option value="option4">4</option>
                        </select>
                      </div>
                      <div className="rating-mark-options-boxes-color">
                        <input type="color" className="checkbox-input1" />
                      </div>
                      <div className="rating-mark-options-text-dropdown">
                        <select
                          id="dropdown"
                          value={selectedValueMark}
                          onChange={handleSelectChangeMark}
                          className="rating-mark-options-text-dropdown2"
                        >
                          <select
                            id="dropdown"
                            value={selectedValueMark}
                            onChange={handleSelectChangeMark}
                            className="rating-mark-options-text-dropdown2"
                          >
                            <option value="option1">X</option>
                            <option value="option1">X</option>
                            <option value="option1">X</option>
                            <option value="option2">✓</option>
                            <option value="option2">✓</option>
                            <option value="option1">X</option>
                            <option value="option1">X</option>
                            <option value="option2">✓</option>
                            {/* <option value="option3">➜</option> */}
                          </select>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Rating-mark-options">
                  <h1 className="Rating-mark-options-Title">
                    Rating Icon Options
                  </h1>
                  <div className="Rating-mark-options-text-boxes">
                    <div className="rating-mark-options-text">
                      <p>
                        <br />
                        Print Bigger Icon (only works when a single rting is
                        selected in all sections):{" "}
                      </p>
                      <br />
                      <p>
                        Print Icons in Report Summary (only work when a single
                        rating is selectedd in all selection):{" "}
                      </p>
                      <br />
                      <p>
                        indent item description to line up with comments and
                        only show ratings icons at the top of each section:{" "}
                      </p>
                      <br />
                    </div>
                    <div className="rating-mark-options-boxes">
                      <div className="rating-mark-options-text-dropdown">
                        <select
                          id="dropdown"
                          value={selectedValueOption}
                          onChange={handleSelectChangeOptions}
                          className="rating-mark-options-text-dropdown1"
                        >
                          <option value="option1">No</option>
                          <option value="option2">1.25x</option>
                          <option value="option3">1.5x</option>
                          <option value="option4">1.75x</option>
                          <option value="option4">2x</option>
                        </select>
                      </div>
                      <div className="Rating-mark-options-checkbox3">
                        <input
                          type="checkbox"
                          checked={checkbox3}
                          onChange={() => handleCheckboxChange(1)}
                        />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={checkbox4}
                          onChange={() => handleCheckboxChange(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Ratings-done-btn">
                  <button className="rating-done-btn">Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ratings;
