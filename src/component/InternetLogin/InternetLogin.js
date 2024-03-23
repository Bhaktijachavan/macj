import React, { useState } from "react";
import "./InternetLogin.css";
import axios from "axios";

const InternetLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(true);

  const handleLogin = async () => {
    console.log("Login button clicked!");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        "https://macj-backend.onrender.com/api/user/login",
        {
          username,
          password,
        }
      );

      alert("Login successful!");
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setPopupOpen(false);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        console.error("Login Error:", errorMessage);
        // Show alert with error message
        window.alert(errorMessage);
      } else {
        console.error("Login Error:", error.message);
        // Show alert for network or other errors
        window.alert(
          "Network or server error occurred. Please try again later."
        );
      }
    }
  };

  const handleClose = () => {
    // Close the popup when the close button (X sign) is clicked
    setPopupOpen(false);
    console.log("Close button clicked!");
  };
  // If the popup is not open, return null to render nothing
  if (!isPopupOpen) {
    return null;
  }

  return (
    <div className="popup-container-internetlogin z-50">
      <div className="popup-internetlogin">
        <div className="close-button-and-login-header-for-popup-box">
          <p>Macj Login</p>
          <p className="close-btn-internetlogin" onClick={handleClose}>
            X
          </p>
        </div>
        <div className="popup-border-internetlogin">
          <p className="p-internetlogin">
            Enter your Home Inspector Pro Cloud Service user name and password,
            This is the same as your homeinspectorpro.com username and password.
          </p>
          <br />
          <p className="p-internetlogin1">
            If you do not already have a Cloud Service account, you can sign up
            for a monthly or annual cloud service plan on the Home Inspector Pro
            website. This will allow you to upload reports, synchronize with the
            Home Inspector Pro Mobile program, and access additional cloud-based
            features.
          </p>
          <div className="two-inputs-for-login-page-credentials">
            <div className="input-row-internetlogin">
              <label htmlFor="username">Username : </label>
              <input
                className="input-internetlogin"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-row-internetlogin">
              <label htmlFor="password">Password : </label>
              <input
                className="input-internetlogin"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container-internetlogin">
            <button onClick={handleLogin} className="button-internetlogin">Login</button>
            <button className="cancel-btn-internetlogin" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetLogin;
