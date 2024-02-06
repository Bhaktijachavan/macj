import React, { useState, useCallback } from "react";
import "./CropImageContent.css";
import PropTypes from "prop-types";

const CropImageContent = ({ imageUrl, texts }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      try {
        const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels);
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
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  return (
    <div className="crop-image-container">
      <div className="image-container">
        <img src={imageUrl} alt="Original Image" className="original-image" />
        {texts &&
          texts.map((text) => (
            <div
              key={text.id}
              className="text-overlay"
              style={{
                color: text.textColor,
                position: "absolute",
                top: `${text.position.y}%`,
                left: `${text.position.x}%`,
                fontSize: `${text.fontSize}px`,
                fontFamily: text.font,
                fontWeight: text.isBold ? "bold" : "normal",
                fontStyle: text.isItalic ? "italic" : "normal",
                backgroundColor: text.isHighlighted
                  ? `${text.highlightColor}${Math.round(
                      text.highlightOpacity * 255
                    ).toString(16)}`
                  : "transparent",
                textAlign: "center",
              }}
            >
              {text.content}
            </div>
          ))}
      </div>
      {croppedImage && (
        <div className="cropped-image-container">
          <p>Cropped Image:</p>
          <img src={croppedImage} alt="Cropped Image" />
        </div>
      )}
      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt">Undo</button>
        <button className="Buttons-undo-redo-yytytyt">Redo</button>
      </div>
    </div>
  );
};

CropImageContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default CropImageContent;
