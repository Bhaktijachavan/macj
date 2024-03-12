const PhotosModal = ({ onClose, imageId }) => {
  let imagesArray = []; // Declare imagesArray outside of the if block
  const imageData = localStorage.getItem("coverphotoImage");
  if (imageData) {
    const parsedImageData = JSON.parse(imageData);
    imagesArray = parsedImageData[imageId] || []; // Assign value to imagesArray
    console.log("selectedImage", imagesArray);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="grid grid-cols-3 gap-4">
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
      </div>
    </div>
  );
};

export default PhotosModal;
