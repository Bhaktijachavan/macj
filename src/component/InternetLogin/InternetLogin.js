import React, { useEffect, useState } from "react";
import "./InternetLogin.css";
import axios from "axios";
import Alert from "../Alert/Alert";


const InternetLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(true);
  const [user, setUser] = useState(null);

    //alert 
    const [showAlert, setShowAlert] = useState({
      showAlert: false,
      message: "",
      color : "",
    
    });


  useEffect(() => {
    const userdata = localStorage.getItem("User");
    if (userdata) {
      setUser(JSON.parse(userdata));
    }

  },[])

  const handleLogin = async () => {
    console.log("Login button clicked!");
    console.log("email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        "http://node-backend.macj-abuyerschoice.com/api/executive/login",
        {
          email,
          password,
        }
      );

    
      console.log("login data " , res.data.data)
      localStorage.setItem("User", JSON.stringify(res.data.data));
      setShowAlert({
        showAlert: true,
        message: "Login Successfully",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      
      
      setPopupOpen(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        console.error("Login Error:", errorMessage);
        // Show alert with error message
        setShowAlert({
          showAlert: true,
          message: error,
        })
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
        
      } else {
        console.error("Login Error:", error.message);
        // Show alert for network or other errors
        setShowAlert({
          showAlert: true,
          message: "Network or server error occurred. Please try again later.",
        })
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
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
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
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
            This is the same as your homeinspectorpro.com email and password.
          </p>
          <br />
          <p className="p-internetlogin1">
            If you do not already have a Cloud Service account, you can sign up
            for a monthly or annual cloud service plan on the Home Inspector Pro
            website. This will allow you to upload reports, synchronize with the
            Home Inspector Pro Mobile program, and access additional cloud-based
            features.
          </p>
           <br />
           <h3> {user ? `hello ${user.name}` : "please login first "}</h3>
          <div className="two-inputs-for-login-page-credentials">
            <div className="input-row-internetlogin">
              <label htmlFor="email">email : </label>
              <input
                className="input-internetlogin"
                type="text"
                id="email"
                disabled={user ? true : false}
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="input-row-internetlogin">
              <label htmlFor="password">Password : </label>
              <input
                className="input-internetlogin"
                type="password"
                disabled={user ? true : false}
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
            <button className="cancel-btn-internetlogin" style={{backgroundColor : "red"}} onClick={()=>{
              localStorage.removeItem("User");
              setShowAlert({
                showAlert: true,
                message: "Log out  Successfully",
              })
              setTimeout(() => {
                setShowAlert({
                  showAlert: false,
                  message: "",
                }); // Hide the alert after 3 seconds
              }, 3000);
              setUser(null);
              window.location.reload();
            }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetLogin;
