import React, { useContext, useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../component/EditTemp/DynamicMenuComponent.css";
import Buttons from './../Photo/Buttons';
const SubdetailsDisplay = ({
  subdetails,
  selectedMenuId,
  selectedSubMenuId,
  selectedRadio,
}) => {
  // Add conditional checks to prevent undefined errors
  if (
    !subdetails ||
    !selectedMenuId ||
    !selectedSubMenuId ||
    !selectedRadio ||
    !subdetails[selectedSubMenuId] ||
    !subdetails[selectedSubMenuId][selectedRadio]
  ) {
    return null;
  }
  const subdetailsData = subdetails[selectedSubMenuId][selectedRadio];
  if (!subdetailsData || Object.keys(subdetailsData).length === 0) {
    return null;
  }
  return (
    <div>
      {Object.entries(subdetailsData).map(([key, values]) => (
        <div key={key}>
          <ul>
            <li>{`Tab Name: ${values.tabname}`}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
const DynamicMenuComponent = ({ onClose }) => {
  const uniqueId = uuidv4();
  const [menuData, setMenuData] = useState({});
  const [menuName, setMenuName] = useState("");
  const [submenuName, setSubmenuName] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedSubMenuId, setSelectedSubMenuId] = useState(null);
  const [selectedSubName , setSelectedSubName] = useState();
  const [selectedRadio, setSelectedRadio] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTabNameId, setSelectedTabNameId] = useState(null);
  const [showMovePopup, setShowMovePopup] = useState(false);
  const [selectedMoveTab, setSelectedMoveTab] = useState(null);
  const [selectedMoveSubmenu, setSelectedMoveSubmenu] = useState(null);
  const [allSubNames, setAllSubNames] = useState([]);
  const [inputValues, setInputValues] = useState({
    tabname: "",
    damage1: "",
    damage2: "",
    selection1: "",
    selection2: "",
    Radiopanal: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);
  useEffect(() => {
    if (selectedMenuId && menuData[selectedMenuId]?.subitems.length > 0) {
      // Set the first submenu as selected by default
      setSelectedSubMenuId(menuData[selectedMenuId].subitems[0].id);
    }
  }, [selectedMenuId, menuData]);
  // Save menu data to local storage whenever it changes
  const handleAddMenu = () => {
    if (menuName.trim() === "") {
      alert("Please enter a valid menu name");
      return;
    }
    setMenuData((prevMenuData) => {
      const newMenuId = Object.keys(prevMenuData).length + 1;
      return {
        ...prevMenuData,
        [newMenuId]: {
          id: newMenuId,
          name: menuName,
          subitems: [],
          subdetails: {},
        },
      };
    });
    setMenuName(""); // Clear the input field
    setSelectedMenuId(null); // Clear the selected menu
  };
  const handleClosePopup = () => {
    // Add any additional cleanup logic here if needed
    // For now, just clear selected menu and submenu
    setSelectedMenuId(null);
    setSelectedSubMenuId(null);
  };
  const handleRemoveItem = () => {
    if (!selectedMenuId) {
      alert("Please select a menu first");
      return;
    }
    if (selectedSubMenuId) {
      // Remove submenu
      setMenuData((prevMenuData) => {
        const selectedMenu = prevMenuData[selectedMenuId];
        if (!selectedMenu) {
          alert("Please select a valid menu");
          return prevMenuData;
        }
        const updatedSubitems = selectedMenu.subitems.filter(
          (submenu) => submenu.id !== selectedSubMenuId
        );
        return {
          ...prevMenuData,
          [selectedMenuId]: {
            ...selectedMenu,
            subitems: updatedSubitems,
            subdetails: {
              ...selectedMenu.subdetails,
              [selectedSubMenuId]: undefined,
            },
          },
        };
      });
      // Clear selected submenu
      setSelectedSubMenuId(null);
    } else {
      // Remove menu
      setMenuData((prevMenuData) => {
        const { [selectedMenuId]: removedMenu, ...updatedMenuData } =
          prevMenuData;
        return updatedMenuData;
      });
      // Clear selected menu and submenu
      setSelectedMenuId(null);
      setSelectedSubMenuId(null);
    }
  };
  const handleAddSubmenu = () => {
    if (submenuName.trim() === "") {
      alert("Please enter a valid submenu name");
      return;
    }
    setMenuData((prevMenuData) => {
      if (!selectedMenuId) {
        alert("Please select a menu first");
        return prevMenuData;
      }
      const selectedMenu = prevMenuData[selectedMenuId];
      const newSubmenuId = selectedMenu.subitems.length + 1;
      return {
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subitems: [
            ...selectedMenu.subitems,
            {
              id: newSubmenuId,
              subName: submenuName,
              si: newSubmenuId,
              selectedOption: selectedRadio,
            },
          ],
          subdetails: {
            ...selectedMenu.subdetails,
            [newSubmenuId]: {},
          },
        },
      };
    });
    setSubmenuName(""); // Clear the input field
    setSelectedRadio(""); // Clear the selected radio
    setInputValues({
      tabname: "",
      damage1: "",
      damage2: "",
      selection1: "",
      selection2: "",
    }); // Clear the input values
    setSelectedSubMenuId(null); // Clear the selected submenu
  };
  const handleAddSubdetails = () => {
    if (!selectedMenuId || !selectedSubMenuId) {
      alert("Please select a menu and submenu first");
      return;
    }
    setMenuData((prevMenuData) => {
      const selectedMenu = prevMenuData[selectedMenuId];
      if (!selectedMenu) {
        alert("Please select a valid menu");
        return prevMenuData;
      }
      const selectedSubmenu = selectedMenu.subitems.find(
        (submenu) => submenu.id === selectedSubMenuId
      );
      if (!selectedSubmenu) {
        alert("Please select a valid submenu");
        return prevMenuData;
      }
      return {
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subdetails: {
            ...selectedMenu.subdetails,
            [selectedSubMenuId]: {
              ...selectedMenu.subdetails[selectedSubMenuId],
              [uniqueId]: {
                ...inputValues,
                Radiopanal: selectedRadio,
                Damage1Data: uniqueId + "_d1",
                Damage2Data: uniqueId + "_d2",
                Selection1Data: uniqueId + "_s1",
                Selection2Data: uniqueId + "_s2",
              },
            },
          },
        },
      };
    });
    setShowOptions(false);
    setSelectedRadio(""); // Clear the selected radio
    setInputValues({
      tabname: "",
      damage1: "",
      damage2: "",
      selection1: "",
      selection2: "",
    }); // Clear the input values
  };
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };
  const handlesave = () => {
    localStorage.setItem("menuData", JSON.stringify(menuData));
  };
  const handleInputChange = (inputName, inputValue) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: inputValue,
    }));
  };
  const handleAddOptionClick = () => {
    // Toggle the state variable to show/hide options
    setShowOptions(!showOptions);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubName, setEditedSubName] = useState("");
  // Function to handle double-click and initiate editing
  const handleSubNameDoubleClick = (submenu) => {
    setIsEditing(true);
    setEditedSubName(submenu.subName);
    console.log("subname " , submenu)
  };
  // Function to apply changes when the user clicks on OK
  const handleEditSubName = (submenu) => {
    setMenuData((prevMenuData) => {
      const updatedMenuData = { ...prevMenuData };
      const updatedSubMenu = {
        ...updatedMenuData[selectedMenuId].subitems.find(
          (sub) => sub.id === submenu.id
        ),
        subName: editedSubName,
      };
      updatedMenuData[selectedMenuId].subitems = updatedMenuData[
        selectedMenuId
      ].subitems.map((sub) => (sub.id === submenu.id ? updatedSubMenu : sub));
      return updatedMenuData;
    });
    setIsEditing(false);
  };
  // Function to cancel editing and revert changes
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const selectedMenu = menuData[selectedMenuId];
  const getOptionLabel = (radioValue) => {
    switch (radioValue) {
      case 1:
        return "1 Damage Panel";
      case 2:
        return "2 Damage Panel";
      case 3:
        return "1 Selection Panel";
      case 4:
        return "2 Selections Panel";
      case 5:
        return "1 Damage Panel 1 Selection Panel";
      case 6:
        return "1 Damage Panel 2 Selection Panel";
      default:
        return "";
    }
  };
  const renderInputFields = (selectedRadio) => {
    switch (selectedRadio) {
      case 1:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating A Page With 1 Damage Panel. The Damage Panel Name is
                what will appear on the report.
              </p>
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="damage1">1st Damage:</label>
              <input
                type="text"
                id="damage1"
                value={inputValues.damage1}
                onChange={(e) => handleInputChange("damage1", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating the page with 2 Damage Panels Each Damage Panel
                willhave it's own section on the report. The Damage Panel Names
                are what will appear on the report.
              </p>
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="damage1">1st Damage:</label>
              <input
                type="text"
                id="damage1"
                value={inputValues.damage1}
                onChange={(e) => handleInputChange("damage1", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="damage2">2nd Damage:</label>
              <input
                type="text"
                id="damage2"
                value={inputValues.damage2}
                onChange={(e) => handleInputChange("damage2", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating A Page With 1 Selection Panel.The Selection Panel Name
                is what will appear on the report.
              </p>
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection1">1st Selection:</label>
              <input
                type="text"
                id="selection1"
                value={inputValues.selection1}
                onChange={(e) =>
                  handleInputChange("selection1", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating the page with 2 Selection Panels. The name of the first
                Selection Panel Name will appear on the report.
              </p>
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection1">1st Selection:</label>
              <input
                type="text"
                id="selection1"
                value={inputValues.selection1}
                onChange={(e) =>
                  handleInputChange("selection1", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection2">2nd Selection:</label>
              <input
                type="text"
                id="selection2"
                value={inputValues.selection2}
                onChange={(e) =>
                  handleInputChange("selection2", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating the page with 1 Damage Panel and 1 Selection Panel. The
                Damage Panel Name will be appear on the report.
              </p>
              {/* Handle 1 Damage 1 Selection input fields */}
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="damage1">1st Damage:</label>
              <input
                type="text"
                id="damage1"
                value={inputValues.damage1}
                onChange={(e) => handleInputChange("damage1", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection1">1st Selection:</label>
              <input
                type="text"
                id="selection1"
                value={inputValues.selection1}
                onChange={(e) =>
                  handleInputChange("selection1", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex float-right case-input-div">
            <div className="pl-5">
              <p className="text-center mb-2">
                Creating the page with 1 Damage Panel and 2 Selection Panel. The
                Damage Panel Name will be appear on the report
              </p>
              {/* Handle 1 Damage 2 Selections input fields */}
              <label htmlFor="tabname">Tab Name:</label>
              <input
                type="text"
                id="tabname"
                value={inputValues.tabname}
                onChange={(e) => handleInputChange("tabname", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="damage1">1st Damage:</label>
              <input
                type="text"
                id="damage1"
                value={inputValues.damage1}
                onChange={(e) => handleInputChange("damage1", e.target.value)}
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection1">1st Selection:</label>
              <input
                type="text"
                id="selection1"
                value={inputValues.selection1}
                onChange={(e) =>
                  handleInputChange("selection1", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
              <br />
              <label htmlFor="selection2">2nd Selection:</label>
              <input
                type="text"
                id="selection2"
                value={inputValues.selection2}
                onChange={(e) =>
                  handleInputChange("selection2", e.target.value)
                }
                className="w-50 h-7 border border-black p-2 m-1 ml-2"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const renderMenuTree = () => {
    return Object.keys(menuData).map((menuId) => {
      const menu = menuData[menuId];
      const isMenuSelected = selectedMenuId === menuId;
      return (
        <div
          key={menuId}
          style={{
            marginLeft: 20,
            cursor: "pointer",
            backgroundColor: isMenuSelected ? "#e0e0e0" : "transparent",
          }}
          onClick={() => setSelectedMenuId(menuId)}
        >
          {menu.name}
          {menu.subitems.map((submenu) => (
            <div
              key={submenu.id}
              style={{
                marginLeft: 20,
                cursor: "pointer",
                backgroundColor:
                  isMenuSelected && selectedSubMenuId === submenu.id
                    ? "#c0c0c0"
                    : "transparent",
              }}
              onClick={() => {setSelectedSubMenuId(submenu.id)
                            setSelectedSubName(submenu.subName)
              }
              }
            >
              {isEditing && selectedSubMenuId === submenu.id && selectedSubName === submenu.subName ? (
                <div className="">
                  <input
                    type="text"
                    value={editedSubName}
                    onChange={(e) => setEditedSubName(e.target.value)}
                    className="w-40 h-7 border border-black p-2 m-1 ml-2"
                  />
                  <br />
                  <button onClick={() => handleEditSubName(submenu)}>OK</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div onDoubleClick={() => handleSubNameDoubleClick(submenu)}>
                  {submenu.subName}
                </div>
              )}
              {/* {submenu.subName} */}
              <div className="selectionpanelRB">
                {isMenuSelected &&
                  selectedSubMenuId === submenu.id &&
                  showOptions && (
                    <div
                      style={{ marginLeft: 300 }}
                      className="option-panel-div"
                    >
                      <p className="mb-5 text-center">
                        What would you like to have on your new panel? A damage
                        panel is a section that has a list of
                        conditions/narratives and a red and black section to
                        move the items into. A selection panel is one list used
                        for selecting types of materials, locations, etc:
                      </p>
                      {/* Radio buttons for subdetails */}
                      <div className="">
                        {[1, 2, 3, 4, 5, 6].map((radioValue) => (
                          <label key={radioValue}>
                            <input
                              type="radio"
                              name={`subdetails_${submenu.id}`}
                              attribute
                              value={radioValue}
                              checked={selectedRadio === radioValue}
                              onChange={() => handleRadioChange(radioValue)}
                            />
                            {getOptionLabel(radioValue)}
                          </label>
                        ))}
                      </div>
                      {/* Input fields for selected radio */}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      );
    });
  };
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const handleTabClick = (index) => {
    // Toggle selection: if the clicked tab is already selected, deselect it; otherwise, select it.
    setSelectedTabIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleMoveUp = () => {
    if (selectedTabIndex > 0) {
      const selectedSubmenuCopy = { ...selectedMenu.subdetails[selectedSubMenuId] };
      const tabnamesArray = Object.keys(selectedSubmenuCopy);
      // Swap positions
      [tabnamesArray[selectedTabIndex - 1], tabnamesArray[selectedTabIndex]] = [
        tabnamesArray[selectedTabIndex],
        tabnamesArray[selectedTabIndex - 1],
      ];
      // Update state
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subdetails: {
            ...selectedMenu.subdetails,
            [selectedSubMenuId]: {
              ...selectedSubmenuCopy,
              [tabnamesArray[selectedTabIndex - 1]]: selectedSubmenuCopy[tabnamesArray[selectedTabIndex]],
              [tabnamesArray[selectedTabIndex]]: selectedSubmenuCopy[tabnamesArray[selectedTabIndex - 1]],
            },
          },
        },
      }));
      setSelectedTabIndex(selectedTabIndex - 1);
    }
  };
  const handleDeleteTab = () => {
    if (!selectedMenuId || !selectedSubMenuId || selectedTabIndex === null) {
      alert("Please select a menu, submenu, and tab first");
      return;
    }
    setMenuData((prevMenuData) => {
      const updatedMenuData = { ...prevMenuData };
      const selectedSubmenu = updatedMenuData[selectedMenuId].subdetails[selectedSubMenuId];
      if (!selectedSubmenu) {
        alert("Please select a valid submenu");
        return prevMenuData;
      }
      const tabnamesArray = Object.keys(selectedSubmenu);
      if (selectedTabIndex < 0 || selectedTabIndex >= tabnamesArray.length) {
        alert("Please select a valid tab");
        return prevMenuData;
      }
      // Delete the selected tabname
      delete selectedSubmenu[tabnamesArray[selectedTabIndex]];
      return updatedMenuData;
    });
  };
  const handleMoveDown = () => {
    const maxIndex = Object.keys(selectedMenu?.subdetails[selectedSubMenuId] || {}).length - 1;
    if (selectedTabIndex < maxIndex) {
      const selectedSubmenuCopy = { ...selectedMenu.subdetails[selectedSubMenuId] };
      const tabnamesArray = Object.keys(selectedSubmenuCopy);
      // Swap positions
      [tabnamesArray[selectedTabIndex], tabnamesArray[selectedTabIndex + 1]] = [
        tabnamesArray[selectedTabIndex + 1],
        tabnamesArray[selectedTabIndex],
      ];
      // Update state
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subdetails: {
            ...selectedMenu.subdetails,
            [selectedSubMenuId]: {
              ...selectedSubmenuCopy,
              [tabnamesArray[selectedTabIndex]]: selectedSubmenuCopy[tabnamesArray[selectedTabIndex + 1]],
              [tabnamesArray[selectedTabIndex + 1]]: selectedSubmenuCopy[tabnamesArray[selectedTabIndex]],
            },
          },
        },
      }));
      setSelectedTabIndex(selectedTabIndex + 1);
    }
  };
  // Function to handle moving the tabname to another subname
  const handleMove = () => {
    if (selectedTabNameId === null || selectedMoveSubmenu === null) {
        alert("Please select a tabname and target subname first");
        return;
    }
    setMenuData((prevMenuData) => {
        const updatedMenuData = { ...prevMenuData };
        const selectedMenu = updatedMenuData[selectedMenuId];
        const selectedSubmenu = selectedMenu.subdetails[selectedSubMenuId];
        const tabname = Object.keys(selectedSubmenu)[selectedTabNameId];
        if (!selectedSubmenu[tabname]) {
            alert("Please select a valid tabname");
            return prevMenuData;
        }
        // Move the tabname to the target subname
        const updatedTab = selectedSubmenu[tabname];
        delete selectedSubmenu[tabname]; // Remove from current subname
        // Check if the target subname already exists, if not create a new one
        if (!updatedMenuData[selectedMenuId].subdetails[selectedMoveSubmenu]) {
            updatedMenuData[selectedMenuId].subdetails[selectedMoveSubmenu] = {};
        }
        updatedMenuData[selectedMenuId].subdetails[selectedMoveSubmenu][tabname] = updatedTab; // Add to target subname
        return updatedMenuData;
    });
    // Hide the move popup after moving
    setShowMovePopup(false);
    // Clear selected tabname and target subname
    setSelectedTabNameId(null);
    setSelectedMoveSubmenu(null);
};
useEffect(() => {
  // Extract all subnames from the menu data
  const subNames = Object.values(menuData).reduce((acc, menu) => {
    return acc.concat(menu.subitems.map(subitem => subitem.subName));
  }, []);
  setAllSubNames(subNames);
}, [menuData]);
// Function to handle displaying the move popup
const handleMoveClick = () => {
  if (!selectedMenuId || !selectedSubMenuId) {
    alert("Please select a menu and submenu first");
    return;
  }
  setShowMovePopup(true);
};
  return (
    <div>
      {/* Popup Wrapper */}
      <div className="popup-wrapper text-left z-10">
        {/* Popup Content */}
        <div className="popup-content">
          {/* Heading */}
          <div className="flex gap-3">
            <div className="text-left height-for-data">
              <h2> Menu </h2>
              <div className="z-50">{renderMenuTree()}</div>
            </div>
            <div className="text-left height-for-data">
              <h2>Items</h2>
              <div><div>
                {/* Display all added subdetails for the selected submenu */}
                {selectedSubMenuId && (
                  <div>
                    {Object.keys(selectedMenu?.subdetails[selectedSubMenuId] || {}).map(
                      (radioValue, index) => (
                        <div
                          key={radioValue}
                          onClick={() => handleTabClick(index)}
                          style={{
                            backgroundColor: index === selectedTabIndex ? '#c0c0c0' : 'transparent',
                            cursor: 'pointer',
                          }}
                        >
                          <h3>{selectedMenu?.subdetails[selectedSubMenuId][radioValue]?.tabname}</h3>
                          {/* Display other details as needed */}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              </div>
              <div>
              {showMovePopup && (
                <div className="popup-move" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1000" }}>
                  <select
                    value={selectedMoveSubmenu}
                    onChange={(e) => setSelectedMoveSubmenu(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                  >
                    <option value="" disabled>Select a Submenu</option>
                    {/* Populate dropdown with all subnames */}
                    {allSubNames.map((subName) => (
                      <option key={subName} value={subName}>{subName}</option>
                    ))}
                  </select>
                  <div style={{ textAlign: "right" }}>
                    <button onClick={handleMove}>OK</button>
                    <button onClick={() => setShowMovePopup(false)} >Cancel</button>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="flex gap-8 ml-1 mt-2">
            <div className="flex">
              <div>
                {/* Add Menu Section */}
                <div>
                  <input
                    type="text"
                    id="menuName"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    className="w-40 h-7 border border-black p-2 m-1
ml-2"
                    placeholder="Menu Name"
                  />
                  <button onClick={handleAddMenu}>Add Menu</button>
                </div>
                {/* Add Submenu Section */}
                <div>
                  <input
                    type="text"
                    id="submenuName"
                    value={submenuName}
                    onChange={(e) => setSubmenuName(e.target.value)}
                    className="w-40 h-7 border border-black p-2 m-1 ml-2"
                    placeholder="Submenu Name"
                  />
                  <button onClick={handleAddSubmenu}>Add Submenu</button>
                </div>
              </div>
              <div className="">
                <div className="p-l m-1">
                  {" "}
                  <button onClick={handleRemoveItem}>Remove</button>
                </div>
                <div className="ml-1">
                  {" "}
                  <button>Copy</button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex">
                <div className="ml-1">
                  {/* Render "Add option" button outside the submenu loop
              */}
                  {selectedMenuId &&
                    menuData[selectedMenuId].subitems.length > 0 && (
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          handleAddOptionClick(
                            menuData[selectedMenuId].subitems[0].id
                          );
                        }}
                      >
                        Add Panel
                      </button>
                    )}
                </div>
                <div>
                  {selectedRadio && selectedSubMenuId && (
                    <div>
                      {renderInputFields(selectedRadio)}
                      {/* Conditionally render the "Add Subdetails" button
                  */}
                      {menuData[selectedMenuId].subitems.find(
                        (submenu) => submenu.id === selectedSubMenuId
                      )?.subName && (
                          <button onClick={handleAddSubdetails} className="ml-1">
                            Add Subdetails
                          </button>
                        )}
                      {/* Display added subdetails */}
                    </div>
                  )}
                </div>
                <div className="mi-1"><button onClick={handleDeleteTab}>Delete</button></div>
              </div>
              <div className="p-l m-1 flex gap-1">
                {" "}
                <div><button onClick={handleMoveUp}>Move Up</button></div>
                <div><button onClick={handleMoveDown}>Move Down</button></div>
<button onClick={handleMoveClick}>Move</button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="close-button" onClick={handlesave}>
              Save{" "}
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DynamicMenuComponent;
