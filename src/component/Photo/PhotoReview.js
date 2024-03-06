import React, { useCallback, useState, useEffect } from "react";
import "./PhotoReview.css";
import Location from "./Location";
import Buttons from "./Buttons";
import Caption from "./Caption";

const PhotoReview = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [panelId, setPanelId] = useState();

  useEffect(() => {
    // Function to fetch and set cover image based on panelId
    const fetchCoverImage = () => {
      const coverImagePath = localStorage.getItem("coverphotoImage");
      const newImage = JSON.parse(coverImagePath);
      if (newImage && newImage[panelId]) {
        console.log("New Image:", newImage[panelId]);
        setUploadedFile(newImage[panelId]);
      }
    };

    // Call the function immediately to fetch cover image initially
    fetchCoverImage();

    // Set interval to fetch cover image every 4 seconds
    const intervalId = setInterval(() => {
      fetchCoverImage();
    }, 4000);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [panelId]); // Include panelId as a dependency

  const handleFileSelect = (file) => {
    console.log("File selected:", file);
    setUploadedFile(file);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("Files dropped:", files);

    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

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

  useEffect(() => {
    console.log("id", panelId);
  }, [panelId]);

  return (
    <>
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
        <div
          className="PhotoReview-rectangle"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <Location id={panelId} setId={setPanelId} />
          <div className="PhotoReview-Drag-Drop-Box">
            {uploadedFile || coverImage ? (
              <img
                src={
                  coverImage
                    ? typeof coverImage === "string"
                      ? coverImage // If it's a string, it's a URL from localStorage
                      : URL.createObjectURL(coverImage) // If it's a file object, it's uploaded file
                    : typeof uploadedFile === "string"
                    ? uploadedFile // If it's a string, it's Vedant image
                    : URL.createObjectURL(uploadedFile) // If it's a file object, it's uploaded file
                }
                alt={coverImage ? "coverphotoImage" : "Uploaded Image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
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
            <Buttons onFileSelect={handleFileSelect} id={panelId} />
          </div>
          <Caption />
        </div>
      </div>
    </>
  );
};

export default PhotoReview;
