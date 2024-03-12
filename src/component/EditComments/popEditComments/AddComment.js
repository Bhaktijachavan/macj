import React, { useState } from "react";
import img1 from "../../../Assets/icons/list.png";
import img2 from "../../../Assets/icons/create_list.png";
import img3 from "../../../Assets/icons/add_note.png";
import img4 from "../../../Assets/icons/caption.png";
import img5 from "../../../Assets/icons/link.png";
import img6 from "../../../Assets/icons/gallery.png";
import img7 from "../../../Assets/icons/remove.png";
import CreateListEditComm from "./CreateListEditComm";
import InsertListPopup from "./InsertListPopup/InsertListPopup";
import AddLinkPopup from "./AddLinkPopup/AddLinkPopup";

const AddComment = ({ onClose, value }) => {
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [text, setText] = useState("");
  const [insertListPopup, setInsertListPopup] = useState(false);
  const [addLinkPopup, setAddLinkPopup] = useState(false);
  const [notesAndCaptions, setNotesAndCaptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // You can also save the file object if needed
      // setFileObject(file);
    }
  };
  const handleDeletePhoto = () => {
    setSelectedImage(null);
    window.alert("Are you want to delete this photo?");
  };
  const handleEditNote = () => {
    setNotesAndCaptions([...notesAndCaptions, { type: "note", text }]);
    setText((prevText) => `${prevText} [[note]]`);
  };

  const handleEditCaption = () => {
    setNotesAndCaptions([...notesAndCaptions, { type: "caption", text }]);
    setText((prevText) => `${prevText} [[caption]]`);
  };
  const openAddLinkPopup = () => {
    setAddLinkPopup(true);
  };

  const closeAddLinkPopup = () => {
    setAddLinkPopup(false);
  };

  const openInsertListPopup = () => {
    setInsertListPopup(true);
  };

  const closeInsertListPopup = () => {
    setInsertListPopup(false);
  };

  const handleBoldClick = () => {
    document.execCommand("bold", false, null);
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    document.execCommand("italic", false, null);
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline", false, null);
    setIsUnderline(!isUnderline);
  };

  const clickCreatePop = () => {
    setIsCreateListVisible(true);
  };

  const SaveText = () => {
    console.log("Saving text:", text);
    try {
      // Handle saving notes and captions to local storage or your desired storage mechanism
      // ...

      // Reset the notes and captions state
      setNotesAndCaptions([]);
    } catch (error) {
      console.error("Error saving notes and captions:", error);
    }
    try {
      // Check if TempPanelData already exists in local storage
      let tempPanelData = localStorage.getItem("TempPanelData");
      if (!tempPanelData) {
        // If not, create an empty object
        tempPanelData = {};
      } else {
        // If it exists, parse the JSON string to an object
        tempPanelData = JSON.parse(tempPanelData);
      }

      // Check if value already exists in tempPanelData
      const storedText = tempPanelData[value];
      const newText = storedText ? `${storedText}\n${text}` : text;

      // Update the value under the specified key
      tempPanelData[value] = newText;

      // Save the updated data back to local storage
      localStorage.setItem("TempPanelData", JSON.stringify(tempPanelData));

      console.log("Text saved successfully.");
      setText("");
    } catch (error) {
      console.error("Error saving text:", error);
    }
  };
  return (
    <div>
      <div className="Contant-editcomm">
        <div className="template-card-editcomm">
          <div className="template-selector-editcomm">
            <span className="selecteditcomm">Select A Template</span>
            <button onClick={onClose} className="close-button-editcomm">
              X
            </button>
          </div>
          <div className="buttonlists-editcomm">
            <ul className="flex gap-5 pl-4">
              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2" onClick={openInsertListPopup}>
                  <div className="flex justify-center">
                    <img
                      src={img1}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <span>Insert List</span>
                </li>
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2" onClick={clickCreatePop}>
                  <div className="flex justify-center">
                    <img
                      src={img2}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <span>Create/Edit Lists</span>
                </li>
                {isCreateListVisible && (
                  <CreateListEditComm
                    onClose={() => setIsCreateListVisible(false)}
                  />
                )}
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2">
                  <div className="flex justify-center">
                    <img
                      src={img3}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <button onClick={handleEditNote}>Add Note</button>
                </li>
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2">
                  <div className="flex justify-center">
                    <img
                      src={img4}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <button onClick={handleEditCaption}>Add Caption</button>
                </li>
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2" onClick={openAddLinkPopup}>
                  <div className="flex justify-center">
                    <img
                      src={img5}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>

                  <span>Link</span>
                </li>{" "}
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2">
                  <div className="flex justify-center">
                    <img
                      src={img6}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <label className="custom-file-upload">
                    <input type="file" onChange={handleImageChange} hidden />
                    Link Photo
                  </label>
                </li>
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2">
                  <div className="flex justify-center">
                    <img
                      src={img7}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  <span onClick={handleDeletePhoto}>Delete Photo</span>
                </li>
              </div>

              <li className="flex items-center">
                <span
                  onClick={handleBoldClick}
                  style={{
                    cursor: "pointer",
                    textDecoration: isBold ? "underline" : "none",
                  }}
                >
                  B
                </span>
              </li>
              <li className="flex items-center">
                <span
                  onClick={handleItalicClick}
                  style={{
                    cursor: "pointer",
                    fontStyle: isItalic ? "italic" : "normal",
                  }}
                >
                  I
                </span>
              </li>
              <li className="flex items-center">
                <span
                  onClick={handleUnderlineClick}
                  style={{
                    cursor: "pointer",
                    textDecoration: isUnderline ? "underline" : "none",
                  }}
                >
                  U
                </span>
              </li>
              <li className="text-sm flex items-center">
                <input type="color"></input>
              </li>
            </ul>
          </div>

          <div className="scroll-box-editcomm p-4 bg-gray-100">
            <div>
              {insertListPopup && (
                <div className="popup">
                  <InsertListPopup onClose={closeInsertListPopup} />
                </div>
              )}
              {addLinkPopup && (
                <div className="popup">
                  <AddLinkPopup onClose={closeAddLinkPopup} value={value} setText={setText}/>
                </div>
              )}
              <textarea
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  width: "100%",
                  height: "40vh",
                  boxSizing: "border-box",
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

          <div className="button-container-editcomm">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <button className="open-button-editcomm" onClick={SaveText}>
              Ok
            </button>
            <button className="cancel-button-editcomm" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
