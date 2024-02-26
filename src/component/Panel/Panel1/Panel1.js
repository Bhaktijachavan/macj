import React, { useState } from "react";
import "./Panel1.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import PanelHeader from "../PanelHeader/PanelHeader";
import PannelComponent from "../PannelComponent/PannelComponent";
import { PanalSelect } from "../../Function/function";

function Panel1({ panelData }) {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
    const [savedData, setSavedData] = useState(null); // State to store saved data

    // Function to handle saving data from child component
    const handleSave = (data) => {
      // You can perform any necessary operations with the received data here
      // For now, just logging it
      console.log("Saved data:", data);
      setSavedData(data); // Update the saved data state
    };
  console.log("panel1", panelData);
  const toggleContent = () => {
    setShowAlternateContent((prevState) => !prevState);
  };
  return (
    <>
      <div>
        <div className="panel-heading text-center">{panelData.damage1}</div>

        <div>
          {/* Pass handleSave function as a prop to the child component */}
          <PannelComponent
            showAlternateContent={showAlternateContent}
            onSave={handleSave} // Pass the handleSave function as a prop
          />
        </div>
        <div className="panel-heading text-center">{panelData.damage2}</div>
        <div>
          {/* Pass handleSave function as a prop to the child component */}
          <PannelComponent
            showAlternateContent={showAlternateContent}
            onSave={handleSave} // Pass the handleSave function as a prop
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
