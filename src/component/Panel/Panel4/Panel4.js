import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import PannelComponent from "../PannelComponent/PannelComponent";
import { PanalSelect } from "../../Function/function";

function Panel4({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  const [text, setText] = useState(""); // Define text state
  const [Damage1red, setDamage1Red] = useState();
  const [Damage1black, setDamage1Black] = useState();
  const [Damage2red, setDamage2Red] = useState();
  const [Damage2black, setDamage2Black] = useState();

  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };

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
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel4;
