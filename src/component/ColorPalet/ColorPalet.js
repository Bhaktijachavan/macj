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
    // console.log("storedMenuData:", storedMenuData);

    if (storedMenuData) {
      try {
        const parsedMenuData = JSON.parse(storedMenuData);
        setMenuData(parsedMenuData);
        setDummyData(parsedMenuData);

        // Accessing the properties directly as per the JSON structure
        const name = parsedMenuData[1].name;

        // console.log("Name:", name);

        // console.log("subitems", parsedMenuData[1].subitems[0].si);

        Object.keys(parsedMenuData).map((key) => console.log("hello "));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    // console.log("parsed object ", dummyData);
  }, []);

  useEffect(() => {
    // Fetch or set your localStorageData here
    const storedData = localStorage.getItem("menuData");
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
    }
    console.log("localStorage", localStorageData);
  }, []);
  const exportCoverPageToPDF = () => {
    // Retrieve the content from localStorage saved by CoverPageDesigner
    const content = localStorage.getItem("outputContent");
    const StationeryPdf = localStorage.getItem("uploadedPdf");

    // Fetch menu data from localStorage
    const menuData = localStorage.getItem("menuData");

    if (content && menuData) {
      // Modify the content to include border, page heading, and adjust page height
      const modifiedContent = `
            <div style="padding: 0px; height: 73vw; width: 100%;">
              ${content}
            </div>
            <div style="padding: 25px;">
            <p style="text-align: center; font-size: 25px; font-weight: 10px; margin-bottom: 1em;">Report Introduction</p>
            <p style="font-size: 20px; text-align: justify;">
              ${generateLoremIpsum()}
            </p>
          </div>
          `;

      if (StationeryPdf) {
        modifiedContent += `
          <div style="page-break-before: always;">
            <img src="${StationeryPdf}" style="width: 100%; height: 100%;" />
          </div>
        `;
      }

      // Convert the modified HTML content to a PDF document
      html2pdf()
        .from(modifiedContent)
        .toPdf()
        .get("pdf")

        .then((pdf) => {
          // Add third page for Table of Contents
          pdf.addPage();
          pdf.text("Table of Contents", 10, 10);
          // Add table for Table of Contents
          addTableOfContents(pdf, JSON.parse(menuData));

          pdf.addPage();
          pdf.text("Damage Panel Data", 10, 10);

          const damageDataString = localStorage.getItem("DamageData");
          if (damageDataString) {
            try {
              const damageData = JSON.parse(damageDataString);

              // Function to display damage data (improved for clarity)
              // Function to display damage data (improved for clarity)
              function displayDamageData(damageObject, startY) {
                const ratingText = `Rating: ${damageObject.rating?.ratingName1 || ""}`;
                const descriptionText = `Description: ${damageObject.description || ""}`;
                const materialsText = `Materials:\n${damageObject.Damage1red || ""}`;
                const observationText = `Observation: ${damageObject.Damage1black || ""}`;
              
                // Set initial Y position
                let currentY = startY;
              
                // Display rating
                pdf.text(10, currentY, ratingText);
                currentY += 5; // Add spacing after rating
              
                // Display materials
                pdf.setTextColor(255, 0, 0); // Set text color to red
                pdf.text(60, currentY, materialsText);
                pdf.setTextColor(0); // Reset text color to black
                currentY += pdf.splitTextToSize(materialsText, pdf.internal.pageSize.getWidth() - 20).length * 5 + 2;
              
                // Display observation
                pdf.text(60, currentY, observationText);
                const observationHeight = pdf.splitTextToSize(observationText, pdf.internal.pageSize.getWidth() - 20).length * 5;
                currentY += observationHeight + 2; // Calculate height of multi-line text
              
                // Display description
                pdf.text(60, currentY, descriptionText);
                const descriptionHeight = pdf.splitTextToSize(descriptionText, pdf.internal.pageSize.getWidth() - 20).length * 5;
                currentY += descriptionHeight + 2; // Calculate height of multi-line text
              
                // Add small gap before separator
                currentY += 1;
              
                // Return the updated Y position
                return currentY;
              }
              
              

              // Adjust starting position for damage data
              let currentY = 20;

              // Iterate through each damage object in DamageData
              for (const key in damageData) {
                const damageObject = damageData[key];
                currentY = displayDamageData(damageObject, currentY);

                // Add separator line between damage sections (optional)
                pdf.text(10, currentY, "----------"); // Add separator
                currentY += 20; // Add spacing after separator
              }
            } catch (error) {
              console.error("Error parsing DamageData:", error);
            }
          } else {
            console.warn("DamageData not found in local storage.");
          }

          pdf.addPage();

          // addSummaryTable(pdf, JSON.parse(menuData));
          let imageURL; // Declare imageURL outside of the if block
          let imageIndex = 0; // Keep track of the current image index

          const coverphotoImageData = JSON.parse(
            localStorage.getItem("coverphotoImage")
          );

          if (coverphotoImageData) {
            const imageKeys = Object.keys(coverphotoImageData); // Move imageKeys here

            function addImageToPDF(index, imgIndex) {
              if (index < imageKeys.length) {
                const img = new Image();
                const currentImageKey = imageKeys[index];
                const currentImageData = coverphotoImageData[currentImageKey];

                if (imgIndex < currentImageData.length) {
                  imageURL = currentImageData[imgIndex].url;
                  const imageCaption = currentImageData[imgIndex].caption;
                  const subnames = currentImageData[imgIndex].subnames; // Access subnames here

                  // Add subnames to the top of the page before images (only for first image)
                  if (imgIndex === 0) {
                    pdf.text(subnames.join(", "), 10, 40); // Adjust spacing as needed
                  }

                  img.onload = function () {
                    const x = (imgIndex % 2) * 100 + 20;
                    const y = Math.floor(imgIndex / 2) * 80 + 50;

                    pdf.addImage(this, "JPEG", x, y, 80, 60);
                    pdf.text(imageCaption, x, y + 70); // Add the caption below the image

                    // Display additional data for the current image
                    // const LocalStorageSummaryData =
                    //   getSummaryDataFromLocalStorage(currentImageKey); // Replace with your logic to get data
                    // displayAdditionalData(pdf, LocalStorageSummaryData, y + 80); // Display data below image

                    // If all images are added for the current key, move to the next key
                    if (imgIndex === currentImageData.length - 1) {
                      if (index < imageKeys.length - 1) {
                        pdf.addPage(); // Add a new page for the next ID
                      }
                      addImageToPDF(index + 1, 0); // Recursively call for the next image set
                    } else {
                      addImageToPDF(index, imgIndex + 1); // Recursively call for the next image
                    }
                  };

                  img.src = imageURL; // Set the image source to load the image
                } else {
                  // If all images are added for the current key, display additional data and move to next key
                  const LocalStorageSummaryData =
                    getSummaryDataFromLocalStorage(currentImageKey); // Replace with your logic to get data
                  displayAdditionalData(pdf, LocalStorageSummaryData, y + 20); // Display data below last image

                  if (index < imageKeys.length - 1) {
                    pdf.addPage(); // Add a new page for the next ID
                  }
                  addImageToPDF(index + 1, 0); // Recursively call for the next image set
                }
              } else {
                // All images and data added, save the PDF
                pdf.addPage(); // Add one more page before generating summary tables
                pdf.text("Report Summary", 70, 10);
                addSummaryTable(pdf, JSON.parse(menuData));

                // addSummaryTable(pdf, menuNames); // Generate summary tables on the new page
                pdf.save("Report.pdf");
              }
            }

            // pdf.addPage();

            // Add title for the image
            pdf.setFontSize(16);
            pdf.text("Title for the Image", 10, 20);
            addImageToPDF(0, 0); // Start the recursive function
          } else {
            console.error("No image data found in local storage.");
          }
        });
    }
  };

  // Function to add Table of Contents

  function addTableOfContents(pdf, parsedMenuData) {
    // Set styling properties (adjust as desired)
    const fontSize = 12;
    const fontColor = "black"; // Text color
    const boxShadowColor = "gray"; // Box shadow color
    const borderColor = "blue"; // Border color
    const borderWidth = 1; // Border width

    // Set font size and text color
    pdf.setFontSize(fontSize);
    pdf.setTextColor(fontColor);

    // Get page width and height
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Create a rectangle representing the table of contents area
    const tocRect = {
      x: 0.5, // Adjust horizontal padding
      y: 0.5, // Adjust vertical padding
      width: pageWidth - 1, // Adjust width based on padding
      height: pageHeight - 5, // Adjust height based on padding
    };

    // Draw the border for the table of contents
    pdf.setDrawColor(borderColor);
    pdf.setLineWidth(borderWidth);
    pdf.rect(tocRect.x, tocRect.y, tocRect.width, tocRect.height, "D"); // Draw the border (D for stroke)

    // Loop through each item in parsedMenuData
    Object.values(parsedMenuData).forEach((item, index) => {
      // Check if the item has subitems (prevent errors)
      if (!item.subitems) {
        console.warn(
          `Item ${
            index + 1
          } in parsedMenuData has no subitems to display in the table of contents.`
        );
        return; // Skip to the next item if no subitems
      }

      // Loop through subitems and add them to the table of contents
      item.subitems.forEach((subitem, subindex) => {
        // Set the box shadow
        pdf.setDrawColor(boxShadowColor);
        pdf.setLineWidth(0.2);

        // Add text without background color (adjust y position based on border)
        pdf.text(
          `${subitem.subName}`,
          tocRect.x + 20, // Adjust horizontal padding within border
          tocRect.y + 30 + index * 10 + subindex * 10 // Adjust y position
        );
      });
    });
  }

  function addSummaryTable(pdf, menuNames) {
    // const LocalStorageSummaryData = {
    //   DamageData: JSON.parse(localStorage.getItem("DamageData")),
    //   SelectionData: JSON.parse(localStorage.getItem("SelectionData")),
    //   TempPanelData: JSON.parse(localStorage.getItem("TempPanelData")),
    //   ratingsData: JSON.parse(localStorage.getItem("ratingsData")),
    //   // savedSummaryData: JSON.parse(localStorage.getItem("menuData")),
    // };

    // Object.values(menuNames).forEach((item, index) => {
    //   const subName = item.subitems[0].subName;
    //   const headers = [["Page No", "TabName", "Red Text"]];
    //   const data = [];

    //   item.subitems.forEach((subitem, subitemIndex) => {
    //     const damageDataKey = `item_${index + 1}_subitem_${subitemIndex + 1}`;
    //     const redText =
    //       LocalStorageSummaryData.DamageData[damageDataKey]?.Damage1red || "";
    //     data.push([index + 1, item.tabName || "", redText]);
    //   });

    //   // Add a new page before generating the table
    //   pdf.addPage();

    //   pdf.autoTable({
    //     startY: 60,
    //     head: headers,
    //     body: data,
    //   });

    //   // Display additional data after the table
    //   const startY = pdf.autoTable.previous.finalY + 10;
    //   displayAdditionalData(
    //     pdf,
    //     item,
    //     index,
    //     menuNames,
    //     LocalStorageSummaryData,
    //     startY
    //   );

    //   if (index < Object.values(menuNames).length - 1) {
    //     // Add a new page after displaying additional data (optional)
    //     // pdf.addPage();
    //   }
    // });

    const damageDataStrings = localStorage.getItem("DamageData");
    const damageData = JSON.parse(damageDataStrings || "{}");
    const menuDataa = JSON.parse(localStorage.getItem("menuData") || "{}");

    let currentYPosition = 40; // Initial vertical position for text placement
    let tabCounter = 1; // Initialize counter for tab value numbering

    // Initialize table data with headers
    const tableData = [["Sr. No", "TabName", "Damage Data"]];

    // Iterate over menuDataa to populate the table
    for (const key in menuDataa) {
      const menuItem = menuDataa[key];
      const subdetails = menuItem.subdetails;

      if (subdetails) {
        for (const subdetailKey in subdetails) {
          const subdetailValue = subdetails[subdetailKey];

          for (const abc in subdetailValue) {
            const tabvalue = subdetailValue[abc].tabname;
            console.log("vedant", tabvalue);

            // Check if damageValue exists and has the Damage1red property
            const damageValue = damageData[subdetailValue[abc].Damage1Data];
            if (damageValue && damageValue.Damage1red) {
              // Add row data to tableData
              tableData.push([tabCounter, tabvalue, damageValue.Damage1red]);

              // Increment tabCounter
              tabCounter++;

              console.log("DamageValue", damageValue);
              console.log("subdetailValue", subdetailValue);
            }
          }
        }
      }
    }

    // Set table styling
    const tableOptions = {
      startY: currentYPosition,
      theme: "grid", // Apply grid theme for table
      headStyles: {
        fillColor: [135, 206, 250], // Background color for header row
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Adjust column width for Sr. No
        1: { cellWidth: 50 }, // Adjust column width for TabName
        2: { cellWidth: 80 }, // Adjust column width for Damage Data
      },
    };

    const tableRows = tableData.map((rowData, rowIndex) => {
      return rowData.map((cellData, colIndex) => {
        // Set text color to red for cells in the "Damage Data" column
        if (colIndex === 2 && rowIndex > 0) {
          return { content: cellData, styles: { textColor: [255, 0, 0] } };
        }
        return cellData;
      });
    });

    // Generate table using autoTable method
    pdf.autoTable({
      head: [tableRows[0]], // Extract header row from tableRows
      body: tableRows.slice(1), // Extract data rows from tableRows
      ...tableOptions,
    });
  }

  function displayAdditionalData(
    pdf,
    item,
    index,
    menuNames,
    LocalStorageSummaryData,
    startY
  ) {
    const damageData = LocalStorageSummaryData.DamageData;
    const tableSequenceNumber = index + 1;

    // Iterate through the keys in DamageData
    for (const key in damageData) {
      // Check if the key matches the expected pattern
      if (key.endsWith(`_d${tableSequenceNumber}`)) {
        const damagePanelData = damageData[key];

        // Display Rating
        pdf.text(
          10,
          startY + 10,
          `${damagePanelData.rating?.ratingName1 || ""}`
        );

        // Display Materials (black text and red text)
        const materialsText = `Materials: 
          Red Text: `;
        const redText = damagePanelData.Damage1red || "";
        pdf.setTextColor(255, 0, 0); // Set text color to red
        pdf.text(40, startY + 10, redText);
        pdf.setTextColor(0); // Reset text color to black
        pdf.text(40, startY + 20, ` ${damagePanelData.Damage1black || ""}`);

        // Description
        pdf.text(
          10,
          startY,
          `Description: ${damagePanelData.description || ""}`
        );
        break; // Exit loop after displaying data for the first matching sequence number
      }
    }
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
                Check the Print check box for each section you would like to
                appear on your inspection report You can click on a Section Name
                in the 1st column, then use the Move Up and Move Down button to
                change the order the section will appear in your report Click on
                the palette icon in the Section Font column to change the
                section font, size and color. If using the Section Icons in your
                report, the Section Icon images must be a valid image file (gif,
                png,or.jpg) and a maximum of 200 pixels high or wide.
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
                    {Object.keys(dummyData).map((key, index) =>
                      Object.keys(dummyData[key].subitems).map((subKey) => (
                        <tr key={subKey}>
                          <td>{dummyData[key].subitems[subKey].subName}</td>
                          <td className="border p-2">
                            {JSON.stringify(dummyData[key].selectedOption)}
                          </td>
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
                              <input
                                type="color"
                                id={`section_icon_color_${index}`}
                              />
                            </div>
                          </td>
                          <td className="border p-2"></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
