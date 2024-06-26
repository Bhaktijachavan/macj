import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import { useLocation } from "react-router-dom";
import { PanalSelect } from "../../Function/function";
import EditComments from "../../EditComments/EditComments";
import { useEditTempContext } from "../../../Context";

const PanelHeader = () => {
  const location = useLocation();
  const [activePanelKey, setActivePanelKey] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const { showComment } = useEditTempContext();
  const state = location.state;

  useEffect(() => {
    // Check if there's saved state in localStorage
    const savedActivePanelKey = localStorage.getItem("activePanelKey");
    const savedPanelData = localStorage.getItem("selectedPanelData");

    if (savedActivePanelKey && savedPanelData) {
      setActivePanelKey(savedActivePanelKey);
      const panelData = JSON.parse(savedPanelData);
      const panelNumber = parseInt(panelData?.Radiopanal);
      const panelComponent = PanalSelect(panelNumber, panelData);
      setSelectedPanel(panelComponent);
    }

    // Clear localStorage after loading the state
    localStorage.removeItem("activePanelKey");
    localStorage.removeItem("selectedPanelData");
  }, []);

  const handleButtonClick = (key, panelNumber, panelData) => {
    console.log("handleButtonClick called with:", key, panelNumber, panelData);

    // Store state in localStorage before reloading
    localStorage.setItem("activePanelKey", key);
    localStorage.setItem("selectedPanelData", JSON.stringify(panelData));

    // Reload the page
    window.location.reload();
  };

  // useEffect(() => {
  //   console.log("selectedPanel updated:", selectedPanel);
  // }, [selectedPanel]);

  return (
    <>
      <div>
        <Header />
        <div className="panelheader flex border-b border-black">
          <div>
            <div>
              <ul
                style={{ display: "flex", listStyle: "none", padding: 0 }}
                className="gap-2"
              >
                {state &&
                  Object.keys(state).map((key) => {
                    const panelData = state[key];
                    const panelNumber = parseInt(panelData?.Radiopanal);
                    return (
                      <li key={key}>
                        <button
                          onClick={() =>
                            handleButtonClick(key, panelNumber, panelData)
                          }
                          className={
                            "border-r-2 border-black " +
                            (key === activePanelKey
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
              padding: "10px",
              border: "1px solid black",
              marginTop: "10px",
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
