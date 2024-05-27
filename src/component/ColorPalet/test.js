let imageURL; // Declare imageURL outside of the if block
let imageIndex = 0; // Keep track of the current image index
const coverphotoImageData = JSON.parse(localStorage.getItem("coverphotoImage"));
console.log("coverphotoImageData", coverphotoImageData);
const damageDataString = localStorage.getItem("DamageData") || "{}";
console.log("damageDataString", damageDataString);
// const selectionDataString = localStorage.getItem("SelectionData");
// console.log("selectionDataString", selectionDataString);

if (coverphotoImageData && damageDataString) {
  try {
    pdf.addPage();
    addPageHeader();
    addPageBorder();
    addTableOfContents(pdf, JSON.parse(menuData));
    addPageBorder();
    addPageHeader();

    pdf.addPage();
    addPageBorder();
    const damageData = JSON.parse(damageDataString);
    const imageKeys = Object.keys(coverphotoImageData);

    function displayDamageData(damageObject, startY) {
      // Set initial Y position
      let currentY = startY;
      const lineSpacing = 5; // Fixed spacing between each text block

      // Display description
      const descriptionText = `Description: ${damageObject.description || ""}`;
      const descriptionLines = pdf.splitTextToSize(descriptionText, 180); // Adjust width as needed
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
      const materialsText = `Materials: ${damageObject.Damage1red || ""}`;
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
      const observationText = `Observation: ${damageObject.Damage1black || ""}`;
      const observationLines = pdf.splitTextToSize(observationText, 180); // Adjust width as needed
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
        coverphotoImageData[currentImageKey].forEach((imageData, imgIndex) => {
          let selectedSelectionData = [];
          // Check if subname or tabname has changed
          if (subName !== imageData.subnames || tabName !== imageData.NewTabs) {
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
              (pdf.getStringUnitWidth(imageData.subnames) * fontSize) /
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
                const subNames = subnameid.map((item) => item.subName);
                console.log("SubNames:", subNames);

                const ids = subnameid.map((item) => item.id);
                const subdetails = menuItem.subdetails;
                const subdetailKeys = Object.keys(subdetails);

                console.log("subdetails", subdetails);
                const keys = Object.values(subdetails).flatMap((obj) =>
                  Object.keys(obj)
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
              const uniqueSelectionData = [...new Set(selectedSelectionData)];
              const formattedSelectionData = uniqueSelectionData.join(", "); // Join unique SelectionData items with commas
              pdf.text(`Materials: ${formattedSelectionData}`, 10, 40); // Add formattedSelectionData to the PDF
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
          const lines = pdf.splitTextToSize(imageData.caption, maxCaptionWidth);
          const captionHeight = lines.length - 5;

          // Add caption
          pdf.text(startX + 17, startY + 5 - captionHeight, lines);

          // Move to the next position
          startX += imageWidth + 10; // Add some padding between images

          // Check if the images exceed the page width
          if (startX + imageWidth > pdf.internal.pageSize.width - 10) {
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
        });
      } else {
        console.warn(`No image data found for key: ${currentImageKey}`);
      }
    });

    pdf.addPage();

    addPageBorder();
    addPageHeader();
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Report Summary", 80, 30);

    addSummaryTable(pdf, JSON.parse(menuData));
    addPageBorder();
    addPageHeader();
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 2; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(15);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Page ${i - 1} of ${pageCount - 1}`, 178, 293);
    }
    // Save the PDF
    pdf.save("Report.pdf");

    console.log("PDF generated successfully.");
  } catch (error) {
    console.error("Error parsing DamageData:", error);
  }
} else {
  console.warn("DamageData or coverphotoImage not found in local storage.");
  pdf.save("Report.pdf");
}
