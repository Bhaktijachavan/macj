// FooterComponent.js
import React, { useState , useEffect } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import ApplicationSettingPopup from "./ApplicationSettingPopup/ApplicationSettingPopup";

const Footer = () => {
  const [applicationSettingPopup, setApplicationSettingPopup] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userdata = localStorage.getItem("User");
    if (userdata) {
      setUser(JSON.parse(userdata));
    }

  },[])
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
        {user ? (
  <>
    <p className="connected-text">Connected</p>
    <p className="connected-user-name">{user.name}</p>
  </>
) : (
  <p className="connected-text">Not Connected</p>
)}

       
        </div>
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
