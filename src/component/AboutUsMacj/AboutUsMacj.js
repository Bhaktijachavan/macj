import React from "react";
import "./AboutUsMacj.css";
const AboutUsMacj = ({ onClose }) => {
  return (
    <>
      <div className="container-for-the-about-us-macj-project">
        <div className="width-set-for-the-about-us-macj-page">
          <div className="close-button-and-login-header-for-popup-box-about-us">
            <p>About Us</p>
            <p className="close-btn-about-us-popup" onClick={onClose}>
              X
            </p>
          </div>{" "}
          <div className="all-the-content-with-the-text-container">
            <div className="first-section-of-the-info-text">
              <p>MacJ Pro V6.3.8</p>
              <p>Copyright (c) 2023-24 MacJ Pro</p>
              <p>Website: http://www.macj.com</p>
            </div>{" "}
            <div className="second-section-of-the-info-text">
              <p>
                Thanks for the libraries which were used to make this program.
              </p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
              <p>@ Sketch icon - Icon made by Freepik from www.flaticon.com</p>
            </div>
            <div className="cover-page-Stationery-remove flex justify-center">
            <button className="adding-Stationery-btn " onClick={onClose} >Ok</button>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsMacj;
