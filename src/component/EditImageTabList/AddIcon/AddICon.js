import React from "react";
import { useState, useEffect } from "react";

const AddIcon = ({ imageUrl, croppedImageUrl, onIconChange, addedIcon }) => {
  const [previewImage, setPreviewImage] = useState(addedIcon);
  const [ImageSrc, setImageSrc] = useState("");
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);

  useEffect(() => {
    if (croppedImageUrl) {
      setImageSrc(croppedImageUrl);
    } else {
      setImageSrc(imageUrl);
    }
  }, [croppedImageUrl, imageUrl]);

  useEffect(() => {
    onIconChange(previewImage);
  }, [previewImage]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the data URL of the selected file as preview image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleDeleteIcon = () => {
    setPreviewImage("");
  };
  const handleSaveChanges = () => {
    // Combine both image URLs
    const combinedUrl = previewImage
      ? `${ImageSrc}, ${previewImage}`
      : ImageSrc;
    setCombinedImageUrl(combinedUrl);

    // Log the combined URL
    console.log("Combined Image URL:", combinedUrl);
  };

  return (
    <>
      <div className="relative w-[50em] h-[37em] grid place-content-center">
        <img
          src={ImageSrc}
          alt="Original Image"
          className="absolute top-0 left-0 w-full h-full"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt=""
            style={{
              position: "absolute",
            }}
          />
        )}
      </div>
      <div className="flex place-content-center">
        <input
          type="file"
          id="fileInput"
          onChange={handleFileSelect}
          multiple
          className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[0px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[6.5em] mt-10"
        />
      </div>

      <div className="flex place-content-center gap-3 mt-3">
        <button
          className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[7em] "
          onClick={handleDeleteIcon}
        >
          Delete Icon
        </button>
        <button
          className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[7em] "
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </div>
    </>
  );
};

export default AddIcon;
