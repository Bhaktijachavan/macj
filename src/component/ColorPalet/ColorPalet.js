import React, { useState } from "react";
import moveUpButtonImg from '../../Assets/icons/ic_up.png';
import moveDownButtonImg from '../../Assets/icons/ic_down.png';
import inheritButtonImg from '../../Assets/icons/sync.png';
import selectIconsButtonImg from '../../Assets/icons/open_inspection.png';

const ColorPalette = () => {
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
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      sectionName: "Bedroom",
      sectionTitleFont: "",
      headerFont: "",
      footerFont: "",
      sectionIcon: "",
      tocFont: "",
    },
    {
      id: 2,
      sectionName: "Kitchen",
      sectionTitleFont: "",
      headerFont: "",
      footerFont: "",
      sectionIcon: "",
      tocFont: "",
    },
    {
      id: 3,
      sectionName: "Laundry",
      sectionTitleFont: "",
      headerFont: "",
      footerFont: "",
      sectionIcon: "",
      tocFont: "",
    },
  ]);

  // State for selected row
  const [selectedRow, setSelectedRow] = useState(null);

  // State for "Select All" checkbox
  const [selectAll, setSelectAll] = useState(false);

  // State to store all table data
  const [allTableData, setAllTableData] = useState([]);

  // Function to handle color change
  const handleColorChange = (id, column, color) => {
    setRowColors((prevColors) =>
      prevColors.map((row) =>
        row.id === id ? { ...row, [column]: color } : row
      )
    );
  };

  // Function to handle close
  const handleClose = () => {
    // Handle close logic here
  };

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="rounded-lg" style={{ width: "90%", backgroundColor: "#f3f2f1" }}>
        <div className="flex justify-between items-center border-b border-slate-400 ">
          <span className="px-3">Print Settings</span>
          <span className="cursor-pointer px-3" onClick={handleClose}>
            X
          </span>
        </div>
        <div className=" p-6">
          <div className="text-center">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              <p>
                Dolorum aperiam officia nam minima, reiciendis ad perspiciatis vitae quod illum molestiae dignissimos corrupti,
              </p>
              voluptate maxime dolore sed. Dicta, iure recusandae. Atque.
            </p>
          </div>

          <div className="flex">

            <div>
              <table className="w-full" style={{ width: "100%", backgroundColor: "#ffff", border: "2px solid #3498db" }}>
                <thead>
                  <tr className="text-sm  font-thin">

                    <th className="border font-semibold p-2">Section name</th>
                    <th className="border font-semibold p-2">Section title font</th>
                    <th className="border font-semibold p-2">Print</th>
                    <th className="border p-2 color-column">Border</th>
                    <th className="border p-2 color-column">Header Background</th>
                    <th className="border p-2">Header Font</th>
                    <th className="border p-2 color-column">Footer Background</th>
                    <th className="border p-2">Footer Font</th>
                    <th className="border p-2">Section Icon</th>
                    <th className="border p-2 color-column">TOC background</th>
                    <th className="border p-2">TOC Font</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((data, index) => (
                    <tr
                      key={index}
                      className={
                        (selectAll || selectedRow === index) ? "bg-gray-200" : ""
                      }
                      onClick={() => handleRowClick(index, 0)}
                    >

                      <td className="border p-2">{data.sectionName}</td>
                      <td className="border p-2"></td>
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          checked={data.print}
                          onChange={() => {
                            /* Handle change */
                          }}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="color"
                          id={`border_color_${index}`}
                          name={`border_color_${index}`}
                          value={rowColors[index].border}
                          onChange={(e) =>
                            handleColorChange(data.id, "border", e.target.value)
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
                        <input
                          type="color"
                          id={`toc_bg_color_${index}`}
                          name={`toc_bg_color_${index}`}
                          value={rowColors[index].tocBackground}
                          onChange={(e) =>
                            handleColorChange(
                              data.id,
                              "tocBackground",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border p-2"></td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <div className="text-center mx-2 text-sm" style={{ width: "20%" }}>
              <div className="">
                <button className="flex items-center justify-center w-full px-4 bg-white  border border-black" onClick={handleMoveUp}>
                  <img src={moveUpButtonImg} alt="Move Up" className="mr-2" />Move Up
                </button>
              </div>
              <div className="mb-6">
                <button className="flex items-center justify-center w-full px-4 bg-white  border border-black" onClick={handleMoveDown}>
                  <img src={moveDownButtonImg} alt="Move Down" className="mr-2" />Move Down
                </button>
              </div>
              <div className="">
                <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                  <img src={inheritButtonImg} alt="Inherit from formatting" className="mr-2" />Inherit from formatting
                </button>
              </div>
              <div className="mb-6">
                <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                  <img alt="" className="mr-2" />Match Colors
                </button>
              </div>
              <div className="">
                <button className="flex items-center justify-center w-full px-4 bg-white border border-black" onClick={handleSelectAll}>
                  {selectAll ? "Deselect All" : "Select All"}
                </button>
              </div>
              <div className="">
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
              <div className="">
                <button className="flex items-center justify-center w-full px-4 bg-white border border-black">
                  <img src={selectIconsButtonImg} alt="Select Icons For All Sections" className="mr-2" />
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
      </div>
    </div>
  );
};

export default ColorPalette;
