// FooterComponent.js
import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import ApplicationSettingPopup from "./ApplicationSettingPopup/ApplicationSettingPopup";

const Footer = () => {
  const [applicationSettingPopup, setApplicationSettingPopup] = useState(false);
  const openApplicationSettingPopup = () => {
    setApplicationSettingPopup(true);
  };

  const closeApplicationSettingPopup = () => {
    setApplicationSettingPopup(false);
  };
  return (
    <>
      <footer className="footer">
        <div className="left-section">
          {/* <Link to="applicationsetting"> */}
          <button
            onClick={openApplicationSettingPopup}
            className="settings-button"
          >
            Application Settings
          </button>
          {/* </Link> */}
        </div>
        <div className="right-section">
          <form className="connection-form">
            {/* Your form fields go here */}
            <label>
              <input
                className="input-field-for-footer-section"
                type="radio"
                name="connection"
                value="option1"
              />
              Not Connected
            </label>

            {/* Add more radio buttons as needed */}
          </form>
        </div>{" "}
        {applicationSettingPopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <ApplicationSettingPopup onClose={closeApplicationSettingPopup} />
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
