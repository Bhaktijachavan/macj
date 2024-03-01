import React, { useCallback, useState, useContext, useEffect } from "react";
import "./PhotoReview.css";
import Location from "./Location";
import Buttons from "./Buttons";
import Caption from "./Caption";

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
  const [panelId, setPanelId] = useState();

  useEffect(() => {
    // Function to fetch and set cover image based on panelId
    const fetchCoverImage = () => {
      const coverImagePath = localStorage.getItem("coverphotoImage");
      const newImage = JSON.parse(coverImagePath);
      if (newImage && newImage[panelId]) {
        console.log("New Image:", newImage[panelId]);
        setCoverImage(newImage[panelId]);
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
        {rectanglesData.map((rectangle, index) => (
          <div
            key={rectangle.id}
            className="PhotoReview-rectangle"
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <Location id={panelId} setId={setPanelId} />
            <div className="PhotoReview-Drag-Drop-Box">
              {coverImage && (
                <img
                  src={
                    typeof coverImage === "string"
                      ? coverImage // If it's a string, it's Vedant image
                      : URL.createObjectURL(coverImage) // If it's a file object, it's uploaded file
                  }
                  alt={
                    typeof coverImage === "string"
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
              {!coverImage && (
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
              <Buttons
                onFileSelect={(file) => handleFileSelect(file, index)}
                id={panelId}
              />
            </div>
            <Caption />
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoReview;
