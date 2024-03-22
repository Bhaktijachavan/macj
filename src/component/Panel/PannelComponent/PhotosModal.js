const PhotosModal = ({ onClose, imageId }) => {
  let imagesArray = []; // Declare imagesArray outside of the if block
  const imageData = localStorage.getItem("coverphotoImage");
  if (imageData) {
    const parsedImageData = JSON.parse(imageData);
    console.log("parsedImageData", parsedImageData);
    imagesArray = parsedImageData[imageId] || []; // Assign value to imagesArray
    console.log("selectedImage", imagesArray);
  }

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
                }}
              />
            ))}
          </div>
        ) : (
          <div>No images available for this ID.</div>
        )}
      </div>
    </div>
  );
};

export default PhotosModal;
