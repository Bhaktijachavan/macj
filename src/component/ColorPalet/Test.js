import React from "react";
import html2pdf from "html2pdf.js";

const Test = () => {
  const exportCoverPageToPDF = () => {
    // Retrieve the content from localStorage saved by CoverPageDesigner
    const content = localStorage.getItem("outputContent");

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










          
          // page for tabname
          pdf.addPage();
          pdf.text("TabName", 10, 10);

          const menuDataa = JSON.parse(localStorage.getItem("menuData"));

          // Loop through each menu item in menuDataa
          for (const key in menuDataa) {
            const menuItem = menuDataa[key];
            const subdetails = menuItem.subdetails;
          
            // Check if subdetails exist for the current menu item
            if (subdetails) {
              console.log("Menu Item:", menuItem.name);
          
              // Loop through each subdetail entry
              let isFirstSubdetail = true; // Flag to track first subdetail
              for (const subdetailKey in subdetails) {
                const subdetailValue = subdetails[subdetailKey];
                console.log("subdetailKey", subdetailValue)
          
                console.log("subdetailKey1", { tabname: subdetailValue.tabname, damage1: subdetailValue.damage1 });
                console.log("subdetailKey2", { tabname: subdetailValue.tabname });



                // Print separator before each subdetail except the first one
                if (!isFirstSubdetail) {
                  console.log("-------");
                }
                isFirstSubdetail = false;
          
                console.log("Subdetail ID:", subdetailValue);
                console.log("Subdetail tabname:", subdetailValue.damage1);
          
                // You can further loop through subdetailValue properties here to print more details
                // if needed (e.g., damage1, damage2, etc.)
              }
            } else {
              console.log("No subdetails found for", menuItem.name);
            }
          }
          


          // Get raw damageData string from localStorage
          // Get raw damageData string from localStorage
          // const damageDataStrings = localStorage.getItem("DamageData");

          // // Parse the JSON string
          // const damageData = JSON.parse(damageDataStrings);
          
          // // Extract all IDs with suffix removal (not used for menuData retrieval)
          // const damageDataIds = Object.keys(damageData).map(id => id.replace(/(_d1|_d2|_s1|_s2)$/, ""));
          
          // console.log("All Damage Data IDs (without suffixes):", damageDataIds);
          
          // // **Log the retrieved menuData**
          // console.log("menuData:", JSON.parse(localStorage.getItem("menuData"))); // Or a variable storing parsed menuData
          


         




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
                  const imageCaption = currentImageData[imgIndex].caption; // Get the caption of the image
                  console.log(
                    `Image URL <span class="math-inline">\{index\}\-</span>{imgIndex}:`
                  );

                  img.onload = function () {
                    // Calculate coordinates for image
                    const x = (imgIndex % 2) * 100 + 20; // Adjust spacing as needed
                    const y = Math.floor(imgIndex / 2) * 80 + 50; // Adjust spacing as needed

                    pdf.addImage(this, "JPEG", x, y, 80, 60); // Add the image to the PDF
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
                pdf.save("image_and_summary.pdf");
              }
            }

            pdf.addPage();

            // Add title for the image
            pdf.setFontSize(16);
            pdf.text("Title for the Image", 10, 20);
            addImageToPDF(0, 0); // Start the recursive function
          } else {
            console.error("No image data found in local storage.");
          }

          const damageDataString = localStorage.getItem("DamageData");

          // Check if data exists
          if (damageDataString) {
            try {
              const damageData = JSON.parse(damageDataString);
              console.log("Damage Data:", damageData);
              // You can now access the damage data object and its properties
            } catch (error) {
              console.error("Error parsing DamageData:", error);
            }
          } else {
            console.warn("DamageData not found in local storage.");
          }
        });
    }
  };

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

  function addTableOfContents(pdf, parsedMenuData) {
    // Set styling properties (adjust as desired)
    const fontSize = 12;
    const fontColor = "black"; // Text color
    const boxShadowColor = "gray"; // Box shadow color

    // Set font size and text color
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

      // Loop through subitems and add them to the table of contents
      item.subitems.forEach((subitem, subindex) => {
        // Set the box shadow
        pdf.setDrawColor(boxShadowColor);
        pdf.setLineWidth(0.2);

        // Add text without background color
        pdf.text(`${subitem.subName}`, 25, 25 + index * 10 + subindex * 10);

        // Add text with formatting
      });
    });
  }

  return (
    <>
      <button onClick={exportCoverPageToPDF}>Save</button>
    </>
  );
};

export default Test;
