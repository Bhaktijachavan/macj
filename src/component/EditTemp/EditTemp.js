import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FaFolderOpen } from "react-icons/fa";
import OneDamage from "../EditTemp/OneDamage/OneDamage";
import twoDamage from "../EditTemp/twoDamage/TwoDamage";
import OneSelection from "../EditTemp/oneSelection/OneSelection";
import twoSelection from "../EditTemp/twoSelection/TwoSelection";
import oneDamageSelection from "../EditTemp/oneDamageSelection/OneDamageSelection";
import OneDamageTwoSelection from "../EditTemp/oneDamageTwoSelection/OneDamageTwoSelection";
import "./EditTemp.css";
import { Link } from "react-router-dom";
import Inspection from "./Inspection/Inspection";
import TwoSelection from "./twoSelection/TwoSelection";
import TwoDamage from "./twoDamage/TwoDamage";
import OneDamageSelection from "./oneDamageSelection/OneDamageSelection";
import { EditTempContext } from "../../Context";
const EditTemp = ({ onClose }) => {
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [meduData, setMenuData] = useState("");

  const [selectedTabName, setSelectedTabName] = useState("");
  const handleTabNameChange = (event) => {
    setSelectedTabName(event.target.value);
    setOnedamagePanelName(event.target.value); // Add this line
    console.log("Tab Name in Parent Component:", event.target.value);
  };
  const handleOneDamageDone = (formData) => {
    console.log("Received formData from OneDamage:", formData);
    console.log("selected sub id ", selectedSubItemIndex);

    const updatedMenuData = menuData.map((item) =>
      item.menuname
        ? {
            ...item,
            subItems: item.subItems.map((subItem, index) =>
              index === selectedSubItemIndex
                ? {
                    ...subItem,
                    radioBoxSelection: "oneDamagePanal",
                    tabName: formData.onetabName,
                    onedamagePanelName: formData.onedamagePanelName,
                  }
                : subItem
            ),
          }
        : item
    );
    console.log("updated menudata", updatedMenuData);
    setMenuData(updatedMenuData);
    setIsPopupOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isRadioOptionSelected, setIsRadioOptionSelected] = useState(false);
  const { setEditTempData } = useContext(EditTempContext);
  const [item] = useState();
  const [onetabNames, setOnetabNames] = useState([]);
  const [popupStates, setPopupStates] = useState({
    "Option 1": false,
    "Option 2": false,
    "Option 3": false,
    "Option 4": false,
    "Option 5": false,
    "Option 6": false,
  });
  const componentsMap = {
    "Option 1": OneDamage,
    "Option 2": twoDamage,
    "Option 3": OneSelection,
    "Option 4": twoSelection,
    "Option 5": oneDamageSelection,
    "Option 6": OneDamageTwoSelection,
  };
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    localStorage.setItem("selectedPanel", value);
  };
  const [selectedPanel, setSelectedPanel] = useState("");
  const handlePanelSelect = (panelName) => {
    setSelectedPanel(panelName);
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("oneDamageFormData");
    try {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData && parsedData.onetabName) {
        // Check if the onetabName is not already in the array
        if (!onetabNames.includes(parsedData.onetabName)) {
          setOnetabNames((prevOnetabNames) => [
            ...prevOnetabNames,
            parsedData.onetabName,
          ]);
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  });
  const handleLocalStorageUpdate = () => {
    const localStorageData = localStorage.getItem("oneDamageFormData");
    try {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData && parsedData.onetabName) {
        if (!onetabNames.includes(parsedData.onetabName)) {
          setOnetabNames((prevOnetabNames) => [
            ...prevOnetabNames,
            parsedData.onetabName,
          ]);
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  };
  useEffect(() => {
    if (selectedOption && !popupStates[selectedOption]) {
      console.log("Closing popup");
      setSelectedOption("");
    }
  }, [popupStates]);
  const openPopup = () => {
    setPopupStates((prevState) => ({
      ...prevState,
      [selectedOption]: true,
    }));
  };
  const closePopup = () => {
    setPopupStates((prevState) => ({
      ...prevState,
      [selectedOption]: false,
    }));
    console.log("closing");
  };
  const handleCancel = () => {
    setSelectedOption("");
    setPopupStates((prevState) => ({
      ...prevState,
      [selectedOption]: false,
    }));
    console.log("Cancel clicked");
  };
  const handleBack = () => {
    console.log("Back clicked");
  };
  const handleDone = () => {
    console.log("Done clicked");
    closePopup();
  };
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [items, setItems] = useState([]);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(null);
  const [selectedSubItemIndex, setSelectedSubItemIndex] = useState(null);
  const [lastSelectionType, setLastSelectionType] = useState("menu"); // 'menu' or 'menuItem'
  const [selectedMenuTitleIndex, setSelectedMenuTitleIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [onedamagePanelName, setOnedamagePanelName] = useState("");
  const handleAddClick = () => {
    setDisplayText(inputText);
    setInputText("");
  };
  const handleInputChange = (event) => {
    setNewItemName(event.target.value);
  };
  const handleMenuItemChange = (event) => {
    setMenuItem(event.target.value);
  };
  const handleSelectMenuItem = (index) => {
    setSelectedMenuItemIndex(index);
    setLastSelectionType(index === null ? "menu" : "menuItem");
    setShowPopup(true);
  };
  const handleSelectSubItem = (subIndex) => {
    setSelectedSubItemIndex(subIndex);
    setShowPopup(true);
  };
  const handleSelectMenuTitle = (index) => {
    setSelectedMenuTitleIndex(index);
    setSelectedMenuItemIndex(null);
    setSelectedSubItemIndex(null);
  };
  const storedMenuData = localStorage.getItem("menuData");
  const menuData = JSON.parse(storedMenuData);
  console.log(menuData);
  useEffect(() => {
    localStorage.setItem("menuData", JSON.stringify(items));
    setEditTempData(items);
  }, [items]);
  const handleAddMenuItem = (event) => {
    event.preventDefault();
    let updatedItems;
    if (lastSelectionType === "menu" && selectedMenuTitleIndex !== null) {
      updatedItems = [...items];
      const newItem = {
        id: Date.now(),
        menuname: menuItem,
        subItems: [],
      };
      updatedItems[selectedMenuTitleIndex] = newItem;
      setMenuItem("");
      setLastSelectionType("menuItem");
    } else if (
      lastSelectionType === "menuItem" &&
      selectedMenuItemIndex !== null
    ) {
      const selectedItem = items[selectedMenuItemIndex];
      if (
        !selectedItem.subItems.find((item) => item.submenuname === menuItem)
      ) {
        updatedItems = [...items];
        const newSubItem = {
          id: Date.now(),
          submenuname: menuItem,
          radioBoxSelection: "", // Set your default value or leave it empty
          tabName: "", // Set your default value or leave it empty
        };
        updatedItems[selectedMenuItemIndex] = {
          ...selectedItem,
          subItems: [...selectedItem.subItems, newSubItem],
        };
        setMenuItem("");
      }
    } else {
      updatedItems = [
        ...items,
        {
          id: Date.now(),
          menuname: menuItem,
          subItems: [],
        },
      ];
      setMenuItem("");
      setLastSelectionType("menu");
    }
    setItems(updatedItems);
    console.log("setitems : ", setItems);
  };
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleDoubleClick = (index) => {
    setSelectedMenuItemIndex(index);
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleOkButtonClick = () => {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedMenuItemIndex
          ? { ...item, menuname: newItemName }
          : item
      )
    );
    setPopupVisible(false);
  };
  const handleRemoveItem = () => {
    if (selectedSubItemIndex !== null) {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((menuItem) => {
          if (menuItem.subItems && menuItem.subItems.length > 0) {
            const updatedSubItems = menuItem.subItems.filter(
              (_, index) => index !== selectedSubItemIndex
            );
            return {
              ...menuItem,
              subItems: updatedSubItems,
            };
          }
          return menuItem;
        });
        return updatedItems;
      });
    }
  };
  const handleCopyItems = () => {
    if (lastSelectionType === "menu" && selectedMenuTitleIndex !== null) {
      const copiedMenu = { ...items[selectedMenuTitleIndex] };
      setItems((prevItems) => [...prevItems, copiedMenu]);
    } else if (
      lastSelectionType === "menuItem" &&
      selectedMenuItemIndex !== null
    ) {
      const copiedMenuItem = { ...items[selectedMenuItemIndex] };
      setItems((prevItems) => [...prevItems, copiedMenuItem]);
    }
  };

  const handleClosePopupInspection = () => {
    console.log("popup close");
    setIsPopupOpen(false);
  };
  const openPopupInspection = (subItemId, subItemName) => {
    console.log("popup open");
    console.log("Subitem ID:", subItemId);
    console.log("Subitem Name:", subItemName);
    setIsPopupOpen(true);
  };
  const handleAddButtonClick = () => {
    if (selectedSubItemIndex !== null) {
      const selectedMenuItem = items[selectedMenuItemIndex];
      const selectedSubItem = selectedMenuItem.subItems[selectedSubItemIndex];
      const updatedItems = [...items];
      updatedItems[selectedMenuItemIndex] = {
        ...selectedMenuItem,
        subItems: [
          ...selectedMenuItem.subItems.slice(0, selectedSubItemIndex),
          {
            ...selectedSubItem,
            tabName: selectedTabName,
            onedamagePanelName: onedamagePanelName,
          },
          ...selectedMenuItem.subItems.slice(selectedSubItemIndex + 1),
        ],
      };
      setItems(updatedItems);
      openPopupInspection(selectedSubItem.id, selectedSubItem.submenuname);
    } else {
      alert("Please select a subitem before clicking Add");
    }
  };
  return (
    <div className="Contant-edittemp">
      <div className="template-card-edittemp">
        <div className="template-selector-edittemp">
          <span className="selectTemp-edittemp">Edit Template</span>
          <div className="close-div-edittemp">
            <p onClick={onClose} className="close-button-edittemp">
              X
            </p>
          </div>
        </div>
        <div className="Menu-Item flex justify-center">
          <div className="menu">
            <p className="p-menutitle-edittemp">Menu</p>
          </div>
          <div className="item">
            <p className="p-itemtitle-edittemp">Item</p>
          </div>
        </div>
        <div className="Menu-Item-edittemp">
          <div className="template-card__body__center__input-edittemp">
            <div className="box-edittemp">
              <div className="menubox text-left">
                <div className="iconmenu-edittemp">
                  <div>
                    <FaFolderOpen className="mr-2 inline-block" size={18} />
                  </div>
                  <div
                    className={`Menu-Item ${
                      selectedMenuTitleIndex === null
                        ? "selected-menu-title"
                        : ""
                    }`}
                    onClick={() => handleSelectMenuTitle(null)}
                  >
                    <p
                      className="menutitle1-edittemp"
                      value={menuName}
                      onChange={handleMenuItemChange}
                      style={{ cursor: "pointer", backgroundColor: "#f0f0f0" }}
                    >
                      MENU
                    </p>
                  </div>
                </div>
                <div key={selectedMenuItemIndex}>
                  <ul className="pl-10">
                    {items.map((item, index) => (
                      <li key={index}>
                        <button
                          onDoubleClick={() => handleDoubleClick(index)}
                          className={`Menu-Item ${
                            selectedMenuItemIndex === index ? "clicked" : ""
                          }`}
                          onClick={() => handleSelectMenuItem(index)}
                          style={{
                            backgroundColor:
                              selectedMenuItemIndex === index
                                ? "#b3e0ff"
                                : "transparent",
                          }}
                        >
                          {item.menuname}{" "}
                        </button>
                        {isPopupVisible && index === selectedMenuItemIndex && (
                          <div className="Contant1-edittemp">
                            <div className="template-card1-edittemp">
                              <div className="template-selector1-edittemp">
                                <span className="selectTemp1-edittemp">
                                  Input
                                </span>
                                <button
                                  className="close-button1-edittemp"
                                  onClick={handleClosePopup}
                                >
                                  X
                                </button>
                              </div>
                              <div className="para2-edittemp">
                                <p>Enter new name of menu item</p>
                                <input
                                  type="text"
                                  value={newItemName}
                                  onChange={handleInputChange}
                                  className="menutext1-edittemp"
                                />
                              </div>
                              <div className="button-container1-edittemp">
                                <button
                                  className="ok-button-edittemp"
                                  onClick={handleOkButtonClick}
                                >
                                  Ok
                                </button>
                                <button
                                  className="cancel-button1-edittemp"
                                  onClick={handleClosePopup}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        {item.subItems.length > 0 && (
                          <ul>
                            {item.subItems.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className={`${
                                  selectedSubItemIndex === subIndex
                                    ? "selected-subitem-edittemp"
                                    : ""
                                }`}
                              >
                                <button
                                  onClick={() => handleSelectSubItem(subIndex)}
                                  style={{
                                    backgroundColor:
                                      selectedSubItemIndex === subIndex
                                        ? "#c2f0c2"
                                        : "transparent",
                                  }}
                                >
                                  {subItem.submenuname}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="box2-edittemp">
              <div className="item text-left">
                {onetabNames.map((onetabName, index) => (
                  <p key={index}>{onetabName}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="Menu-Item-edittemp">
          <div className="button-container-edittemp">
            <div className="input-container-edittemp">
              <input
                type="text"
                className="custom-input-edittemp"
                placeholder="Text..."
                value={menuItem}
                onChange={handleMenuItemChange}
              />
              <button
                className="btnM-edittemp"
                onClick={(e) => handleAddMenuItem(e)}
              >
                Add
              </button>
              <button className="btnM-edittemp" onClick={handleRemoveItem}>
                Remove
              </button>
              <button className="btnM-edittemp" onClick={handleCopyItems}>
                Copy
              </button>
            </div>
          </div>
          <div className="button-container-edittemp">
            <div className="input-container-edittemp">
              <button
                className="btnM-edittemp"
                onClick={handleAddButtonClick}
                subItemName={
                  selectedSubItemIndex !== null
                    ? items[selectedMenuItemIndex].subItems[
                        selectedSubItemIndex
                      ]?.submenuname
                    : ""
                }
              >
                Add
              </button>
              {isPopupOpen && (
                // <Inspection/>
                <div className="dialog-inspection">
                  <div className="dialog-header-inspection">
                    <p className="para-inspection">
                      What would you like to have on your new panel? A damage
                      panel is a section that has a list of
                      conditions/narratives and a red and black section to move
                      the items into. A selection panel is one list used for
                      selecting types of materials, locations, etc:
                    </p>
                  </div>
                  <div className="dialog-body-inspection">
                    <label className="label1-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 1"
                        checked={selectedOption === "Option 1"}
                        onChange={handleRadioChange}
                      />
                      1 Damage Panel
                    </label>
                    <label className="label2-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 2"
                        checked={selectedOption === "Option 2"}
                        onChange={handleRadioChange}
                      />
                      2 Damage Panels
                    </label>
                    <label className="label3-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 3"
                        checked={selectedOption === "Option 3"}
                        onTabNameChange={handleTabNameChange}
                      />
                      1 Selection Panel
                    </label>
                    <label className="label4-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 4"
                        checked={selectedOption === "Option 4"}
                        onChange={handleRadioChange}
                      />
                      2 Selection Panels
                    </label>
                    <label className="label-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 5"
                        checked={selectedOption === "Option 5"}
                        onChange={handleRadioChange}
                      />
                      1 Damage Panel & 1 Selection Panel
                    </label>
                    <label className="label5-inspection">
                      <input
                        type="radio"
                        name="options"
                        value="Option 6"
                        checked={selectedOption === "Option 6"}
                        onChange={handleRadioChange}
                      />
                      1 Damage Panel & 2 Selection Panels
                    </label>
                  </div>
                  <div className="dialog-footer-inspection">
                    <button
                      className="cancel-button-inspection"
                      onClick={handleClosePopupInspection}
                    >
                      Cancel
                    </button>
                    <button
                      className="back-button-inspection"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="back-button-inspection"
                      onClick={handleBack}
                    >
                      Next
                    </button>
                    <button className="done-button-inspection">Done</button>
                  </div>

                  {isPopupOpen && selectedOption === "Option 1" && (
                    <OneDamage
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onDone={handleOneDamageDone}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 1": false })
                      }
                    />
                  )}
                  {isPopupOpen && selectedOption === "Option 2" && (
                    <TwoDamage
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 2": false })
                      }
                    />
                  )}
                  {isPopupOpen && selectedOption === "Option 3" && (
                    <OneSelection
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 3": false })
                      }
                    />
                  )}
                  {isPopupOpen && selectedOption === "Option 4" && (
                    <TwoSelection
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 4": false })
                      }
                    />
                  )}
                  {isPopupOpen && selectedOption === "Option 5" && (
                    <OneDamageSelection
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 5": false })
                      }
                    />
                  )}
                  {isPopupOpen && selectedOption === "Option 6" && (
                    <OneDamageTwoSelection
                      isPopupOpen={isPopupOpen}
                      setIsPopupOpen={setIsPopupOpen}
                      onClose={() =>
                        setPopupStates({ ...popupStates, "Option 6": false })
                      }
                    />
                  )}
                </div>
              )}
              <button className="btnM-edittemp">Remove</button>
              <button className="btnM-edittemp">Move Up</button>
              <button className="btnM-edittemp">Move Down</button>
              <button className="btnM-edittemp">Copy</button>
            </div>
          </div>
        </div>
        <div className="para1-edittemp">
          <p>
            Double click on a menu or inspection item to rename it. Move a menu
            by dragging and dropping an item to the new location Type into the
            box left of Add and click Add to add a new area or menu
          </p>
        </div>
        <div className="Donebtn-edittemp">
          <button className="open-button-edittemp" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditTemp;
