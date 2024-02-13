import React, { useRef, useState, useEffect } from "react";
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
import { EditTempContext } from "../../Context";
import SaveTPZ from "./../SaveTemp/TPZ/SaveTPZ";
import OpenTPZ from "./../SaveTemp/TPZ/OpenTPZ";

const Header = ({ onButtonClick }) => {
  const [openTemplatePopup, setOpenTemplatePopup] = useState(false);
  const [saveTemplatePopup, setSaveTemplatePopup] = useState(false);
  const [editTemplatePopup, setEditTemplatePopup] = useState(false);
  const [internetLoginPopup, setInternetLoginPopup] = useState(false);
  const [batchAddPhotosPopup, setBatchAddPhotosPopup] = useState(false);
  const [coverPageDesignPopup, setCoverPageDesignPopup] = useState(false);
  const [opencoverPageDesignPopup, setopenCoverPageDesignPopup] =
    useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [colorPaletPopup, setOpenColorPaletPopup] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [value, setValue] = React.useState("");
  const ref = useRef(null);

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

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
  return (
    <>
      <div
        className="dropdown-container flex text-sm border-b-2 border-black-900"
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
              className="submenu w-36 absolute z-10 bg-white shadow mt-2"
              style={{
                lineHeight: "24px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              <li className="hover:bg-gray-200">Open Inspection</li>
              <li className="hover:bg-gray-200">Save Inspection</li>
              <li className="hover:bg-gray-200">Open Template</li>
              <li className="hover:bg-gray-200">Save Template</li>
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
              className="submenu w-36 left-12 absolute z-10 bg-white shadow mt-2"
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
                className="submenu w-36 absolute z-10 bg-white shadow mt-2"
                style={{ lineHeight: "12px", fontSize: "13px" }}
                onClick={openCoverPageDesignPopup}
              >
                {/* <Link to="/coverpagedesigner"> */}
                <li
                  className=" hover:bg-gray-200"
                  style={{
                    height: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cover Page Designer
                </li>
                {/* </Link> */}
              </ul>
            )}
          </div>
        </div>
        <div className="menu-item relative ml-4">
          <div
            className="main-label cursor-pointer"
            onClick={() => handleMenuClick(3)}
          >
            General information
          </div>
          {activeMenu === 3 && (
            <ul
              className="submenu w-36 absolute z-10 bg-white shadow mt-2"
              style={{
                lineHeight: "24px",
                fontSize: "13px",
                textAlign: "Center",
              }}
            >
              <Link to="/panel1">
                <li className=" hover:bg-gray-200">Wall</li>
              </Link>
              <li className=" hover:bg-gray-200">Batch Add Photos</li>
              <li className=" hover:bg-gray-200">Clear All Photos</li>
            </ul>
          )}
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
              className="submenu w-36  absolute z-10 bg-white shadow mt-2"
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
        <div>
          <ul>
            <li className="ml-5">About</li>
          </ul>
        </div>
      </div>
      <div
        className="header text-sm border-b-2 border-black"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <nav className="header2">
          <ul className="uordered-list-in-header-section">
            <li className="list-for-header-section-main-nav">
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
            <li className="list-for-header-section-main-nav  border-r border-black-900">
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
            </li>
            <hr />
            <div>
              <OpenTPZ />
            </div>
            <div>
              {/* Your other JSX elements */}
              <SaveTPZ />
            </div>
            <hr />

            {/* <Link to="/EditComments"> */}
            <li className="list-for-header-section-main-nav">
              <button
                // onClick={() => openPopup("editComments")}
                onClick={onButtonClick}
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

            <li className="list-for-header-section-main-nav  border-r border-black-900">
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
              <li className="list-for-header-section-main-nav border-r border-black-900">
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
              <li className="list-for-header-section-main-nav  border-r border-black-900">
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
            <li className="list-for-header-section-main-nav  border-r border-black-900">
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
                  Geneate
                  <br /> report
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
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your EditTemplate component here */}
            <CoverPageDesigner onClose={closeCoverPageDesignPopup} />
          </div>
        )}
        {colorPaletPopup && (
          <div className="popup Cover-Page-Design-Popup-ccc">
            {/* Render your color palet component here */}
            <ColorPalette onClose={closeColorPaletPopup} />
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
