import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import moveUpButtonImg from "../../Assets/icons/ic_up.png";
import moveDownButtonImg from "../../Assets/icons/ic_down.png";
import inheritButtonImg from "../../Assets/icons/sync.png";
import selectIconsButtonImg from "../../Assets/icons/open_inspection.png";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import ColorPicker from "./ColorPicker";

const ColorPalette = ({ onClose }) => {
  const [localStorageData, setLocalStorageData] = useState([]);
  // State for row colors
  const [rowColors, setRowColors] = useState([
    {
      id: 1,
      border: "#ff0000",
      headerBackground: "#00ff00",
      footerBackground: "#0000ff",
      tocBackground: "#ffff00",
    },
    {
      id: 2,
      border: "#ff0000",
      headerBackground: "#00ff00",
      footerBackground: "#0000ff",
      tocBackground: "#ffff00",
    },
    {
      id: 3,
      border: "#ff0000",
      headerBackground: "#00ff00",
      footerBackground: "#0000ff",
      tocBackground: "#ffff00",
    },
  ]);

  // State for table data
  const [dummyData, setDummyData] = useState([]);

  // State for selected row
  const [selectedRow, setSelectedRow] = useState(null);

  // State for "Select All" checkbox
  const [selectAll, setSelectAll] = useState(false);

  // State to store all table data
  const [allTableData, setAllTableData] = useState([]);

  // State for managing color picker
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({
    top: 0,
    left: 0,
  });

  // Function to handle color change
  const handleColorChange = (id, column, color) => {
    setRowColors((prevColors) =>
      prevColors.map((row) =>
        row.id === id ? { ...row, [column]: color } : row
      )
    );
  };

  // Function to handle close

  // const handleClose = () => {
  // Handle close logic here
  // };

  // Function to handle row click
  const handleRowClick = (index, columnIndex) => {
    if (columnIndex === 0) {
      setSelectedRow(index === selectedRow ? null : index);
      setSelectAll(false); // Deselect "Select All" when a specific row is clicked
    }
  };

  // Function to handle moving up
  const handleMoveUp = () => {
    if (selectedRow > 0) {
      setRowColors((prevColors) => {
        const updatedColors = [...prevColors];
        const tempColor = updatedColors[selectedRow];
        updatedColors[selectedRow] = updatedColors[selectedRow - 1];
        updatedColors[selectedRow - 1] = tempColor;
        return updatedColors;
      });

      setDummyData((prevData) => {
        const updatedData = [...prevData];
        const tempData = updatedData[selectedRow];
        updatedData[selectedRow] = updatedData[selectedRow - 1];
        updatedData[selectedRow - 1] = tempData;
        return updatedData;
      });

      setSelectedRow(selectedRow - 1);
    }
  };

  // Function to handle moving down
  const handleMoveDown = () => {
    if (selectedRow !== null && selectedRow < rowColors.length - 1) {
      setRowColors((prevColors) => {
        const updatedColors = [...prevColors];
        const tempColor = updatedColors[selectedRow];
        updatedColors[selectedRow] = updatedColors[selectedRow + 1];
        updatedColors[selectedRow + 1] = tempColor;
        return updatedColors;
      });

      setDummyData((prevData) => {
        const updatedData = [...prevData];
        const tempData = updatedData[selectedRow];
        updatedData[selectedRow] = updatedData[selectedRow + 1];
        updatedData[selectedRow + 1] = tempData;
        return updatedData;
      });

      setSelectedRow(selectedRow + 1);
    }
  };

  // Function to handle "Select All"
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRow(null);

    // Retrieve all table data when "Select All" is checked
    if (!selectAll) {
      const allData = dummyData.map((data) => ({ ...data }));
      setAllTableData(allData);
    } else {
      setAllTableData([]);
    }
  };

  // Function to open the color picker
  // const openColorPicker = (index, event) => {
  //   setSelectedColorIndex(index);

  //   // Calculate position relative to the document
  //   const rect = event.target.getBoundingClientRect();
  //   const top = rect.bottom + window.scrollY;
  //   const left = rect.left + window.scrollX;

  //   setColorPickerPosition({ top, left });
  //   setIsModalOpen(true);
  // };
  const [menuData, setMenuData] = useState([]);
  // Function to close the color picker
  const closeColorPicker = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedMenuData = localStorage.getItem('menuData');
    console.log('storedMenuData:', storedMenuData);

    if (storedMenuData) {
      const parsedMenuData = JSON.parse(storedMenuData);
      setMenuData(parsedMenuData);
      setDummyData(parsedMenuData);

      // Iterate over the properties of the outermost object
      for (const outerKey in parsedMenuData) {
        if (parsedMenuData.hasOwnProperty(outerKey)) {
          const outerObject = parsedMenuData[outerKey];

          // Accessing the properties of the outer object
          const name = outerObject.name;
          console.log('Name:', name);

          // Iterate over the subitems array
          const subItems = outerObject.subitems;
          if (subItems && subItems.length > 0) {
            // Assuming you want the first subItem
            const subItem = subItems[0];
            const subName = subItem.subName;
            console.log('SubName:', subName);
          }

          // Accessing the properties of the subdetails object
          const subDetails = outerObject.subdetails;
          console.log('SubDetails:', subDetails);
        }
      }
    }
  }, []);


  useEffect(() => {
    console.log("parsed object ", dummyData)


  }

  )

  // useEffect(() => {
  //   const handleLocalStorageChange = () => {
  //     const storedMenuData = localStorage.getItem("menuData");
  //     const parsedMenuData = JSON.parse(storedMenuData) || [];

  //     setDummyData(parsedMenuData);
  //   };

  //   window.addEventListener("storage", handleLocalStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleLocalStorageChange);
  //   };
  // }, []);
  useEffect(() => {
    // Fetch or set your localStorageData here
    const storedData = localStorage.getItem('menuData');
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
    }
    console.log(localStorageData);
  }, []);

  // const pdf = new jsPDF();
  // pdf.autoTableInitialize();

  // Function to handle close and generate PDF
  const handleClose = () => {

    onClose();
  };


  // ..

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="fixed inset-0 flex items-center justify-center top-12">
        <div
          className="rounded-lg"
          style={{ width: "90%", backgroundColor: "#f3f2f1" }}
        >
          <div className="flex justify-between items-center border-b border-slate-400 ">
            <span className="px-3">Print Settings</span>
            <span
              className="cursor-pointer px-3 hover:bg-red-500 hover:text-white  "
              onClick={onClose}
            >
              X
            </span>
          </div>
          <div className=" p-6">
            <div className="text-center">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <p>
                  Dolorum aperiam officia nam minima, reiciendis ad perspiciatis
                  vitae quod illum molestiae dignissimos corrupti,
                </p>
                voluptate maxime dolore sed. Dicta, iure recusandae. Atque.
              </p>
            </div>

            <div className="flex">
              <div>
                <table
                  className="w-full"
                  style={{
                    width: "100%",
                    backgroundColor: "#ffff",
                    border: "2px solid #3498db",
                  }}
                >
                  <thead>
                    <tr className="text-sm  font-thin">
                      <th className="border font-semibold p-2">Section name</th>
                      <th className="border font-semibold p-2">
                        Section title font
                      </th>
                      <th className="border font-semibold p-2">Print</th>
                      <th className="border font-semibold p-2 color-column">
                        Border
                      </th>
                      <th className="border font-semibold p-2 color-column">
                        Header Background
                      </th>
                      <th className="border font-semibold p-2">Header Font</th>
                      <th className="border font-semibold p-2 color-column">
                        Footer Background
                      </th>
                      <th className="border font-semibold p-2">Footer Font</th>
                      <th className="border font-semibold p-2">Section Icon</th>
                      <th className="border font-semibold p-2 color-column">
                        TOC background
                      </th>
                      <th className="border font-semibold p-2">TOC Font</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuData.length > 0 && menuData.map((data, index) => (
                      <tr
                        key={index}
                        className={selectAll || selectedRow === index ? "bg-gray-200" : ""}
                        onClick={() => handleRowClick(index, 0)}
                      >
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        {/* Access the data from subitems using the same index */}
                        <td>{data.subitems.length > 0 ? data.subitems[0].subName : ''}</td>
                        {/* ... (other cells) */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {console.log(dummyData[0]?.subitems.subName)}
                {/* <tbody>
                    {localStorageData.length > 0 && localStorageData.map((index) => (
                      <tr
                        key={index}
                        className={selectAll || selectedRow === index ? "bg-gray-200" : ""}
                        onClick={() => handleRowClick(index, 0)}
                      >
                        <td className="border p-2">{localStorageData[index]?.subitems[0]?.subName}</td>


                        <td className="border p-2"></td>
                        <td className="border p-2">
                          <input
                            type="checkbox"
                            checked={data.print}
                            onChange={() => { }}
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="color"
                            id={`border_color_${index}`}
                            name={`border_color_${index}`}
                            value={rowColors[index].border}
                            onChange={(e) =>
                              handleColorChange(
                                data.id,
                                "border",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="color"
                            id={`header_bg_color_${index}`}
                            name={`header_bg_color_${index}`}
                            value={rowColors[index].headerBackground}
                            onChange={(e) =>
                              handleColorChange(
                                data.id,
                                "headerBackground",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border p-2"></td>
                        <td className="border p-2">
                          <input
                            type="color"
                            id={`footer_bg_color_${index}`}
                            name={`footer_bg_color_${index}`}
                            value={rowColors[index].footerBackground}
                            onChange={(e) =>
                              handleColorChange(
                                data.id,
                                "footerBackground",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border p-2"></td>
                        <td className="border p-2"></td>
                        <td className="border p-2">
                          <div>
                            <input
                              type="color"

                            />

                          </div>
                        </td>
                        <td className="border p-2"></td>
                      </tr>
                    ))}
                  </tbody> */}
                {/* </table> */}
              </div>
              <div
                className="text-center mx-2 text-sm"
                style={{ width: "20%" }}
              >
                <div>
                  <button
                    className="flex items-center justify-center w-full px-4 bg-white  border border-black"
                    onClick={handleMoveUp}
                  >
                    <img src={moveUpButtonImg} alt="Move Up" className="mr-2" />
                    Move Up
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center w-full px-4 bg-white  border border-black"
                    onClick={handleMoveDown}
                  >
                    <img
                      src={moveDownButtonImg}
                      alt="Move Down"
                      className="mr-2"
                    />
                    Move Down
                  </button>
                </div>
                <div>
                  <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                    <img
                      src={inheritButtonImg}
                      alt="Inherit from formatting"
                      className="mr-2"
                    />
                    Inherit from formatting
                  </button>
                </div>
                <div className="mb-6">
                  <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                    <img alt="" className="mr-2" />
                    Match Colors
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center w-full px-4 bg-white border border-black"
                    onClick={handleSelectAll}
                  >
                    {selectAll ? "Deselect All" : "Select All"}
                  </button>
                </div>
                <div>
                  <button className="flex items-center justify-center w-full px-4  ">
                    <input type="checkbox" />
                    Show print option before Generating Report
                  </button>
                </div>
                <div className="mb-6">
                  <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                    <img alt="" className="mr-2" />
                    Select Section With Comments Ratings or Photos
                  </button>
                </div>
                <div>
                  <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                    <img
                      src={selectIconsButtonImg}
                      alt="Select Icons For All Sections"
                      className="mr-2"
                    />
                    Select Icons For All Sections
                  </button>
                </div>
                <div className="mb-6">
                  <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                    <img alt="" className="mr-2" />
                    Remove All Section For All Sections
                  </button>
                </div>
                <div>
                  <p className="mb-6">Select Alignment For All Section</p>
                  <div className="flex justify-center ">
                    <button className="mr-2">
                      <img alt="left" />
                    </button>
                    <button className="mr-2">
                      <img alt="center" />
                    </button>
                    <button>
                      <img alt="right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-20">
            <button className="border-2 border-black py-1 px-2" onClick={handleClose}>
              Generate PDF & Close
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ColorPalette;
