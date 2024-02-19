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

const AddComment = ({ onClose }) => {
  const [isCreateListVisiable, setIsCreateListVisiable] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [text, setText] = useState("");
  const [insertlistPopup, setInsertlistPopup] = useState(false);
  const openInsertlistPopup = () => {
    setInsertlistPopup(true);
  };

  const closeInsertlistPopup = () => {
    setInsertlistPopup(false);
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
    setIsCreateListVisiable(true);
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
                <li className="p-2" onClick={openInsertlistPopup}>
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
                {isCreateListVisiable && (
                  <CreateListEditComm
                    onClose={() => setIsCreateListVisiable(false)}
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
                  <span>Add Note</span>
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
                  <span>Add Caption</span>
                </li>
              </div>

              <div className="text-sm hover:bg-gray-300 cursor-pointer">
                <li className="p-2">
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
                    />
                  </div>
                  <span>Link Photo</span>
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
                  <span>Delete Photo</span>
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
              {" "}
              {insertlistPopup && (
                <div className="popup">
                  {/* Render your color palet component here */}
                  <InsertListPopup onClose={closeInsertlistPopup} />
                </div>
              )}
              <textarea
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  width: "115vh",
                  height: "40vh",
                  boxSizing: "border-box",
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />{" "}
            </div>{" "}
          </div>

          <div className="button-container-editcomm">
            <button className="open-button-editcomm">Ok</button>
            <button className="cancel-button-editcomm" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AddComment;
