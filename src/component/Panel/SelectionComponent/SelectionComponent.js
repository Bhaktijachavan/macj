import React, { useState, useEffect } from "react";
import "./SelectionComponent.css";
import EditComments from "../../EditComments/EditComments";

const SelectionComponent = ({ panelData, value, classname }) => {
  const [selectedText, setSelectedText] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [LocalSelectedText, setLocalSelectedText] = useState(null);

  useEffect(() => {
    // Fetch CommentText from localStorage initially
    const interval = setInterval(() => {
      const storedData = localStorage.getItem("TempPanelData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const commentText = parsedData[value] || "";
        setCommentText(commentText);
      }
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [value]);

  useEffect(() => {
    // Log selected lines whenever the selection changes
    console.log("Selected Lines:", selectedText);
  }, [selectedText]);

  const handleTextSelectionforSelectionChange = () => {
    const selection = window.getSelection();
    const selectedRange = selection.getRangeAt(0);
    const container = selectedRange.commonAncestorContainer;
    const selectedText =
      container.nodeType === 3 ? container.nodeValue : container.innerText;
    setSelectedText((prevSelectedText) =>
      prevSelectedText.includes(selectedText)
        ? prevSelectedText.filter((text) => text !== selectedText)
        : [...prevSelectedText, selectedText]
    );
  };

  const handleSelectText = (line) => {
    // Toggle the selected state for the clicked line
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow === line ? null : line
    );
  };

  const handlesave = () => {
    const concatenatedText = selectedText.join("\n");
    console.log(concatenatedText);
    try {
      // Check if DamageData already exists in local storage
      let tempPanelData = localStorage.getItem("SelectionData");
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
      tempPanelData[value]["selectionText"] = concatenatedText;

      console.log("selectionData", tempPanelData);

      // Save the updated data back to local storage
      localStorage.setItem("SelectionData", JSON.stringify(tempPanelData));

      console.log("Data saved successfully.");
      // No need to reset any state here since there's no 'text' state being used
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("SelectionData");
    if (data) {
      const parsedData = JSON.parse(data);
      const selectionText = parsedData[value]?.selectionText || "";
      console.log("selectionText", selectionText);
      setLocalSelectedText(selectionText);
    }
  }, [selectedText]);

  return (
    <div>
      <div>
        <div className="panel-heading text-center m-2"></div>
        <div className="pl-2 m-2 flex">
          <div className="Editcomments-and-checkbox-container">
            <EditComments value={value} />
            <button
              onClick={handlesave}
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Save Data For report
            </button>
            {LocalSelectedText && (
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Selected Text:
                </p>
                {LocalSelectedText.split("\n").map((line, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#ddd",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={
              classname ? classname : "scroll-box-panel2 p-4 bg-gray-100"
            }
            style={{ cursor: "pointer" }}
            onMouseUp={handleTextSelectionforSelectionChange}
          >
            {commentText.split("\n").map((line, index) => (
              <p
                key={index}
                onClick={() => handleSelectText(line)}
                style={{
                  backgroundColor:
                    selectedText.includes(line) ||
                    (LocalSelectedText && LocalSelectedText.includes(line))
                      ? "#e0e0e0"
                      : "transparent",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionComponent;
