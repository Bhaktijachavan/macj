import React, { useState, useEffect, useRef } from "react";
import "./SelectionComponent.css";
import EditComments from "../../EditComments/EditComments";
import Alert from "../../Alert/Alert"

const SelectionComponent = ({ panelData, value, classname }) => {
  const [commentText, setCommentText] = useState("");
  const [fetch , setfetch] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);

  const [discriptionText, setDiscriptionText] = useState("");
  const selectedTextRef = useRef([]);

  //alert state 
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color : "",
  
  });

  // Define a function to filter empty strings from selectedTextRef.current
  const filterEmptyStrings = () => {
    selectedTextRef.current = selectedTextRef.current.filter(
      (text) => text !== ""
    );
  };



  useEffect(()=>{
    console.log("filtering is working in ")
    filterEmptyStrings()
  },[selectedTextRef])

  useEffect(() => {
    const storedData = localStorage.getItem("TempPanelData");
    // filterEmptyStrings(); 
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const commentText = parsedData[value] || "";
      setCommentText(commentText);
    }
  }, [fetch]); 

  useEffect(() => {
    filterEmptyStrings();
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

      console.log("Updated commentText in localStorage:", parsedData[value]);
    }
  };

  const handlesave = () => {
    const concatenatedText = selectedTextRef.current.join("\n");
    console.log("concatenatedText",concatenatedText);
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
      setShowAlert({
        showAlert: true,
        message: "Data has been saved ",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      // Clear the selected text after saving
      // selectedTextRef.current = [];
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const HandleDeleteText = () => {
    if (!selectedTextRef.current || selectedTextRef.current.length === 0) {
      console.log("No selected texts to delete");
      return;
    }

    // Retrieve selected texts from selectedTextRef
    const selectedTexts = selectedTextRef.current;

   
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
            // Replace selectedTexts with an empty string
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

        // Empty the selectedTextRef array
        selectedTextRef.current = [];
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
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
          <div className="Editcomments-and-checkbox-container pl-4">
            <EditComments
              value={value}
              handleDelete={HandleDeleteText}
              sortCommentText={sortCommentText}
              moveUp={handleMoveUpSelection}
              moveDown={handleMoveDownSelection}
              setDiscriptionText={setDiscriptionText}
              discriptionText={discriptionText}
              setfetch={setfetch}
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
