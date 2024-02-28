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

  const handlesave = () => {
    console.log("Saving data...");

    try {
      // Check if DamageData already exists in local storage
      let tempPanelData = localStorage.getItem("DamageData");
      if (!tempPanelData) {
        // If not, create an empty object
        tempPanelData = {};
      } else {
        // If it exists, parse the JSON string to an object
        tempPanelData = JSON.parse(tempPanelData);
      }

      // Create a nested object for Damage1Data if it doesn't exist
      if (!tempPanelData[panelData.Damage1Data]) {
        tempPanelData[panelData.Damage1Data] = {};
      }

      // Store Damage1red and Damage1black values under Damage1Data
      tempPanelData[panelData.Damage1Data]["Damage1red"] = Damage1red;
      tempPanelData[panelData.Damage1Data]["Damage1black"] = Damage1black;

      console.log("tempPanelData", tempPanelData);

      // Save the updated data back to local storage
      localStorage.setItem("DamageData", JSON.stringify(tempPanelData));

      console.log("Data saved successfully.");
      // No need to reset any state here since there's no 'text' state being used
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };



  useEffect(() => {
    console.log("Damage1red", Damage1red);
    console.log("Damage1black", Damage1black);
  }, [Damage1red, Damage1black]);

  return (
    <>
      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>
        <div className="flex justify-center items-center">
          <button
            onClick={handlesave}
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Save Data For report
          </button>
        </div>

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
