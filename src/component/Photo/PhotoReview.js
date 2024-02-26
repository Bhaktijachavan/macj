import React, { useCallback, useState, useContext, useEffect } from "react";
import "./PhotoReview.css";
import Location from "./Location";
import Buttons from "./Buttons";
import Caption from "./Caption";
// import Recallcheck from "./Recallcheck";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const PhotoReview = () => {
  const rectanglesData = [
    { id: 1, label: "Rectangle 1" },
    { id: 2, label: "Rectangle 2" },
    { id: 3, label: "Rectangle 3" },
    { id: 4, label: "Rectangle 4" },
  ];

  const [uploadedFiles, setUploadedFiles] = useState(
    Array(rectanglesData.length).fill(null)
  );
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const coverImagePath = localStorage.getItem("coverphotoImage");
    if (coverImagePath) {
      // Check if there are already uploaded files
      const indexOfFirstEmptyRectangle = uploadedFiles.findIndex(
        (file) => file === null
      );
      if (indexOfFirstEmptyRectangle === -1) {
        // If all rectangles have uploaded files, set Vedant image to the first rectangle
        setCoverImage(coverImagePath);
      } else {
        // Set Vedant image to the first available rectangle without uploaded files
        setUploadedFiles((prevUploadedFiles) => {
          const updatedFiles = [...prevUploadedFiles];
          updatedFiles[indexOfFirstEmptyRectangle] = coverImagePath;
          return updatedFiles;
        });
      }
    }
  }, [uploadedFiles]);

  const handleFileSelect = (file, rectangleIndex) => {
    console.log("File selected:", file);
    console.log("Rectangle Index:", rectangleIndex);

    const updatedFiles = [...uploadedFiles];
    updatedFiles[rectangleIndex] = file;
    setUploadedFiles(updatedFiles);
  };

  const handleDrop = useCallback(
    (event, rectangleIndex) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      console.log("Files dropped:", files);
      console.log("Rectangle Index:", rectangleIndex);

      if (files.length > 0) {
        const updatedFiles = [...uploadedFiles];
        updatedFiles[rectangleIndex] = files[0];
        setUploadedFiles(updatedFiles);
      }
    },
    [uploadedFiles]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback((event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");
  }, []);

  return (
    <>
      {/* <Header></Header>
      <div className="Tablist-to-open-new-EditImageTabList">
        <div className="tab1-container">
          <p>Photos 1</p>
          <p>Photos 2</p>

          <p>Photos 3</p>

          <p>Photos 4</p>
          <p>Photos 5</p>
          <p>Photos 6</p>
          <p>New Tab</p>
        </div>
      </div> */}
      <p className="PhotoReview-Main-Para">
        The photo added to the top-left box will appear on the cover of the
        report <br />
        the drop-down boxes are automatically preloaded with the sectors from
        The photo added to the top left box will appear on the cover of the the
        current template. The photo will print in the location specified using
        both drop-down boxes, unless you check "Print At End" for a photo.
        <br />
        The caption will be placed under each photo unless you check the 'Use
        Location As Caption' button check the 'Summary' box to include the photo
        in the Report Summary in addition to the report body.
      </p>
      <div className="PhotoReview-rectangular-container">
        {rectanglesData.map((rectangle, index) => (
          <div
            key={rectangle.id}
            className="PhotoReview-rectangle"
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <Location />
            <div className="PhotoReview-Drag-Drop-Box">
              {uploadedFiles[index] && (
                <img
                  src={
                    typeof uploadedFiles[index] === "string"
                      ? uploadedFiles[index] // If it's a string, it's Vedant image
                      : URL.createObjectURL(uploadedFiles[index]) // If it's a file object, it's uploaded file
                  }
                  alt={
                    typeof uploadedFiles[index] === "string"
                      ? `coverphotoImage`
                      : `Uploaded Image for ${rectangle.label}`
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              {!uploadedFiles[index] && (
                <p className="Drag-Drop-Box-Para">
                  The Selected File will Appear Here !
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "Center",
              }}
            >
              <Buttons onFileSelect={(file) => handleFileSelect(file, index)} />
            </div>
            <Caption />
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PhotoReview;
