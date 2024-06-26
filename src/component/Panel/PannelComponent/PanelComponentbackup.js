import React, { useState, useEffect } from "react";
import EditComments from "../../EditComments/EditComments";
import PhotosModal from "./PhotosModal";
import { set } from "lodash";
import DOMPurify from "dompurify";
const PannelComponent = ({ showAlternateContent, setRed, setBlack, value }) => {
  const [selectedText, setSelectedText] = useState("");
  const [blackText, setBlackText] = useState("");
  const [redText, setRedText] = useState("");
  const [index] = "";
  const [selectedLine, setSelectedLine] = useState(0);
  const [SelectedLineText, setSelectedLineText] = useState(0);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [selectedLineColor, setSelectedLineColor] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [rating, setRating] = useState(null);
  const [discriptionText, setDiscriptionText] = useState("");
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [fetch, setfetch] = useState(false);
  const [Image, SetImage] = useState(null);
  const handleShowPhotosClick = () => {
    setShowPhotosModal(true);
  };
  const handleDeleteImage = (image) => {
    SetImage(image);
  };

  useEffect(() => {
    console.log("selectedText", selectedText);
  }, [selectedText]);

  useEffect(() => {
    const newData = localStorage.getItem("ratingsData");
    if (newData) {
      const parseData = JSON.parse(newData);
      console.log("rating data ", parseData);
      setRating(parseData);
    }
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("DamageData");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log("parsedData", parsedData);
        const Damage1Data = parsedData[value];
        console.log("Damage1Data", Damage1Data);
        if (Damage1Data) {
          setRedText(Damage1Data.Damage1red || "");
          setBlackText(Damage1Data.Damage1black || "");
          setDiscriptionText(Damage1Data.description || "");
          setSelectedCheckboxes(Damage1Data.rating || {});
        }
      } catch (error) {
        console.error("Error parsing data:", error);
        // Handle error here, for example:
        // Display an error message or set default values
      }
    }
  }, [value]);

  const NewValue = value;
  const extractedValue = NewValue.replace(/_(d|s)\d$/, "");
  const handleCheckboxChange = (key, ratingValue) => {
    setSelectedCheckboxes((prevState) => {
      // Destructure the previous state
      const { [key]: currentValue, ...rest } = prevState;

      // Toggle the checkbox value
      const newValue = currentValue === ratingValue ? null : ratingValue;

      // Filter out any null values
      const updatedCheckboxes = newValue !== null ? { [key]: newValue } : {};

      // Return the updated state
      return {
        ...rest,
        ...updatedCheckboxes,
      };
    });
  };

  useEffect(() => {
    console.log("selected cheakbox ", fetch);
  }, [fetch]);

  const handlesave = () => {
    // console.log("Saving data...");
    try {
      // Check if DamageData already exists in local storage
      let tempPanelData = localStorage.getItem("DamageData");
      if (!tempPanelData) {
        // If not, create an empty object
        tempPanelData = {};
      } else {
        // If it exists, parse the JSON string to an object
        tempPanelData = JSON.parse(tempPanelData);
      }
      // Create a nested object for Damage1Data if it doesn't exist
      if (!tempPanelData[value]) {
        tempPanelData[value] = {};
      }
      // Store Damage1red and Damage1black values under Damage1Data
      tempPanelData[value]["Damage1red"] = redText;
      tempPanelData[value]["Damage1black"] = blackText;
      tempPanelData[value]["description"] = discriptionText;
      tempPanelData[value]["rating"] = selectedCheckboxes;
      console.log("tempPanelData", tempPanelData);
      // Save the updated data back to local storage
      localStorage.setItem("DamageData", JSON.stringify(tempPanelData));
      console.log("Data saved successfully.");
      console.log("Data saved successfully.");
      // No need to reset any state here since there's no 'text' state being used
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    try {
      // Check if DamageData already exists in local storage
      let tempPanelData = localStorage.getItem("DamageData");
      if (!tempPanelData) {
        // If not, create an empty object
        tempPanelData = {};
      } else {
        // If it exists, parse the JSON string to an object
        tempPanelData = JSON.parse(tempPanelData);
      }
      // Create a nested object for Damage1Data if it doesn't exist
      if (!tempPanelData[value]) {
        tempPanelData[value] = {};
      }
      // Store Damage1red and Damage1black values under Damage1Data
      tempPanelData[value]["Damage1red"] = redText;
      tempPanelData[value]["Damage1black"] = blackText;
      tempPanelData[value]["description"] = discriptionText;
      tempPanelData[value]["rating"] = selectedCheckboxes;
      // console.log("tempPanelData", tempPanelData);
      // Save the updated data back to local storage
      localStorage.setItem("DamageData", JSON.stringify(tempPanelData));
      // console.log("Data saved successfully.");
      // console.log("Data saved successfully.");
      // No need to reset any state here since there's no 'text' state being used
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [redText, blackText, discriptionText, selectedCheckboxes]);
  useEffect(() => {
    // Fetch CommentText from localStorage initially
    const storedData = localStorage.getItem("TempPanelData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const commentText = parsedData[value] || "";
      setCommentText(commentText);
    }
  }, [fetch]);
  const handleLineClick = (index, color) => {
    setSelectedLineIndex(index);
    setSelectedLineColor(color);
  };
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const selectedRange = selection.getRangeAt(0);
      let container = selectedRange.commonAncestorContainer;

      // Traverse up to find the containing <p> element
      while (container && container.nodeName !== "P") {
        container = container.parentNode;
      }

      if (container && container.nodeName === "P") {
        setSelectedText(container.outerHTML);
      }
    }
  };
  const sanitizedLines = commentText
    .split("\n")
    .map((line) => DOMPurify.sanitize(line));
  const handleMoveUpDamage = () => {
    console.log("handleMoveUpDamage function called");
    if (selectedText) {
      const lines = commentText.split("\n"); // Split commentText into an array of lines
      const index = lines.indexOf(selectedText); // Find the index of the selected text
      if (index > 0) {
        const newIndex = index - 1; // Reduce the index by 1 to move it up
        const updatedLines = [...lines]; // Create a copy of the array
        // Swap the selected line with the line above it
        [updatedLines[newIndex], updatedLines[index]] = [
          updatedLines[index],
          updatedLines[newIndex],
        ];
        const updatedCommentText = updatedLines.join("\n"); // Join the array back into text
        setCommentText(updatedCommentText);
        const PanalData = JSON.parse(localStorage.getItem("TempPanelData"));
        if (PanalData) {
          PanalData[value] = updatedCommentText;
          localStorage.setItem("TempPanelData", JSON.stringify(PanalData));
          console.log("Text moved up in comments:", updatedCommentText);
        }
        setSelectedText(updatedLines[newIndex]);
      }
    }
  };
  const handleMoveDownDamage = () => {
    console.log("handle move down function called ");
    if (selectedText) {
      const lines = commentText.split("\n");
      const index = lines.indexOf(selectedText);
      if (index < lines.length - 1) {
        const newIndex = index + 1;
        const updatedLines = [...lines];
        [updatedLines[newIndex], updatedLines[index]] = [
          updatedLines[index],
          updatedLines[newIndex],
        ];
        const updatedCommentText = updatedLines.join("\n");
        setCommentText(updatedCommentText);
        const PanalData = JSON.parse(localStorage.getItem("TempPanelData"));
        if (PanalData) {
          PanalData[value] = updatedCommentText;
          localStorage.setItem("TempPanelData", JSON.stringify(PanalData));
          console.log("Text moved down in comments:", updatedCommentText);
        }
        setSelectedText(updatedLines[newIndex]);
      }
    }
  };
  const HandleDeleteText = () => {
    console.log("HandleDeleteText function called");

    if (selectedText) {
      // Remove the selected text from commentText
      const updatedCommentText = commentText.replace(selectedText, "");
      setCommentText(updatedCommentText);

      console.log("Text removed from comments:", selectedText);
      // Update localStorage with the modified commentText
      const storedData = localStorage.getItem("TempPanelData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        parsedData[value] = updatedCommentText;
        localStorage.setItem("TempPanelData", JSON.stringify(parsedData));
        setSelectedText("");
        console.log("Updated commentText in localStorage:", parsedData[value]);
      }
    }
  };
  const handleAddText = (color) => {
    const newText = selectedText + "\n";
    if (color === "black") {
      setBlackText(blackText + newText);
    } else if (color === "red") {
      setRedText(redText + newText);
    }
  };
  const handleMoveUp = (text, setText) => {
    if (SelectedLineText !== null && SelectedLineText > 0) {
      const linesArray = text.split("\n");
      const temp = linesArray[SelectedLineText];
      linesArray[SelectedLineText] = linesArray[SelectedLineText - 1];
      linesArray[SelectedLineText - 1] = temp;
      const updatedText = linesArray.join("\n");
      setText(updatedText);
      setSelectedLineText(SelectedLineText - 1);
    }
  };
  const handleMoveDown = (text, setText) => {
    if (
      SelectedLineText !== null &&
      SelectedLineText < text.split("\n").length - 1
    ) {
      const linesArray = text.split("\n");
      const temp = linesArray[SelectedLineText];
      linesArray[SelectedLineText] = linesArray[SelectedLineText + 1];
      linesArray[SelectedLineText + 1] = temp;
      const updatedText = linesArray.join("\n");
      setText(updatedText);
      setSelectedLineText(SelectedLineText + 1);
    }
  };
  const handleMoveDownRedBox = () => {
    if (selectedLine) {
      setRedText((prevRedText) => prevRedText + "\n" + selectedLine);
      setBlackText((prevBlackText) => prevBlackText.replace(selectedLine, ""));
      setSelectedLine("");
    }
  };
  const handleMoveUpBlackBox = () => {
    if (selectedLine !== null) {
      setBlackText((prevBlackText) => prevBlackText + "\n" + selectedLine);
      setRedText((prevRedText) => prevRedText.replace(selectedLine, ""));
      setSelectedLine(null);
    }
  };
  const handleDeleteBlackBox = (text, setText) => {
    if (SelectedLineText !== null) {
      const linesArray = text.split("\n");
      linesArray.splice(SelectedLineText, 1);
      const updatedText = linesArray.join("\n");
      setText(updatedText);
      setSelectedLine(null);
      setSelectedLineText(null);
      setSelectedLineIndex(null);
      setSelectedLineColor(null);
    }
  };
  const handleDeleteRedBox = (text, setText) => {
    if (SelectedLineText !== null) {
      const linesArray = text.split("\n");
      linesArray.splice(SelectedLineText, 1);
      const updatedText = linesArray.join("\n");
      setText(updatedText);
      setSelectedLine(null);
      setSelectedLineText(null);
      setSelectedLineIndex(null);
      setSelectedLineColor(null);
    }
  };
  const handleDelete = () => {
    if (
      SelectedLineText !== null &&
      selectedLine !== null &&
      selectedLineColor !== null
    ) {
      if (selectedLineColor === "red") {
        handleDeleteRedBox(redText, setRedText);
      } else {
        handleDeleteBlackBox(blackText, setBlackText);
      }
      setSelectedLine(null);
      setSelectedLineText(null);
      setSelectedLineIndex(null);
      setSelectedLineColor(null);
    }
  };
  const sortCommentText = () => {
    const sortedText = commentText.split("\n").sort().join("\n");
    setCommentText(sortedText);
    // Update localStorage with the modified commentText
    const storedData = localStorage.getItem("TempPanelData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      parsedData[value] = sortedText;
      localStorage.setItem("TempPanelData", JSON.stringify(parsedData));
      console.log("Updated commentText in localStorage:", parsedData[value]);
    }
  };
  // Pass redText and blackText states to the parent component
  useEffect(() => {
    setRed(redText);
    setBlack(blackText);
  }, [redText, blackText, setRed, setBlack]);
  return (
    <div>
      <div>
        <div className="container-panel2">
          <div className="panel2">
            <div className="Editcomments-and-checkbox-container flex ">
              <EditComments
                value={value}
                handleDelete={HandleDeleteText}
                sortCommentText={sortCommentText}
                moveUp={handleMoveUpDamage}
                moveDown={handleMoveDownDamage}
                setDiscriptionText={setDiscriptionText}
                discriptionText={discriptionText}
                setfetch={setfetch}
              />
              <div
                className="scroll-box-panel2 p-4 bg-gray-100"
                style={{ cursor: "pointer" }}
                onClick={handleTextSelection}
              >
                {sanitizedLines.map((line, index) => (
                  <p
                    key={index}
                    style={{
                      backgroundColor: selectedText.includes(line)
                        ? "#2e95d3"
                        : "transparent",
                    }}
                    dangerouslySetInnerHTML={{ __html: line }} // Use sanitized HTML
                  />
                ))}
              </div>
            </div>
            <div className="flex p-2">
              <div className="p-5 pt-7">
                {!rating ? (
                  <div>....Loading</div>
                ) : (
                  Object.keys(rating).map((key, index) => (
                    <div
                      key={index}
                      className="flex items-center mb-2 checkbox-container"
                    >
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        value={rating[key]}
                        style={{ backgroundColor: "#3182ce" }}
                        className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                        checked={selectedCheckboxes[key] === rating[key]}
                        onChange={() => handleCheckboxChange(key, rating[key])}
                      />

                      <label htmlFor={key}>{rating[key]}</label>
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-col space-y-2 ml-2 mr-2 text-sm pt-10">
                {/* <button
                  onClick={handlesave}
                  type="button"
                  className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-5 py-0 rounded"
                >
                  Save Data For report
                </button> */}
                <button
                  className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-5 py-0 rounded"
                  onClick={() => handleAddText("black")}
                >
                  Black
                </button>
                <button
                  className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-5 py-0 rounded"
                  onClick={() => handleAddText("red")}
                >
                  Red
                </button>
                <button
                  className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-5 py-0 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  onClick={handleDeleteImage}
                  className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-0 py-0 rounded"
                >
                  Delete Photos
                </button>
              </div>
              <div className="container1-panel2">
                <div
                  className="scroll-box1-panel2"
                  style={{ padding: "10px", color: "black" }}
                >
                  {blackText &&
                    blackText.split("\n").map((line, index) => (
                      <div
                        key={index}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedLineColor === "black" &&
                            selectedLineIndex === index
                              ? "#3182ce"
                              : "transparent",
                        }}
                        onClick={() => {
                          setSelectedLine(line);
                          setSelectedLineText(index);
                          handleLineClick(index, "black");
                        }}
                        dangerouslySetInnerHTML={{ __html: line }}
                      ></div>
                    ))}
                </div>
                <div
                  className="scroll-box1-panel2"
                  style={{ padding: "10px", color: "red" }}
                >
                  {redText &&
                    redText.split("\n").map((line, index) => (
                      <div
                        key={index}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedLineColor === "red" &&
                            selectedLineIndex === index
                              ? "#3182ce"
                              : "transparent",
                        }}
                        onClick={() => {
                          setSelectedLine(line);
                          setSelectedLineText(index);
                          handleLineClick(index, "red");
                        }}
                        dangerouslySetInnerHTML={{ __html: line }}
                      ></div>
                    ))}
                </div>
              </div>
              <div className="panelupdown-panel2">
                <div className="button-container-panel2">
                  <button
                    className="image-button-panel2"
                    onClick={() => handleMoveUp(blackText, setBlackText)}
                  >
                    <img src="ic_up.png" alt="Button 1" width={20} />
                  </button>
                  <button
                    className="image-button-panel2"
                    onClick={() => handleMoveDown(blackText, setBlackText)}
                  >
                    <img src="ic_down.png" alt="Button 2" width={20} />
                  </button>
                  <button
                    className="image-button-panel2"
                    onClick={handleMoveDownRedBox}
                  >
                    <img src="ic_down2.png" alt="Button 3" width={20} />
                  </button>
                </div>
                <div className="button-container-panel2">
                  <button
                    className="image-button-panel2"
                    onClick={handleMoveUpBlackBox}
                  >
                    <img src="ic_up2.png" alt="Button 3" width={20} />
                  </button>
                  <button
                    className="image-button-panel2"
                    onClick={() => handleMoveUp(redText, setRedText)}
                  >
                    <img src="ic_up.png" alt="Button 1" width={20} />
                  </button>
                  <button
                    className="image-button-panel2"
                    onClick={() => handleMoveDown(redText, setRedText)}
                  >
                    <img src="ic_down.png" alt="Button 2" width={20} />
                  </button>
                </div>
              </div>
              <div className="  scroll-box1-panel2 h-[15.5em] overflow-hidden">
                <PhotosModal
                  onClose={() => setShowPhotosModal(false)}
                  imageId={NewValue}
                  Image={Image}
                  onImageDelete={handleDeleteImage}
                />{" "}
              </div>
              {/* Conditionally render the image */}
              {/* {showPhotosModal && (
                <PhotosModal
                  onClose={() => setShowPhotosModal(false)}
                  imageId={NewValue}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PannelComponent;
