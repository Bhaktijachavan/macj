import React, { useState } from "react";

const PhotosModal = ({ onClose, imageId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track selected image index
  const [imagesArray, setImagesArray] = useState([]); // State to hold images array

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

  // Fetch images data from localStorage on component mount
  React.useEffect(() => {
    setImagesArray(getImagesData());
  }, [imageId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 border border-gray-400   rounded-lg p-2 z-50">
        <div className=" flex items-center content-between justify-between bg-gray-100 border border-gray-400  ">
          <p>Images</p>
          <p
            className="BatchAddPhots-close-image  text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            X
          </p>
        </div>
        <div className="grid gap-4 ">
          {imagesArray.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-2">
              {imagesArray.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    border:
                      index === selectedImageIndex ? "2px solid blue" : "none", // Apply border to selected image
                  }}
                  onClick={() => setSelectedImageIndex(index)} // Set selected image index on click
                />
              ))}
            </div>
          ) : (
            <div>No images available for this ID.</div>
          )}
          <div>
            <button
              className="text-white bg-blue-500 border border-blue-500 hover:bg-blue-700 hover:border-blue-700 focus:ring-2 focus:ring-blue-500 active:bg-blue-700 active:border-blue-700 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed  px-2 py-2 rounded-md"
              onClick={handleRemoveImage}
            >
              Remove Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosModal;
