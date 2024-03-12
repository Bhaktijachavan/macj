import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import moveUpButtonImg from "../../Assets/icons/ic_up.png";
import moveDownButtonImg from "../../Assets/icons/ic_down.png";
import inheritButtonImg from "../../Assets/icons/sync.png";
import selectIconsButtonImg from "../../Assets/icons/open_inspection.png";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import ColorPicker from "./ColorPicker";
import CoverPageDesigner from "./../CoverPageDesigner/CoverPageDesigner";
import "./ColorPalet.css";
const ColorPalette = ({ onClose }) => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const coverPageRef = useRef(null);

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
      setSelectAll(false); // Deselect "Select All" when a specific rowis clicked
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

  const [menuData, setMenuData] = useState([]);
  // Function to close the color picker
  const closeColorPicker = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    console.log("storedMenuData:", storedMenuData);

    if (storedMenuData) {
      try {
        const parsedMenuData = JSON.parse(storedMenuData);
        setMenuData(parsedMenuData);
        setDummyData(parsedMenuData);

        // Accessing the properties directly as per the JSON structure
        const name = parsedMenuData[1].name;

        console.log("Name:", name);

        console.log("subitems", parsedMenuData[1].subitems[0].si);

        Object.keys(parsedMenuData).map((key) =>
          console.log("hello ", parsedMenuData[key])
        );
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    console.log("parsed object ", dummyData);
  }, []);

  useEffect(() => {
    // Fetch or set your localStorageData here
    const storedData = localStorage.getItem("menuData");
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
    }
    console.log(localStorageData);
  }, []);
  const exportCoverPageToPDF = () => {
    // Retrieve the content from localStorage saved by CoverPageDesigner
    const content = localStorage.getItem("outputContent");

    // Fetch menu data from localStorage
    const menuData = localStorage.getItem("menuData");

    if (content && menuData) {
      // Modify the content to include border, page heading, and adjust page height
      const modifiedContent = `
        <div style="padding: 0px; height: 72vw; width: 100%;">
          ${content}
        </div>
      `;

      // Convert the modified HTML content to a PDF document
      html2pdf()
      .from(modifiedContent)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        // Add second page for Report Introduction
        pdf.addPage();
          pdf.text("Report", 10, 10);
          pdf.setFontSize(16);

        // Add fixed text or content
        const largeText = generateLoremIpsum(); // Replace this with your large text
        const options = {
          maxWidth: 200, // Adjust the maximum width for wrapping
        };
        pdf.text(largeText, 10, 20, options);

        const paddingRight = 20;
        pdf.text("".padStart(paddingRight), 10, 20); // Empty text with padding

          // Add third page for Table of Contents
          pdf.addPage();
          pdf.text("Table of Contents", 10, 10);
          // Add table for Table of Contents
          addTableOfContents(pdf, JSON.parse(menuData));

          // Add fourth page for Summary
          pdf.addPage();
          pdf.text("Summary", 10, 10);

          // Fetch the savedSummaryData from localStorage
          const savedSummaryData = localStorage.getItem('savedSummaryData');

          // Parse the JSON data
          const parsedSummaryData = JSON.parse(savedSummaryData);

          // Get the textareaValue from the parsed data
          const textareaValue = parsedSummaryData?.textareaValue || '';

          // Add summary to the PDF
          pdf.text('Summary', 10, 10);
          pdf.text(textareaValue, 10, 30); // Add summary data
          // Add summary table
          addSummaryTable(pdf, JSON.parse(menuData));

          pdf.save("cover_page_layout.pdf");
        });
    } else {
      // Handle case where content or menuData is not found in localStorage
      console.log("No content or menu data found in localStorage");
    }
  };

  // Function to add Table of Contents
  function addTableOfContents(pdf, parsedMenuData) {
    // Set styling properties
    const fontSize = 12;
    const fontColor = "black";
    const backgroundColor = "black";
    const boxShadowColor = "gray"; // Change this to your preferred box shadow color

    // Set the font size, text color, and background color
    pdf.setFontSize(fontSize);
    pdf.setTextColor(fontColor);
    pdf.setFillColor(backgroundColor);

    Object.values(parsedMenuData).forEach((item, index) => {
      // Add subitems
      item.subitems.forEach((subitem, subindex) => {
        // Set the box shadow
        pdf.setDrawColor(boxShadowColor);
        pdf.setLineWidth(0.2);

        // Add text with background color
        pdf.text(`    ${subitem.subName}`, 20, 20 + index * 10 + subindex * 10);
      });
    });

    // Reset styling properties (optional, if you want to use different styles for other parts of the document)
    pdf.setFontSize(14); // Reset font size to 14
    pdf.setTextColor(0, 0, 0); // Reset text color to black
    pdf.setFillColor(255, 255, 255); // Reset background color to white
    pdf.setDrawColor(0); // Reset draw color (box shadow) to black
  }


  // Function to add Summary Table
  // function addSummaryTable(pdf, menuNames) {
  //   // Iterate over the menu names to construct the tables
  //   Object.values(menuNames).forEach((item, index) => {
  //     // Initialize data and headers for each submenu
  //     const data = [];
  //     const mainHeader = [item.subitems[0].subName]; // Main header with subname
  //     const subheader = ['Page No item No', 'Tab Name', 'Red Text']; // Subheaders

  //     // Fetch relevant data from local storage (replace with your own logic)
  //     const localStorageData = JSON.parse(localStorage.getItem('DamageData'));

  //     // Iterate over each key in DamageData
  //     Object.keys(localStorageData).forEach((damageDataKey, damageDataIndex) => {
  //       // Extract the subdata for the current damageDataKey
  //       const damageData = localStorageData[damageDataKey];

  //       // Get tabname and Damage1red values
  //       const tabName = damageData.tabname || '';
  //       const redText = damageData.Damage1red || '';

  //       // Push each data row with four columns for the current submenu
  //       data.push([index + 1, damageDataIndex + 1, tabName, redText]);
  //     });

  //     // Generate the table for the current submenu with the specified headers and data
  //     pdf.autoTable({
  //       startY: 20,
  //       head: [mainHeader], // Set the main header with subname
  //       subheader: [subheader], // Set the subheaders
  //       body: data, // Set the table data
  //     });

  //     // Add a new page for the next submenu (optional)
  //     if (index < Object.values(menuNames).length - 1) {
  //       pdf.addPage();
  //     }
  //   });
  // }


  function addSummaryTable(pdf, menuNames) {
    // Iterate over the menu names to construct the tables
    Object.values(menuNames).forEach((item, index) => {
      // Initialize data and headers for each submenu
      const data = [];
      const subName = item.subitems[0].subName; // Extract subName from menuData
      const headers = [['Page No', 'Item No', 'Red Text']]; // Table headers

      // Get the relevant data from local storage (replace with your own logic)
      const localStorageData = JSON.parse(localStorage.getItem('DamageData'));

      // Get the image data from local storage
      const imageKey = 'uploadedImage'; // Replace with the actual key used to store the image data
      const uploadedImage = localStorage.getItem(imageKey) || ''; // Retrieve the image data

      // Iterate over the current submenu to populate the table body
      item.subitems.forEach((subitem, subitemIndex) => {
        // Get the relevant data from local storage for the current subitem
        const damageDataKey = `item_${index + 1}_subitem_${subitemIndex + 1}`;
        const redText = localStorageData[damageDataKey]?.Damage1red || '';

        // Push each data row with three columns for the current submenu
        data.push([index + 1, subitemIndex + 1, redText]);
      });

      // Generate the table for the current submenu with the specified headers and data
      pdf.autoTable({
        startY: 60, // Adjust the startY value to leave space after the summary
        didDrawPage: function (tableData) {
          // Add the subName as the title at the top of each page
          pdf.text(subName, 10, 40);

          // Display the image on each page
          // pdf.addImage(uploadedImage, 'JPEG', 10, 10, 30, 30);
        },
        head: headers, // Set the table headers
        body: data,    // Set the table data
      });
      console.log("Uploaded Image ",uploadedImage)

      // Add a new page for the next submenu (optional)
      if (index < Object.values(menuNames).length - 1) {
        pdf.addPage();
      }
    });
  }







  // Function to generate Lorem Ipsum text
  function generateLoremIpsum() {
    const loremIpsum = `
      We appreciate the opportunity to conduct this inspection for you! Please carefully read your entire Inspection Report. Call us after you have reviewed your report if you have any questions. Remember, when the inspection is completed and the report is delivered, we are still available for any questions you may have.
      Properties being inspected do not "Pass" or "Fail.” - The following report is based on an inspection of the visible portion of the structure; inspection may be limited by vegetation and possessions. Depending upon the age of the property, some items like GFCI outlets may not be installed; this report will focus on safety and function, not current code. This report identifies specific non-code, non-cosmetic concerns that the inspector feels may need further investigation or repair.
      For your safety and liability purposes, we recommend that licensed contractors evaluate and repair any critical concerns and defects. Note that this report is a snapshot in time. We recommend that you or your representative carry out a final walk-through inspection immediately before closing to check the condition of the property, using this report as a guide.
      Video In Your Report –The inspector may have included videos of issues within the report. If you are opening the PDF version of the report, make sure you are viewing the PDF in the free Adobe Reader PDF program. If you’re viewing the report as a web page, the videos will play in any browser. Click on any video within the report to start playing.
      Throughout the report, we utilize icons to make things easier to find and read. Use the legend below to understand each rating icon.
      Acceptable – This item was inspected and is in acceptable condition for its age and use.
      Repair/Replace - Items with this rating should be examined by a professional and be repaired or replaced.
      Safety Issue - Items with this rating should be examined immediately and fixed. Even though the item is marked as a safety issue it could be a very inexpensive fix. Please make sure to read the narrative to completely understand the issue.
      Monitor - Items with this rating should be monitored periodically to ensure that the issue hasn't become worse, warranting a repair or replacement.
      Not Accessible - Items with this rating were not able to be fully inspected because access was blocked off or covered.
      Our report contains a unique pop-up glossary feature. When you see words highlighted in yellow hover your mouse over the term. The definition or a tip about the item will appear!
    `;

    return loremIpsum;
  }

  // Example: Generate Lorem Ipsum with a single block
  const singleLoremIpsum = generateLoremIpsum();
  // console.log(singleLoremIpsum);



  // Function to strip HTML tags and convert to plain text
  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Function to convert base64 to Blob
  function base64toBlob(base64data, contentType) {
    const sliceSize = 512;
    const byteCharacters = atob(base64data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  // Function to strip HTML tags and convert to plain text
  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Function to convert base64 to Blob
  function base64toBlob(base64data, contentType) {
    const sliceSize = 512;
    const byteCharacters = atob(base64data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  useEffect(() => {
    getDataLocal();
  }, []);

  const getDataLocal = () => {
    const data = localStorage.getItem("menuData");
    const reportData = JSON.parse(data);
    console.log("report data ", reportData);
    setLocalStorageData(reportData);
  };
  const ItemComponent = ({ item }) => {
    const { id, name, subitems, subdetails } = item;
    return (
      <div>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>Subitems: {subitems.join(", ")}</p>
        <p>Subdetails: {JSON.stringify(subdetails)}</p>
      </div>
    );
  };

  return (
    <>
      <div className="all-the-popup-content-of-color-pallet-infoo">
        <div
          className="rounded-lg"
          style={{ width: "90%", backgroundColor: "#f3f2f1" }}
        >
          <div
            className="flex justify-between items-center border-b
border-slate-400 "
          >
            <span className="px-3">Print Settings</span>
            <span
              className="justify-center flex h-9 items-center close-btn-for-the-color-pallet-popup-red cursor-pointer px-3 hover:bg-red-500
hover:text-white"
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
                      <th
                        className="border font-semibold
p-2"
                      >
                        Print
                      </th>
                      <th
                        className="border font-semibold p-2
color-column"
                      >
                        Border
                      </th>
                      <th
                        className="border font-semibold p-2
color-column"
                      >
                        Header Background
                      </th>
                      <th className="border font-semibold p-2">Header Font</th>
                      <th
                        className="border font-semibold p-2
color-column"
                      >
                        Footer Background
                      </th>
                      <th className="border font-semibold p-2">Footer Font</th>
                      <th className="border font-semibold p-2">Section Icon</th>
                      <th
                        className="border font-semibold p-2
color-column"
                      >
                        TOC background
                      </th>
                      <th className="border font-semibold p-2">TOC Font</th>
                    </tr>
                  </thead>
                </table>

                {Object.keys(dummyData).map((key, index) => (
                  <tbody key={key}>
                    {Object.keys(dummyData[key].subitems).map((subKey) => (
                      <tr key={subKey}>
                        <td>{dummyData[key].subitems[subKey].subName}</td>
                        <td className="border p-2">
                          {JSON.stringify(dummyData[key].selectedOption)}
                        </td>
                        <td className="border p-2"></td>
                        <td className="border p-2">
                          <input
                            type="checkbox"
                            checked={dummyData[key].print}
                            onChange={() => {}}
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
                                dummyData[key].id,
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
                                dummyData[key].id,
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
                                dummyData[key].id,
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
                            <input type="color" />
                          </div>
                        </td>
                        <td className="border p-2"></td>
                      </tr>
                    ))}
                  </tbody>
                ))}

                <tbody></tbody>
              </div>
              <div
                className="text-center mx-2 text-sm"
                style={{ width: "20%" }}
              >
                <div>
                  <button
                    className="flex items-center justify-center w-full
px-4 bg-white  border border-black"
                    onClick={handleMoveUp}
                  >
                    <img src={moveUpButtonImg} alt="Move Up" className="mr-2" />
                    Move Up
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center w-full
px-4 bg-white  border border-black"
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
                  <button
                    className="flex items-center justify-center
w-full px-4 bg-white border border-black"
                  >
                    <img
                      src={inheritButtonImg}
                      alt="Inherit from formatting"
                      className="mr-2"
                    />
                    Inherit from formatting
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center
w-full px-4 bg-white border border-black"
                  >
                    <img alt="" className="mr-2" />
                    Match Colors
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center w-full
px-4 bg-white border border-black"
                    onClick={handleSelectAll}
                  >
                    {selectAll ? "Deselect All" : "Select All"}
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center
w-full px-4  "
                  >
                    <input type="checkbox" />
                    Show print option before Generating Report
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center
w-full px-4 bg-white border border-black"
                  >
                    <img alt="" className="mr-2" />
                    Select Section With Comments Ratings or Photos
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center
w-full px-4 bg-white border border-black"
                  >
                    <img
                      src={selectIconsButtonImg}
                      alt="Select Icons For All Sections"
                      className="mr-2"
                    />
                    Select Icons For All Sections
                  </button>
                </div>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-center
w-full px-4 bg-white border border-black"
                  >
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
                  <div className="flex justify-center pt-4 pb-4">
                    <div id="pdf-content">
                      <div
                        id="pdf-content-home"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          display: "none",
                        }}
                        ref={coverPageRef}
                      >
                        <CoverPageDesigner />
                      </div>
                    </div>
                    <button
                      className="border-2 border-black py-1 px-2 mr-4"
                      onClick={exportCoverPageToPDF}
                    >
                      Generate PDF & Close
                    </button>{" "}
                    {/* <button
                      className="border-2 border-black py-1 px-2"
                      onClick={generateCombinedPDF}
                    >
                      Generate PDF & Close
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPalette;