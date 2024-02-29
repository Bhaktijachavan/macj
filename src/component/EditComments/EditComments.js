import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "./../Footer/Footer";
import AddComment from "./popEditComments/AddComment";
import "./EditComments.css";

const EditComments = ({ onClose, value, handleDelete }) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const handleAddButtonClick = () => {
    setAddModalVisible(true);
  };

  const handleCancelButtonClick = () => {
    setAddModalVisible(false);
    onClose();
  };

  return (
    <>
      <div className="cont-editcomm">
        <div className="button-editcomm">
          <div className="">
            <div className="flex flex-col">
              <button className="btn-editcomm mr-2 w-24 text-sm">
                Move Up
              </button>
              <button className="btn-editcomm mr-2 w-24 text-sm">
                Move Down
              </button>
              <button className="btn-editcomm mr-2  w-24 text-sm">Sort</button>
              <button
                className="btn-editcomm mr-2  w-24 text-sm"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn-editcomm  w-24 text-sm"
                onClick={handleAddButtonClick}
              >
                Add
              </button>
              {isAddModalVisible && (
                <AddComment
                  onClose={() => setAddModalVisible(false)}
                  value={value}
                />
              )}
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-600">
                Item Separator
              </label>
              <select className="btn w-24 h-7">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-600">
                Description text
              </label>
              <textarea className="btn-editcomm w-24 h-7 border"></textarea>
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
