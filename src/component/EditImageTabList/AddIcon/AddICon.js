import React from "react";
import { useState, useEffect } from "react";

const AddIcon = ({ imageUrl, croppedImageUrl }) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [ImageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (croppedImageUrl) {
      setImageSrc(croppedImageUrl);
    } else {
      setImageSrc(imageUrl);
    }
  }, [croppedImageUrl, imageUrl]);

  const handleBrowseClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result); // Set the selected file as the image source
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <>
      <div className="relative w-[50em] h-[37em] grid place-content-center">
        <img
          src={ImageSrc}
          alt="Original Image"
          className="absolute top-0 left-0 w-full h-full"
        />
        {uploadedPhoto && (
          <img
            src={uploadedPhoto}
            alt="Uploaded"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex place-content-center">
        <button
          className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[5em]"
          onClick={handleBrowseClick}
        >
          Add Icon
        </button>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          multiple
        />
      </div>

      <div className="flex place-content-center gap-3 mt-3">
        <button className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[5em]">
          Undo
        </button>
        <button className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[5em]">
          Redo
        </button>
      </div>
    </>
  );
};

export default AddIcon;
