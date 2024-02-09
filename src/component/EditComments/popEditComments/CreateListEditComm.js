import React, { useState } from "react";
import "./CreateListEditComm.css";
import AddListPopUp from "./AddListPopUp.js";

const CreateListEditComm = ({ onClose }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isAddListPopUp, setAddListPopUp] = useState(false);
  const [isAddCommentsPopUp, setIsAddCommentsPopUp] = useState(false);

  const handleAddListClick = () => {
    setAddListPopUp(true);
    setIsAddCommentsPopUp(true);
  };

  const handlePopUpClose = () => {
    setAddListPopUp(false);
    setIsAddCommentsPopUp(false);
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
                      <div className="pl-4">
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
                          <AddListPopUp onClose={handlePopUpClose} />
                        )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Rename <br /> List
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Delete <br /> List
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Move <br /> up
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Move <br /> Down
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          sort <br /> list
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div className="pl-4">
                    <textarea
                      style={{
                        width: "54vh",
                        height: "42vh",
                        boxSizing: "border-box",
                      }}
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="second-cont-create">
                  <div>
                    <ul className="flex gap-2 items-center text-center">
                      <div>
                        <div
                          className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer"
                          onClick={handleAddListClick}
                        >
                          <li>
                            Add <br /> Comments
                          </li>
                        </div>

                        {/* {isAddCommentsPopUp && <AddCommentsPopUp onClose={handlePopUpClose} />} */}
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Delete <br /> Comments
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Edit <br /> Comment
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Move <br /> up
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Move <br /> Down
                        </li>
                      </div>
                      <div className="flex-shrink-0 p-2 text-sm hover:bg-gray-300 cursor-pointer">
                        <li>
                          Sort <br /> Comments
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div className="pl-2">
                    <textarea
                      style={{
                        width: "56vh",
                        height: "42vh",
                        boxSizing: "border-box",
                      }}
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center p-2">
              <div className="mx-auto">
                <button className="btn-editcomm mr-2 w-32 text-sm">
                  Update Defaults
                </button>
              </div>
              <div className="mx-auto">
                <p>
                  Note that this only updates if the previous default was blank,
                  i.e., no default set and no value selected
                </p>
              </div>
            </div>

            <div className="text-center pt-5">
              <button className="btn-editcomm mr-2 w-24 text-sm">Ok</button>
              <button className="btn-editcomm mr-2 w-24 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListEditComm;
