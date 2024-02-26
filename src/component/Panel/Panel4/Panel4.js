import React, { useState } from "react";
import "./Panel4.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import EditComments from "./../../EditComments/EditComments";
import { useLocation } from "react-router-dom";

function Panel4({ panelData }) {
  const location = useLocation();
  const stateObject = location.state;
  console.log("stateobject", stateObject);
  console.log("props panelData", panelData.damage1);
  const [selectedText, setSelectedText] = useState("");
  const [blackText, setBlackText] = useState("");
  const [redText, setRedText] = useState("");
  const [index] = ""; // Remove this line or provide a valid value
  const [lines, setLines] = useState("");

  const [selectedLine, setSelectedLine] = useState(0);
  const [SelectedLineText, setSelectedLineText] = useState(0);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [selectedLineColor, setSelectedLineColor] = useState(null);
  const [showAlternateContent, setShowAlternateContent] = useState(false);

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  const handleLineClick = (index, color) => {
    setSelectedLineIndex(index);
    setSelectedLineColor(color);
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

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedRange = selection.getRangeAt(0);
    const container = selectedRange.commonAncestorContainer;
    const selectedText =
      container.nodeType === 3 ? container.nodeValue : container.innerText;
    setSelectedText(selectedText);
  };

  const handleAddText = (color) => {
    const newText = selectedText + "\n";
    if (color === "black") {
      setBlackText(blackText + newText);
    } else if (color === "red") {
      setRedText(redText + newText);
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

  return (
    <>
      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>

        <div className="container-panel4">
          <div className="panel4">
            <div className="Editcomments-and-checkbox-container">
              <EditComments />
              <div className="p-5">
                {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 checkbox-container"
                  >
                    <input
                      type="checkbox"
                      id={label}
                      name={label}
                      value={label}
                      style={{ backgroundColor: "#3182ce" }}
                      className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                    />
                    <label htmlFor={label}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="scroll-box-panel4 p-4 bg-gray-100"
              style={{ cursor: "pointer" }}
              onMouseUp={handleTextSelection}
            >
              <p>Demo Panel color</p>
              <p>Color Red and black</p>
              <p>
                if color select good stock it go in the 1 box and color is black
              </p>
              <p>
                if color select bad stock it go in the 2 box and color is red
              </p>
              {/* Content for scroll box */}
            </div>

            <div className="flex flex-col space-y-2 ml-2 mr-2 text-sm">
              <button
                className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded"
                onClick={() => handleAddText("black")}
              >
                Black
              </button>
              <button
                className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded"
                onClick={() => handleAddText("red")}
              >
                Red
              </button>
              <button
                className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-0 py-0 rounded">
                Show Photos
              </button>
              <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-0 py-0 rounded">
                Show PDFs
              </button>
            </div>

            <div className="container1-panel4">
              <div
                className="scroll-box1-panel4"
                onClick={() => handleLineClick(index, "black")}
              >
                {blackText.split("\n").map((line, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedLineColor === "black" &&
                        selectedLineIndex === index
                          ? "#ddd"
                          : "transparent",
                    }}
                    onClick={() => {
                      setSelectedLine(line);
                      setSelectedLineText(index);
                      handleLineClick(index, "black");
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div
                className="scroll-box1-panel4"
                style={{ padding: "10px", color: "red" }}
              >
                {redText.split("\n").map((line, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedLineColor === "red" &&
                        selectedLineIndex === index
                          ? "#ddd"
                          : "transparent",
                    }}
                    onClick={() => {
                      setSelectedLine(line);
                      setSelectedLineText(index);
                      handleLineClick(index, "red");
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="panelupdown-panel4 ">
              <div className="button-container-panel4 mb-5">
                <button
                  className="image-button-panel4"
                  onClick={() => handleMoveUp(blackText, setBlackText)}
                >
                  <img src="ic_up.png" alt="Button 1" width={20} />
                </button>

                <button
                  className="image-button-panel4"
                  onClick={() => handleMoveDown(blackText, setBlackText)}
                >
                  <img src="ic_down.png" alt="Button 2" width={20} />
                </button>

                <button
                  className="image-button-panel4"
                  onClick={handleMoveDownRedBox}
                >
                  <img src="ic_down2.png" alt="Button 3" width={20} />
                </button>
              </div>

              <div className="button-container-panel4 mt-5">
                <button
                  className="image-button-panel4"
                  onClick={handleMoveUpBlackBox}
                >
                  <img src="ic_up2.png" alt="Button 3" width={20} />
                </button>

                <button
                  className="image-button-panel4"
                  onClick={() => handleMoveUp(redText, setRedText)}
                >
                  <img src="ic_up.png" alt="Button 1" width={20} />
                </button>

                <button
                  className="image-button-panel4"
                  onClick={() => handleMoveDown(redText, setRedText)}
                >
                  <img src="ic_down.png" alt="Button 2" width={20} />
                </button>
              </div>
            </div>
            <div className="scroll-box3-panel4 p-4 bg-gray-100"></div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel4;
