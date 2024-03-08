import React, { useState } from "react";
import "./Panel3.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import PannelComponent from "../PannelComponent/PannelComponent";
import EditComments from "./../../EditComments/EditComments";
import SelectionComponent from "../SelectionComponent/SelectionComponent";

function Panel2({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  console.log("props panelData", panelData);
  const [Damage1red, setDamage1Red] = useState();
  const [Damage1black, setDamage1Black] = useState();

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  return (
    <>
      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>{" "}
        <div>
          <PannelComponent
            showAlternateContent={showAlternateContent}
            setRed={setDamage1Red}
            setBlack={setDamage1Black}
            value={panelData.Damage1Data}
          />
        </div>
        <div className="flex">
          <div className="panel-heading text-center">
            {panelData.selection1}
            <div>
              <SelectionComponent
                panelData={panelData}
                value={panelData.Selection1Data}
              />
            </div>
          </div>
          <div className="panel-heading text-center">
            {panelData.selection2}
            <div>
              <SelectionComponent
                panelData={panelData}
                value={panelData.Selection2Data}
              />
            </div>
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
