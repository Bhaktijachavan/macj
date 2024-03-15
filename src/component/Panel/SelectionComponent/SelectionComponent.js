import React, { useState, useEffect, useRef } from "react";
import "./SelectionComponent.css";
import EditComments from "../../EditComments/EditComments";

const SelectionComponent = ({ panelData, value, classname }) => {
  const [commentText, setCommentText] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [localSelectedText, setLocalSelectedText] = useState(null);
  const [discriptionText, setDiscriptionText] = useState("");
  const selectedTextRef = useRef([]);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("TempPanelData");
      selectedTextRef.current = selectedTextRef.current.filter(
        (text) => text !== ""
      );
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
    console.log("selectedTextRef.current", selectedTextRef.current);
  });

  useEffect(() => {
    const data = localStorage.getItem("SelectionData");
    if (data) {
      const parsedData = JSON.parse(data);
      const selectionText = parsedData[value]?.selectionText || "";
      const description = parsedData[value]?.description || "";
      setDiscriptionText(description);
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

  const sortCommentText = () => {
    const sortedText = commentText.split("\n").sort().join("\n");
    setCommentText(sortedText);
    // Update localStorage with the modified commentText
    const storedData = localStorage.getItem("TempPanelData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      parsedData[value] = sortedText;
      localStorage.setItem("TempPanelData", JSON.stringify(parsedData));
      setLocalSelectedText(""); // Reset selected text
      console.log("Updated commentText in localStorage:", parsedData[value]);
    }
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
      tempPanelData[value]["description"] = discriptionText;

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

  const HandleDeleteText = () => {
    console.log("HandleDeleteText function called");

    // Retrieve selected texts from selectedTextRef
    const selectedTexts = selectedTextRef.current;

    if (window.confirm(`Are you sure you want to delete the selected texts?`)) {
      if (selectedTexts && selectedTexts.length > 0) {
        let updatedCommentText = commentText;
        selectedTexts.forEach((selectedText) => {
          // Remove each selected text from commentText
          updatedCommentText = updatedCommentText.replace(selectedText, "");
        });

        setCommentText(updatedCommentText);
        console.log("Texts removed from comments:", selectedTexts);

        // Update localStorage with the modified commentText in TempPanelData
        const storedData = localStorage.getItem("TempPanelData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          parsedData[value] = updatedCommentText;
          localStorage.setItem("TempPanelData", JSON.stringify(parsedData));
          console.log(
            "Updated commentText in TempPanelData:",
            parsedData[value]
          );
        }

        // Remove the deleted text from SelectionData
        const selectionData = localStorage.getItem("SelectionData");
        if (selectionData) {
          const parsedSelectionData = JSON.parse(selectionData);
          if (parsedSelectionData[value]) {
            parsedSelectionData[value].selectionText = parsedSelectionData[
              value
            ].selectionText.replace(selectedTexts.join("\n"), "");
            localStorage.setItem(
              "SelectionData",
              JSON.stringify(parsedSelectionData)
            );
            console.log("Updated SelectionData:", parsedSelectionData);
          }
        }

        // Remove the deleted text from selectedTextRef
        selectedTextRef.current = selectedTextRef.current.filter(
          (text) => !selectedTexts.includes(text)
        );
      }
    }
  };

  const handleMoveUpSelection = () => {
    console.log("handleMoveUpSelection function called");
    const selectedTexts = selectedTextRef.current;
    if (selectedTexts) {
      const lines = commentText.split("\n");
      const updatedLines = [...lines];

      selectedTexts.forEach((selectedText) => {
        const index = updatedLines.indexOf(selectedText);
        if (index > 0) {
          const newIndex = index - 1;
          [updatedLines[newIndex], updatedLines[index]] = [
            updatedLines[index],
            updatedLines[newIndex],
          ];
        }
      });

      const updatedCommentText = updatedLines.join("\n");
      setCommentText(updatedCommentText);

      const PanelData = JSON.parse(localStorage.getItem("TempPanelData"));
      if (PanelData) {
        PanelData[value] = updatedCommentText;
        localStorage.setItem("TempPanelData", JSON.stringify(PanelData));
        console.log("Text moved up in comments:", updatedCommentText);
      }
    }
  };

  const handleMoveDownSelection = () => {
    const selectedTexts = selectedTextRef.current;
    if (selectedTexts) {
      const lines = commentText.split("\n");
      const updatedLines = [...lines];

      selectedTexts.forEach((selectedText) => {
        const index = updatedLines.indexOf(selectedText);
        if (index < updatedLines.length - 1) {
          const newIndex = index + 1;
          [updatedLines[newIndex], updatedLines[index]] = [
            updatedLines[index],
            updatedLines[newIndex],
          ];
        }
      });

      const updatedCommentText = updatedLines.join("\n");
      setCommentText(updatedCommentText);

      const PanelData = JSON.parse(localStorage.getItem("TempPanelData"));
      if (PanelData) {
        PanelData[value] = updatedCommentText;
        localStorage.setItem("TempPanelData", JSON.stringify(PanelData));
        console.log("Text moved down in comments:", updatedCommentText);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="panel-heading text-center m-2"></div>
        <div className="pl-2 m-2 flex">
          <div className="Editcomments-and-checkbox-container pl-4">
            <EditComments
              value={value}
              handleDelete={HandleDeleteText}
              sortCommentText={sortCommentText}
              moveUp={handleMoveUpSelection}
              moveDown={handleMoveDownSelection}
              setDiscriptionText={setDiscriptionText}
              discriptionText={discriptionText}
            />
            <button
              onClick={handlesave}
              type="button"
              className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black py-0 rounded text-sm w-24"
            >
              Save Data
              <br /> For report
            </button>
          </div>
          <div
            className={classname ? classname : "scroll-box-panel3 bg-gray-100"}
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
