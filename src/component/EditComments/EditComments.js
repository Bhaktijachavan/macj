import React, { useState } from "react";

import AddComment from "./popEditComments/AddComment";
import "./EditComments.css";

const EditComments = ({
  value,
  handleDelete,
  sortCommentText,
  moveUp,
  moveDown,
  setDiscriptionText,
  setfetch,
  discriptionText,
}) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const handleAddButtonClick = () => {
    setAddModalVisible(true);
  };

  return (
    <>
      <div className="cont-editcomm">
        <div className="button-editcomm">
          <div className="">
            <div className="flex flex-col gap-2">
              <button
                className="btn-editcomm mr-2 w-[7em] text-sm"
                onClick={() => {
                  moveUp();
                }}
              >
                Move Up
              </button>
              <button
                className="btn-editcomm mr-2 w-[7em] text-sm"
                onClick={() => {
                  moveDown();
                }}
              >
                Move Down
              </button>
              <button
                className="btn-editcomm mr-2  w-[7em] text-sm"
                onClick={() => {
                  sortCommentText();
                }}
              >
                Sort
              </button>
              <button
                className="btn-editcomm mr-2 w-[7em] text-sm"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn-editcomm w-[7em] text-sm"
                onClick={handleAddButtonClick}
              >
                Add
              </button>
              {isAddModalVisible && (
                <AddComment
                  onClose={() => setAddModalVisible(false)}
                  value={value}
                  setfetch={setfetch}
                />
              )}
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-600">
                Item Separator
              </label>
              <select className="btn w-[7em] h-7">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-600">
                Description text
              </label>
              <input
                className="btn-editcomm w-[7em] h-7 border"
                value={discriptionText ? discriptionText : ""}
                onChange={(e) => setDiscriptionText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </>
  );
};

export default EditComments;
