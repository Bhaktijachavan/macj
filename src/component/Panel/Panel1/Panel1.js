import React, { useEffect, useState } from "react";
import "./Panel1.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import PannelComponent from "../PannelComponent/PannelComponent";
import { PanalSelect } from "../../Function/function";

function Panel1({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  const [Damage1red, setDamage1Red] = useState();
  const [Damage1black, setDamage1Black] = useState();
  const [Damage2red, setDamage2Red] = useState();
  const [Damage2black, setDamage2Black] = useState();
  const damage1 = "damage1";
  const damage2 = "damage2";

  console.log("paneldata ", panelData);
  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  useEffect(() => {
    console.log("red", Damage1red);
    console.log("black", Damage1black);
  }, [Damage1red, Damage1black]);

  return (
    <>
      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>

        <div>
          <PannelComponent
            showAlternateContent={showAlternateContent}
            setRed={setDamage1Red}
            setBlack={setDamage1Black}
            value={panelData.Damage1Data}
          />
        </div>
        <div className="panel-heading text-center">{panelData.damage2}</div>

        <div>
          <PannelComponent
            showAlternateContent={showAlternateContent}
            setRed={setDamage2Red}
            setBlack={setDamage2Black}
            value={panelData.Damage2Data}
          />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel1;
