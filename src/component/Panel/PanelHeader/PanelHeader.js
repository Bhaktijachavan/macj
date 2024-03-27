import React, { useEffect, useState } from "react";

import Header from "../../Header/Header";
import { useLocation } from "react-router-dom";
import { PanalSelect } from "../../Function/function";
import EditComments from "../../EditComments/EditComments";
import { useEditTempContext } from "../../../Context";

const PanelHeader = () => {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState(null);
  const state = location.state;
  console.log("headerdata", state);

  const [selectedPanel, setSelectedPanel] = useState(null);
  const { showComment, setShowComment } = useEditTempContext();

  const handleButtonClick = (panelNumber, panelData) => {
    const panelComponent = PanalSelect(panelNumber, panelData);
    setSelectedPanel(panelComponent);
    setActivePanel(panelNumber);
  };

  return (
    <>
      <div>
        <Header />
        <div className="panelheader flex border-b  border-black">
          <div>
            <div>
              <ul
                style={{ display: "flex", listStyle: "none", padding: 0 }}
                className="gap-2"
              >
                {state &&
                  Object.keys(state).map((key) => {
                    const panelData = state[key];
                    console.log("panelData", panelData);
                    const panelNumber = parseInt(panelData?.Radiopanal);
                    console.log("panelNumber", panelNumber);
                    return (
                      <li key={key}>
                        <button
                          onClick={() =>
                            handleButtonClick(panelNumber, panelData)
                          }
                          className={
                            "border-r-2 border-black  " +
                            (panelNumber === activePanel
                              ? " bg-gray-300 text-black"
                              : "")
                          }
                        >
                          {panelData.tabname}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {showComment && <EditComments />}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {selectedPanel}
          </div>
        </div>
      </div>
    </>
  );
};
export default PanelHeader;
