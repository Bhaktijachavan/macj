import React, { useState } from "react";
import "./Panel6.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import EditComments from "../../EditComments/EditComments";

function Panel2({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  console.log("panal 6 ", panelData);

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  return (
    <>
      <div>
        <div>
          <div className="panel-heading text-center m-2">
            {panelData.selection1}
          </div>
          <div className="pl-2 m-2 flex">
            {" "}
            {showAlternateContent ? (
              <EditComments />
            ) : (
              <div className="p-5">
                {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 checkbox-container"
                  >
                    <input
                      type="checkbox"
                      id={label}
                      name={label}
                      value={label}
                      style={{ backgroundColor: "#3182ce" }}
                      className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                    />
                    <label htmlFor={label}>{label}</label>
                  </div>
                ))}
              </div>
            )}
            <div className="scroll-box4-panel6 bg-white"></div>
          </div>
        </div>

        <div>
          <div className="panel-heading text-center m-2">
            {panelData.selection2}
          </div>
          <div className="pl-2 m-2 flex">
            {" "}
            {showAlternateContent ? (
              <EditComments />
            ) : (
              <div className="p-5">
                {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 checkbox-container"
                  >
                    <input
                      type="checkbox"
                      id={label}
                      name={label}
                      value={label}
                      style={{ backgroundColor: "#3182ce" }}
                      className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                    />
                    <label htmlFor={label}>{label}</label>
                  </div>
                ))}
              </div>
            )}
            <div className="scroll-box4-panel6 bg-white"></div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel2;
