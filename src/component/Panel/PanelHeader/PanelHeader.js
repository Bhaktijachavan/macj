import React, { useEffect, useState } from "react";

import Header from "../../Header/Header";
import { useLocation } from "react-router-dom";
import { PanalSelect } from "../../Function/function";

const PanelHeader = () => {
  const location = useLocation();
  const state = location.state;
  console.log("headerdata", state);

  const [selectedPanel, setSelectedPanel] = useState(null);

  const handleButtonClick = (panelNumber, panelData) => {
    const panelComponent = PanalSelect(panelNumber, panelData);
    setSelectedPanel(panelComponent);
  };

  return (
    <>
      <div>
        <Header />
        <div className="panelheader flex border-b  border-black">
          <div>
            <div>
              <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
                {state &&
                  Object.keys(state).map((key) => {
                    const panelData = state[key];
                    console.log("panelData", panelData);
                    const panelNumber = parseInt(panelData?.Radiopanal);
                    console.log("panelNumber", panelNumber);
                    return (
                      <li key={key} style={{ marginRight: "10px" }}>
                        <button
                          onClick={() =>
                            handleButtonClick(panelNumber, panelData)
                          }
                        >
                          {panelData.tabname} |
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div>{selectedPanel}</div>
        </div>
      </div>
    </>
  );
};
export default PanelHeader;
