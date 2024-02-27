import React, { useState } from "react";
import "./Panel6.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import EditComments from "../../EditComments/EditComments";
import SelectionComponent from "../SelectionComponent/SelectionComponent";

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
          <SelectionComponent
            panelData={panelData}
            value={panelData.Selection1Data}
            classname={"scroll-box4-panel6 bg-white"}
          />
        </div>

        <div>
          <div className="panel-heading text-center m-2">
            {panelData.selection2}
          </div>
          <SelectionComponent
            panelData={panelData}
            value={panelData.Selection2Data}
            classname={"scroll-box4-panel6 bg-white"}
          />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel2;
