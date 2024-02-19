import React from "react";
import "./MobileUpload.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

const MobileUpload = () => {
  return (
    <>
      <Header />
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
              <button className="button-mobileupload">
                {/* <i className="fa fa-upload" className='i-mobileupload' ></i> */}
                <br />
                Upload Template
              </button>
              <br /> <br />
              <br />
              <p>
                Manage the list of the templates you have previously saved in
                the Cloud.
              </p>
              <button className="button-mobileupload">
                {/* <i className="fa fa-search" className="i-mobileupload"></i> */}
                <br />
                View Templates
              </button>
            </div>
          </div>

          {/* Repeat the same structure for the second component */}
          <div className="template-mobileupload">
            <div className="title-mobileupload">
              <h1>TEMPLATES</h1>
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
            <div className="buttons-mobileupload">
              <button className="button-mobileupload">
                {/* <i className="fa fa-upload" className="i-mobileupload"></i>   */}
                <br />
                Upload Template
              </button>
            </div>
          </div>
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
