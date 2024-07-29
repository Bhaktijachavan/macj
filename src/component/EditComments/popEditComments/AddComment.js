import React, { useEffect, useState, useRef } from "react";
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
import Alert from "../../Alert/Alert";
const AddComment = ({ onClose, value, setfetch }) => {
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [text, setText] = useState("");
  const [insertListPopup, setInsertListPopup] = useState(false);
  const [addLinkPopup, setAddLinkPopup] = useState(false);
  const [notesAndCaptions, setNotesAndCaptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [list, setList] = useState("");
  const [addlist, setAddList] = useState("");
  const [shortListed, setshortListed] = useState("");
  const [highlightColor, setHighlightColor] = useState("#000000");

  //alert state
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color: "",
  });
  const fileInputRef = useRef(null);
  useEffect(() => {
    // console.log("selectedImage", selectedImage);
    // console.log("value", value);

    if (selectedImage && value) {
      // Retrieve existing coverphotoImageData from localStorage
      let imageData = localStorage.getItem("coverphotoImage");
      if (!imageData) {
        imageData = {};
      } else {
        imageData = JSON.parse(imageData);
      }

      if (!Array.isArray(imageData[value])) {
        // If not, initialize it as an empty array
        imageData[value] = [];
      }
      const index = imageData[value].length;
      // Check if there is already data for the current value
      imageData[value].push({
        id: index,
        selectedText: "",
        subnames: "",
        NewTabs: "",
        caption: "",
        url: selectedImage,
      });

      // Update localStorage with the modified coverphotoImageData
      localStorage.setItem("coverphotoImage", JSON.stringify(imageData));
      window.location.reload();

      // Optionally, you can log the updated coverphotoImageData for debugging
      // console.log("Updated coverphotoImageData", imageData);
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     // Preview the selected image
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     // You can also save the file object if needed
  //     // setFileObject(file);
  //   }
  // };
  const handleDeletePhoto = () => {
    setSelectedImage(null);
    // window.alert("Are you want to delete this photo?");
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
  const handleColorhighlight = (e) => {
    const text = e.target.value;
    setHighlightColor(text);
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
      setfetch(true);

      console.log("Text saved successfully.");
      setText("");

      resetfetch();
    } catch (error) {
      console.error("Error saving text:", error);
    }
  };

  const resetfetch = () => {
    setTimeout(() => {
      setfetch(false);
    }, 2000);
  };
  // Function to handle change in selected option
  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  // const onSelectOption = (option) => {
  //   // Handle the selected option here
  //   console.log("Selected option:", option);
  // };

  // Function to handle change in selected option
  const onSelectOption = (option) => {
    // Set the selected option to the text area
    setList(option);
    // setShowDropdown(true);
    // Close the insert list popup
    setInsertListPopup(false);
  };
  const onSelectiontext = (text) => {
    console.log(text);
    setSelectedText(text);
  };
  const handleSelecttext = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    // console.log(selected);
    setList(selected);
  };
  // const handleInsertList = () => {
  //   // Concatenate text and list once
  //   const newText = `${text}${list}`;
  //   setText(newText);
  //   setAddList(""); // Clear list after insertion
  //   setList("");
  //   setShowDropdown(true);
  // };
  useEffect(() => {
    const newText = `${text}${list}`;
    setText(newText);
    setAddList(""); // Clear list after insertion
    setList("");
    if (list) {
      setShowDropdown(true);
    }
    // setShowDropdown(true);
  }, [list]);

  // const handleTextareaSelect = (e) => {
  //   const selectedText = window.getSelection().toString();
  //   setshortListed(selectedText);

  //   // if (selectedText === text) {
  //   //   setShowDropdown(false);
  //   //   // Additional logic or state updates as needed
  //   // } else {
  //   setShowDropdown(false);
  //   // }
  // };

  const handleTextareaSelect = (e) => {
    const selectedText = window.getSelection().toString();
    if (selectedText && !shortListed.includes(selectedText)) {
      setshortListed([
        ...shortListed,
        { text: selectedText, color: highlightColor },
      ]);
    }
    setShowDropdown(false);
  };
  const getHighlightedText = () => {
    if (shortListed.length === 0) {
      return text;
    }
    const parts = text.split(
      new RegExp(`(${shortListed.map((item) => item.text).join("|")})`, "gi")
    );
    return parts.map((part, index) => {
      const highlight = shortListed.find(
        (item) => item.text.toLowerCase() === part.toLowerCase()
      );
      return highlight ? (
        <span
          key={index}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            color: highlight.color,
          }}
        >
          {part}
        </span>
      ) : (
        part
      );
    });
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <div>
        <div className="Contant-editcomm">
          {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
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
                        onClick={handleEditNote}
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
                        onClick={handleEditCaption}
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
                  </li>
                </div>

                <div className="text-sm hover:bg-gray-300 cursor-pointer">
                  <li className="p-2">
                    <div className="flex justify-center">
                      <img
                        src={img6}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                        onClick={handleImageClick}
                      />
                    </div>
                    <label className="custom-file-upload">Link Photo</label>
                  </li>
                </div>

                {/* <div className="text-sm hover:bg-gray-300 cursor-pointer">
                  <li className="p-2">
                    <div className="flex justify-center">
                      <img
                        src={img7}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                        onClick={handleDeletePhoto}
                      />
                    </div>
                    <span onClick={handleDeletePhoto}>Delete Photo</span>
                  </li>
                </div> */}

                {/* <li className="flex items-center">
                  <span
                    onClick={handleBoldClick}
                    style={{
                      cursor: "pointer",
                      textDecoration: isBold ? "Bold" : "none",
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
                  <input
                    type="color"
                    value={highlightColor}
                    onChange={handleColorhighlight}
                  ></input>
                </li> */}
              </ul>
            </div>

            <div className="scroll-box-editcomm p-4 bg-gray-100">
              <div>
                {insertListPopup && (
                  <div className="popup">
                    <InsertListPopup
                      onClose={closeInsertListPopup}
                      // selectedOption={selectedOption}
                      // onSelectOption={setSelectedOption}
                      onSelectiontext={onSelectiontext}
                      onSelectOption={onSelectOption}
                    />
                  </div>
                )}
                {addLinkPopup && (
                  <div className="popup">
                    <AddLinkPopup
                      onClose={closeAddLinkPopup}
                      value={value}
                      setText={setText}
                    />
                  </div>
                )}
                <textarea
                  style={{
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    textDecoration: isUnderline ? "underline" : "none",
                    width: "100%",
                    height: "40vh",
                    boxSizing: "border-box",
                  }}
                  value={text || list}
                  onChange={
                    ((e) => setText(e.target.value)) ||
                    ((e) => setList(e.target.value))
                  }
                  onSelect={handleTextareaSelect}
                  // onClick={handleInsertList}
                />
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    marginTop: "20px",
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  {getHighlightedText()}
                </div>

                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8%", // Adjust based on your textarea height
                      left: "75%",
                      background: "white",
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      zIndex: 1000,
                    }}
                  >
                    <select value={selectedOption} onChange={handleSelecttext}>
                      <option>Select</option>
                      {selectedText.split("\n").map((line, index) => (
                        <option key={index}>{line}</option>
                      ))}
                    </select>
                  </div>
                )}
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
    </>
  );
};

export default AddComment;
