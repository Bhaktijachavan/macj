import React, { useState, useRef, useEffect } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import "./Stationery.css";
import { imageCompression } from "browser-image-compression";

const Stationery = () => {
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPdf(reader.result);
      };
      reader.readAsDataURL(file);
    }
    alert("File Uploaded Successfully");
    localStorage.setItem("uploadedPdf", uploadedPdf);
  };

  const handleDelted = () => {
    setUploadedPdf(null);
    localStorage.removeItem("uploadedPdf");
    alert("File Deleted Successfully");
  };
  return (
    <>
      <div>
        <Header />
      </div>
      {/* Container for the Stationery page content */}
      <div className="Stationery-page-cont">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePdfUpload}
        />
        <div className="Stationery-para">
          {/* Paragraph explaining the use of Report Stationery */}
          <p>
            Report Stationery uses PDF files to create adigital stationery that
            your report will be printed over. This give the ultimate in report
            design customization. Use it to create a detailed cover page layout
            and to create watermarks, border and footers on the rest of the page
            of your report
          </p>
          <br />
          <p>
            You can create a your stationery in word. Photoshop or any other
            program and then save or 'print' the document to a PDF. if you don't
            have a PDF printer program loaded on your computer, download a free
            PDF printer such as Bullzip or PrimoPDF. This will allow you to
            click. Print in any program and create a PDF file.
          </p>
          <br />
          <p>
            <b>IMPORTANT NOTE</b>: Keep file size of your PDF stationery as
            small as possible as its size will be addes to your report PDF size.
            We recommend saving your stationery into the Data folder of Home
            Inspector Pro before loading it there will (which make it easier to
            locate the future) but thia is not required
          </p>
        </div>
        <div className="adding-Stationery">
          {/* Section for Cover Page Stationery */}
          <div className="cover-page-Stationery">
            <h2>Cover Page Stationery</h2>
            <div className="cover-page-Stationery-upload">
              <div className="cover-page-Stationery-browse">
                <button className="adding-Stationery-btn">Browse</button>
              </div>
              <div className="cover-page-Stationery-inputtext">
                <div className="cover-page-Stationery-inputtext border border-black bg-white w-[20em] h-[1.7em]"></div>
              </div>
              <div className="cover-page-Stationery-remove">
                <button className="adding-Stationery-btn">Remove</button>
              </div>
            </div>
          </div>
          <div className="cover-page-Stationery">
            {/* Section for All Other Page Stationery */}
            <h2>All Other Page Stationery</h2>
            <div className="cover-page-Stationery-upload">
              <div className="cover-page-Stationery-browse">
                <button
                  className="adding-Stationery-btn"
                  onClick={handleUploadButtonClick}
                >
                  Browse
                </button>
              </div>
              <div className="cover-page-Stationery-inputtext border border-black bg-white w-[20em] h-[1.7em] flex items-center content-center justify-center">
                {uploadedPdf ? (
                  <>
                    <p>Successfully Uploded</p>
                  </>
                ) : (
                  <>
                    <p>Select Pdf</p>
                  </>
                )}
              </div>
              <div className="cover-page-Stationery-remove">
                <button
                  className="adding-Stationery-btn"
                  onClick={handleDelted}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default Stationery;
