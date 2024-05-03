import React, { useState } from "react";
import "./MobileUpload.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { Link } from "react-router-dom";
import MobileUploadPopup from "./MobileUploadPop/MobileUploadPopup";
import img from "../../Assets/icons/icons8-upload-64.png";
import img1 from "../../Assets/icons/icons8-search-in-cloud-50.png";
import axios from "axios";
import ViewTemplate from "./MobileUploadPop/ViewTemplate";
import UploadInspectionPopup from "./MobileUploadPop/UpLoadInspection";
import Alert from "../Alert/Alert";

const MobileUpload = ({ onClose }) => {
  //pop up state 
  const [mobileUploadPopup, setMobileUploadPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ViewTemplatepopup, setViewTemplatepopup] = useState(false);

  //upload template state 
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

    //alert 
    const [showAlert, setShowAlert] = useState({
      showAlert: false,
      message: "",
      color : "",
    
    });

  //inpectionupload pop up 
  const [inspectionUploadPopup, setInspectionUploadPopup] = useState(false);

  const openMobileUploadPopup = () => {
    setMobileUploadPopup(true);
  };

  const closeMobileUploadPopup = () => {
    setMobileUploadPopup(false);
  };
  const handleOpenPopup = () => {
    setShowPopup(true); // Set showPopup state to true to open the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Set showPopup state to false to close the popup
  };
  const handleUpload = async () => {
    const user = localStorage.getItem("User")
    if(!user){
      setShowAlert({
        showAlert: true,
        message: "Please Login First ",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
     return;
    }
    try {
      // Log all values when the upload button is clicked
      console.log("Template Name:", templateName);
      console.log("Description:", description);
      console.log("File:", selectedFile);
  
      const formData = new FormData();
      formData.append("TemplateName", templateName);
      formData.append("description", description);
      formData.append("pdf", selectedFile);
  
      const response = await axios.post("http://localhost:7000/api/template/upload", formData);
  
      console.log(response.data);
  
      if (response.status === 200) {
        setShowAlert({
          showAlert: true,
          message: "Template uploaded Successfully! ",
        })
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
       
      }
      setShowPopup(false);
    } catch (error) {
      console.error(error);
      setShowAlert({
        showAlert: true,
        message: "Error uploading template !",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      
    }
  };
  

  return (
    <>
      <Header />
      {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
      <div className="container-mobileupload">
        <div className="container-header-mobileupload">
          <p className="title-header-mobileupload">
            Macj Mobile Sync Management
          </p>{" "}
          <br />
          <p className="note-header-mobileupload">
            NOTE: REQUIRES Macj CLOUD OR Macj OFFICE SERVICE!
          </p>
          <p className="info-header-mobileupload">
            Sign up under Pricing on our website if you don't have an active
            cloud or office account.
          </p>
        </div>
        <div className="flex-container-mobileupload">
          <div className="template-mobileupload">
            <div className="title-mobileupload">
              <h1>TEMPLATES</h1>
              <p>
                Click Upload Template to select a template on this computer and
                send it to the Cloud. <br />
                <br />
                Once it's on the Cloud you can download it by going to the Sync
                tab on your phone.
              </p>
            </div>
            <div className="buttons-mobileupload">
              <button className="button-mobileupload" onClick={handleOpenPopup}>
                <img src={img} alt="" className="img-mobileupload" />
                Upload Template
              </button>
              {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999]">
            <div className="bg-gray-300 border border-gray-400  relative w-[50%] p-0">
              <div className=" flex items-center content-between justify-between  class-for-header-color px-1   ">
                <p>Panel</p>
                <p
                  className="BatchAddPhots-close-image   hover:text-white"
                  onClick={handleClosePopup}
                >
                  X
                </p>
              </div>
              <div className="grid items-center justify-center gap-12 p-9">
                <div>
                  <label htmlFor="">Template Name </label>
                  <input
                    type="text"
                    className="ml-1"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    className="ml-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Upload tpz file </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="text-white bg-blue-500 border border-blue-500 hover:bg-blue-700 hover:border-blue-700 focus:ring-2 focus:ring-blue-500 active:bg-blue-700 active:border-blue-700 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed  px-2 py-2 rounded-md"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
              <br /> <br />
              <p>
                Manage the list of the templates you have previously saved in
                the Cloud.
              </p>
              <button className="button-mobileupload" 
               onClick={()=>{
                setViewTemplatepopup(true)
               }}
              >
                <img className="img-mobileupload" src={img1} alt="" />
                View Templates
              </button>

              
            </div>
          </div>

          {/* Repeat the same structure for the second component */}
          <div className="template-mobileupload">
            <div className="title-mobileupload">
              <h1>Inspection </h1>
              <p>
                Manage the list of Inspections Currently in the Cloud.
                <br />
                <br />
                You can select an Inspection from the list and download it to
                this machine to continue to work on it, or delete it from the
                cloud.
                <br />
                It may take a few minutes to download and convert Inspection,
                please wait until you receive confirmation message.
              </p>
            </div>
            <div
              className="buttons-mobileupload"
              onClick={openMobileUploadPopup}
            >
              <button className="button-mobileupload">
              <img className="img-mobileupload" src={img1} alt="" />
                View Inspections
              </button>
            </div>



            <div className="buttons-mobileupload" onClick={() => { setInspectionUploadPopup(true) }}>
  <button className="button-mobileupload">
    <img src={img} alt="" className="img-mobileupload" />
    Upload Inspection
  </button>
</div>

           

            
          </div>

          {mobileUploadPopup && (
            <MobileUploadPopup onClose={() => closeMobileUploadPopup(false)} />
          )}
          {
            ViewTemplatepopup && 
            (
              <ViewTemplate onClose={()=>{setViewTemplatepopup(false)}}/>
            )
          }
          {inspectionUploadPopup && (
            <UploadInspectionPopup onClose={() => setInspectionUploadPopup(false)} />
          )}
        
        </div>
        <div className="container-footer-mobileupload">
          <button className="button-footer-mobileupload">
            <i className="fa-footer-mobileupload"></i> Application Settings
          </button>
          <span className="tag-footer-mobileupload">
            <i className="fa-footer-mobileupload"></i> Connected to Macj Cloud
          </span>
          <input className="input-footer-mobileupload" type="text" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MobileUpload;
