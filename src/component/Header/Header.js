import React, { useRef, useState, useContext, useEffect } from "react";
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
import { EditTempContext } from '../../Context';
const SubmenuPopup = ({ isVisible, submenuItems, position, onClose }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="submenu-popup absolute z-10 bg-white shadow mt-2" style={{ top: position.top, left: position.left, width: "180px", lineHeight: "12px" }}>
      {submenuItems.map((subItem, index) => (
        <Link to={subItem.link} key={index}>
          <div className="py-2 px-4 hover:bg-gray-200" onClick={onClose}>
            {subItem.submenuname}
          </div>
        </Link>
      ))}
    </div>
  );
};
const Header = () => {
  const [openTemplatePopup, setOpenTemplatePopup] = useState(false);
  const [saveTemplatePopup, setSaveTemplatePopup] = useState(false);
  const [editTemplatePopup, setEditTemplatePopup] = useState(false);
  const { editTempData, setEditTempData } = useContext(EditTempContext);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    console.log(editTempData);
  }, [editTempData]);
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };
  const toggleSubMenu = (menuId, position) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
    setSubmenuPosition(position);
    window.location.href = '/panel1';
  };
  const closeSubmenu = () => {
    setActiveMenu(null);
  };
  const openOpenTemplatePopup = () => {
    setOpenTemplatePopup(true);
  };
  const closeOpenTemplatePopup = () => {
    setOpenTemplatePopup(false);
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
  // Add a conditional check for editTempData
  const editTempArray = editTempData || [];
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
          ></div>
          {activeMenu === 0 && (
            <ul
              className="submenu absolute z-10 bg-white shadow mt-2 w-48 leading-tight"
              style={{ width: "180px", lineHeight: "12px" }}
            >
              <li className="py-2 px-4 hover:bg-gray-200 text-xs">
                Open Inspection
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 text-xs">
                Save Inspection
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 text-xs">
                Open Template
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 text-xs">
                Save Template
              </li>
            </ul>
          )}
        </div>
        <div>
          <ul>
            <li className="ml-5">Edit</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="ml-5">Internet</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="ml-5">Report Setting</li>
          </ul>
        </div>
        <div className="menu-item relative ml-4">
          <div
            className="main-label cursor-pointer"
            onClick={() => handleMenuClick(1)}
          >
            General information
          </div>
          {activeMenu === 1 && (
            <ul
              className="submenu absolute z-10 bg-white shadow mt-2"
              style={{ width: "180px", lineHeight: "12px" }}
            >
              <Link to="/panel1">
                <li className="py-2 px-4 hover:bg-gray-200">Wall</li>
              </Link>
              <li className="py-2 px-4 hover:bg-gray-200">Batch Add Photos</li>
              <li className="py-2 px-4 hover:bg-gray-200">Clear All Photos</li>
            </ul>
          )}
        </div>
        <div className="menu-item relative ml-4">
          <div
            className="main-label cursor-pointer"
            onClick={() => handleMenuClick(2)}
          >
            Photos
          </div>
          {activeMenu === 2 && (
            <ul
              className="submenu absolute z-10 bg-white shadow mt-2"
              style={{ width: "180px", lineHeight: "12px" }}
            >
              <Link to="/photoreview">
                <li className="py-2 px-4 hover:bg-gray-200">
                  Add Review Photos
                </li>
              </Link>
              <Link to="/batchaddphotos">
                <li className="py-2 px-4 hover:bg-gray-200">
                  Batch Add Photos
                </li>
              </Link>
              <li className="py-2 px-4 hover:bg-gray-200">Clear All Photos</li>
            </ul>
          )}
        </div>
        <div>
          <ul>
            <li className="ml-5">About</li>
          </ul>
        </div>
        <div>
          <div>
          <ul className="flex ml-5 gap-5">
              {editTempArray.map((edit) => (
                <li key={edit.id} className="menu-item" onClick={(e) => toggleSubMenu(edit.id, { top: e.clientY, left: e.clientX })}>
                  {edit.menuname}
                  <SubmenuPopup isVisible={activeMenu === edit.id} submenuItems={edit.subItems} position={submenuPosition} onClose={closeSubmenu} />
                </li>
              ))}
            </ul>
          </div>
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
            <li className="list-for-header-section-main-nav">
              <a
                href="#"
                onClick={openOpenTemplatePopup}
                className="header2-tag-a"
              >
                <div className="flex justify-center">
                  <img src={img3} alt="" />
                </div>
                <div>
                  Open
                  <br /> Template
                </div>
              </a>
            </li>
            <li className="list-for-header-section-main-nav  border-r border-black-900">
              <a
                href="#report-settings"
                onClick={openSaveTemplatePopup}
                className="header2-tag-a"
              >
                <div className="flex justify-center">
                  <img src={img4} alt="" />
                </div>
                <div>
                  Save
                  <br /> Template
                </div>
              </a>
            </li>
            <hr />
            <Link to="/EditComments">
              <li className="list-for-header-section-main-nav">
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img5} alt="" />
                  </div>
                  <div>
                    Edit <br />
                    Comments
                  </div>
                </a>
              </li>
            </Link>
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
              <a href="#" className="header2-tag-a">
                <div className="flex justify-center">
                  <img src={img10} alt="" />
                </div>
                <div>Copy</div>
              </a>
            </li>
            <li className="list-for-header-section-main-nav  border-r border-black-900">
              <a href="#" className="header2-tag-a">
                <div className="flex justify-center">
                  <img src={img11} alt="" />
                </div>
                <div>Paste</div>
              </a>
            </li>
            <hr />
            <Link to="/generateReport">
              <li className="list-for-header-section-main-nav">
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img12} alt="" />
                  </div>
                  <div>
                    Geneate
                    <br /> report
                  </div>
                </a>
              </li>
            </Link>
            <hr />
            <Link to="/mobileUpload">
              <li className="list-for-header-section-main-nav">
                <a href="#" className="header2-tag-a">
                  <div className="flex justify-center">
                    <img src={img15} alt="" />
                  </div>
                  <div>
                    Mobile
                    <br /> Sync
                  </div>
                </a>
              </li>
            </Link>
            <li className="list-for-header-section-main-nav  border-r border-black-900">
              <a href="#" className="header2-tag-a">
                <div className="flex justify-center">
                  <img src={img13} alt="" />
                </div>
                <div>
                  Upload
                  <br /> report
                </div>
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
        )}
      </div>
    </>
  );
};
export default Header;