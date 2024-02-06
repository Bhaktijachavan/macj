import React, { useState, useCallback } from "react";
import "./OverLayImage.css";
import PropTypes from "prop-types";

const CropImageContent = ({ imageUrl, enteredText }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      try {
        const croppedImg = await getCroppedImg(imageUrl);
        setCroppedImage(croppedImg);
      } catch (e) {
        console.error("Error cropping image:", e);
      }
    },
    [imageUrl]
  );

  const getCroppedImg = async (src, crop) => {
    const image = new Image();
    image.src = src;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        ctx.font = "20px Arial"; // Adjust the font size and style as needed
        ctx.fillStyle = "black"; // Set the text color
        ctx.fillText(enteredText, 10, 30); // Adjust the position of the text

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  return (
    <div className="Overlay-image-container">
      <div className="image-container-sde">
        <img
          src={imageUrl}
          alt="Original Image"
          className="original-image-overlay"
        />
      </div>
      {croppedImage && (
        <div className="Overlay-image-container">
          <p>Cropped Image:</p>
          <img src={croppedImage} alt="Cropped Image" />
        </div>
      )}
    </div>
  );
};

CropImageContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default CropImageContent;
