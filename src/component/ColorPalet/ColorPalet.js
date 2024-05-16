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
    // console.log("localStorage", localStorageData);
  }, []);
  const exportCoverPageToPDF = () => {
    // Retrieve the content from localStorage saved by CoverPageDesigner
    const content = localStorage.getItem("outputContent");
    // console.log("content", content);

    // const extractedText = localStorage.getItem("extractedText");
    const extractedImages =
      JSON.parse(localStorage.getItem("extractedImages")) || []; // Provide a fallback value if extractedImages is null
    // Fetch menu data from localStorage
    const menuData = localStorage.getItem("menuData");

    if (content) {
      // Modify the content to include border, page heading, and adjust page height
      const modifiedContent = `
            <div style="padding: 0px; height: 73vw; width: 100%;">
              ${content}
            </div>
            <div >
        ${extractedImages
          .map(
            (imageData) => `
              <img src="${imageData}" style="padding: 25px; height: 73vw; width: 100%;" >
            `
          )
          .join("")}
      </div>
      <div style="page-break-before: always;"></div>

      <div style="padding: 25px;">
          <p style="text-align: center; font-size: 35px; font-weight: 25px; margin-top: 30px ">Inspection Details</p>
          <p style="text-align: justify;  font-size: 20px; font-weight: 25px; padding-left:20px ; margin-bottom: 10px ;padding-bottom: 10px ; border-bottom: 2px solid black ">INTRODUCTION :</p>
          <p style="font-size: 15px; text-align: justify; padding:0 20px 0 20px">
              ${generateLoremIpsum()}
          </p>
          
          <p style="  font-size: 15px;  padding-left:20px">
          1.Attendance :  Client present for the initial part of inspection
         
         </p>
           <p style="  font-size: 15px; padding-left:20px">
          2.Home Type: Apartment in a twenty six storey building

        
         </p>
           <p style="  font-size: 15px; padding-left:20px ">
          3.Occupancy: Vacant - Unfurnished • Utilities on at the time of inspection
         
         </p>
        
           
      
          </div>
          `;

      // Convert the modified HTML content to a PDF document
      html2pdf()
        .from(modifiedContent)
        .toPdf()
        .get("pdf")

        .then((pdf) => {
          const addHeader = (text) => {
            pdf.setFillColor(0, 0, 255); // Blue color (RGB)
            pdf.rect(2, 2, pdf.internal.pageSize.getWidth() - 4, 15, "F"); // Draw blue rectangle as header
            pdf.setTextColor(255, 255, 255); // White text color
            pdf.setFontSize(13);
            pdf.text(4, 10, text); // Add text to the header
          };

          // Add header to every page
          const addPageHeader = () => {
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 2; i <= pageCount; i++) {
              pdf.setPage(i);
              addHeader(
                "MACJ - A Buyer's Choice Home Inspection         AD Project, Tower 1, 10th Floor, Unit 10-A, Kolkata"
              );
            }
          };
          // Add third page for Table of Contents
          const addPageBorder = () => {
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
              pdf.setPage(i);
              pdf.setDrawColor(0, 0, 255); // Blue color (RGB)
              // Adjust the dimensions of the rectangle to increase the border width
              const borderWidth = 2; // Adjust this value as needed
              pdf.rect(
                borderWidth,
                borderWidth,
                pdf.internal.pageSize.getWidth() - 2 * borderWidth,
                pdf.internal.pageSize.getHeight() - 2 * borderWidth,
                "S"
              );
            }
          };
          // pdf.addPage();
          addPageHeader();
          addPageBorder();

          // pdf.text("Table of Contents", 10, 10);
          // // Add table for Table of Contents

          // addTableOfContents(pdf, JSON.parse(menuData));

          // pdf.text("Damage Panel Data", 10, 10);
          // addSummaryTable(pdf, JSON.parse(menuData));
          let imageURL; // Declare imageURL outside of the if block
          let imageIndex = 0; // Keep track of the current image index
          const coverphotoImageData = JSON.parse(
            localStorage.getItem("coverphotoImage")
          );
          console.log("coverphotoImageData", coverphotoImageData);
          const damageDataString = localStorage.getItem("DamageData") || "{}";
          // console.log("damageDataString", damageDataString);
          // const selectionDataString = localStorage.getItem("SelectionData");
          // console.log("selectionDataString", selectionDataString);

          if (coverphotoImageData && damageDataString) {
            try {
              pdf.addPage();
              addPageHeader();
              addPageBorder();
              addTableOfContents(pdf, JSON.parse(menuData));
              addPageBorder();

              pdf.addPage();
              addPageBorder();
              const damageData = JSON.parse(damageDataString);
              const imageKeys = Object.keys(coverphotoImageData);

              function displayDamageData(damageObject, startY) {
                // Set initial Y position
                let currentY = startY;
                const lineSpacing = 5; // Fixed spacing between each text block

                // Display description
                const descriptionText = `Description: ${
                  damageObject.description || ""
                }`;
                const descriptionLines = pdf.splitTextToSize(
                  descriptionText,
                  180
                ); // Adjust width as needed
                const descriptionHeight = descriptionLines.reduce(
                  (acc, line) => acc + pdf.getTextDimensions(line).h,
                  0
                );
                pdf.text(10, currentY, descriptionLines);
                currentY += descriptionHeight + lineSpacing;
                const ratingText = damageObject.rating;
                // console.log("ratings", ratingText);
                const ratingValue = `Ratings : ${Object.values(ratingText)}`;
                // console.log("ratingValue", ratingValue);
                const ratingLines = pdf.splitTextToSize(ratingValue, 180); // Adjust width as needed
                const ratingHeight = ratingLines.reduce(
                  (acc, line) => acc + pdf.getTextDimensions(line).h,
                  0
                );
                pdf.text(10, currentY, ratingLines);
                currentY += ratingHeight + lineSpacing;
                // Add fixed spacing after rating
                // Display materials in red text
                const materialsText = `Materials: ${
                  damageObject.Damage1red || ""
                }`;
                const materialsLines = pdf.splitTextToSize(materialsText, 180); // Adjust width as needed
                const materialsHeight = materialsLines.reduce(
                  (acc, line) => acc + pdf.getTextDimensions(line).h,
                  0
                );
                pdf.setTextColor(255, 0, 0); // Set text color to red
                pdf.text(10, currentY, materialsLines);
                pdf.setTextColor(0); // Reset text color to black
                currentY += materialsHeight + lineSpacing; // Add fixed spacing after materials

                // Display observation
                const observationText = `Observation: ${
                  damageObject.Damage1black || ""
                }`;
                const observationLines = pdf.splitTextToSize(
                  observationText,
                  180
                ); // Adjust width as needed
                const observationHeight = observationLines.reduce(
                  (acc, line) => acc + pdf.getTextDimensions(line).h,
                  0
                );
                pdf.text(10, currentY, observationLines);
                currentY += observationHeight + lineSpacing; // Add fixed spacing after observation

                // Return the updated Y position
                return currentY;
              }

              // Iterate through each damage object in damageData

              Object.keys(damageData).forEach((key, index) => {
                const damageObject = damageData[key];
                const currentImageKey = imageKeys[index]; // Get corresponding image key

                // Add a new page before adding content for each set of data
                if (index > 0) {
                  pdf.addPage();
                  addPageBorder();
                  addPageHeader();
                }

                // Display damage data
                // Initial Y position for damage data
                let startX = 10;
                let startY = 45;
                let imagesPerPage = 0;
                const maxImagesPerPage = 4;
                const imageWidth = 70;
                const imageHeight = 60;
                const verticalSpacing = 80; // Vertical spacing between images

                // Calculate the height of the damage data section
                let damageDataHeight = displayDamageData(damageObject, startY);

                // Add padding below the damage data section
                startY += damageDataHeight + 20;

                let subName = ""; // Variable to store the current subname
                let tabName = ""; // Variable to store the current tabname

                if (coverphotoImageData[currentImageKey]) {
                  // Iterate over each image data
                  coverphotoImageData[currentImageKey].forEach(
                    (imageData, imgIndex) => {
                      let selectedSelectionData = [];
                      // Check if subname or tabname has changed
                      if (
                        subName !== imageData.subnames ||
                        tabName !== imageData.NewTabs
                      ) {
                        subName = imageData.subnames; // Update subname
                        tabName = imageData.NewTabs; // Update tabname

                        // Draw subname and tabname text
                        const textColor = "#000"; // Black text color
                        const bgColor = "#B4B4B8"; // Light gray background color
                        const originalFontSize = pdf.internal.getFontSize(); // Get the original font size

                        // Set the desired font size for the specific text
                        const fontSize = 20; // Adjust font size as needed

                        // Get text width and height
                        const textWidth =
                          (pdf.getStringUnitWidth(imageData.subnames) *
                            fontSize) /
                          pdf.internal.scaleFactor;
                        const textHeight = fontSize;

                        // Draw background rectangle
                        pdf.setFillColor(bgColor);
                        pdf.rect(2, 17, textWidth + 176, 8, "F"); // Adjust padding as needed

                        // Add text on top of the background with the desired font size
                        pdf.setTextColor(textColor);
                        pdf.setFontSize(fontSize);
                        pdf.text(subName, 100, 14);
                        pdf.text(tabName, 5, 23);
                        // Reset font size back to its original value
                        pdf.setFontSize(originalFontSize);

                        const menuDataa = JSON.parse(
                          localStorage.getItem("menuData") || "{}"
                        );
                        const selectionDataString =
                          localStorage.getItem("SelectionData") || "{}";
                        const Selection = JSON.parse(selectionDataString);

                        Object.keys(Selection).forEach((key) => {
                          const Selectionkey = key.replace("_s1", ""); // Remove the '_s1' suffix from the key
                          const SelectionObject = Selection[key];
                          const SelectionData = SelectionObject.selectionText;
                          // console.log("Selectionkey", Selectionkey);
                          // console.log("SelectionData", SelectionData);

                          for (const key in menuDataa) {
                            const menuItem = menuDataa[key];
                            const subnameid = menuItem.subitems;
                            const subNames = subnameid.map(
                              (item) => item.subName
                            );
                            console.log("SubNames:", subNames);

                            const ids = subnameid.map((item) => item.id);
                            const subdetails = menuItem.subdetails;
                            const subdetailKeys = Object.keys(subdetails);

                            console.log("subdetails", subdetails);
                            const keys = Object.values(subdetails).flatMap(
                              (obj) => Object.keys(obj)
                            );

                            if (subdetails) {
                              for (
                                let i = 0;
                                i < Math.min(ids.length, subdetailKeys.length);
                                i++
                              ) {
                                const subdetailKey = subdetailKeys[i];
                                const subdetailValue = subdetails[subdetailKey];
                                const id = ids[i];

                                for (const abc in subdetailValue) {
                                  const tabvalue = subdetailValue[abc].tabname;
                                  console.log("tabvalue", tabvalue);
                                  if (
                                    keys.includes(Selectionkey) &&
                                    subNames.includes(subName)
                                  ) {
                                    selectedSelectionData.push(SelectionData);
                                  }
                                }
                              }
                            }
                          }
                        });
                        if (selectedSelectionData.length > 0) {
                          // Remove duplicates using a Set
                          const uniqueSelectionData = [
                            ...new Set(selectedSelectionData),
                          ];
                          const formattedSelectionData =
                            uniqueSelectionData.join(", "); // Join unique SelectionData items with commas
                          pdf.text(
                            `Materials: ${formattedSelectionData}`,
                            10,
                            40
                          ); // Add formattedSelectionData to the PDF
                        }

                        // Predefined summary name
                        const selectedTextWithSummary = `Summary: ${
                          imageData.selectedText || ""
                        }`;

                        pdf.textWithLink(selectedTextWithSummary, 10, 31, {
                          maxWidth: 200, // Adjust the maxWidth according to your page width
                          align: "left",
                        });

                        // startY = 100; // Reset startY for the images section
                        imagesPerPage = 0; // Reset images count for the new page
                      }

                      // Add image to the PDF
                      pdf.addImage(
                        imageData.url,
                        "JPEG",
                        startX + 15,
                        startY - 60,
                        imageWidth,
                        imageHeight
                      );
                      const maxCaptionWidth = imageWidth;
                      const lines = pdf.splitTextToSize(
                        imageData.caption,
                        maxCaptionWidth
                      );
                      const captionHeight = lines.length - 5;

                      // Add caption
                      pdf.text(startX + 17, startY + 5 - captionHeight, lines);

                      // Move to the next position
                      startX += imageWidth + 10; // Add some padding between images

                      // Check if the images exceed the page width
                      if (
                        startX + imageWidth >
                        pdf.internal.pageSize.width - 10
                      ) {
                        startX = 10; // Reset X position to start a new row
                        startY += verticalSpacing; // Increase Y position for the next row and caption
                      }

                      imagesPerPage++; // Increment images count for the current page

                      // Check if the maximum images per page is reached
                      if (imagesPerPage >= maxImagesPerPage) {
                        pdf.addPage(); // Add a new page
                        addPageBorder();
                        addPageHeader();

                        startY = 100; // Reset startY for the images section
                        imagesPerPage = 0; // Reset images count for the new page
                      }
                    }
                  );
                } else {
                  console.warn(
                    `No image data found for key: ${currentImageKey}`
                  );
                }
              });

              pdf.addPage();

              addPageBorder();
              addPageHeader();

              pdf.text("Report Summary", 90, 10);

              addSummaryTable(pdf, JSON.parse(menuData));
              addPageBorder();
              const pageCount = pdf.internal.getNumberOfPages();
              for (let i = 2; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setTextColor(0, 0, 0);
                pdf.text(`Page ${i - 1} of ${pageCount - 1}`, 175, 293);
              }
              // Save the PDF
              pdf.save("Report.pdf");

              console.log("PDF generated successfully.");
            } catch (error) {
              console.error("Error parsing DamageData:", error);
            }
          } else {
            console.warn(
              "DamageData or coverphotoImage not found in local storage."
            );
            pdf.save("Report.pdf");
          }
        });
    }
  };

  function mergePdfData() {}

  // Function to add Table of Contents

  function addTableOfContents(pdf, parsedMenuData) {
    // Set font size and text color
    let currentYPosition = 20; // Initial vertical position for text placement
    let currentXPosition = 5;
    let tabCounter = 1;
    const tableData = [["Table of Contents"]];
    const fontSize = 16;
    const fontColor = "black";
    pdf.setFontSize(fontSize);
    pdf.setTextColor(fontColor);

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

      // Variable to track the current vertical position within the subitems section
      let currentYPosition = 40 + index * 10; // Start after index gap

      // Loop through subitems and add them to the table of contents
      item.subitems.forEach((subitem, subindex) => {
        // Add text
        // pdf.text(
        //   `${subitem.subName}`,
        //   20, // Adjust horizontal padding
        //   currentYPosition // Adjust y position
        // );

        // Update currentYPosition for the next subitem
        // currentYPosition += 20; // Increase by font size for each new line
        tableData.push([subitem.subName]);

        // Increment tabCounter
        tabCounter++;
      });
    });
    const tableOptions = {
      startY: currentYPosition,
      startX: currentXPosition,
      theme: "grid", // Apply grid theme for table
      headStyles: {
        fillColor: [0, 0, 0], // Background color for header row
        fontSize: 20, // Increase font size for header
        halign: "center", // Center align header text
      },
      columnStyles: {
        0: { cellWidth: 180, halign: "center", fontSize: 20 }, // Adjust column width for Sr. No
      },
    };

    const tableRows = tableData.map((rowData, rowIndex) => {
      return rowData.map((cellData, colIndex) => {
        // Set text color to red for cells in the "Damage Data" column
        if (colIndex === 3 && rowIndex > 0) {
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

  function addSummaryTable(pdf, menuNames) {
    const damageDataStrings = localStorage.getItem("DamageData");
    const damageData = JSON.parse(damageDataStrings || "{}");
    const menuDataa = JSON.parse(localStorage.getItem("menuData") || "{}");
    const tabledata = localStorage.getItem("summarydataString") || "";
    // pdf.text(tableData, 5, 18);
    // Calculate the height of the text rendered by pdf.textWithLink()
    const textHeight = pdf.getTextDimensions(tabledata, {
      maxWidth: 200, // Adjust the maxWidth according to your page width
      align: "left",
    }).h;

    // Define the vertical gap between the two sections
    const verticalGap = 5; // You can adjust this value as needed

    // Position the addSummaryTable() below the textWithLink() with a dynamic gap
    const addSummaryTableY = 18 + textHeight + verticalGap;

    // Add the textWithLink() with dynamic gap
    pdf.textWithLink(tabledata, 5, 18, {
      maxWidth: 200, // Adjust the maxWidth according to your page width
      align: "left",
    });

    let currentYPosition = addSummaryTableY; // Initial vertical position for text placement
    let currentXPosition = 5;
    let tabCounter = 1; // Initialize counter for tab value numbering

    // Initialize table data with headers
    const tableData = [["Sr. No", "SubName", "TabName", "Damage Data"]];

    // Iterate over menuDataa to populate the table
    for (const key in menuDataa) {
      // console.log("key", key);
      const menuItem = menuDataa[key];
      // console.log("menuItem", menuItem);
      const subnameid = menuItem.subitems;
      // console.log("subnameid", subnameid);
      const ids = subnameid.map((item) => item.id);
      // console.log("ids", ids);
      const subdetails = menuItem.subdetails;
      // console.log("subdetails", subdetails);
      // const keys = Object.values(subdetails).flatMap((obj) => Object.keys(obj));
      // console.log("Keys:", keys);

      const subdetailKeys = Object.keys(subdetails);
      console.log("subdetailKeys", subdetailKeys);

      if (subdetails) {
        for (let i = 0; i < Math.min(ids.length, subdetailKeys.length); i++) {
          const subdetailKey = subdetailKeys[i];
          const subdetailValue = subdetails[subdetailKey];
          const id = ids[i];

          for (const abc in subdetailValue) {
            const tabvalue = subdetailValue[abc].tabname;

            const damageValue = damageData[subdetailValue[abc].Damage1Data];
            if (damageValue && damageValue.Damage1red) {
              const subNames = subnameid.find((item) => item.id === id).subName;

              // Add row data to tableData
              tableData.push([
                tabCounter,
                subNames,
                tabvalue,
                damageValue.Damage1red,
              ]);

              // Increment tabCounter
              tabCounter++;
            }
          }
        }
      }
    }

    // Set table styling
    const tableOptions = {
      startY: currentYPosition,
      startX: currentXPosition,
      theme: "grid", // Apply grid theme for table
      headStyles: {
        fillColor: [135, 206, 250], // Background color for header row
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Adjust column width for Sr. No
        1: { cellWidth: 50 }, // Adjust column width for SubName
        2: { cellWidth: 50 }, // Adjust column width for TabName
        3: { cellWidth: 60 }, // Adjust column width for Damage Data
      },
    };

    const tableRows = tableData.map((rowData, rowIndex) => {
      return rowData.map((cellData, colIndex) => {
        // Set text color to red for cells in the "Damage Data" column
        if (colIndex === 3 && rowIndex > 0) {
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

  // function SelectionMenudata() {
  //   const menuDataa = JSON.parse(localStorage.getItem("menuData") || "{}");
  //   const selectionDataString = localStorage.getItem("SelectionData");
  //   const Selection = JSON.parse(selectionDataString);

  //   Object.keys(Selection).forEach((key) => {
  //     const Selectionkey = key.replace("_s1", ""); // Remove the '_s1' suffix from the key
  //     const SelectionObject = Selection[key];
  //     const SelectionData = SelectionObject.selectionText;
  //     console.log("Selectionkey", Selectionkey);
  //     console.log("SelectionData", SelectionData);

  //     for (const key in menuDataa) {
  //       const menuItem = menuDataa[key];
  //       const subnameid = menuItem.subitems;
  //       const subNames = subnameid.map((item) => item.subName);
  //       console.log("SubNames:", subNames);

  //       const ids = subnameid.map((item) => item.id);
  //       const subdetails = menuItem.subdetails;
  //       const subdetailKeys = Object.keys(subdetails);

  //       console.log("subdetails", subdetails);
  //       const keys = Object.values(subdetails).flatMap((obj) =>
  //         Object.keys(obj)
  //       );

  //       if (subdetails) {
  //         for (let i = 0; i < Math.min(ids.length, subdetailKeys.length); i++) {
  //           const subdetailKey = subdetailKeys[i];
  //           const subdetailValue = subdetails[subdetailKey];
  //           const id = ids[i];

  //           for (const abc in subdetailValue) {
  //             const tabvalue = subdetailValue[abc].tabname;
  //             console.log("tabvalue", tabvalue);
  //             if (keys.includes(Selectionkey)) {
  //               console.log("czg", SelectionData);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

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
     
We appreciate the opportunity to conduct this inspection for you. Please carefully read your entire
Inspection Report. Call us after you have reviewed your report, so we can go over any questions you
may have. Remember, when the inspection is completed and the report is delivered, we are still
available to you for any questions you may have, throughout the entire closing process.
<br/>
<br/>
Properties being inspected do not "Pass" or "Fail.” The following report is based on an inspection of
the visible portion of the structure. This report will focus on safety and function, not building codes.
This report identifies specific non-code, non-cosmetic concerns that the inspector feels may need
further investigation or repair.
<br/>
<br/>
For your safety and liability purposes, we recommend that licensed contractors evaluate and repair
any critical concerns and defects. Note that this report is a snapshot in time. We recommend that
you or your representative carry out a walkthrough inspection to check the condition of the property,
using this report as a guide.
<br/>
<br/>
Understanding the Report: Red Texts are comments of significant deficient components or
conditions which need attention, repair or replacement. These comments are also duplicated in the
report summary page(s). Black texts are general information and observations regarding the systems
and components of the unit. These include comments of deficiencies which are considered less
significant but should be addressed.
<br/>
<br/>
Your report includes many photographs which will help to clarify where the inspector went, what was
looked at, and the condition of a system or component at the time of inspection. Some of the pictures
may be of deficiencies or problem areas, these are to help you better understand what is
documented in this report and may allow you to see areas or items that you normally would not see.
A pictured issue does not necessarily mean that the issue was limited to that area only, but may be
representation of a condition that is in multiple places. Not all areas of deficiencies or conditions will
be supported with photos. It is recommended that you read fully to understand the scope of the
home inspection.
<br/>
<br/>

 


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
