import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhotosModal = ({ onClose, imageId, Image, onImageDelete }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track selected image index
  const [imagesArray, setImagesArray] = useState([]); // State to hold images array
  const navigate = useNavigate();
  // Function to retrieve images data from localStorage
  const getImagesData = () => {
    const imageData = localStorage.getItem("coverphotoImage");
    if (imageData) {
      const parsedImageData = JSON.parse(imageData);
      return parsedImageData[imageId] || [];
    }
    return [];
  };

  // Function to remove selected image from localStorage
  const handleRemoveImage = () => {
    if (selectedImageIndex !== null) {
      const imageData = localStorage.getItem("coverphotoImage");
      if (imageData) {
        let parsedImageData = JSON.parse(imageData);
        if (parsedImageData.hasOwnProperty(imageId)) {
          // Remove the selected image by splicing it from the array
          parsedImageData[imageId].splice(selectedImageIndex, 1);
          localStorage.setItem(
            "coverphotoImage",
            JSON.stringify(parsedImageData)
          );
          // Update imagesArray state after removal
          setImagesArray(parsedImageData[imageId]);
          // Reset selectedImageIndex state after removal

          setSelectedImageIndex(null);
        }
      }
    }
  };
  React.useEffect(() => {
    // Call handleRemoveImage when onImageDelete is invoked
    handleRemoveImage();
  }, [onImageDelete]);
  // Fetch images data from localStorage on component mount
  React.useEffect(() => {
    setImagesArray(getImagesData());
  }, [imageId]);

  return (
    <div className="">
      <div className="overflow-auto h-[15.5em]">
        {/* <div className=" flex items-center content-between justify-between bg-gray-100 border border-gray-400  ">
          <p>Images</p>
          <p
            className="BatchAddPhots-close-image  text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            X
          </p>
        </div> */}
        <div className="grid gap-4 my-2 ">
          {imagesArray.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {imagesArray.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="px-2"
                  style={{
                    // width: "170px",
                    // height: "170px",
                    // objectFit: "cover",

                    border:
                      index === selectedImageIndex ? "2px solid blue" : "none", // Apply border to selected image
                  }}
                  onClick={() => setSelectedImageIndex(index)} // Set selected image index on click
                  onDoubleClick={() => navigate("/photoreview")}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotosModal;
