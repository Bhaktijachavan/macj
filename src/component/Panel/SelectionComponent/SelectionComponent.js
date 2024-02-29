import React, { useState, useEffect, useRef } from "react";
import "./SelectionComponent.css";
import EditComments from "../../EditComments/EditComments";

const SelectionComponent = ({ panelData, value, classname }) => {
  const [commentText, setCommentText] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [localSelectedText, setLocalSelectedText] = useState(null);
  const selectedTextRef = useRef([]);

useEffect(() => {
  const fetchData = () => {
    const storedData = localStorage.getItem("TempPanelData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const commentText = parsedData[value] || "";
      setCommentText(commentText);
    }
  };

  fetchData(); // Call the fetchData function immediately

  const intervalId = setInterval(fetchData, 3000); // Set interval to fetch data every 3 seconds

  // Clean up the interval on component unmount
  return () => clearInterval(intervalId);
}, [value]);


  useEffect(() => {
    const data = localStorage.getItem("SelectionData");
    if (data) {
      const parsedData = JSON.parse(data);
      const selectionText = parsedData[value]?.selectionText || "";
      setLocalSelectedText(selectionText);
      selectedTextRef.current = selectionText.split("\n");
    }
  }, [value]);

  const handleTextSelectionforSelectionChange = () => {
    const selection = window.getSelection();
    const selectedRange = selection.getRangeAt(0);
    const container = selectedRange.commonAncestorContainer;
    const selectedText =
      container.nodeType === 3 ? container.nodeValue : container.innerText;
    const newText = selectedTextRef.current.includes(selectedText)
      ? selectedTextRef.current.filter((text) => text !== selectedText)
      : [...selectedTextRef.current, selectedText];
    selectedTextRef.current = newText;
  };

  const handleSelectText = (line) => {
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow === line ? null : line
    );
  };

  const handlesave = () => {
    const concatenatedText = selectedTextRef.current.join("\n");
    console.log(concatenatedText);
    try {
      let tempPanelData = localStorage.getItem("SelectionData");
      if (!tempPanelData) {
        tempPanelData = {};
      } else {
        tempPanelData = JSON.parse(tempPanelData);
      }

      if (!tempPanelData[value]) {
        tempPanelData[value] = {};
      }

      tempPanelData[value]["selectionText"] = concatenatedText;

      console.log("selectionData", tempPanelData);

      localStorage.setItem("SelectionData", JSON.stringify(tempPanelData));

      console.log("Data saved successfully.");
      alert("Data saved successfully.");
      // Clear the selected text after saving
      selectedTextRef.current = [];
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

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
                  backgroundColor: selectedTextRef.current.includes(line)
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
