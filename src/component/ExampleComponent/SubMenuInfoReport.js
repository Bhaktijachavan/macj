import React, { useRef, useState, useEffect } from "react";
import "./SubMenuInfoReport.css";
import openimg from "../../Assets/icons/open_inspection.png";
import cutimg from "../../Assets/icons/cutpasteicon.png";
import copyimg from "../../Assets/icons/copy.png";
import pasteimg from "../../Assets/icons/paste.png";
import undoimg from "../../Assets/icons/edit-undo-rtl.svg";
import redoimg from "../../Assets/icons/edit-undo.svg";
import findimg from "../../Assets/icons/generate_report.png";
import boldimg from "../../Assets/icons/boldimg.png";
import italicimg from "../../Assets/icons/italic-font.png";
import Alert from "../Alert/Alert";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const SubMenuInfoReport = () => {
  // text editor
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [highlightOpacity, setHighlightOpacity] = useState(1);
  const [text, setText] = useState(`Hello`);
  const [copiedMessage, setCopiedMessage] = useState("");
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showFindPopup, setShowFindPopup] = useState(false);
  const [findText, setFindText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [startAtTop, setStartAtTop] = useState(false);
  const [isAddDocumentPopupOpen, setAddDocumentPopupOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color: undefined,
  });
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [submenus, setSubmenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [menuData, setMenuData] = useState({});
  const [selectedDamage, setSelectedDamage] = useState({});
  const [documentTexts, setDocumentTexts] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [details, setDetails] = useState(null);

  const handleFind = () => {
    setShowFindPopup(true);
  };
  const handleFindClose = () => {
    setShowFindPopup(false);
  };
  const handleFindTextChange = (e) => {
    setFindText(e.target.value);
  };
  const handleCaseSensitiveChange = () => {
    setCaseSensitive(!caseSensitive);
  };
  const handleStartAtTopChange = () => {
    setStartAtTop(!startAtTop);
  };
  const handleFindSubmit = () => {
    setShowFindPopup(false);
  };
  useEffect(() => {
    // Set the predefined text when the component mounts
    textAreaRef.current.value = text;
  }, [text]);
  const handleOpenClick = () => {
    fileInputRef.current.click();
  };
  const handleCut = () => {
    // Get selected text
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart,
      textAreaRef.current.selectionEnd
    );
    // Copy selected text to clipboard
    navigator.clipboard.writeText(selectedText);
    // Remove selected text from textarea
    setText(
      textAreaRef.current.value.slice(0, textAreaRef.current.selectionStart) +
        textAreaRef.current.value.slice(textAreaRef.current.selectionEnd)
    );
    setCopiedMessage("Text Cut!");
    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };
  const handleCopy = () => {
    // Get selected text
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart,
      textAreaRef.current.selectionEnd
    );
    // Copy selected text to clipboard
    navigator.clipboard.writeText(selectedText);
    setCopiedMessage("Text Copied!");
    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };
  const handlePaste = async () => {
    // Get clipboard text
    const clipboardText = await navigator.clipboard.readText();
    // Insert clipboard text at the cursor position
    setText(
      textAreaRef.current.value.slice(0, textAreaRef.current.selectionStart) +
        clipboardText +
        textAreaRef.current.value.slice(textAreaRef.current.selectionEnd)
    );
  };
  const handleUndo = () => {
    document.execCommand("undo");
  };
  const handleRedo = () => {
    document.execCommand("redo");
  };
  const handleFontChange = (event) => {
    setFont(event.target.value);
  };
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };
  const handleBoldChange = () => {
    setIsBold(!isBold);
  };
  const handleItalicChange = () => {
    setIsItalic(!isItalic);
  };
  const handleHighlightChange = () => {
    setIsHighlighted(!isHighlighted);
  };
  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };
  const handleHighlightColorChange = (event) => {
    setHighlightColor(event.target.value);
  };
  const handleHighlightOpacityChange = (event) => {
    setHighlightOpacity(event.target.value);
  };
  const handleFileChange = (event) => {
    // Handle file change as needed
    console.log("Selected file:", event.target.files[0]);
  };

  //code to add documetns

  const handleAddDocumentClick = () => {
    setAddDocumentPopupOpen(true);
  };
  // Event handler for closing the "Add New Document" popup
  const handleAddDocumentClose = () => {
    setAddDocumentPopupOpen(false);
  };

  function handleAddDocument() {
    const newDocumentNameInput = document.getElementById("newDocumentName");
    const newDocumentName = newDocumentNameInput.value.trim();

    if (!newDocumentName) {
      return; // Handle empty input gracefully (optional)
    }

    // Append the document name with .hdf extension
    const newDocument = `${newDocumentName}.hdf`;

    // Retrieve the existing documents from local storage
    const existingDocuments =
      JSON.parse(localStorage.getItem("documents")) || [];

    // Add the new document to the array
    const updatedDocuments = [...existingDocuments, newDocument];

    // Update the documents state with the new document
    setDocuments(updatedDocuments);

    // Save the updated array back to local storage
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));

    // Clear the input field for the next document
    newDocumentNameInput.value = "";
  }

  // code to remove document

  // code to add submenu names

  useEffect(() => {
    // Step 1: Retrieve menuData from localStorage
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      return;
    }

    // Step 2: Parse menuData and set it to the state
    const parsedMenuData = JSON.parse(menuDataString);
    setMenuData(parsedMenuData);
    // console.log("parsedMenuData ", parsedMenuData);

    // Extract submenus from parsedMenuData

    for (const key in parsedMenuData) {
      const menuItem = parsedMenuData[key];
      const subdetails = menuItem.subdetails;

      for (const subKey in subdetails) {
        const subdetail = subdetails[subKey];

        for (const key in subdetail) {
          const subkey = subdetail[key];
          if (subkey) {
            if (subkey && subkey.damage1) {
              tabNames.push(subkey.damage1);
            }
            if (subkey && subkey.damage2) {
              tabNames.push(subkey.damage2);
            }
            if (subkey && subkey.selection1) {
              tabNames.push(subkey.selection1);
            }
            if (subkey && subkey.selection2) {
              tabNames.push(subkey.selection2);
            }
          }
        }
      }
    }

    // console.log(tabNames);
    setSubmenus(tabNames);
  }, []);

  useEffect(() => {
    // Load initial data from localStorage
    const storedData = JSON.parse(localStorage.getItem("CreateEditData"));

    if (storedData) {
      const data = storedData.reduce((acc, doc) => {
        acc[doc.selectedOption] = doc.text;
        return acc;
      }, {});
      setDocumentTexts(data);
    }
  }, []);

  useEffect(() => {
    // Save documentTexts to localStorage whenever it changes
    if (selectedOption) {
      const dataArray = Object.entries(documentTexts)
        .filter(([key, value]) => value !== "") // Filter out empty strings
        .map(([key, value]) => ({
          selectedOption: key,
          text: value,
        }));
      localStorage.setItem("CreateEditData", JSON.stringify(dataArray));
    }
  }, [documentTexts]);
  useEffect(() => {
    if (selectedOption && selectedDamage) {
      const storedData = JSON.parse(localStorage.getItem("CreateEditData"));

      if (storedData) {
        for (let key in storedData) {
          const storedDatakey = storedData[key];
          const selectedOpt = storedDatakey.selectedOption;
          if (selectedOption === selectedOpt) {
            const documentKey = selectedDamage;
            const savedData =
              JSON.parse(localStorage.getItem("CreateEditText")) || {};
            savedData[documentKey] = {
              key: selectedOption,
              text: text,
            };
            localStorage.setItem("CreateEditText", JSON.stringify(savedData));
          }
        }
      }
    }
  }, [selectedDamage, documentTexts]);

  useEffect(() => {
    // Retrieve documents from local storage on component mount
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(storedDocuments);
  }, []);
  const handleTextareaChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  useEffect(() => {
    if (selectedOption) {
      // Update the text for the selected document in the state
      setDocumentTexts((prevTexts) => ({
        ...prevTexts,
        [selectedOption]: text,
      }));
    }
  }, [text, selectedOption]);

  useEffect(() => {
    // Define createEditCheck object
    const createEditCheck = [];
    // Assuming you want to store isChecked status
    createEditCheck.push({
      name: "CreateEdit",
      isChecked: isChecked,
    });

    // Stringify createEditCheck object before saving to localStorage
    localStorage.setItem("checkbox", JSON.stringify(createEditCheck));
  }, [isChecked]); // I
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const tabNames = [];
  useEffect(() => {
    // Define your selectedOption or retrieve it from somewhere

    // Retrieve and parse menuData from localStorage
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      console.error("menuData not found in localStorage");
      return;
    }
    const parsedMenuData = JSON.parse(menuDataString);

    // Iterate over the keys of parsedMenuData
    for (const key in parsedMenuData) {
      const menuItem = parsedMenuData[key];
      const subdetails = menuItem.subdetails;
      for (const subKey in subdetails) {
        const subdetail = subdetails[subKey];
        for (const subsubKey in subdetail) {
          const subKeyData = subdetail[subsubKey];
          const damage1 = subKeyData.damage1;
          const damage2 = subKeyData.damage2;
          const selection1 = subKeyData.selection1;
          const selection2 = subKeyData.selection2;

          // Store the properties in an array

          const dataArray = [
            subKeyData.Damage1Data,
            subKeyData.Damage2Data,
            subKeyData.Selection1Data,
            subKeyData.Selection2Data,
          ];

          // Iterate over dataArray
          dataArray.forEach((datakey) => {
            const storedDataString = localStorage.getItem("CreateEditText");
            if (!storedDataString) {
              console.error("CreateEditText not found in localStorage");
              return;
            }
            const storedData = JSON.parse(storedDataString);

            Object.keys(storedData).forEach((key) => {
              const storedDatakey = storedData[key];
              const selectedOpt = storedDatakey.key;
              if (!(selectedOption === selectedOpt && key === datakey)) {
              }

              if (selectedOption === selectedOpt && key === datakey) {
                setDetails({
                  damage1,
                  damage2,
                  selection1,
                  selection2,
                });
              }
              if (
                selectedOption === selectedOpt &&
                key === "Table of Content"
              ) {
                setDetails({ details, toc: true }); //
              } else if (selectedOption === selectedOpt && key === "Summary") {
                setDetails({ details, summary: true });
              }
              if (!(selectedOption === selectedOpt && key === datakey)) {
                // setTimeout(() => {
                //   window.location.reload();
                // }, 10000);
              }
            });
          });
        }
      }
    }
  }, [selectedOption]);
  function handleDropdownChange(event) {
    const selectedOption = event.target.value;
    // console.log("selected doc", selectedOption); // Example action
    setSelectedOption(selectedOption); // Update selectedOption state
    setText(documentTexts[selectedOption] || "");
  }
  const handleSubmenuDropdownChange = (event) => {
    const selectedSubmenu = event.target.value;
    setSelectedSubmenu(selectedSubmenu);

    let selectedMenu = "";
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      console.error("menuData not found in localStorage");
      return;
    }
    const parsedMenuData = JSON.parse(menuDataString);
    // Check if selectedSubmenu is Table of Content or Summary
    if (selectedSubmenu === "Table of Content") {
      selectedMenu = "Table of Content";
    } else if (selectedSubmenu === "Summary") {
      selectedMenu = "Summary";
    } else {
      // Iterate over the keys of parsedMenuData
      for (const key in parsedMenuData) {
        const menuItem = parsedMenuData[key];
        const subdetails = menuItem.subdetails;
        for (const subKey in subdetails) {
          const subdetail = subdetails[subKey];
          for (const subkey in subdetail) {
            const subKeyData = subdetail[subkey];
            const dataArray = [
              subKeyData.Damage1Data,
              subKeyData.Damage2Data,
              subKeyData.Selection1Data,
              subKeyData.Selection2Data,
            ];

            let datakey = "";
            dataArray.forEach((data) => {
              if (data === selectedSubmenu) {
                datakey = data;
              }
            });

            const storedDataString = localStorage.getItem("CreateEditText");
            if (!storedDataString) {
              console.error("CreateEditText not found in localStorage");
              return;
            }
            const storedData = JSON.parse(storedDataString);

            Object.keys(storedData).forEach((key) => {
              const storedDatakey = storedData[key];
              const selectedOpt = storedDatakey.key;

              if (selectedOption === selectedOpt && key === datakey) {
                console.log(keys);
                console.log(datakey);
                console.log(selectedOption);
                console.log(storedDatakey.text);
              }
            });

            if (
              subKeyData &&
              (subKeyData.damage1 === selectedSubmenu ||
                subKeyData.damage2 === selectedSubmenu ||
                subKeyData.selection1 === selectedSubmenu ||
                subKeyData.selection2 === selectedSubmenu)
            ) {
              if (subKeyData.damage1 === selectedSubmenu) {
                selectedMenu = subKeyData.Damage1Data;
              } else if (subKeyData.damage2 === selectedSubmenu) {
                selectedMenu = subKeyData.Damage2Data;
              } else if (subKeyData.selection1 === selectedSubmenu) {
                selectedMenu = subKeyData.Selection1Data;
              } else if (subKeyData.selection2 === selectedSubmenu) {
                selectedMenu = subKeyData.Selection2Data;
              }
              break;
            }
          }
        }
      }
    }

    console.log("submenu:", selectedMenu);
    setSelectedDamage(selectedMenu);
  };

  const handleRemoveDocument = () => {
    if (!selectedOption) {
      return; // Handle no selected document case gracefully
    }

    // Retrieve the existing documents from local storage
    const existingDocuments =
      JSON.parse(localStorage.getItem("documents")) || [];

    // Remove the selected document from the array
    const documentToRemove = selectedOption;
    const updatedDocuments = existingDocuments.filter(
      (doc) => doc !== documentToRemove
    );

    // Update the documents state with the new list
    setDocuments(updatedDocuments);

    // Save the updated array back to local storage
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));

    // Retrieve the stored CreateEditData from local storage
    const createEditData =
      JSON.parse(localStorage.getItem("CreateEditData")) || [];
    const updatedCreateEditData = createEditData.filter(
      (doc) => doc.selectedOption !== selectedOption
    );

    // Save the updated CreateEditData array back to local storage
    localStorage.setItem(
      "CreateEditData",
      JSON.stringify(updatedCreateEditData)
    );

    // Retrieve the stored CreateEditText from local storage
    const createEditText =
      JSON.parse(localStorage.getItem("CreateEditText")) || {};
    const updatedCreateEditText = Object.keys(createEditText).reduce(
      (acc, key) => {
        if (createEditText[key].key !== documentToRemove) {
          acc[key] = createEditText[key];
        }
        return acc;
      },
      {}
    );

    // Save the updated CreateEditText object back to local storage
    localStorage.setItem(
      "CreateEditText",
      JSON.stringify(updatedCreateEditText)
    );

    // Remove the text of the selected document from documentTexts state
    setDocumentTexts((prevTexts) => {
      const { [selectedOption]: removedText, ...newTexts } = prevTexts;
      return newTexts;
    });

    // Clear the text state and selectedOption
    setText("");
    setSelectedOption("");
  };

  useEffect(() => {
    // Retrieve menuData from localStorage (if available)
    const storedMenuData = JSON.parse(localStorage.getItem("menuData")) || {};
    setMenuData(storedMenuData);
  }, []);

  return (
    <>
      <Header />
      <div>
        {showAlert.showAlert && (
          <Alert color={showAlert.color}>{showAlert.message}</Alert>
        )}
        <div className="main-container-for-the-info-of-generate-report-page">
          <div className="width-set-for-main-container-for-the-info-of-generate-report-page">
            <div className="section-for-page-that-contains-drop-downs-and-btns-and-checkboxes">
              <section className="drop-down-and-checkboxes-with-title">
                <p>File Name:</p>
                <select
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  className="dropdown-width-of-add-document"
                >
                  <option value="">Select A Document</option>
                  {documents.map((document, index) => (
                    <option key={index} value={document}>
                      {document}
                    </option>
                  ))}
                </select>
                <button
                  className="btns-for-add-and-remove-documents"
                  onClick={handleAddDocumentClick}
                >
                  Add New Document
                </button>
                {/* Add New Document Popup */}
                {isAddDocumentPopupOpen && (
                  <div className="add-document-popup">
                    <div className="popup-content-for-submenureport">
                      <h2>Add New Document</h2>
                      <label htmlFor="newDocumentName">Document Name:</label>
                      <input
                        type="text"
                        id="newDocumentName"
                        placeholder="Enter Document Name"
                      />
                      <div className="button-container">
                        <button onClick={handleAddDocument}>
                          Add Document (HDF)
                        </button>
                        {/* <button onClick={handleAddDocumentClose}>Cancel</button> */}
                        <button onClick={handleAddDocumentClose}>Close</button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Button 2 */}
                <button onClick={handleRemoveDocument}>Remove Document</button>
              </section>
              <p className="title-of-the-document-report-info">
                Current Document Title:{" "}
                <span className="bg-white px-2">{selectedOption}</span>
              </p>
              <section className="drop-down-and-checkboxes-with-title">
                <p>Include Document In current Template Before Section:</p>
                <section className="drop-down-and-checkboxes-with-title">
                  {/* <p>Include Document In current Template Before Section:</p> */}

                  <select
                    value={selectedSubmenu}
                    onChange={handleSubmenuDropdownChange}
                  >
                    <option>Select Submenu</option>
                    <option>Table of Content</option>
                    <option>Summary</option>
                    {submenus.map((tabName, index) => (
                      <option key={index} value={tabName}>
                        {tabName}
                      </option>
                    ))}
                  </select>
                  {details ? (
                    <select>
                      {details.damage1 && (
                        <option value="damage1">{details.damage1}</option>
                      )}
                      {details.damage2 && (
                        <option value="damage2">{details.damage2}</option>
                      )}
                      {details.selection1 && (
                        <option value="selection1">{details.selection1}</option>
                      )}
                      {details.selection2 && (
                        <option value="selection2">{details.selection2}</option>
                      )}
                      {details.toc && (
                        <option value="Table of Content">
                          Table of Content
                        </option>
                      )}
                      {details.summary && (
                        <option value="Summary">Summary</option>
                      )}
                    </select>
                  ) : (
                    <option></option>
                  )}
                </section>
              </section>
              <section className="checkbox-section-for-include-document">
                <p>Checkbox to include document on same page as section</p>
                <label htmlFor="">
                  This is useful for section Introduction:
                </label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </section>
            </div>
            <div className="section-for-page-contains-editor-that-can-change-text-decoration">
              <div
                style={{
                  display: "flex",
                  height: "60vh",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "55em",
                    height: "82%",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    border: "3px solid  rgb(229, 229, 229)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid #ccc",
                      backgroundColor: "rgb(229, 229, 229)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "10px",
                        alignItems: "center",
                      }}
                    >
                      <p onClick={handleOpenClick} className="cursor-pointer">
                        <img src={openimg} alt="" srcset="" />
                      </p>
                      <p
                        onClick={handleCut}
                        className="cursor-pointer"
                        style={{ height: "20px", width: "20px" }}
                      >
                        <img src={cutimg} alt="" srcset="" />
                      </p>
                      <p onClick={handleCopy} className="cursor-pointer">
                        <img src={copyimg} alt="" srcset="" />
                      </p>
                      <p onClick={handlePaste} className="cursor-pointer">
                        <img src={pasteimg} alt="" srcset="" />
                      </p>
                      <p
                        onClick={handleUndo}
                        className="cursor-pointer"
                        style={{ height: "27px", width: "27px" }}
                      >
                        <img src={undoimg} alt="" srcset="" />
                      </p>
                      <p
                        onClick={handleRedo}
                        className="cursor-pointer"
                        style={{ height: "27px", width: "27px" }}
                      >
                        <img src={redoimg} alt="" srcset="" />
                      </p>
                      <p onClick={handleFind} className="cursor-pointer">
                        <img src={findimg} alt="" srcset="" />
                      </p>
                      {/* Find popup */}
                      {showFindPopup && (
                        <div>
                          <div
                            style={{
                              position: "fixed",
                              top: "0",
                              left: "0",
                              backgroundColor: "rgb(242, 236, 236)",
                              border: "1px solid #ccc",
                              zIndex: "999",
                            }}
                          >
                            <div className="flex justify-between px-4 py-1">
                              <div className="text-sm">Search</div>
                              <div className="hover:bg-red-700 cursor-pointer">
                                <p className="px-1" onClick={handleFindClose}>
                                  X
                                </p>
                              </div>
                            </div>
                            <div className="px-6 pb-2">
                              <div>
                                <label
                                  style={{
                                    display: "block",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Find
                                </label>
                              </div>
                              <div>
                                {" "}
                                <input
                                  type="text"
                                  value={findText}
                                  onChange={handleFindTextChange}
                                  style={{ border: "1px solid skyblue" }}
                                />
                              </div>
                              <div style={{ marginBottom: "10px" }}>
                                <div>
                                  <label
                                    style={{
                                      marginRight: "10px",
                                      paddingTop: "10px",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={caseSensitive}
                                      onChange={handleCaseSensitiveChange}
                                    />
                                    Case Sensitive
                                  </label>
                                </div>
                                <div>
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={startAtTop}
                                      onChange={handleStartAtTopChange}
                                    />
                                    Start at Top
                                  </label>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  onClick={handleFindSubmit}
                                  className="p-1 mr-2"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={handleFindClose}
                                  className="p-1"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <p
                        onClick={handleBoldChange}
                        style={{ fontWeight: isBold ? "bold" : "normal" }}
                        className="cursor-pointer"
                      >
                        <img
                          src={boldimg}
                          alt=""
                          srcset=""
                          style={{ height: "20px", width: "20px" }}
                        />
                      </p>
                      <p
                        onClick={handleItalicChange}
                        style={{ fontStyle: isItalic ? "italic" : "normal" }}
                        className="cursor-pointer"
                      >
                        <img
                          src={italicimg}
                          alt=""
                          srcset=""
                          style={{ height: "20px", width: "20px" }}
                        />
                      </p>
                    </div>
                    <div style={{ flex: 1, padding: "10px" }}>
                      <select
                        value={font}
                        onChange={handleFontChange}
                        className="border"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="'Times New Roman', Times, serif">
                          Times New Roman
                        </option>
                        {/* Add more font options as needed */}
                      </select>
                      <input
                        type="number"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="border ml-2"
                        style={{ width: "127px" }}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: "10px" }}>
                    {copiedMessage && (
                      <div style={{ marginBottom: "10px", color: "green" }}>
                        {copiedMessage}
                      </div>
                    )}
                    <textarea
                      ref={textAreaRef}
                      style={{
                        fontFamily: font,
                        fontSize: `${fontSize}px`,
                        fontWeight: isBold ? "bold" : "normal",
                        fontStyle: isItalic ? "italic" : "normal",
                        width: "100%",
                        height: "100%",
                      }}
                      value={text}
                      onChange={handleTextareaChange}
                      className="px-2"
                    />
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {/* <button className="border border-black p-1" onClick={handleSave}>
            Save
          </button> */}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SubMenuInfoReport;
