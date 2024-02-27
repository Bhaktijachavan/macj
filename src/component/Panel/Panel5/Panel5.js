import React, { useState } from "react";
import "./Panel5.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import EditComments from "./../../EditComments/EditComments";
import SelectionComponent from "../SelectionComponent/SelectionComponent";

function Panel2({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  console.log("panel5 ", panelData);

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  return (
    <>
      <div>
        <div className="panel-heading text-center m-2">
          {panelData.selection1}
        </div>
        <div>
          <SelectionComponent
            classname={"scroll-box4-panel5 bg-white"}
            value={panelData.Selection1Data}
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
