import React, { useState } from "react";
import "./Panel3.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import PannelComponent from "../PannelComponent/PannelComponent";
import EditComments from "./../../EditComments/EditComments";

function Panel2({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  console.log("props panelData", panelData);

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex items-center content-around">
        {" "}
        {showAlternateContent ? (
          <EditComments />
        ) : (
          // <div className="p-5">
          //   {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
          //     <div
          //       key={index}
          //       className="flex items-center mb-2 checkbox-container"
          //     >
          //       <input
          //         type="checkbox"
          //         id={label}
          //         name={label}
          //         value={label}
          //         style={{ backgroundColor: "#3182ce" }}
          //         className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
          //       />
          //       <label htmlFor={label}>{label}</label>
          //     </div>
          //   ))}
          // </div>
          console.log()
        )}
        <div>
          <div className="panel-heading text-center m-2">
            {panelData.damage1}
          </div>{" "}
          <div className="pl-2 ml-24">
            <div className="scroll-box4-panel3  bg-white"></div>
          </div>
        </div>{" "}
        {showAlternateContent ? (
          <EditComments />
        ) : (
          // <div className="p-5">
          //   {["Good", "Fair", "Poor", "N/A", "None"].map((label, index) => (
          //     <div
          //       key={index}
          //       className="flex items-center mb-2 checkbox-container"
          //     >
          //       <input
          //         type="checkbox"
          //         id={label}
          //         name={label}
          //         value={label}
          //         style={{ backgroundColor: "#3182ce" }}
          //         className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
          //       />
          //       <label htmlFor={label}>{label}</label>
          //     </div>
          //   ))}
          // </div>
          console.log()
        )}
        <div>
          <div className="panel-heading text-center m-2">
            {panelData.selection1}
          </div>
          <div className="pl-2 ml-40 flex">
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
            <div className="scroll-box4-panel3 bg-white"></div>
          </div>
        </div>
      </div>
      <div className="panel-heading text-center">{panelData.selection2}</div>
      <div>
        <PannelComponent showAlternateContent={showAlternateContent} />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel2;
