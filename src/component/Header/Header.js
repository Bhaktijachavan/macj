import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Header.css";
import OpenTemp from "../OpenTemp/OpenTemp";
import EditTemp from "../EditTemp/EditTemp";
import SaveTemp from "../SaveTemp/SaveTemp";
import img1 from "../../Assets/icons/open_inspection.png";
import img2 from "../../Assets/icons/save_inspection.png";
import img3 from "../../Assets/icons/open_template.png";
import img4 from "../../Assets/icons/save_template.png";
import img5 from "../../Assets/icons/edit_comments.png";
import img6 from "../../Assets/icons/edit_template.png";
import img7 from "../../Assets/icons/pdf.png";
import img8 from "../../Assets/icons/client_info.png";
import img9 from "../../Assets/icons/contract_page.png";
import img10 from "../../Assets/icons/copy.png";
import img11 from "../../Assets/icons/paste.png";
import img12 from "../../Assets/icons/generate_report.png";
import img13 from "../../Assets/icons/upload_report.png";
import img14 from "../../Assets/icons/address_book.png";
import img15 from "../../Assets/icons/sync.png";
import { Link } from "react-router-dom";
import InternetLogin from "./../InternetLogin/InternetLogin";
import BatchAddPhotos from "./../Photo/BatchAddPhotos/BatchAddPhotos";
import CoverPageDesigner from "./../CoverPageDesigner/CoverPageDesigner";
import ColorPalette from "./../ColorPalet/ColorPalet";
import AboutUsMacj from "./../AboutUsMacj/AboutUsMacj";
import { useNavigate } from "react-router-dom";
import { useEditTempContext } from "../../Context";
import SubMenuInfoReport from "./../ExampleComponent/SubMenuInfoReport";
import Ratings from "./../Rating/Ratings";
import LayoutOptions from "./../LayoutOptions/LayoutOptions";
import {
  downloadFile,
  encryptData,
  decryptData,
  readFileAsText,
  encryptionKey,
  downloadFileTpz,
} from "../Function/function";
const Header = ({ onButtonClick }) => {
  const navigate = useNavigate();
  const [openTemplatePopup, setOpenTemplatePopup] = useState(false);
  const [saveTemplatePopup, setSaveTemplatePopup] = useState(false);
  const [editTemplatePopup, setEditTemplatePopup] = useState(false);
  const [internetLoginPopup, setInternetLoginPopup] = useState(false);
  const [batchAddPhotosPopup, setBatchAddPhotosPopup] = useState(false);
  const [coverPageDesignPopup, setCoverPageDesignPopup] = useState(false);
  const [editDocumentPopup, setEditDocumentPopup] = useState(false);
  const [opencoverPageDesignPopup, setopenCoverPageDesignPopup] =
    useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [colorPaletPopup, setOpenColorPaletPopup] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [value, setValue] = React.useState("");
  const [aboutUsPagePopup, setAboutUsPagePopup] = useState(false);
  const [ratingPopup, setRatingPopup] = useState(false);
  const [optionsPopup, setOptionsPopup] = useState(false);

  const { showComment, setShowComment } = useEditTempContext();
  const ref = useRef(null);
  const [header, setHeader] = useState();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };
  const openOpenTemplatePopup = () => {
    setOpenTemplatePopup(true);
  };
  const closeOpenTemplatePopup = () => {
    setOpenTemplatePopup(false);
  };
  const openColorPaletPopup = () => {
    setOpenColorPaletPopup(true);
  };
  const closeColorPaletPopup = () => {
    setOpenColorPaletPopup(false);
  };
  const openSaveTemplatePopup = () => {
    setSaveTemplatePopup(true);
  };
  const closeSaveTemplatePopup = () => {
    setSaveTemplatePopup(false);
  };
  const openEditTemplatePopup = () => {
    setEditTemplatePopup(true);
  };
  const closeEditTemplatePopup = () => {
    setEditTemplatePopup(false);
  };
  const closeCoverPageDesignPopup = () => {
    setCoverPageDesignPopup(false);
  };
  const openCoverPageDesignPopup = () => {
    setCoverPageDesignPopup(true);
  };
  const openCreateEditDocument = () => {
    setEditDocumentPopup(true);
  };
  const closeCreateEditDocument = () => {
    setEditDocumentPopup(false);
  };
  const openRatingPopup = () => {
    setRatingPopup(true);
  };
  const closeRatingPopup = () => {
    setRatingPopup(false);
  };
  const openOptionsPopup = () => {
    setOptionsPopup(true);
  };
  const closeOptionsPopup = () => {
    setOptionsPopup(false);
  };
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const onSaveInspection = useCallback(() => {
    const panalData = localStorage.getItem("TempPanelData");
    const TempPanelData = JSON.parse(panalData);
    const clientInfoData = JSON.parse(localStorage.getItem("clientInfoData"));
    const SelectionData = JSON.parse(localStorage.getItem("SelectionData"));
    const DamageData = JSON.parse(localStorage.getItem("DamageData"));
    const coverphotoImage = JSON.parse(localStorage.getItem("coverphotoImage"));
    const uploadedImage = localStorage.getItem("uploadedImage");
    const menuData = JSON.parse(localStorage.getItem("menuData"));
    const outputContent = localStorage.getItem("outputContent");
    // Check if any of the required data is missing
    if (!TempPanelData || !clientInfoData || !menuData || !outputContent) {
      return alert("Please complete the process");
    }
    const InspectionData = {
      clientInfoData,
      TempPanelData,
      SelectionData,
      DamageData,
      coverphotoImage,
      menuData,
      outputContent,
      uploadedImage,
      id: Date.now(),
    };
    const encryptedData = encryptData(InspectionData, encryptionKey);
    downloadFile(encryptedData);
  }, []);
  const onOpenInspection = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const encryptedData = await readFileAsText(file);
      const decryptedData = decryptData(encryptedData, encryptionKey);
      console.log("decryptedData ", decryptedData);
      localStorage.setItem("menuData", JSON.stringify(decryptedData.menuData));
      localStorage.setItem(
        "SelectionData",
        JSON.stringify(decryptedData.SelectionData)
      );
      localStorage.setItem(
        "DamageData",
        JSON.stringify(decryptedData.DamageData)
      );
      localStorage.setItem(
        "TempPanelData",
        JSON.stringify(decryptedData.TempPanelData)
      );
      localStorage.setItem("outputContent", decryptedData.outputContent);
      localStorage.setItem(
        "coverphotoImage",
        JSON.stringify(decryptedData.coverphotoImage)
      );
      localStorage.setItem("uploadedImage", decryptedData.uploadedImage);
      localStorage.setItem(
        "clientInfoData",
        JSON.stringify(decryptedData.clientInfoData)
      );
      alert("successfully opened");
    }
  };
  const handleOpenInspectionClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleSaveInspectionClick = () => {
    if (selectedFile) {
      // Perform save operation using the selectedFile
      console.log("Saving inspection with file:", selectedFile);
      // Reset the selectedFile state after saving
      setSelectedFile(null);
    } else {
      // Inform the user that no file is selected
      console.log("Please select a file for inspection.");
    }
  };
  const saveTpz = () => {
    const getTemp = localStorage.getItem("menuData");
    const getPanalData = localStorage.getItem("TempPanelData");
    if (getTemp == null) {
      return alert("Please Open Template First");
    }
    const menuData = JSON.parse(getTemp);
    const TempPanelData = JSON.parse(getPanalData);
    const tempData = {
      menuData,
      TempPanelData,
    };
    const encryptedData = encryptData(tempData, encryptionKey);
    downloadFileTpz(encryptedData);
  };
  const openTpz = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const encryptedData = await readFileAsText(file);
      const decryptedData = decryptData(encryptedData, encryptionKey);
      console.log("decryptedData ", decryptedData);
      localStorage.setItem("menuData", JSON.stringify(decryptedData.menuData));
      localStorage.setItem(
        "TempPanelData",
        JSON.stringify(decryptedData.TempPanelData)
      );
      alert("successfully opened tpz file ");
    }
  };
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };
  // const [activePopup, setActivePopup] = useState(null);
  const openPopup = (popupId) => {
    console.log(`Opening ${popupId} popup`);
    setActivePopup(popupId);
  };
  const closePopup = () => {
    console.log("Closing popup");
    setActivePopup(null);
  };
  const openisInternetLoginPopup = () => {
    setInternetLoginPopup(true);
  };
  const closeisInternetLoginPopup = () => {
    setInternetLoginPopup(false);
  };
  const closeBatchAddPhotosPopup = () => {
    setBatchAddPhotosPopup(false);
  };
  const openBatchAddPhotosPopup = () => {
    setBatchAddPhotosPopup(true);
  };
  const internetLogin = () => {
    console.log("Login Popup Clicked");
  };
  const openAboutUsPopup = () => {
    setAboutUsPagePopup(true);
  };
  const closeAboutUsPopup = () => {
    setAboutUsPagePopup(false);
  };
  // Reset the Batch Add Photos popup state when component unmounts
  useEffect(() => {
    return () => {
      setBatchAddPhotosPopup(false);
      setInternetLoginPopup(false);
      setEditTemplatePopup(false);
    };
  }, []);
  const handleCopy = () => {
    // Get the selected text
    const selectedText = window.getSelection().toString();
    // Copy the selected text to the clipboard
    navigator.clipboard
      .writeText(selectedText)
      .then(() => {
        console.log("Text copied:", selectedText);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };
  const handlePaste = () => {
    // Paste the text from the clipboard
    navigator.clipboard
      .readText()
      .then((text) => {
        setPastedText(text);
        console.log("Pasted text:", text);
      })
      .catch((error) => {
        console.error("Error pasting text:", error);
      });
  };
  useEffect(() => {
    const fetchMenuData = () => {
      const storedMenuData = localStorage.getItem("menuData");
      if (storedMenuData) {
        try {
          const parsedMenuData = JSON.parse(storedMenuData);
          setHeader(parsedMenuData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    // Execute the function immediately when the component mounts
    fetchMenuData();
    // Set up interval to check for updates every 50 seconds
    const intervalId = setInterval(fetchMenuData, 3000);
    return () => clearInterval(intervalId);
  }, []);
  const handleNavigate = (value) => {
    console.log("navigate", value);
  };
  return (
    <>
      <div
        className="dropdown-container flex text-sm border-b-2
border-black-900"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <div className="menu-item relative ml-4">
          <div
            className="main-label cursor-pointer"
            onClick={() => handleMenuClick(0)}
          >
            Edit
          </div>
          {activeMenu === 0 && (
            <ul
              className="submenu w-36 absolute z-10 bg-white shadow
mt-2"
              style={{
                lineHeight: "24px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              <li className="hover:bg-gray-200">
                <label
                  className="header2-tag-a"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  <div>
                    Open <br /> Inspection
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onOpenInspection}
                      accept=".hzf"
                    />
                  </div>
                </label>
              </li>
              <li className="hover:bg-gray-200">
                <button onClick={onSaveInspection}>Save Inspection</button>
              </li>
              <li className="hover:bg-gray-200" onClick={saveTpz}>
                Save Template
              </li>
              <li className="hover:bg-gray-200">
                <label
                  className="header2-tag-a"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  <div>
                    Open <br /> Template
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={openTpz}
                      accept=".tpz"
                    />
                  </div>
                </label>
              </li>
            </ul>
          )}
        </div>
        {/* <div>
            <ul>
              <li className="ml-5">Edit</li>
            </ul>
          </div> */}
        <div>
          {/* <ul onClick={internetLogin}>
              <li className="ml-5">Internet</li>
              {isInternetLoginPopup && <InternetLogin />}
            </ul> */}
          <div
            className="main-label cursor-pointer ml-4"
            onClick={() => handleMenuClick(1)}
          >
            Internet
          </div>
          {activeMenu === 1 && (
            <ul
              className="submenu w-36 left-12 absolute z-10 bg-white
shadow mt-2"
              style={{ fontSize: "13px" }}
              onClick={setInternetLoginPopup}
            >
              <li
                className=" hover:bg-gray-200"
                style={{
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Internet Login
              </li>
              {/* {isInternetLoginPopup && <InternetLogin />} */}
            </ul>
          )}
        </div>
        <div>
          <div className="menu-item relative ml-4">
            <div
              className="main-label cursor-pointer"
              onClick={() => handleMenuClick(2)}
            >
              Report Setting
            </div>
            {activeMenu === 2 && (
              <ul
                className="submenu w-36 absolute z-10 bg-white shadow
mt-2"
                style={{ lineHeight: "12px", fontSize: "13px" }}
              >
                {/* <Link to="/coverpagedesigner"> */}
                <li
                  className=" hover:bg-gray-200"
                  onClick={openCoverPageDesignPopup}
                  style={{
                    height: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cover Page Designer
                </li>
                <Link to="/submenureport">
                  <li
                    className=" hover:bg-gray-200"
                    style={{
                      height: "2em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Create And Edit Document
                  </li>
                </Link>
                <li
                  className=" hover:bg-gray-200"
                  style={{
                    height: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={openRatingPopup}
                >
                  Ratings
                </li>
                <li
                  className=" hover:bg-gray-200"
                  style={{
                    height: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={openOptionsPopup}
                >
                  Options
                </li>
                <Link to="/stationery">
                  <li
                    className=" hover:bg-gray-200"
                    style={{
                      height: "2em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Stationery
                  </li>
                </Link>
                {/* </Link> */}
              </ul>
            )}
          </div>
        </div>
        <div className="menu-item relative ml-4">
          <div
            className="main-label cursor-pointer"
            onClick={() => handleMenuClick(4)}
          >
            Photos
          </div>
          {activeMenu === 4 && (
            <ul
              className="submenu w-36  absolute z-10 bg-white shadow
mt-2"
              style={{
                lineHeight: "34px",
                fontSize: "13px",
                textAlign: "Center",
              }}
            >
              <Link to="/photoreview">
                <li className=" hover:bg-gray-200">Add Review Photos</li>
              </Link>
              {/* <Link to="/batchaddphotos"> */}
              <li
                className=" hover:bg-gray-200"
                onClick={setBatchAddPhotosPopup}
              >
                Batch Add Photos
              </li>
              {/* </Link> */}
              <li className=" hover:bg-gray-200">Clear All Photos</li>
            </ul>
          )}
        </div>
        <div className="flex">
          {/* <ul className="flex" onClick={openAboutUsPopup}> */}
          <ul className="flex" onClick={openAboutUsPopup}>
            <li className="ml-5">About</li>
            {/* fetch here localstorage menudtatanad submenu items  */}
            {/* <Link to="/panel1"> */}
          </ul>
        </div>
        <div className="for-the-tabs-header-panel">
          <ul className="flex">
            {/* <li className="ml-5">About</li> */}
            {/* fetch here localstorage menudtatanad submenu items  */}
            {/* <Link to="/panel1"> */}
            {header &&
              Object.keys(header).map((key) => (
                <li className="ml-5" key={key}>
                  <div
                    onClick={() => toggleDropdown(key)}
                    style={{ position: "relative" }}
                  >
                    {header[key].name}
                    {activeDropdown === key && (
                      <div
                        className="submenu w-36 absolute z-10 bg-white shadow mt-2"
                        style={{
                          top: "100%",
                          left: 0,
                          lineHeight: "34px",
                          fontSize: "13px",
                          textAlign: "center",
                        }}
                      >
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {header[key].subitems.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                onClick={() =>
                                  navigate("/panalHeader", {
                                    state: header[key].subdetails[subItem.si],
                                  })
                                }
                              >
                                {subItem.subName}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div
        className="header text-sm border-b-2 border-black"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <nav className="header2">
          <ul className="uordered-list-in-header-section">
            {/* <li className="list-for-header-section-main-nav">
                <a
                  href="#file"
                  onClick={handleOpenInspectionClick}
                  className="header2-tag-a"
                >
                  <div className="flex justify-center">
                    <img src={img1} alt="" />
                  </div>
                  <div className="">
                    Open <br /> Inspection
                  </div>
                </a>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </li>
              <li className="list-for-header-section-main-nav  border-r
border-black-900">
                <a
                  href="#edit"
                  onClick={handleSaveInspectionClick}
                  className="header2-tag-a"
                >
                  <div className="flex justify-center">
                    <img src={img2} alt="" />
                  </div>
                  <div>
                    Save <br /> Inspection
                  </div>
                </a>
              </li> */}
            <li className="list-for-header-section-main-nav">
              <button
                onClick={handleOpenInspectionClick}
                className="header2-tag-a"
              >
                <div className="flex justify-center">
                  <img src={img1} alt="" />
                </div>
                <div className="">
                  Open <br /> Inspection
                </div>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={onOpenInspection}
              />
            </li>
            <button onClick={onSaveInspection}>
              <li
                className="list-for-header-section-main-nav border-r
border-black-900"
              >
                <button
                  href="#edit"
                  onClick={handleSaveInspectionClick}
                  className="header2-tag-a"
                >
                  <div className="flex justify-center">
                    <img src={img2} alt="" />
                  </div>
                  <div>
                    Save <br /> Inspection
                  </div>
                </button>
              </li>
            </button>
            <hr />
            <div className="list-for-header-section-main-nav
             hover:bg-gray-200">
              <div className="flex justify-center mt-1">
                <img src={img4} alt="" />
              </div>
              <li >
                <label
                  className="header2-tag-a"
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    Open <br /> Template
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={openTpz}
                      accept=".tpz"
                    />
                  </div>
                </label>
              </li>
            </div>
            <div className="list-for-header-section-main-nav border-r
            border-black-900 mt-2">

              <li className="hover:bg-gray-200" onClick={saveTpz}>
                <div className="flex justify-center">
                  <img src={img3} alt="" />
                </div>
                Save <br />Template
              </li>
            </div>

            {/* <Link to="/EditComments"> */}
            <li className="list-for-header-section-main-nav">
              <button
                // onClick={() => {
                //   if (showComment === true) {
                //     setShowComment(false);
                //   } else {
                //     setShowComment(true);
                //   }
                // }}
                className="header2-tag-a"
              >
                <div className="flex justify-center">
                  <img src={img5} alt="" />
                </div>
                <div>
                  Edit <br />
                  Comments
                </div>
              </button>
            </li>
            {/* </Link> */}
            <li
              className="list-for-header-section-main-nav  border-r
border-black-900"
            >
              <a
                href="#"
                onClick={openEditTemplatePopup}
                className="header2-tag-a"
              >
                <div className="flex justify-center">
                  <img src={img6} alt="" />
                </div>
                <div>
                  Edit <br />
                  Template
                </div>
              </a>
            </li>
            <Link to="/insertpdf">
              <li className="list-for-header-section-main-nav">
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img7} alt="" />
                  </div>
                  <div>
                    Insert PDF <br /> Documments
                  </div>
                </a>
              </li>
            </Link>
            <hr />
            <Link to="/">
              <li
                className="list-for-header-section-main-nav border-r
border-black-900"
              >
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img8} alt="" />
                  </div>
                  <div>
                    Client
                    <br /> Info
                  </div>
                </a>
              </li>
            </Link>
            <Link to={{ pathname: "/Book" }}>
              <li className="list-for-header-section-main-nav">
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img14} alt="" />
                  </div>
                  <div>
                    Address
                    <br /> Book
                  </div>
                </a>
              </li>
            </Link>
            <Link to="/contractpage">
              <li
                className="list-for-header-section-main-nav  border-r
border-black-900"
              >
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img9} alt="" />
                  </div>
                  <div>
                    Contract
                    <br /> Page
                  </div>
                </a>
              </li>
            </Link>
            <hr />
            <li className="list-for-header-section-main-nav">
              <a href="#" className="header2-tag-a" onClick={handleCopy}>
                <div className="flex justify-center">
                  <img src={img10} alt="" />
                </div>
                <div>Copy</div>
              </a>
            </li>
            <li
              className="list-for-header-section-main-nav  border-r
border-black-900"
            >
              <a
                href="#"
                className="header2-tag-a"
                onClick={(e) => {
                  let paste = (e.clipboardData || window.clipboardData).getData(
                    "Text"
                  );
                  setValue(paste);
                }}
              // onClick={handlePaste}
              >
                <div className="flex justify-center">
                  <img src={img11} alt="" />
                </div>
                <div>Paste</div>
              </a>
            </li>
            <hr />
            {/* <Link to="/generateReport"> */}
            <li className="list-for-header-section-main-nav">
              <a
                href="#"
                className="header2-tag-a"
                onClick={openColorPaletPopup}
              >
                <div className="flex justify-center">
                  <img src={img12} alt="" />
                </div>
                <div>
                  Generate <br /> report
                </div>
              </a>
            </li>
            {/* </Link> */}
            <hr />
            <li className="list-for-header-section-main-nav">
              <a href="#" className="header2-tag-a">
                {/* <div className="flex justify-center">
                    <img src={img15} alt="" />
                  </div>
                  <div>
                    Mobile
                    <br /> Sync
                  </div> */}
                <Link to="/mobilesync">
                  <li className="list-for-header-section-main-nav">
                    <a href="#" className="header2-tag-a p-0">
                      <div className="flex justify-center">
                        <img src={img15} alt="" />
                      </div>
                      <div>
                        Mobile
                        <br />
                        Sync
                      </div>
                    </a>
                  </li>
                </Link>
              </a>
            </li>
            <hr />
          </ul>
        </nav>
        {openTemplatePopup && (
          <div className="popup">
            {/* Render your OpenTemplate component here */}
            <OpenTemp onClose={closeOpenTemplatePopup} />
          </div>
        )}
        {saveTemplatePopup && (
          <div className="popup">
            {/* Render your OpenTemplate component here */}
            <SaveTemp onClose={closeSaveTemplatePopup} />
          </div>
        )}
        {editTemplatePopup && (
          <div className="popup m-0">
            {/* Render your EditTemplate component here */}
            <EditTemp onClose={closeEditTemplatePopup} />
          </div>
        )}{" "}
        {internetLoginPopup && (
          <div className="popup m-0">
            {/* Render your EditTemplate component here */}
            <InternetLogin onClose={closeisInternetLoginPopup} />
          </div>
        )}
        {batchAddPhotosPopup && (
          <div className="popup m-0">
            {/* Render your EditTemplate component here */}
            <BatchAddPhotos onClose={closeBatchAddPhotosPopup} />
          </div>
        )}{" "}
        {coverPageDesignPopup && (
          <div className="popup-gfhgCover-Page-Design-Popup-ccc">
            {/* Render your EditTemplate component here */}
            <CoverPageDesigner onClose={closeCoverPageDesignPopup} />
          </div>
        )}
        {editDocumentPopup && (
          <div className="popup-gfhgCover-Page-Design-Popup-ccc">
            {/* Render your EditTemplate component here */}
            <SubMenuInfoReport onClose={closeCreateEditDocument} />
          </div>
        )}
        {colorPaletPopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <ColorPalette onClose={closeColorPaletPopup} />
          </div>
        )}{" "}
        {aboutUsPagePopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <AboutUsMacj onClose={closeAboutUsPopup} />
          </div>
        )}
        {ratingPopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <Ratings onClose={closeRatingPopup} />
          </div>
        )}
        {optionsPopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <LayoutOptions onClose={closeOptionsPopup} />
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
