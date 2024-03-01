import React, { useEffect, useState } from "react";
import "./Location.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { PanalSelect } from "../Function/function";

const Location = ({ id, setId }) => {
  const [menuData, setMenuData] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedSubmenuId, setSelectedSubmenuId] = useState(null);
  const [submenuDetails, setSubmenuDetails] = useState(null);
  const [TabData, setTabData] = useState(null);
  const [panelId, setPanelId] = useState(null);
  const [panel, setPanel] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);

  useEffect(() => {
    if (selectedSubmenuId && menuData && menuData[selectedMenuId]) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedSubmenuId]);
    } else {
      setSubmenuDetails(null);
    }
  }, [selectedSubmenuId, menuData, selectedMenuId]);

  const handleMenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedMenuId(selectedId);
    setSelectedSubmenuId(null);
  };

  const handleSubmenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSubmenuId(selectedId);
    setPanelId(null); // Reset panelId when submenu changes
    // Update submenu details based on selected submenu ID
    if (
      menuData &&
      menuData[selectedMenuId] &&
      menuData[selectedMenuId].subdetails[selectedId]
    ) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedId]);
    } else {
      setSubmenuDetails(null);
    }
  };

  const handleTabChange = (e) => {
    const panelId = e.target.value;
    setPanelId(panelId);
    setId(panelId);
    setTabData(submenuDetails[panelId]);
  };

  useEffect(() => {
    console.log("menuData:", menuData);
  }, [menuData]);

  useEffect(() => {
    console.log("selectedMenuId:", selectedMenuId);
  }, [selectedMenuId]);

  useEffect(() => {
    console.log("selectedSubmenuId:", selectedSubmenuId);
  }, [selectedSubmenuId]);

  useEffect(() => {
    console.log("submenuDetails:", submenuDetails);
  }, [submenuDetails]);

  useEffect(() => {
    console.log("panelId:", panelId);
    console.log("TabData:", TabData);
  }, [panelId]);

  const handlePanel = () => {
    if (panelId && TabData) {
      setPanel(PanalSelect(TabData.Radiopanal, TabData));
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };
  return (
    <>
      <div className="container-for-locations-and-recall-component">
        <div className="syysysysy">
          <div className="PhotoReview-Location-container">
            <label htmlFor="menuDropdown">Location</label>
            <div>
              <select
                id="menuDropdown"
                className="PhotoReview-Location-first-inputfields"
                onChange={handleMenuChange}
              >
                <option value="">Select Menu</option>
                {menuData &&
                  Object.keys(menuData).map((menuId) => (
                    <option key={menuId} value={menuId}>
                      {menuData[menuId].name}
                    </option>
                  ))}
              </select>
              <br />
              <label htmlFor="submenuDropdown"></label>

              <select
                id="submenuDropdown"
                className="PhotoReview-Location-first-inputfields"
                onChange={handleSubmenuChange}
                disabled={!selectedMenuId}
              >
                <option value="">Select Submenu</option>
                {selectedMenuId &&
                  Object.keys(menuData[selectedMenuId].subitems).map(
                    (subkey) => (
                      <option
                        key={subkey}
                        value={menuData[selectedMenuId].subitems[subkey].si}
                      >
                        {menuData[selectedMenuId].subitems[subkey].subName}
                      </option>
                    )
                  )}
              </select>

              <label htmlFor="damageDropdown"></label>
              <br />
              <select
                id="damageDropdown"
                className="PhotoReview-Location-first-inputfields"
                disabled={!selectedSubmenuId}
                onChange={handleTabChange}
              >
                <option value="">Select Damage</option>
                {submenuDetails &&
                  Object.keys(submenuDetails)
                    .filter(
                      (subdetailkey) => !["id", "si"].includes(subdetailkey)
                    )
                    .map((subdetailkey) => (
                      <option key={subdetailkey} value={subdetailkey}>
                        {submenuDetails[subdetailkey].tabname}
                      </option>
                    ))}
              </select>
            </div>
            <div className="PhotoReview-Location-button">
              {/* <Link> */}
              <button onClick={handlePanel}>@</button>
              {/* </Link> */}
            </div>
            <div className="PhotoReview-Location-Checkbox-Container">
              <section className="Section-for-label-and-checkbox">
                <input type="checkbox" name="agree" />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Print At End
                </label>
              </section>
              <section className="Section-for-label-and-checkbox">
                <input
                  type="checkbox"
                  className="PhotoReview-Location-Checkbox-label"
                  name="agree"
                />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Summary
                </label>
              </section>
              <section className="Section-for-label-and-checkbox">
                <input type="checkbox" id="agree" name="agree" />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Use Location As Caption
                </label>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Popup container */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              Close
            </button>
            {/* Render the selected panel component */}
            {panel}
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
