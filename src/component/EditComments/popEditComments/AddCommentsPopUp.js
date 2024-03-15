import React from "react";
import "./AddCommentsPopUp.css";
import InspectionSignature from "./../../CoverPageDesigner/Inspection Signature/InspectionSignature";

const AddCommentsPopUp = ({ onClose }) => {
  return (
    <div>
      <div className="Contant-addCommentsPopUp">
        <div className="template-card-addCommentsPopUp">
          <div className="template-selector-addCommentsPopUp">
            <span className="selecteditaddCommentsPopUp">
              Select A Template
            </span>
            <button onClick={onClose} className="close-button-addCommentsPopUp">
              X
            </button>
          </div>
          <div className="pt-8">
            <div className="Title-addCommentsPopUp">
              <p className="text-sm text-center pl-2">
                Enter the new comment name to add to this list{" "}
              </p>
            </div>
            <div className="p-2">
              <div>
                <input
                  type="text"
                  placeholder="Enter new list"
                  class="w-72 px-1 py-1 border rounded text-left w-full"
                />
              </div>
            </div>

            <div>
              {" "}
              <div className="text-center">
                <button className="btn-editcomm mr-2 w-24 text-sm">Ok</button>
                <button className="btn-editcomm mr-2 w-24 text-sm">
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

export default AddCommentsPopUp;
