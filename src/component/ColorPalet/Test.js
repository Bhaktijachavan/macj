import React from "react";
import html2pdf from "html2pdf.js";

const Test = () => {



  const exportCoverPageToPDF = async () => {
    try {
        // Retrieve the content from localStorage saved by CoverPageDesigner
        const content = localStorage.getItem("outputContent");
        const menuData = localStorage.getItem("menuData");

        if (!content || !menuData) {
            console.error("Missing required data in localStorage.");
            return;
        }

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

        const pdf = await html2pdf().from(modifiedContent).toPdf().get("pdf");

        // Add third page for Table of Contents
        pdf.addPage();
        pdf.text("Table of Contents", 10, 10);
        // Add table for Table of Contents
        addTableOfContents(pdf, JSON.parse(menuData));

        // Page for tab name
        pdf.addPage();
        pdf.text("TabName", 10, 10);

        const damageDataStrings = localStorage.getItem("DamageData");
        const damageData = JSON.parse(damageDataStrings || "{}");
        const menuDataa = JSON.parse(localStorage.getItem("menuData") || "{}");

        for (const key in menuDataa) {
            const menuItem = menuDataa[key];
            const subdetails = menuItem.subdetails;

            if (subdetails) {
                for (const subdetailKey in subdetails) {
                  const subdetailValue = subdetails[subdetailKey];
                  for (const abc in subdetailValue){
                    const tabvalue = [subdetailValue[abc].tabname]
                    console.log("vedant", tabvalue);
                        const damageValue = damageData[subdetailValue[abc].Damage1Data];
                        if (damageValue && damageValue.Damage1red) {
                            pdf.addPage();
                            pdf.setFontSize(18);
                            pdf.setTextColor(255, 0, 0); // Red color
                            pdf.text("Damage1red Data", 10, 20);
                            pdf.setTextColor(0, 0, 0); // Reset text color to black
                            pdf.setFontSize(12);
                            pdf.text(tabvalue, 10, 40);
                            pdf.text(damageValue.Damage1red, 10, 60);
                            console.log("DamageValue" , damageValue)
                            console.log("subdetailValue" , subdetailValue) ;
                        }
                    }
                }
            }
        }


        // Add images
        const coverphotoImageData = JSON.parse(localStorage.getItem("coverphotoImage") || "{}");
        if (coverphotoImageData) {
            const imageKeys = Object.keys(coverphotoImageData);

            function addImageToPDF(index, imgIndex) {
                if (index < imageKeys.length) {
                    const img = new Image();
                    const currentImageKey = imageKeys[index];
                    const currentImageData = coverphotoImageData[currentImageKey];

                    if (imgIndex < currentImageData.length) {
                        img.onload = function () {
                            const x = (imgIndex % 2) * 100 + 20;
                            const y = Math.floor(imgIndex / 2) * 80 + 50;

                            pdf.addImage(this, "JPEG", x, y, 80, 60);
                            pdf.text(currentImageData[imgIndex].caption, x, y + 70);

                            if (imgIndex === currentImageData.length - 1) {
                                if (index < imageKeys.length - 1) {
                                    pdf.addPage();
                                }
                                addImageToPDF(index + 1, 0);
                            } else {
                                addImageToPDF(index, imgIndex + 1);
                            }
                        };

                        img.src = currentImageData[imgIndex].url;
                    } else {
                        if (index < imageKeys.length - 1) {
                            pdf.addPage();
                        }
                        addImageToPDF(index + 1, 0);
                    }
                } else {
                    pdf.save("image_and_summary.pdf");
                }
            }

            pdf.addPage();
            pdf.setFontSize(16);
            pdf.text("Title for the Image", 10, 20);
            addImageToPDF(0, 0);
        } else {
            console.error("No image data found in local storage.");
        }
    } catch (error) {
        console.error("Error exporting PDF:", error);
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
