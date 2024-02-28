import React, { useState } from "react";
import "./Panel2.css";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import Header from "./../../Header/Header";
import EditComments from "../../EditComments/EditComments";
import SelectionComponent from "../SelectionComponent/SelectionComponent";
import PannelComponent from "../PannelComponent/PannelComponent";

function Panel2({ panelData }) {
  console.log("props paneldata", panelData);
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  const [Damage1red, setDamage1Red] = useState();
  const [Damage1black, setDamage1Black] = useState();

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
            classname={"scroll-box4-panel2 bg-white"}
            panelData={panelData}
            value={panelData.Selection1Data}
          />
        </div>
      </div>

      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>
      </div>
      <PannelComponent
        showAlternateContent={showAlternateContent}
        setRed={setDamage1Red}
        setBlack={setDamage1Black}
        value={panelData.Damage1Data}
      />

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel2;
