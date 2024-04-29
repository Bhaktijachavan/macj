import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Alert from "../Alert/Alert";
import "./Stationery.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Stationery = () => {
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  //alert 
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color : "",
  
  });

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    extractContent(uploadedFile);
  };

  const extractContent = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      let fullText = "";
      let extractedImages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          fullText += item.str + "\n"; // Add newline for better formatting
        });
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({
          canvasContext,
          viewport,
        }).promise;
        const imageData = canvas.toDataURL("image/png");
        extractedImages.push(imageData);
      }
      setText(fullText);
      setImages(extractedImages);
      setNumPages(pdf.numPages);

      // Store extracted text and images to local storage
      localStorage.setItem("extractedText", fullText);
      localStorage.setItem("extractedImages", JSON.stringify(extractedImages));
      
      // Show alert
      setShowAlert({
        showAlert: true,
        message: "pdf uploaded successfully",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleDelted = () => {
    setText(null);
    setImages(null);
    setNumPages(null);
    localStorage.removeItem("extractedText");
    localStorage.removeItem("extractedImages");
    setShowAlert({
      showAlert: true,
      message: "file has been deleted successfully",
    })
    setTimeout(() => {
      setShowAlert({
        showAlert: false,
        message: "",
      }); // Hide the alert after 3 seconds
    }, 3000);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
      {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileChange}
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
        <div className="cover-page-Stationery">
          <h2>All Other Page Stationery</h2>
          <div className="cover-page-Stationery-upload">
            <div className="cover-page-Stationery-browse">
              <button
                className="adding-Stationery-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Browse
              </button>
            </div>
            <div className="cover-page-Stationery-inputtext border border-black bg-white w-[20em] h-[1.7em] flex items-center content-center justify-center">
              <h1>Select Pdf to Upload</h1>
            </div>
            <div className="cover-page-Stationery-remove">
              <button className="adding-Stationery-btn" onClick={handleDelted}>
                Remove
              </button>
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
