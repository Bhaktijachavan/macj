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
  const [isAddDocumentPopupOpen, setAddDocumentPopupOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
    color : undefined,
  });

  // Event handler for opening the "Add New Document" popup
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

    // Update the documents state with the new document
    setDocuments([...documents, newDocument]);

    // Clear the input field for the next document
    newDocumentNameInput.value = "";
  }

  // State to manage the selected option in the dropdown
  // Event handler for dropdown change
  // Event handler for button 1 click
  const handleButton1Click = () => {
    console.log(`Button 1 clicked with selected option: ${selectedOption}`);
    // Add your custom logic here
  };
  // Event handler for button 2 click
  const handleButton2Click = () => {
    // Remove document from "tabledata" in localStorage
    localStorage.removeItem("summarydataString");
    setShowAlert({
      showAlert: true,
      message: "Document removed successfully.",
      color : "green",
    
    })
    setTimeout(() => {
      setShowAlert({
        showAlert: false,
        message: "",
      }); // Hide the alert after 3 seconds
    }, 4000);

    // Add your custom logic here
  };

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
    // Implement your logic for finding text
    // You can use the values of findText, caseSensitive, and startAtTop
    // to perform the find operation
    // ...
    // Close the Find popup after finding
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

  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [submenus, setSubmenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    // Step 1: Retrieve menuData from localStorage
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      return;
    }

    // Step 2: Parse menuData and set it to the state
    const parsedMenuData = JSON.parse(menuDataString);
    setMenuData(parsedMenuData);
    console.log("parsedMenuData ", parsedMenuData);

    // Extract submenus from parsedMenuData
    const extractedSubmenus = [];
    Object.keys(parsedMenuData).forEach((key) => {
      if (parsedMenuData[key].subitems) {
        parsedMenuData[key].subitems.forEach((sub) => {
          extractedSubmenus.push(sub.subName);
        });
      }
    });

    // Update submenus state with extracted subNames
    setSubmenus(extractedSubmenus);

    // Optionally, select the first submenu or an empty string initially
    const defaultSelectedSubmenu = submenus.length > 0 ? submenus[0] : "";
    setSelectedSubmenu(defaultSelectedSubmenu);
  }, []);
  function handleDropdownChange(event) {
    const selectedOption = event.target.value;

    // Perform actions based on the selectedOption value
    if (selectedOption === "") {
      console.log("No document selected"); // Example action
    } else {
      console.log("Selected document:", selectedOption); // Example action
    }
    setSelectedOption(selectedOption); // Update selectedOption state
  }
  const handleSubmenuDropdownChange = (event) => {
    const selectedSubmenu = event.target.value;
    setSelectedSubmenu(selectedSubmenu);
    // Implement your logic here based on the selected submenu
    console.log("Selected submenu:", selectedSubmenu);
  };

  useEffect(() => {
    // Retrieve menuData from localStorage (if available)
    const storedMenuData = JSON.parse(localStorage.getItem("menuData")) || {};
    setMenuData(storedMenuData);
  }, []);
  const handleSave = () => {
    const selectedOptionId = generateUniqueId(); // Generate a unique ID
    const textareaValue = textAreaRef.current.value; // Access value from textarea ref
    console.log("textareaValue", textareaValue);

    // If no submenu is selected, store textareaValue directly as tabledata in localStorage
    if (!selectedSubmenu) {
      localStorage.setItem("summarydataString", textareaValue);
      setShowAlert({
        showAlert: true,
        message: "Text saved successfully",
        color: "green",

    
        
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 4000);
      return;
    }

    // Create new summary data object
    const newSummaryData = {
      [selectedOptionId]: {
        textareaValue,
      },
    };

    // Update menuData with the new summary data under the selected submenu
    const updatedMenuData = {
      ...menuData,
      [selectedSubmenu]: {
        ...menuData[selectedSubmenu], // Preserve existing subMenu data
        SummaryData: {
          ...menuData[selectedSubmenu]?.SummaryData, // Merge existing SummaryData
          ...newSummaryData,
        },
      },
    };

    setMenuData(updatedMenuData);

    // Save updated menuData to localStorage
    localStorage.setItem("menuData", JSON.stringify(updatedMenuData));

    setShowAlert({
      showAlert: true,
      message: "Data saved succesfully ",
      color: "green",
    
    })
    setTimeout(() => {
      setShowAlert({
        showAlert: false,
        message: "",
      }); // Hide the alert after 3 seconds
    }, 4000);

    // Handle optional download logic (commented out)
    // ... code to download JSON as a file ...
  };

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <>
      <Header />
      <div>
      {showAlert.showAlert && <Alert color={showAlert.color} >{showAlert.message}</Alert>}
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
                  {documents.length === 0 && (
                    <option value="" style={{ width: "200px" }}>
                      Select A Document
                    </option>
                  )}
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
                        <button onClick={handleAddDocumentClose}>Cancel</button>
                        <button onClick={handleAddDocumentClose}>Close</button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Button 2 */}
                <button
                  className="btns-for-add-and-remove-documents"
                  onClick={handleButton2Click}
                >
                  Remove Docuement
                </button>
              </section>
              <p className="title-of-the-document-report-info">
                Current Document Title: Room
              </p>
              <section className="drop-down-and-checkboxes-with-title">
                <p>Include Document In current Template Before Section:</p>
                <section className="drop-down-and-checkboxes-with-title">
                  <p>Include Document In current Template Before Section:</p>
                  <select
                    value={selectedSubmenu}
                    onChange={handleSubmenuDropdownChange}
                  >
                    <option value="">Select A Submenu</option>
                    {Object.keys(menuData).map((subMenuKey) => (
                      <option key={subMenuKey} value={subMenuKey}>
                        {menuData[subMenuKey].name}
                      </option>
                    ))}
                  </select>
                </section>
              </section>
              <section className="checkbox-section-for-include-document">
                <p>Checkbox to include document on same page as section</p>
                <label htmlFor="">
                  This is useful for section Introduction:
                </label>
                <input type="checkbox" name="" id="" />
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
                      onChange={(e) => setText(e.target.value)}
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
          <button className="border border-black p-1" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SubMenuInfoReport;
