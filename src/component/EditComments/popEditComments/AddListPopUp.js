import React, { useState } from "react";
import "./AddListPopUp.css";

const AddListPopUp = ({ onClose, onSubmit }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = () => {
    const formattedListName = `<<${listName}>>`;
    onSubmit(formattedListName);
    // onClose();
    setListName("");
  };
  return (
    <div>
      <div className="Contant-addlistpopup">
        <div className="template-card-addlistpopup">
          <div className="template-selector-addlistpopup">
            <span className="selecteditaddlistpopup">Select A Template</span>
            <button onClick={onClose} className="close-button-addlistpopup">
              X
            </button>
          </div>
          <div className="pt-7">
            <div className="Title-Addpopup">
              <p className="text-sm">Enter the name of your new list</p>
              <p className="text-sm">
                Do not include &lt;&lt;&gt;&gt;, the program adds them
                automatically to help the list name stand out within comments
              </p>
            </div>
            <div className="flex p-2 justify-center gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Enter new list"
                  class="w-72 px-1 py-1 border rounded"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              <div>
                {/* <select className="w-28 px-1 py-1 border rounded">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select> */}
              </div>
            </div>

            <div>
              {" "}
              <div className="text-center">
                <button
                  className="btn-editcomm mr-2 w-24 text-sm"
                  onClick={handleSubmit}
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
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListPopUp;
