import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../component/EditTemp/DynamicMenuComponent.css";
import Alert from "../Alert/Alert";
import Buttons from "./../Photo/Buttons";
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
  const [selectedSubName, setSelectedSubName] = useState();
  const [selectedRadio, setSelectedRadio] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTabNameId, setSelectedTabNameId] = useState(null);
  const [showMovePopup, setShowMovePopup] = useState(false);
  const [selectedMoveTab, setSelectedMoveTab] = useState(null);
  const [selectedMoveSubmenu, setSelectedMoveSubmenu] = useState(null);
  const [subdetails, setSubDetails] = useState([]);
  const [inputValues, setInputValues] = useState({
    tabname: "",
    damage1: "",
    damage2: "",
    selection1: "",
    selection2: "",
    Radiopanal: "",
  });

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color: "",
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
      setShowAlert({
        showAlert: true,
        message: "Please enter a valid menu name",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
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

  const handleRemoveItem = () => {
    if (!selectedMenuId) {
      setShowAlert({
        showAlert: true,
        message: "Please select a menu first",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }
    if (selectedSubMenuId) {
      // Remove submenu
      setMenuData((prevMenuData) => {
        const selectedMenu = prevMenuData[selectedMenuId];
        if (!selectedMenu) {
          setShowAlert({
            showAlert: true,
            message: "Please select a valid menu",
          });
          setTimeout(() => {
            setShowAlert({
              showAlert: false,
              message: "",
            }); // Hide the alert after 3 seconds
          }, 3000);
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

  const handleClose = () => {
    // Logic to handle closing of the option panel
    setShowOptions(false);
    // You might need to reset other state variables related to the option panel here
  };
  const handleAddSubmenu = () => {
    if (submenuName.trim() === "") {
      setShowAlert({
        showAlert: true,
        message: "Please enter a valid submenu name",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }
    setMenuData((prevMenuData) => {
      if (!selectedMenuId) {
        setShowAlert({
          showAlert: true,
          message: "Please select a menu first",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
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
      setShowAlert({
        showAlert: true,
        message: "Please select a menu and submenu first",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);

      return;
    }
    setMenuData((prevMenuData) => {
      const selectedMenu = prevMenuData[selectedMenuId];
      if (!selectedMenu) {
        setShowAlert({
          showAlert: true,
          message: "Please select a valid menu",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);

        return prevMenuData;
      }
      const selectedSubmenu = selectedMenu.subitems.find(
        (submenu) => submenu.id === selectedSubMenuId
      );
      if (!selectedSubmenu) {
        setShowAlert({
          showAlert: true,
          message: "Please select a valid submenu",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);

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

    setShowAlert({
      showAlert: true,
      message: "Menu saved successfully",
    });
    setTimeout(() => {
      setShowAlert({
        showAlert: false,
        message: "",
      }); // Hide the alert after 3 seconds
    }, 3000);
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
  const [allSubItems, setAllSubItems] = useState([]);
  const [subIndex, setSubIndex] = useState();
  // Function to handle double-click and initiate editing
  const handleSubNameDoubleClick = (submenu) => {
    setIsEditing(true);
    setEditedSubName(submenu.subName);
    console.log("subname ", submenu);
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
  function handleCloseCase() {
    // Logic to close the specific case based on selectedRadio
    // Placeholder for actual closing logic
    setSelectedRadio(false);
  }

  const renderInputFields = (selectedRadio) => {
    switch (selectedRadio) {
      case 1:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b ">
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
              <button
                onClick={() => handleCloseCase(1)}
                className=" float-right mt-[9em]"
              >
                Close
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b">
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
              <button
                onClick={() => handleCloseCase(2)}
                className=" float-right mt-9"
              >
                Close
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b">
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
              <button
                onClick={() => handleCloseCase(3)}
                className=" float-right mt-[9em]"
              >
                Close
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b">
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
              <button
                onClick={() => handleCloseCase(4)}
                className=" float-right mt-12"
              >
                Close
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b">
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
              <button
                onClick={() => handleCloseCase(5)}
                className=" float-right mt-12"
              >
                Close
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex float-right case-input-div  border-r border-white border-b">
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
              <button
                onClick={() => handleCloseCase(6)}
                className=" float-right "
              >
                Close
              </button>
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
          {menu.subitems.map((submenu, index) => (
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
              onClick={() => {
                setSelectedSubMenuId(submenu.id);
                setSelectedSubName(submenu.subName);
                setSubIndex(index);
              }}
            >
              {isEditing &&
              selectedSubMenuId === submenu.id &&
              selectedSubName === submenu.subName ? (
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
                      <button className="mt-[9em]" onClick={handleClose}>
                        Close
                      </button>
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
  const [pastSubDetails, setPastSubDetails] = useState(null);

  const PanelData = (value) => {
    const newValue = parseInt(value.Radiopanal);

    switch (newValue) {
      case 1:
        return {
          Damage1Data: value.Damage1Data,
        };
      case 2:
        return {
          Damage1Data: value.Damage1Data,
          Damage2Data: value.Damage2Data,
        };
      case 3:
        return {
          Selection1Data: value.Selection1Data,
        };
      case 4:
        return {
          Selection1Data: value.Selection1Data,
          Selection2Data: value.Selection2Data,
        };
      case 5:
        return {
          Damage1Data: value.Damage1Data,
          Selection1Data: value.Selection1Data,
        };
      case 6:
        return {
          Damage1Data: value.Damage1Data,
          Selection1Data: value.Selection1Data,
          Selection2Data: value.Selection2Data,
        };
      default:
        return {};
    }
  };

  const [subCopy, setSubCopy] = useState("");
  const [DataToStore, setDataToStore] = useState({});

  const handleTabClick = (index, value, radiovalue, sub, menuId) => {
    // Toggle selection: if the clicked tab is already selected, deselect it; otherwise, select it.
    setSelectedTabIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log("sub ", sub);

    if (
      value === null ||
      value === undefined ||
      radiovalue === null ||
      radiovalue === undefined ||
      sub === null ||
      sub === undefined ||
      menuId === null ||
      menuId === undefined
    ) {
      return;
    }
    const newValue = {
      [radiovalue]: {
        ...value,
      },
    };

    setDataToStore((prevDataToStore) => getDataFromLocalStorage(value));

    const Subitems = {
      menuId: menuId,
      panelId: radiovalue,
      ...sub,
    };
    setSubCopy(value);
    setSubDetails(newValue);
    setPastSubDetails(Subitems);
  };
  const handleMoveUp = () => {
    if (selectedTabIndex > 0) {
      setMenuData((prevMenuData) => {
        const selectedMenuCopy = { ...selectedMenu };
        const selectedSubmenuCopy = {
          ...selectedMenu.subdetails[selectedSubMenuId],
        };
        const tabnamesArray = Object.keys(selectedSubmenuCopy);
        // Swap positions
        [tabnamesArray[selectedTabIndex - 1], tabnamesArray[selectedTabIndex]] =
          [
            tabnamesArray[selectedTabIndex],
            tabnamesArray[selectedTabIndex - 1],
          ];
        // Update state
        return {
          ...prevMenuData,
          [selectedMenuId]: {
            ...selectedMenuCopy,
            subdetails: {
              ...selectedMenuCopy.subdetails,
              [selectedSubMenuId]: {
                ...selectedSubmenuCopy,
                [tabnamesArray[selectedTabIndex - 1]]:
                  selectedSubmenuCopy[tabnamesArray[selectedTabIndex]],
                [tabnamesArray[selectedTabIndex]]:
                  selectedSubmenuCopy[tabnamesArray[selectedTabIndex - 1]],
              },
            },
          },
        };
      });
      setSelectedTabIndex(selectedTabIndex - 1);
    }
  };
  const handleDeleteTab = () => {
    if (!selectedMenuId || !selectedSubMenuId || selectedTabIndex === null) {
      setShowAlert({
        showAlert: true,
        message: "Please select a menu, submenu, and tab first",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }
    setMenuData((prevMenuData) => {
      const updatedMenuData = { ...prevMenuData };
      const selectedSubmenu =
        updatedMenuData[selectedMenuId].subdetails[selectedSubMenuId];
      if (!selectedSubmenu) {
        setShowAlert({
          showAlert: true,
          message: "No submenu found",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);

        return prevMenuData;
      }
      const tabnamesArray = Object.keys(selectedSubmenu);
      if (selectedTabIndex < 0 || selectedTabIndex >= tabnamesArray.length) {
        setShowAlert({
          showAlert: true,
          message: "Invalid tab index",
        });
        setTimeout(() => {
          setShowAlert({
            showAlert: false,
            message: "",
          }); // Hide the alert after 3 seconds
        }, 3000);
        return prevMenuData;
      }
      // Delete the selected tabname
      delete selectedSubmenu[tabnamesArray[selectedTabIndex]];
      return updatedMenuData;
    });
  };
  const handleMoveDown = () => {
    const maxIndex =
      Object.keys(selectedMenu?.subdetails[selectedSubMenuId] || {}).length - 1;
    if (selectedTabIndex < maxIndex) {
      setMenuData((prevMenuData) => {
        const selectedMenuCopy = { ...selectedMenu };
        const selectedSubmenuCopy = {
          ...selectedMenu.subdetails[selectedSubMenuId],
        };
        const tabnamesArray = Object.keys(selectedSubmenuCopy);
        // Swap positions
        [tabnamesArray[selectedTabIndex], tabnamesArray[selectedTabIndex + 1]] =
          [
            tabnamesArray[selectedTabIndex + 1],
            tabnamesArray[selectedTabIndex],
          ];
        // Update state
        return {
          ...prevMenuData,
          [selectedMenuId]: {
            ...selectedMenuCopy,
            subdetails: {
              ...selectedMenuCopy.subdetails,
              [selectedSubMenuId]: {
                ...selectedSubmenuCopy,
                [tabnamesArray[selectedTabIndex]]:
                  selectedSubmenuCopy[tabnamesArray[selectedTabIndex + 1]],
                [tabnamesArray[selectedTabIndex + 1]]:
                  selectedSubmenuCopy[tabnamesArray[selectedTabIndex]],
              },
            },
          },
        };
      });
      setSelectedTabIndex(selectedTabIndex + 1);
    }
  };
  // Function to handle moving the tabname to another subname
  const handleMove = () => {
    console.log("selected sub menu ", selectedMoveSubmenu);
    console.log("subdetails - ", subdetails);
    console.log("menu", menuData);
    console.log("pastMenu", pastSubDetails);

    if (subdetails === null || selectedMoveSubmenu === null) {
      setShowAlert({
        showAlert: true,
        message: "Please select a tabname and target subname first",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);

      return;
    }

    setMenuData((prevMenuData) => {
      const updatedMenuData = { ...prevMenuData };

      // Check if the subdetails with the SI ID exist, if not create them
      if (
        !updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ]
      ) {
        updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ] = {};
      }

      // Update or add the subdetails of the selected subitem
      updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
        selectedMoveSubmenu.si
      ] = {
        ...updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ],
        ...subdetails,
      };

      // Delete past subdetails
      if (pastSubDetails) {
        delete updatedMenuData[pastSubDetails.menuId].subdetails[
          pastSubDetails.si
        ][pastSubDetails.panelId];
      }

      return updatedMenuData;
    });

    // Hide the move popup after moving
    setShowMovePopup(false);
    // Clear selected tabname and target subname
    setSelectedTabNameId(null);
    setSelectedMoveSubmenu(null);
  };

  const getDataFromLocalStorage = (value) => {
    // Retrieve data from localStorage
    let tempPanelData = localStorage.getItem("TempPanelData");

    // Initialize variables
    let Damage1Data = "";
    let Damage2Data = "";
    let Selection1Data = "";
    let Selection2Data = "";

    // Parse data if it exists
    if (tempPanelData) {
      tempPanelData = JSON.parse(tempPanelData);

      // Extract data based on keys
      const panelData = PanelData(value);
      Damage1Data = tempPanelData.hasOwnProperty(panelData.Damage1Data)
        ? tempPanelData[panelData.Damage1Data]
        : "";
      Damage2Data = tempPanelData.hasOwnProperty(panelData.Damage2Data)
        ? tempPanelData[panelData.Damage2Data]
        : "";
      Selection1Data = tempPanelData.hasOwnProperty(panelData.Selection1Data)
        ? tempPanelData[panelData.Selection1Data]
        : "";
      Selection2Data = tempPanelData.hasOwnProperty(panelData.Selection2Data)
        ? tempPanelData[panelData.Selection2Data]
        : "";
    }

    // Log the retrieved data
    console.log("Damage1Data:", Damage1Data);
    console.log("Damage2Data:", Damage2Data);
    console.log("Selection1Data:", Selection1Data);
    console.log("Selection2Data:", Selection2Data);

    // Return the extracted data
    return { Damage1Data, Damage2Data, Selection1Data, Selection2Data };
  };

  const handleCopy = () => {
    if (
      !selectedMoveSubmenu ||
      !subCopy ||
      !menuData ||
      !pastSubDetails ||
      !DataToStore
    ) {
      setShowAlert({
        showAlert: true,
        message: "please select menu submenu or panel ",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }

    console.log("selected sub menu ", selectedMoveSubmenu);
    console.log("subdetails - ", subCopy);
    console.log("menu", menuData);
    console.log("pastMenu", pastSubDetails);
    console.log("storedata", DataToStore);

    const newSubdetails = {
      [uniqueId]: {
        Damage1Data: uniqueId + "_d1",
        Damage2Data: uniqueId + "_d2",
        Selection1Data: uniqueId + "_s1",
        Selection2Data: uniqueId + "_s2",
        Radiopanal: subCopy.Radiopanal,
        damage1: subCopy.damage1,
        damage2: subCopy.damage2,
        selection1: subCopy.selection1,
        selection2: subCopy.selection2,
        tabname: subCopy.tabname,
      },
    };

    // Update menuData state to include the new submenu details
    setMenuData((prevMenuData) => {
      const updatedMenuData = { ...prevMenuData };

      // Check if the subdetails with the SI ID exist, if not create them
      if (
        !updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ]
      ) {
        updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ] = {};
      }

      // Add the new subdetails to the selected subitem
      updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
        selectedMoveSubmenu.si
      ] = {
        ...updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ],
        ...newSubdetails,
      };

      console.log(
        "submenudata",
        updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ][uniqueId]
      );
      const setStorage =
        updatedMenuData[selectedMoveSubmenu.menuId].subdetails[
          selectedMoveSubmenu.si
        ][uniqueId];

      let tempPanelData = localStorage.getItem("TempPanelData");
      if (!tempPanelData) {
        // If not, create an empty object
        tempPanelData = {};
      } else {
        // If it exists, parse the JSON string to an object
        tempPanelData = JSON.parse(tempPanelData);
      }

      tempPanelData[setStorage.Damage1Data] = DataToStore.Damage1Data;
      tempPanelData[setStorage.Damage2Data] = DataToStore.Damage2Data;
      tempPanelData[setStorage.Selection1Data] = DataToStore.Selection1Data;
      tempPanelData[setStorage.Selection2Data] = DataToStore.Selection2Data;

      localStorage.setItem("TempPanelData", JSON.stringify(tempPanelData));

      return updatedMenuData;
    });

    setShowMovePopup(false);
    // Clear selected tabname and target subname
    setSelectedTabNameId(null);
    setSelectedMoveSubmenu(null);

    console.log("newsubmenu ", newSubdetails);
  };

  useEffect(() => {
    // Extract all subitems from the menu data
    const allSubItems = Object.values(menuData).reduce((acc, menu) => {
      // Map each subitem with its menu ID and concatenate to the accumulator
      const subItemsWithMenuId = menu.subitems.map((subItem) => ({
        menuId: menu.id,
        ...subItem,
      }));
      return acc.concat(subItemsWithMenuId);
    }, []);

    setAllSubItems(allSubItems);
  }, [menuData]);

  // Function to handle displaying the move popup
  const handleMoveClick = () => {
    if (!selectedMenuId || !selectedSubMenuId) {
      setShowAlert({
        showAlert: true,
        message: "Please select a submenu and tabname first",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);

      return;
    }
    setShowMovePopup(true);
  };
  const handleAction = (action) => {
    if (action === "copy") {
      handleCopy();
    } else if (action === "move") {
      handleMove();
    }
  };

  return (
    <div>
      {/* Popup Wrapper */}
      <div className="popup-wrapper text-left z-10">
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
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
              <div>
                <div>
                  {/* Display all added subdetails for the selected submenu */}
                  {selectedSubMenuId && (
                    <div>
                      {Object.keys(
                        selectedMenu?.subdetails[selectedSubMenuId] || {}
                      ).map((radioValue, index) => {
                        return (
                          <div
                            key={radioValue}
                            onClick={() =>
                              handleTabClick(
                                index,
                                selectedMenu?.subdetails[selectedSubMenuId][
                                  radioValue
                                ],
                                radioValue,
                                selectedMenu?.subitems[subIndex],
                                selectedMenuId
                              )
                            }
                            style={{
                              backgroundColor:
                                index === selectedTabIndex
                                  ? "#c0c0c0"
                                  : "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <h3>
                              {
                                selectedMenu?.subdetails[selectedSubMenuId][
                                  radioValue
                                ]?.tabname
                              }
                            </h3>
                            {/* Display other details as needed */}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {showMovePopup && (
                  <div
                    className="popup-move"
                    style={{
                      backgroundColor: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: "1000",
                    }}
                  >
                    <select
                      value={
                        selectedMoveSubmenu
                          ? JSON.stringify(selectedMoveSubmenu)
                          : ""
                      }
                      onChange={(e) =>
                        setSelectedMoveSubmenu(JSON.parse(e.target.value))
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <option value="" disabled>
                        Select a Submenu
                      </option>
                      {/* Populate dropdown with all subnames */}
                      {allSubItems.map((subItem) => (
                        <option
                          key={subItem.id}
                          value={JSON.stringify(subItem)}
                        >
                          {subItem.subName}
                        </option>
                      ))}
                    </select>
                    <div style={{ textAlign: "right" }}>
                      <button onClick={() => handleAction("copy")}>Copy</button>
                      <button onClick={() => handleAction("move")}>Move</button>
                      <button onClick={() => setShowMovePopup(false)}>
                        Cancel
                      </button>
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
                <div className="mi-1">
                  <button onClick={handleDeleteTab}>Delete</button>
                </div>
              </div>
              <div className="p-l m-1 flex gap-1">
                {" "}
                <div>
                  <button onClick={handleMoveUp}>Move Up</button>
                </div>
                <div>
                  <button onClick={handleMoveDown}>Move Down</button>
                </div>
                <button onClick={handleMoveClick}>Copy / Move </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="close-button" onClick={handlesave}>
              Save
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
