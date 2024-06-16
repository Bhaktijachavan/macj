import React, { useState } from "react";
import "./CreateListEditComm.css";
import AddListPopUp from "./AddListPopUp.js";
import AddCommentsPopUp from "./AddCommentsPopUp.js";
import DeleteListPopup from "./DeleteListPopup/DeleteListPopup.js";
import EditCommentPopup from "./EditCommentPopup/EditCommentPopup.js";

const CreateListEditComm = ({ onClose }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isAddListPopUp, setAddListPopUp] = useState(false);
  const [isAddCommentsPopUp, setIsAddCommentsPopUp] = useState(false);
  const [deletetlistPopup, setDeletetlistPopup] = useState(false);
  const [editCommentListPopup, setEditCommentListPopup] = useState(false);
  const [selectedText, setSelectedText] = useState(""); // To store selected text
  const [selectedComment, setSelectedComment] = useState(""); // To store selected text

  const handleTextSelect = () => {
    const selection = window.getSelection().toString(); // Get selected text
    console.log("Selected text:", selection); // Print selected text in console
    setSelectedText(selection); // Store selected text
  };
  const handleCommentSelection = () => {
    const comment = window.getSelection().toString();
    // console.log("comment", comment);
    setSelectedComment(comment);
  };
  const handleCommentDelete = () => {
    if (selectedComment) {
      setText2((prevText) => prevText.replace(selectedComment, ""));
      setSelectedComment(""); // Clear the selected text after deletion
    }
  };
  const openDeletetListPopup = () => {
    // setDeletetlistPopup(true);
    if (selectedText) {
      setText1((prevText) => prevText.replace(selectedText, ""));
      setSelectedText(""); // Clear the selected text after deletion
    }
  };
  const closeDeletetListPopup = () => {
    setDeletetlistPopup(false);
  };
  const openEditCommentListPopup = (newcomment) => {
    // setEditCommentListPopup(true);
    const comment = selectedComment.replace(selectedComment, newcomment);
  };
  const closeEditCommentListPopup = () => {
    setEditCommentListPopup(false);
  };

  const handleAddListClick = () => {
    setAddListPopUp(true);
  };

  const handlePopUpClose = () => {
    setAddListPopUp(false);
    setIsAddCommentsPopUp(false);
  };
  const handleAddCommPopopClick = () => {
    if (selectedText) {
      setIsAddCommentsPopUp(true);
    }
  };
  const handleAddListSubmit = (listName) => {
    // Split text1 into lines
    const lines = text1.split("\n");

    // Find the index of the selectedText in lines
    const index = lines.findIndex((line) => line === selectedText);

    if (index !== -1) {
      // Replace the selectedText with the new listName
      lines.splice(index, 1, listName);

      // Update text1 state with the modified lines array
      setText1(lines.join("\n"));
    } else {
      // If no selected text, simply append to the end
      setText1((prevText) => `${prevText}\n${listName}`);
    }
  };

  const handleAddCommentsSubmit = (editedText) => {
    const lines = text2.split("\n");
    const index = lines.findIndex((line) => line === selectedComment);

    if (index !== -1) {
      // Replace the selectedText with the new listName
      lines.splice(index, 1, editedText);

      // Update text1 state with the modified lines array
      setText2(lines.join("\n"));
    } else {
      // If no selected text, simply append to the end
      setText2((prevText) => `${prevText}\n${editedText}`);
    }
  };
  // Function to save text2 to local storage
  const saveText2ToLocalStorage = () => {
    if (selectedText && text2) {
      const selectedOpt = selectedText;
      const saveData = JSON.parse(localStorage.getItem("text2")) || {};
      saveData[selectedOpt] = {
        text: text2,
      };
      localStorage.setItem("text2", JSON.stringify(saveData));
    }
    setText2("");
    // console.log("Text saved to local storage:", text2);
  };

  const moveUp = () => {
    const lines = text1.split("\n");
    const index = lines.findIndex((line) => line === selectedText);
    if (index > 0) {
      const temp = lines[index - 1];
      lines[index - 1] = lines[index];
      lines[index] = temp;
      setText1(lines.join("\n"));
      setSelectedText(lines[index - 1]); // Keep the selection at the moved text
    }
  };
  const moveUpComment = () => {
    const lines = text2.split("\n");
    const index = lines.findIndex((line) => line === selectedComment);
    if (index > 0) {
      const temp = lines[index - 1];
      lines[index - 1] = lines[index];
      lines[index] = temp;
      setText2(lines.join("\n"));
      setSelectedComment(lines[index - 1]); // Keep the selection at the moved text
    }
  };

  // Move the selected list item down
  const moveDown = () => {
    const lines = text1.split("\n");
    const index = lines.findIndex((line) => line === selectedText);
    if (index < lines.length - 1) {
      const temp = lines[index + 1];
      lines[index + 1] = lines[index];
      lines[index] = temp;
      setText1(lines.join("\n"));
      setSelectedText(lines[index + 1]); // Clear the selected text after moving
    }
  };
  const moveDownComment = () => {
    const lines = text2.split("\n");
    const index = lines.findIndex((line) => line === selectedComment);
    if (index < lines.length - 1) {
      const temp = lines[index + 1];
      lines[index + 1] = lines[index];
      lines[index] = temp;
      setText2(lines.join("\n"));
      setSelectedComment(lines[index + 1]); // Clear the selected text after moving
    }
  };

  // Sort the list alphabetically
  const sortList = () => {
    const lines = text1.split("\n");
    lines.sort();
    setText1(lines.join("\n"));
  };
  const sortListComment = () => {
    const lines = text2.split("\n");
    lines.sort();
    setText2(lines.join("\n"));
  };

  return (
    <div>
      <div className="Contant-create">
        <div className="template-card-create">
          <div className="template-selector-create">
            <span className="selecteditcommcreate">Select A Template</span>
            <button onClick={onClose} className="close-button-editcomm-create">
              X
            </button>
          </div>
          <div className="mainpart-create">
            <div className="flex items-center p-2">
              <p className="text-center text-sm">
                Add new inserts on the left side. Inserts could contain
                manufacturers, material types, directions, or anything else
                you'd like to contain in a drop down within a comment. Once you
                click on the name of the Insert on the left, the possible
                selections (comments) will appear on the right. Add/Delete
                comments or double click on a comment to rename it.
              </p>
            </div>

            <div className="list-of-create-btn">
              <div className="boxs-list-btn-create flex gap-4 justify-center">
                <div className="first-cont-create">
                  <div>
                    <ul className="flex gap-5 pr-4 tems-center text-center">
                      <div className="">
                        <div
                          className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                          onClick={handleAddListClick}
                        >
                          <li>
                            Add <br /> List
                          </li>
                        </div>

                        <div className="w-full">
                          {isAddListPopUp && (
                            <AddListPopUp
                              onClose={handlePopUpClose}
                              onSubmit={handleAddListSubmit}
                            />
                          )}
                        </div>
                      </div>
                      {/* <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={handleRenameList}
                      >
                        <li>
                          Rename <br /> List
                        </li>
                      </div> */}
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li onClick={openDeletetListPopup}>
                          Delete <br /> List
                        </li>
                        {deletetlistPopup && (
                          <div className="popup">
                            {/* Render your color palet component here */}
                            <DeleteListPopup onClose={closeDeletetListPopup} />
                          </div>
                        )}
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={moveUp}
                      >
                        <li>
                          Move <br /> up
                        </li>
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={moveDown}
                      >
                        <li>
                          Move <br /> Down
                        </li>
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={sortList}
                      >
                        <li>
                          sort <br /> list
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div className="pl-4 ">
                    <textarea
                      style={{
                        width: "56vh",
                        height: "42vh",
                        boxSizing: "border-box",
                      }}
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      onSelect={handleTextSelect}
                      readOnly
                    />
                  </div>
                </div>
                <div
                  className="second-cont-create"
                  // onMouseUp={handleTextSelection}
                >
                  <div>
                    <ul className="flex gap-2 items-center text-center">
                      <div>
                        <div
                          className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                          onClick={handleAddCommPopopClick}
                        >
                          <li>
                            Add <br /> Comments
                          </li>
                        </div>

                        {/* {isAddCommentsPopUp && (
                          <AddCommentsPopUp onClose={handlePopUpClose} />
                        )} */}
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={handleCommentDelete}
                      >
                        <li>
                          Delete <br /> Comments
                        </li>
                      </div>
                      {/* <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li onClick={openEditCommentListPopup}>
                          Edit <br /> Comment
                        </li>{" "}
                         {editCommentListPopup && (
                          <div className="popup">
                            {/* Render your color palet component here */}
                      {/* <EditCommentPopup
                              onClose={closeEditCommentListPopup}
                            /> */}
                      {/* </div> */}
                      {/* )}  */}
                      {/* </div> */}
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={moveUpComment}
                      >
                        <li>
                          Move <br /> up
                        </li>
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={moveDownComment}
                      >
                        <li>
                          Move <br /> Down
                        </li>
                      </div>
                      <div
                        className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                        onClick={sortListComment}
                      >
                        <li>
                          Sort <br /> Comments
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div className="pl-2">
                    <textarea
                      style={{
                        width: "54vh",
                        height: "42vh",
                        boxSizing: "border-box",
                      }}
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      readOnly
                      onClick={handleCommentSelection}
                    />
                  </div>
                </div>
              </div>{" "}
              {isAddCommentsPopUp && (
                <AddCommentsPopUp
                  // onClose={() => setSelectedText("")} // Reset selectedText when popup is closed
                  onSubmit={handleAddCommentsSubmit}
                  onClose={handlePopUpClose}
                />
              )}
            </div>
            <div className="text-center p-2">
              {/* <div className="mx-auto">
                <button className="btn-editcomm mr-2 w-32 text-sm">
                  Update Defaults
                </button>
              </div> */}
              <div className="mx-auto">
                <p>
                  Note that this only updates if the previous default was blank,
                  i.e., no default set and no value selected
                </p>
              </div>
            </div>

            <div className="text-center pt-5">
              <button
                className="btn-editcomm mr-2 w-24 text-sm"
                onClick={saveText2ToLocalStorage}
              >
                Ok
              </button>
              <button
                className="btn-editcomm mr-2 w-24 text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListEditComm;
