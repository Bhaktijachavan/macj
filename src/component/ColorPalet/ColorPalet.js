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
import Icon1 from "../EditImageTabList/OverLayImage/Acceptable 2.png";
import Icon2 from "../EditImageTabList/OverLayImage/Acceptable.png";
import Icon3 from "../EditImageTabList/OverLayImage/Monitor.png";
import Icon4 from "../EditImageTabList/OverLayImage/Not Accessible 1.png";
import Icon5 from "../EditImageTabList/OverLayImage/Repair Replace.png";
import Icon6 from "../EditImageTabList/OverLayImage/Safety 1.png";

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

  // State to store all table data
  const [allTableData, setAllTableData] = useState([]);

  // State for managing color picker
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({
    top: 0,
    left: 0,
  });
  const [submenus, setSubmenus] = useState([]);
  const [menuDate, setMenuDate] = useState({});
  const tabNames = [];

  useEffect(() => {
    // Step 1: Retrieve menuData from localStorage
    const menuDataString = localStorage.getItem("menuData");
    if (!menuDataString) {
      return;
    }

    // Step 2: Parse menuData and set it to the state
    const parsedMenuData = JSON.parse(menuDataString);
    setMenuDate(parsedMenuData);
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
  // const handleRowClick = (index, columnIndex) => {
  //   if (columnIndex === 0) {
  //     setSelectedRow(index === selectedRow ? null : index);
  //     setSelectAll(false); // Deselect "Select All" when a specific rowis clicked
  //   }
  // };

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
  const [selectAll, setSelectAlll] = useState(false);

  const handleSelectAll = () => {
    const newCheckedState = {};
    Object.keys(dummyData).forEach((key) => {
      Object.keys(dummyData[key].subitems).forEach((subKey) => {
        const subName = dummyData[key].subitems[subKey].subName;
        newCheckedState[subName] = !selectAll;
      });
    });
    setCheckedState(newCheckedState);
    setSelectAlll(!selectAll);
    localStorage.setItem("printData", JSON.stringify(newCheckedState));
  };
  const [menuData, setMenuData] = useState([]);
  // Function to close the color picker
  const closeColorPicker = () => {
    setIsModalOpen(false);
  };
  const [maindatakey, setmaindatakey] = useState([]);
  const [maindata, setmaindata] = useState("");
  const [selectionObjectkey, setselectionObjectkey] = useState("");
  const [selectionkeys, setselectiontkeys] = useState("");
  const [damageObjectkey, setdamageObjectkey] = useState("");
  const [damagekeys, setdamagekeys] = useState([]);

  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    const damageDataString = localStorage.getItem("DamageData") || "{}";
    const selectionDataString = localStorage.getItem("SelectionData") || "{}";
    const printData = JSON.parse(localStorage.getItem("printData") || "{}");
    const storedData =
      JSON.parse(localStorage.getItem("CreateEditText")) || "{}";
    // let startY = 35;
    // let prevSubKey = null;

    // const pageHeight = pdf.internal.pageSize.height;
    // const marginBottom = 20; // Bottom margin to avoid text getting too close to the page edge
    // const lineHeight = 4.5; // Height of each line
    // const gapBetweenSections = 5; // Gap between sections
    // function drawTextBlock(textLines) {
    //   const remainingSpace = pageHeight - startY - marginBottom;
    //   const blockHeight = textLines.length * lineHeight;

    //   if (blockHeight <= remainingSpace) {
    //     pdf.text(textLines, 10, startY);
    //     startY += blockHeight;
    //   } else {
    //     const linesThatFit = Math.floor(remainingSpace / lineHeight);
    //     const currentPageLines = textLines.slice(0, linesThatFit);
    //     const nextPageLines = textLines.slice(linesThatFit);

    //     pdf.text(currentPageLines, 10, startY);
    //     pdf.addPage();
    //     startY = 50;
    //     pdf.text(nextPageLines, 10, startY);
    //     startY += nextPageLines.length * lineHeight;
    //   }
    //   startY += gapBetweenSections;
    // }

    const coverphotoImageData = JSON.parse(
      localStorage.getItem("coverphotoImage") || "{}"
    );
    // console.log("coverphotoImageData", coverphotoImageData);
    const imagekeys = Object.keys(coverphotoImageData);

    try {
      const parsedMenuData = JSON.parse(storedMenuData);
      const damageData = JSON.parse(damageDataString);

      const selectionData = JSON.parse(selectionDataString);

      setMenuData(parsedMenuData);
      setDummyData(parsedMenuData);

      let maindatakeys = [];
      let maindatas = [];
      let selectionkeysArray = [];
      let selectionObjectkeysArray = [];
      let damageObjectkeysArray = [];
      let damagekeysArray = [];

      Object.keys(damageData).forEach((key) => {
        let damagekey = key;
        console.log("damagekey", damagekey);

        const damageObject = damageData[key];
        // console.log("damageObject", damageObject);

        let damageObjectkey = key.replace("_d1", "").replace("_d2", "");
        damagekeysArray.push(damagekey);
        damageObjectkeysArray.push(damageObjectkey);
      });

      Object.keys(selectionData).forEach((sikey) => {
        let selectionkeys = sikey;
        let selectionObjectkey = sikey.replace("_s1", "").replace("_s2", "");
        selectionkeysArray.push(selectionkeys);
        selectionObjectkeysArray.push(selectionObjectkey);
      });

      Object.keys(parsedMenuData).forEach((key) => {
        Object.keys(parsedMenuData[key].subdetails).forEach((subKey) => {
          Object.keys(parsedMenuData[key].subitems).forEach((subitemkey) => {
            Object.keys(parsedMenuData[key].subdetails[subKey]).forEach(
              (detailKey) => {
                let maindatakey = detailKey;
                let maindata =
                  parsedMenuData[key].subdetails[subKey][detailKey];

                maindatakeys.push(maindatakey);
                maindatas.push(maindata);
                // console.log(
                //   "subname",
                //   parsedMenuData[key].subitems[subitemkey].subName
                // );

                // damagekeysArray.includes(
                //   parsedMenuData[key].subdetails[subKey][detailKey].Damage2Data
                // );
                // console.log(
                //   "tabname",
                //   parsedMenuData[key].subdetails[subKey][detailKey].tabname
                // );
                // if (
                //   damageObjectkeysArray.includes(maindatakey) &&
                //   damagekeysArray.includes(
                //     parsedMenuData[key].subdetails[subKey][detailKey]
                //       .Damage1Data ||
                //       parsedMenuData[key].subdetails[subKey][detailKey]
                //         .Damage2Data
                //   )
                // ) {
                //   console.log(
                //     "Damage1Data:",
                //     damageData[
                //       parsedMenuData[key].subdetails[subKey][detailKey]
                //         .Damage1Data
                //     ] || "Damage2Data:",
                //     damageData[
                //       parsedMenuData[key].subdetails[subKey][detailKey]
                //         .Damage2Data
                //     ]
                //   );
                // }
                // if (
                //   damageObjectkeysArray.includes(maindatakey) &&
                //   damagekeysArray.includes(
                //     parsedMenuData[key].subdetails[subKey][detailKey]
                //       .Damage2Data
                //   )
                // ) {
                //   console.log(
                //     "Damage1Data:",
                //     parsedMenuData[key].subdetails[subKey][detailKey].damage2
                //   );
                // }
                // if (
                //   selectionObjectkeysArray.includes(maindatakey) &&
                //   selectionkeysArray.includes(
                //     parsedMenuData[key].subdetails[subKey][detailKey]
                //       .Selection1Data
                //   )
                // ) {
                //   console.log(
                //     "Selection1Data:",
                //     parsedMenuData[key].subdetails[subKey][detailKey].selection1
                //   );
                // }
                // if (
                //   selectionObjectkeysArray.includes(maindatakey) &&
                //   selectionkeysArray.includes(
                //     parsedMenuData[key].subdetails[subKey][detailKey]
                //       .Selection2Data
                //   )
                // ) {
                //   console.log(
                //     "Selection2Data:",
                //     parsedMenuData[key].subdetails[subKey][detailKey].selection2
                //   );
                // }
                // if (printData[item_subName]) {
                //   if (prevSubKey !== null && prevSubKey !== subKey) {
                //     pdf.addPage();
                //     startY = 50;
                //   }
                //   prevSubKey = subKey;

                //   pdf.setTextColor(0, 0, 0);
                //   pdf.setFontSize(20);

                //   // Add item_id to PDF
                //   pdf.text(item_subName, 10, startY - 10);
                //   pdf.setFontSize(14);
                //   if (storedData[damagekey]) {
                //     const editText = storedData[damagekey].text;
                //     const editTextLines = pdf.splitTextToSize(editText, 194);
                //     drawTextBlock(editTextLines);
                //   }
                //   if (storedData[selectionkey]) {
                //     const editText = storedData[selectionkey].text;
                //     const editTextLines = pdf.splitTextToSize(editText, 194);
                //     drawTextBlock(editTextLines);
                //   }
                //   pdf.setFillColor(180, 180, 184);
                //   pdf.rect(9, startY - 6, 194, 8, "F");
                //   pdf.setTextColor(0, 0, 0);
                //   pdf.setFontSize(14);

                //   pdf.text(tabName, 10, startY);

                //   startY += 10;

                //   // Check for selection data
                //   if (Selection[`${subKey}_s1`] || Selection[`${subKey}_s2`]) {
                //     let selectionText1 =
                //       Selection[`${subKey}_s1`]?.selectionText;
                //     let selectionText2 =
                //       Selection[`${subKey}_s2`]?.selectionText;

                //     // Log values to debug
                //     console.log(
                //       "selectionText",
                //       selectionText1,
                //       ",",
                //       selectionText2
                //     );

                //     // Use both values if they exist

                //     let descriptionText1 =
                //       Selection[`${subKey}_s1`]?.description || "MATERIALS";
                //     let descriptionText2 =
                //       Selection[`${subKey}_s2`]?.description || "MATERIALS";
                //     let newtext1 =
                //       selectionText1 && descriptionText1
                //         ? `${descriptionText1} : ${selectionText1}`
                //         : "";
                //     let newtext2 =
                //       selectionText2 && descriptionText2
                //         ? `${descriptionText2} : ${selectionText2}`
                //         : "";

                //     let selecText = [newtext1, newtext2]
                //       .filter(Boolean)
                //       .join("\n");

                //     const materialsText = `${selecText}`;
                //     const materialsLines = pdf.splitTextToSize(
                //       materialsText,
                //       194
                //     );
                //     drawTextBlock(materialsLines);
                //   }

                //   const ratText = `RATINGS: ${Object.values(
                //     damageObject.rating
                //   ).join(", ")}`;
                //   // const descText = `DESCRIPTION: ${damageObject.description}`;
                //   const descText = damageObject.description
                //     ? damageObject.description
                //     : "OBSERVATIONS";

                //   const obsText = `${descText}: ${damageObject.Damage1black}`;
                //   const improveText = `${descText}: ${damageObject.Damage1red}`;
                //   pdf.setTextColor(0, 0, 0);
                //   pdf.setFontSize(12);
                //   const descLines = pdf.splitTextToSize(descText, 194);
                //   const ratLines = pdf.splitTextToSize(ratText, 194);
                //   const obsLines = pdf.splitTextToSize(obsText, 194);
                //   const improveLines = pdf.splitTextToSize(improveText, 194);

                //   drawTextBlock(descLines);

                //   // Draw RATINGS text block
                //   drawTextBlock(ratLines);

                //   // Draw OBSERVATIONS text block
                //   drawTextBlock(obsLines);

                //   // Draw IMPROVE text block
                //   pdf.setTextColor(255, 0, 0);
                //   drawTextBlock(improveLines);

                //   // Add images above "IMPROVE" text
                //   pdf.setTextColor(0, 0, 0);

                //   const imageWidth = 70;
                //   const imageHeight = 60;
                //   let imagesAdded = false;

                //   if (coverphotoImageData[damagekey]) {
                //     coverphotoImageData[damagekey].forEach((imageItem) => {
                //       const remainingSpace = pageHeight - startY - marginBottom;
                //       const requiredSpace =
                //         imageHeight + lineHeight + gapBetweenSections;
                //       if (requiredSpace > remainingSpace) {
                //         pdf.addPage();
                //         startY = 50;
                //       }

                //       pdf.addImage(
                //         imageItem.url,
                //         "JPEG",
                //         70,
                //         startY,
                //         imageWidth,
                //         imageHeight
                //       );
                //       startY += imageHeight + 4;
                //       const caption = imageItem.caption;
                //       const captionDimensions = pdf.getTextDimensions(caption, {
                //         maxWidth: imageWidth,
                //       });
                //       const captionHeight = captionDimensions.h;

                //       pdf.text(caption, 70, startY, {
                //         maxWidth: imageWidth,
                //       });
                //       startY += captionHeight + 2;
                //       imagesAdded = true;
                //     });
                //   }

                //   // Reset text color for the next section
                //   pdf.setTextColor(0, 0, 0);

                //   // Add a gap between different items
                //   startY += 20;
                // }
              }
            );
          });
        });
      });

      // console.log("maindatakeys:", maindatakeys);
      // console.log("maindatas:", maindatas);
      // console.log("selectionkeysArray:", selectionkeysArray);
      // console.log("selectionObjectkeysArray:", selectionObjectkeysArray);
      // console.log("damageObjectkeysArray:", damageObjectkeysArray);
      // console.log("damagekeysArray:", damagekeysArray);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, []);

  useEffect(() => {
    console.log("damagekeys", damagekeys);
    console.log("maindatakey", maindatakey);
  }, [maindatakey]);

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
    const menuData = localStorage.getItem("menuData") || "{}";
    // console.log("menuData", menuData);
    const Checkboxes = localStorage.getItem("checkbox") || "{}";

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
          <p style="text-align: center; font-size: 35px; font-weight: 30px; margin-top: 25px ">Report Introduction</p>
       
          <p style="font-size: 15px; text-align: justify; padding: 10px 20px 0 20px">
              ${reportIntroduction()}
          </p>
          <div style = "display:flex">
          <img src="${Icon2}" style="width: 50px; height: 50px; margin-left:20px;" />

          <p style="  font-size: 15px;  padding-left:20px">

          1.Acceptable : Theis item was inspected and is in acceptable condition for it's age and use.
         
         </p>
         </div>
         <br/>

         <div style = "display:flex">
         <img src="${Icon5}" style="width: 50px; height: 50px; margin-left:20px;" />
           <p style="  font-size: 15px; padding-left:20px">
          2.Repair/Replace : Items with this rating should be examined by a professional and be repaired or replaced.

        
         </p>
         </div>
         <br/>

         <div style = "display:flex">
         <img src="${Icon6}" style="width: 50px; height: 50px; margin-left:20px;" />
           <p style="  font-size: 15px; padding-left:20px ">
          3.Safety Issue : Items with this rating should be examined immediately and fixed. Even though the items is marked as safety issue it could be a very inexpensive fix. please make sure to read the narrative to completely understand the issue.
         
         </p>
         </div>
         <br/>

         <div style = "display:flex">
         <img src="${Icon3}" style="width: 50px; height: 50px; margin-left:20px;" />
           <p style="  font-size: 15px; padding-left:20px ">
          4.Monitor : Items with this rating should be monitored periodically to ensure that the issue hasn't become the worse , warranting a repair or replacement.
         
         </p>
         </div>
         <br/>
         <div style = "display:flex">
         <img src="${Icon4}" style="width: 50px; height: 50px; margin-left:20px;" />
           <p style="  font-size: 15px; padding-left:20px ">
          5.Not Accessible : Items with this rating were not able to fully inspected because access was blocked off or covered.
         
         </p>
         </div>
         <br/>
       
           <p style="  font-size: 15px; padding-left:20px ">
         Our report contains a unique pop-up glossary feature. When you see words highlighted in yellow hover your mouse over the term. The defination or tip about the item will appear!
         
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
            pdf.rect(2, 2, pdf.internal.pageSize.getWidth() - 4, 10, "F"); // Draw blue rectangle as header
            pdf.setTextColor(255, 255, 255); // White text color
            pdf.setFontSize(13);
            pdf.text(4, 9, text); // Add text to the header
          };

          // Add header to every page
          const addPageHeader = () => {
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 2; i <= pageCount; i++) {
              pdf.setPage(i);
              addHeader("N G Home Inspection Services");
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

          if (modifiedContent) {
            try {
              //Adding table of contents
              pdf.addPage();
              addPageHeader();
              addPageBorder();
              addTableOfContents(pdf, JSON.parse(menuData));
              addPageBorder();
              addPageHeader();
              // adding subname,tabname,images and all other data
              pdf.addPage();
              addPageHeader();
              addPageBorder();
              mainData(pdf);
              addPageHeader();
              addPageBorder();
              // adding summary table
              pdf.addPage();
              addPageBorder();
              addPageHeader();
              pdf.setFontSize(20);
              pdf.setTextColor(0, 0, 0);
              pdf.text("Report Summary", 80, 30);
              addSummaryTable(pdf, JSON.parse(menuData));
              addPageBorder();
              addPageHeader();
              //adding page number
              const pageCount = pdf.internal.getNumberOfPages();
              for (let i = 2; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(14);
                pdf.setTextColor(0, 0, 0);
                pdf.text(`Page ${i - 1} of ${pageCount - 1}`, 175, 293);
              }
              // Save the PDF
              pdf.save("Home_Inspection.pdf");

              console.log("PDF generated successfully.");
            } catch (error) {
              console.error("Error parsing DamageData:", error);
            }
          } else {
            console.warn(
              "DamageData or coverphotoImage not found in local storage."
            );
            // Save the PDF
            pdf.save("Home_Inspection.pdf");
          }
        });
    }
  };

  function reportIntroduction() {
    const loremIpsum = `
     
We appreciate the opportunity to conduct this inspection for you! Please carefully read your entire
Inspection Report. Call us after you have reviewed your report if you have any question. Remember, when the inspection is completed and the report is delivered , we are still available for any questions you may have .
<br/>
<br/>
Properties being inspected do not "Pass" or "Fail.” - The following report is based on an inspection of
the visible portion of the structure; Inspection may be limited by vegetation and possessions. Depending  upon the age of property, some items like GFCI outlets may not be installed ;this report will focus on safety  and function ,not current code.This report identifies specific non-code , non-cosmetic concerns that the inspector feels may  need further investigation or repair .
<br/>
<br/>
For your safety and liability purposes, we recommend that licensed contractors evaluate and repair
any critical concerns and defects. Note that this report is a snapshot in time. We recommend that
you or your representative carry out a walkthrough inspection to check the condition of the property,
using this report as a guide.
<br/>
<br/>
Video In Your Report - The inspector may include videos of issues within the report . If you are opening the PDF version of the report make sure you are viewing the PDF in the free Adobe Reader PDF programs . If you're viewing the report as a webpage the videos will play in any browser .Click on any video within the  report to start playing video.
<br/>
<br/>
Throughout the report we utilize icons to make things easier to find and read. Use the legend below to understand each rating icon
<br/>
<br/>

 


    `;

    return loremIpsum;
  }

  function addTableOfContents(pdf, parsedMenuData) {
    // Retrieve stored data
    const storedData = JSON.parse(localStorage.getItem("CreateEditText")) || {};
    let storedDatakey = "";
    let storedDatavalue = "";

    // Loop through storedData to find the relevant key-value pair
    Object.keys(storedData).forEach((key) => {
      if (key === "Table of Content") {
        storedDatakey = key;
        console.log("storedDatakey", storedDatakey);
        storedDatavalue = storedData[key].text;
        console.log("storedDatavalue", storedDatavalue);
      }
    });

    // Set font size and text color
    let currentYPosition = 18; // Initial vertical position for text placement
    let currentXPosition = 5;
    let tabCounter = 1;
    const tableData = [["Table of Contents"]];
    const fontSize = 16;
    const fontColor = "black";
    pdf.setFontSize(fontSize);
    pdf.setTextColor(fontColor);

    // Add storedDatavalue if storedDatakey is "Table of Content"
    if (storedDatakey === "Table of Content") {
      const editTextLines = pdf.splitTextToSize(storedDatavalue, 194);
      editTextLines.forEach((line) => {
        pdf.text(line, currentXPosition, currentYPosition);
        currentYPosition += 8; // Adjust vertical position after adding each line of text
      });
    }

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

  function mainData(pdf) {
    const mainData = JSON.parse(localStorage.getItem("menuData") || "{}");

    const printData = JSON.parse(localStorage.getItem("printData") || "{}");
    const selectionDataString = localStorage.getItem("SelectionData") || "{}";

    const Selection = JSON.parse(selectionDataString);
    // console.log("Selection", Selection);

    let selectionkeyArray = [];
    let selectionObjectkeyArray = [];
    let selectionkey = "";

    Object.keys(Selection).forEach((key) => {
      selectionkey = key;
      let selectionObjectkey = key.replace("_s1", "").replace("_s2", "");

      selectionkeyArray.push(selectionkey);
      selectionObjectkeyArray.push(selectionObjectkey);
    });

    const storedData =
      JSON.parse(localStorage.getItem("CreateEditText")) || "{}";

    let startY = 35;
    let prevSubKey = null;

    const pageHeight = pdf.internal.pageSize.height;
    const marginBottom = 20; // Bottom margin to avoid text getting too close to the page edge
    const lineHeight = 4.5; // Height of each line
    const gapBetweenSections = 5; // Gap between sections

    // Function to split and draw text
    function drawTextBlock(textLines) {
      const remainingSpace = pageHeight - startY - marginBottom;
      const blockHeight = textLines.length * lineHeight;

      if (blockHeight <= remainingSpace) {
        pdf.text(textLines, 10, startY);
        startY += blockHeight;
      } else {
        const linesThatFit = Math.floor(remainingSpace / lineHeight);
        const currentPageLines = textLines.slice(0, linesThatFit);
        const nextPageLines = textLines.slice(linesThatFit);

        pdf.text(currentPageLines, 10, startY);
        pdf.addPage();
        startY = 50;
        pdf.text(nextPageLines, 10, startY);
        startY += nextPageLines.length * lineHeight;
      }
      startY += gapBetweenSections;
    }

    // Fetch image data from local storage
    const coverphotoImageData = JSON.parse(
      localStorage.getItem("coverphotoImage") || "{}"
    );
    // console.log("coverphotoImageData", coverphotoImageData);
    const imagekeys = Object.keys(coverphotoImageData);

    for (const key in mainData) {
      const menuItem = mainData[key];
      const subdetails = menuItem.subdetails;

      for (let key in subdetails) {
        if (subdetails.hasOwnProperty(key)) {
          let details = subdetails[key];
          for (let subKey in details) {
            if (details.hasOwnProperty(subKey)) {
              let subdetails = details[subKey];
              let tabName = subdetails.tabname;
            }
          }
        }
      }
    }

    const damageDataString = localStorage.getItem("DamageData") || "{}";
    const damageData = JSON.parse(damageDataString);
    Object.keys(damageData).forEach((key, index) => {
      const damagekey = key;

      const damageObject = damageData[key];
      const damageObjectkey = key.replace("_d1", "").replace("_d2", "");

      Object.keys(mainData).forEach((mainKey) => {
        const menuItem = mainData[mainKey];
        const subdetails = menuItem.subdetails;

        Object.keys(subdetails).forEach((detailKey) => {
          if (subdetails.hasOwnProperty(detailKey)) {
            let details = subdetails[detailKey];

            Object.keys(details).forEach((subKey) => {
              // console.log("details", details[subKey].tabname);

              if (details.hasOwnProperty(subKey)) {
                if (damageObjectkey === subKey) {
                  let subdetailsItem = details[subKey];

                  let detailSubkey = detailKey;
                  const subnameid = menuItem.subitems;

                  subnameid.forEach((item) => {
                    let item_id = item.id;
                    let item_subName = item.subName;

                    if (detailSubkey == item_id) {
                      let tabName = subdetailsItem.tabname;

                      if (printData[item_subName]) {
                        if (prevSubKey !== null && prevSubKey !== subKey) {
                          pdf.addPage();
                          startY = 50;
                        }
                        prevSubKey = subKey;

                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(20);

                        // Add item_id to PDF
                        pdf.text(item_subName, 10, startY - 10);
                        pdf.setFontSize(14);
                        if (storedData[damagekey]) {
                          const editText = storedData[damagekey].text;
                          const editTextLines = pdf.splitTextToSize(
                            editText,
                            194
                          );
                          drawTextBlock(editTextLines);
                        }
                        if (storedData[selectionkey]) {
                          const editText = storedData[selectionkey].text;
                          const editTextLines = pdf.splitTextToSize(
                            editText,
                            194
                          );
                          drawTextBlock(editTextLines);
                        }
                        pdf.setFillColor(180, 180, 184);
                        pdf.rect(9, startY - 6, 194, 8, "F");
                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(14);

                        pdf.text(tabName, 10, startY);

                        startY += 10;

                        // Check for selection data
                        if (
                          Selection[`${subKey}_s1`] ||
                          Selection[`${subKey}_s2`]
                        ) {
                          let selectionText1 =
                            Selection[`${subKey}_s1`]?.selectionText;
                          let selectionText2 =
                            Selection[`${subKey}_s2`]?.selectionText;

                          // Log values to debug
                          console.log(
                            "selectionText",
                            selectionText1,
                            ",",
                            selectionText2
                          );

                          // Use both values if they exist

                          let descriptionText1 =
                            Selection[`${subKey}_s1`]?.description ||
                            "MATERIALS";
                          let descriptionText2 =
                            Selection[`${subKey}_s2`]?.description ||
                            "MATERIALS";
                          let newtext1 =
                            selectionText1 && descriptionText1
                              ? `${descriptionText1} : ${selectionText1}`
                              : "";
                          let newtext2 =
                            selectionText2 && descriptionText2
                              ? `${descriptionText2} : ${selectionText2}`
                              : "";

                          let selecText = [newtext1, newtext2]
                            .filter(Boolean)
                            .join("\n");

                          const materialsText = `${selecText}`;
                          const materialsLines = pdf.splitTextToSize(
                            materialsText,
                            194
                          );
                          drawTextBlock(materialsLines);
                        }

                        const ratText = `RATINGS: ${Object.values(
                          damageObject.rating
                        ).join(", ")}`;
                        // const descText = `DESCRIPTION: ${damageObject.description}`;
                        const descText = damageObject.description
                          ? damageObject.description
                          : "OBSERVATIONS";

                        const obsText = `${descText}: ${damageObject.Damage1black}`;
                        const improveText = `${descText}: ${damageObject.Damage1red}`;
                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(12);
                        const descLines = pdf.splitTextToSize(descText, 194);
                        const ratLines = pdf.splitTextToSize(ratText, 194);
                        const obsLines = pdf.splitTextToSize(obsText, 194);
                        const improveLines = pdf.splitTextToSize(
                          improveText,
                          194
                        );

                        drawTextBlock(descLines);

                        // Draw RATINGS text block
                        drawTextBlock(ratLines);

                        // Draw OBSERVATIONS text block
                        drawTextBlock(obsLines);

                        // Draw IMPROVE text block
                        pdf.setTextColor(255, 0, 0);
                        drawTextBlock(improveLines);

                        // Add images above "IMPROVE" text
                        pdf.setTextColor(0, 0, 0);

                        const imageWidth = 70;
                        const imageHeight = 60;
                        let imagesAdded = false;

                        if (coverphotoImageData[damagekey]) {
                          coverphotoImageData[damagekey].forEach(
                            (imageItem) => {
                              const remainingSpace =
                                pageHeight - startY - marginBottom;
                              const requiredSpace =
                                imageHeight + lineHeight + gapBetweenSections;
                              if (requiredSpace > remainingSpace) {
                                pdf.addPage();
                                startY = 50;
                              }

                              pdf.addImage(
                                imageItem.url,
                                "JPEG",
                                70,
                                startY,
                                imageWidth,
                                imageHeight
                              );
                              startY += imageHeight + 4;
                              const caption = imageItem.caption;
                              const captionDimensions = pdf.getTextDimensions(
                                caption,
                                {
                                  maxWidth: imageWidth,
                                }
                              );
                              const captionHeight = captionDimensions.h;

                              pdf.text(caption, 70, startY, {
                                maxWidth: imageWidth,
                              });
                              startY += captionHeight + 2;
                              imagesAdded = true;
                            }
                          );
                        }

                        // Reset text color for the next section
                        pdf.setTextColor(0, 0, 0);

                        // Add a gap between different items
                        startY += 20;
                      }
                    }
                  });
                }
              }
            });
          }
        });
      });
    });
  }
  // function mainData(pdf) {
  //   const storedMenuData = localStorage.getItem("menuData");
  //   const damageDataString = localStorage.getItem("DamageData") || "{}";
  //   const selectionDataString = localStorage.getItem("SelectionData") || "{}";
  //   const printData = JSON.parse(localStorage.getItem("printData") || "{}");
  //   const storedData =
  //     JSON.parse(localStorage.getItem("CreateEditText")) || "{}";
  //   let startY = 35;
  //   let prevSubKey = null;

  //   const pageHeight = pdf.internal.pageSize.height;
  //   const marginBottom = 20; // Bottom margin to avoid text getting too close to the page edge
  //   const lineHeight = 4.5; // Height of each line
  //   const gapBetweenSections = 5; // Gap between sections
  //   function drawTextBlock(textLines) {
  //     const remainingSpace = pageHeight - startY - marginBottom;
  //     const blockHeight = textLines.length * lineHeight;

  //     if (blockHeight <= remainingSpace) {
  //       pdf.text(textLines, 10, startY);
  //       startY += blockHeight;
  //     } else {
  //       const linesThatFit = Math.floor(remainingSpace / lineHeight);
  //       const currentPageLines = textLines.slice(0, linesThatFit);
  //       const nextPageLines = textLines.slice(linesThatFit);

  //       pdf.text(currentPageLines, 10, startY);
  //       pdf.addPage();
  //       startY = 50;
  //       pdf.text(nextPageLines, 10, startY);
  //       startY += nextPageLines.length * lineHeight;
  //     }
  //     startY += gapBetweenSections;
  //   }

  //   const coverphotoImageData = JSON.parse(
  //     localStorage.getItem("coverphotoImage") || "{}"
  //   );
  //   // console.log("coverphotoImageData", coverphotoImageData);
  //   const imagekeys = Object.keys(coverphotoImageData);

  //   try {
  //     const parsedMenuData = JSON.parse(storedMenuData);
  //     const damageData = JSON.parse(damageDataString);
  //     const selectionData = JSON.parse(selectionDataString);

  //     setMenuData(parsedMenuData);
  //     setDummyData(parsedMenuData);

  //     let maindatakeys = [];
  //     let maindatas = [];
  //     let selectionkeysArray = [];
  //     let selectionObjectkeysArray = [];
  //     let damageObjectkeysArray = [];
  //     let damagekeysArray = [];

  //     Object.keys(damageData).forEach((key) => {
  //       let damagekey = key;
  //       const damageObject = damageData[key];
  //       let damageObjectkey = key.replace("_d1", "").replace("_d2", "");
  //       damagekeysArray.push(damagekey);
  //       damageObjectkeysArray.push(damageObjectkey);
  //     });

  //     Object.keys(selectionData).forEach((sikey) => {
  //       let selectionkeys = sikey;
  //       let selectionObjectkey = sikey.replace("_s1", "").replace("_s2", "");
  //       selectionkeysArray.push(selectionkeys);
  //       selectionObjectkeysArray.push(selectionObjectkey);
  //     });
  //     let item_subName = "";
  //     let item_tabName = "";
  //     Object.keys(parsedMenuData).forEach((key) => {
  //       Object.keys(parsedMenuData[key].subdetails).forEach((subKey) => {
  //         Object.keys(parsedMenuData[key].subitems).forEach((subitemkey) => {
  //           Object.keys(parsedMenuData[key].subdetails[subKey]).forEach(
  //             (detailKey) => {
  //               let maindatakey = detailKey;
  //               let maindata =
  //                 parsedMenuData[key].subdetails[subKey][detailKey];

  //               maindatakeys.push(maindatakey);
  //               maindatas.push(maindata);
  //               item_subName = parsedMenuData[key].subitems[subitemkey].subName;

  //               item_tabName =
  //                 parsedMenuData[key].subdetails[subKey][detailKey].tabname;
  //             }
  //           );
  //         });
  //       });
  //     });
  //     for (let abc in maindatakeys) {
  //       for (let xyz in maindatas) {
  //         for (let key in selectionObjectkeysArray) {
  //           const subKey = maindatakeys[abc];
  //           console.log("subKey", maindatas[xyz]);
  //           if (maindatakeys[abc] === selectionObjectkeysArray[key]) {
  //             if (printData[item_subName]) {
  //               if (prevSubKey !== null && prevSubKey !== subKey) {
  //                 pdf.addPage();
  //                 startY = 50;
  //               }
  //               prevSubKey = subKey;

  //               pdf.setTextColor(0, 0, 0);
  //               pdf.setFontSize(20);

  //               // Add item_id to PDF
  //               pdf.text(item_subName, 10, startY - 10);
  //               pdf.setFontSize(14);
  //               damagekeysArray.forEach((damagekey) => {
  //                 if (storedData[damagekey]) {
  //                   const editText = storedData[damagekey].text;
  //                   const editTextLines = pdf.splitTextToSize(editText, 194);
  //                   drawTextBlock(editTextLines);
  //                 }
  //               });
  //               selectionkeysArray.forEach((selectionkey) => {
  //                 if (storedData[selectionkey]) {
  //                   const editText = storedData[selectionkey].text;
  //                   const editTextLines = pdf.splitTextToSize(editText, 194);
  //                   drawTextBlock(editTextLines);
  //                 }
  //               });

  //               pdf.setFillColor(180, 180, 184);
  //               pdf.rect(9, startY - 6, 194, 8, "F");
  //               pdf.setTextColor(0, 0, 0);
  //               pdf.setFontSize(14);

  //               // if (damagekeysArray.includes(maindatas[xyz].Damage1Data)) {
  //               //   pdf.text(maindatas[xyz].damage1, 10, startY);
  //               // }
  //               // if (damagekeysArray.includes(maindatas[xyz].Damage2Data)) {
  //               //   pdf.text(maindatas[xyz].damage2, 10, startY);
  //               // }
  //               // if (
  //               //   selectionkeysArray.includes(maindatas[xyz].Selection1Data)
  //               // ) {
  //               //   pdf.text(maindatas[xyz].selection1, 10, startY);
  //               // }
  //               startY += 10;

  //               // Check for selection data

  //               if (
  //                 selectionData[`${subKey}_s1`] ||
  //                 selectionData[`${subKey}_s2`]
  //               ) {
  //                 let selectionText1 =
  //                   selectionData[`${subKey}_s1`]?.selectionText;
  //                 let selectionText2 =
  //                   selectionData[`${subKey}_s2`]?.selectionText;

  //                 // Log values to debug
  //                 // console.log(
  //                 //   "selectionText",
  //                 //   selectionText1,
  //                 //   ",",
  //                 //   selectionText2
  //                 // );

  //                 // Use both values if they exist

  //                 let descriptionText1 =
  //                   selectionData[`${subKey}_s1`]?.description || "MATERIALS";
  //                 let descriptionText2 =
  //                   selectionData[`${subKey}_s2`]?.description || "MATERIALS";
  //                 let newtext1 =
  //                   selectionText1 && descriptionText1
  //                     ? `${descriptionText1} : ${selectionText1}`
  //                     : "";
  //                 let newtext2 =
  //                   selectionText2 && descriptionText2
  //                     ? `${descriptionText2} : ${selectionText2}`
  //                     : "";

  //                 let selecText = [newtext1, newtext2]
  //                   .filter(Boolean)
  //                   .join("\n");

  //                 const materialsText = `${selecText}`;
  //                 const materialsLines = pdf.splitTextToSize(
  //                   materialsText,
  //                   194
  //                 );
  //                 drawTextBlock(materialsLines);
  //               }

  //               // damagekeysArray.forEach((damagekey) => {
  //               //   const damageObject = damageData[damagekey];
  //               //   const ratText = `RATINGS: ${Object.values(
  //               //     damageObject.rating
  //               //   ).join(", ")}`;
  //               //   // const descText = `DESCRIPTION: ${damageObject.description}`;
  //               //   const descText = damageObject.description
  //               //     ? damageObject.description
  //               //     : "OBSERVATIONS";

  //               //   const obsText = `${descText}: ${damageObject.Damage1black}`;
  //               //   const improveText = `${descText}: ${damageObject.Damage1red}`;
  //               //   pdf.setTextColor(0, 0, 0);
  //               //   pdf.setFontSize(12);
  //               //   const descLines = pdf.splitTextToSize(descText, 194);
  //               //   const ratLines = pdf.splitTextToSize(ratText, 194);
  //               //   const obsLines = pdf.splitTextToSize(obsText, 194);
  //               //   const improveLines = pdf.splitTextToSize(
  //               //     improveText,
  //               //     194
  //               //   );

  //               //   drawTextBlock(descLines);

  //               //   // Draw RATINGS text block
  //               //   drawTextBlock(ratLines);

  //               //   // Draw OBSERVATIONS text block
  //               //   drawTextBlock(obsLines);

  //               //   // Draw IMPROVE text block
  //               //   pdf.setTextColor(255, 0, 0);
  //               //   drawTextBlock(improveLines);

  //               //   // Add images above "IMPROVE" text
  //               //   pdf.setTextColor(0, 0, 0);

  //               //   const imageWidth = 70;
  //               //   const imageHeight = 60;
  //               //   let imagesAdded = false;

  //               //   if (coverphotoImageData[damagekey]) {
  //               //     coverphotoImageData[damagekey].forEach((imageItem) => {
  //               //       const remainingSpace =
  //               //         pageHeight - startY - marginBottom;
  //               //       const requiredSpace =
  //               //         imageHeight + lineHeight + gapBetweenSections;
  //               //       if (requiredSpace > remainingSpace) {
  //               //         pdf.addPage();
  //               //         startY = 50;
  //               //       }

  //               //       pdf.addImage(
  //               //         imageItem.url,
  //               //         "JPEG",
  //               //         70,
  //               //         startY,
  //               //         imageWidth,
  //               //         imageHeight
  //               //       );
  //               //       startY += imageHeight + 4;
  //               //       const caption = imageItem.caption;
  //               //       const captionDimensions = pdf.getTextDimensions(
  //               //         caption,
  //               //         {
  //               //           maxWidth: imageWidth,
  //               //         }
  //               //       );
  //               //       const captionHeight = captionDimensions.h;

  //               //       pdf.text(caption, 70, startY, {
  //               //         maxWidth: imageWidth,
  //               //       });
  //               //       startY += captionHeight + 2;
  //               //       imagesAdded = true;
  //               //     });
  //               //   }
  //               // });

  //               // Reset text color for the next section
  //               pdf.setTextColor(0, 0, 0);

  //               // Add a gap between different items
  //               startY += 20;
  //             }
  //           }
  //         }
  //       }
  //     }

  //     // console.log("maindatakeys:", maindatakeys);
  //     // console.log("selectionkeysArray:", selectionkeysArray);
  //     // console.log("selectionObjectkeysArray:", selectionObjectkeysArray);
  //     // console.log("damageObjectkeysArray:", damageObjectkeysArray);
  //     // console.log("damagekeysArray:", damagekeysArray);
  //   } catch (error) {
  //     console.error("Error parsing JSON:", error);
  //   }
  // }

  function addSummaryTable(pdf, menuNames) {
    const damageDataStrings = localStorage.getItem("DamageData") || "{}";
    const damageData = JSON.parse(damageDataStrings || "{}");
    const menuDataa = JSON.parse(localStorage.getItem("menuData") || "{}");

    const storedData =
      JSON.parse(localStorage.getItem("CreateEditText")) || "{}";
    let storedDatakey = "";
    let storedDatavalue = "";

    // Loop through storedData to find the relevant key-value pair
    Object.keys(storedData).forEach((key) => {
      if (key === "Summary") {
        storedDatakey = key;
        console.log("storedDatakey", storedDatakey);
        storedDatavalue = storedData[key].text;
        console.log("storedDatavalue", storedDatavalue);
      }
    });

    const textHeight = pdf.getTextDimensions(storedDatavalue, {
      maxWidth: 210, // Adjust the maxWidth according to your page width
      align: "left",
    }).h;

    // Define the vertical gap between the two sections
    const verticalGap = 20; // You can adjust this value as needed

    // Position the addSummaryTable() below the textWithLink() with a dynamic gap
    const baseY = textHeight + verticalGap + 18;
    const baseX = verticalGap + 18;
    const addSummaryTableY = storedDatavalue ? baseY : baseX;
    // Add the textWithLink() with dynamic gap
    pdf.setFontSize(12);
    pdf.textWithLink(storedDatavalue, 14, 40, {
      maxWidth: 185, // Adjust the maxWidth according to your page width
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
      // console.log("subdetailKeys", subdetailKeys);

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

  useEffect(() => {
    getDataLocal();
  }, []);

  const getDataLocal = () => {
    const data = localStorage.getItem("menuData");
    const reportData = JSON.parse(data);
    // console.log("report data ", reportData);
    setLocalStorageData(reportData);
  };
  const [checkedState, setCheckedState] = useState({});
  useEffect(() => {
    const storedData = localStorage.getItem("printData");
    if (storedData) {
      setCheckedState(JSON.parse(storedData));
    }
  }, []);

  const handleCheckboxesChange = (event) => {
    const { id, checked } = event.target;
    const newCheckedState = {
      ...checkedState,
      [id]: checked,
    };
    setCheckedState(newCheckedState);
    localStorage.setItem("printData", JSON.stringify(newCheckedState));
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
              <div className="overflow-auto h-[40em]">
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
                              id={`${dummyData[key].subitems[subKey].subName}`}
                              checked={
                                checkedState[
                                  `${dummyData[key].subitems[subKey].subName}`
                                ] || false
                              }
                              onChange={handleCheckboxesChange}
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
                    </button>
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
