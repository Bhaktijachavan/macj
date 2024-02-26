import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import CoverPageDesigner from "../CoverPageDesigner/CoverPageDesigner";

const GenerateReport = () => {
  const coverPageRef = useRef(null);

  const handleClosePdf = () => {
    // Retrieve the content from localStorage
    const content = localStorage.getItem("outputContent");

    if (content) {
      // Convert the HTML content to a PDF document
      html2pdf()
        .from(content)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          // Download the PDF file
          pdf.save("updated_output.pdf");
        });
    } else {
      // Handle case where content is not found in localStorage
      console.log("No content found in localStorage");
    }

    // Close the page or perform other necessary actions
  };

  const exportCoverPageToPDF = () => {
    if (coverPageRef.current) {
      const outputContainer = coverPageRef.current;

      html2canvas(outputContainer).then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const contentHeight = (canvas.height * 210) / canvas.width;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          210,
          contentHeight
        );
        pdf.save("cover_page_layout.pdf");
      });
    }
  };

  const generatePDF2 = async () => {
    const content = document.getElementById("pdf-content");

    // Move off-screen with CSS
    content.style.position = "absolute";
    content.style.left = "-9999px";

    const canvasHome = await html2canvas(
      content.querySelector("#coverpage-content")
    );
    const canvasAboutUs = await html2canvas(
      content.querySelector("#aboutus-content")
    );

    // Reset the styles after capturing the content
    content.style.position = "static";
    content.style.left = "auto";

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Calculate scaling factors based on content dimensions
    const scaleHome = pageWidth / canvasHome.width;
    const scaleAboutUs = pageWidth / canvasAboutUs.width;

    // Add Home page
    pdf.addImage(
      canvasHome.toDataURL("image/png"),
      "PNG",
      10,
      10,
      pageWidth - 20,
      canvasHome.height * scaleHome
    );
    pdf.addPage();

    // Add AboutUs page
    pdf.addImage(
      canvasAboutUs.toDataURL("image/png"),
      "png",
      10,
      10,
      pageWidth - 20,
      canvasAboutUs.height * scaleAboutUs
    );
    exportCoverPageToPDF();

    pdf.save("generated_report.pdf");
  };

  useEffect(() => {
    getDataLocal();
  }, []);

  const getDataLocal = () => {
    const data = localStorage.getItem("menuData");
    const reportData = JSON.parse(data);
    console.log("report data ", reportData);
  };

  // const generatePDF = async () => {
  //   const data = localStorage.getItem("menuData");
  //   const reportData = JSON.parse(data);
  //   console.log("report data ", reportData);

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   let yPos = 10; // Initial y position for content

  //   // Iterate over main keys
  //   Object.keys(reportData).forEach((mainKey) => {
  //     const mainData = reportData[mainKey];
  //     // Add main key details to PDF
  //     pdf.text(`Name: ${mainData.name}`, 10, yPos);
  //     yPos += 10; // Increment y position
  //     // Add main key data to PDF
  //     pdf.text(`Main Key: ${mainKey}`, 10, yPos);
  //     yPos += 10; // Increment y position

  //     // Iterate over subdetails
  //     Object.keys(mainData.subdetails).forEach((subKey) => {
  //       const subDetail = mainData.subdetails[subKey];

  //       // Add subdetail to PDF
  //       pdf.text(`Subdetail ${subKey}:`, 10, yPos);
  //       yPos += 5; // Increment y position

  //       // Add subdetail data to PDF
  //       Object.keys(subDetail).forEach((key) => {
  //         const value = subDetail[key];
  //         if (typeof value === "object") {
  //           // If the value is an object, stringify it
  //           pdf.text(`${key}: ${JSON.stringify(value)}`, 15, yPos);
  //         } else {
  //           pdf.text(`${key}: ${value}`, 15, yPos);
  //         }
  //         yPos += 10; // Increment y position
  //       });
  //     });

  //     // If subitems exist for the main key
  //     if (mainData.subitems) {
  //       Object.keys(mainData.subitems).forEach((itemKey) => {
  //         const subItems = mainData.subitems[itemKey];

  //         // Add subdetail to PDF
  //         pdf.text(`Subdetail ${itemKey}:`, 10, yPos);
  //         yPos += 10; // Increment y position

  //         // Add subdetail data to PDF
  //         Object.keys(subItems).forEach((key) => {
  //           const value = subItems[key];
  //           if (typeof value === "object") {
  //             // If the value is an object, stringify it
  //             pdf.text(`${key}: ${JSON.stringify(value)}`, 15, yPos);
  //           } else {
  //             pdf.text(`${key}: ${value}`, 15, yPos);
  //           }
  //           yPos += 10; // Increment y position
  //         });
  //       });
  //     }

  //     yPos += 10; // Add some spacing between main keys
  //     pdf.addPage();
  //   });

  //   // Save the PDF file
  //   pdf.save("generated_report.pdf");
  // };
  const generatePDF = async () => {
    const data = localStorage.getItem("menuData");
    const reportData = JSON.parse(data);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Initial y position for content
    let yPos = 10;

    // Iterate over main keys
    Object.keys(reportData).forEach((mainKey, index) => {
      const mainData = reportData[mainKey];

      // Save current font size
      const currentFontSize = pdf.internal.getFontSize();
      // Add Name at the top
      pdf.setFontSize(30); // Adjust the font size here as needed

      pdf.text(`${mainData.name}`, 10, yPos);
      yPos += 10; // Increment y position
      // Restore previous font size
      pdf.setFontSize(currentFontSize);

      // Add main key data to PDF
      pdf.text(`${mainKey}`, 10, yPos);
      yPos += 10; // Increment y position

      // Iterate over subdetails
      // Object.keys(mainData.subdetails).forEach((subKey) => {
      //   const subDetail = mainData.subdetails[subKey];

      //   // Add subdetail to PDF
      //   pdf.text(`Subdetail ${subKey}:`, 10, yPos);
      //   yPos += 5; // Increment y position

      //   // Add subdetail data to PDF
      //   Object.keys(subDetail).forEach((key) => {
      //     const value = subDetail[key];
      //     if (typeof value === "object") {
      //       // If the value is an object, stringify it
      //       pdf.text(`${key}: ${JSON.stringify(value)}`, 15, yPos);
      //     } else {
      //       pdf.text(`${key}: ${value}`, 15, yPos);
      //     }
      //     yPos += 5; // Increment y position
      //   });
      // });
      Object.keys(mainData.subdetails).forEach((subKey) => {
        const subDetail = mainData.subdetails[subKey];

        // Add subdetail to PDF
        pdf.text(`Subdetail ${subKey}:`, 10, yPos);
        yPos += 5; // Increment y position

        // Add subdetail data to PDF
        Object.keys(subDetail).forEach((key) => {
          const value = subDetail[key];
          if (typeof value === "object") {
            // If the value is an object, stringify it with pretty-print option
            const formattedValue = JSON.stringify(value, null, 2).split("\n"); // Pretty-print with 2-space indentation
            pdf.text(`${key}:`, 15, yPos);
            yPos += 5; // Increment y position

            // Print each line of the formatted JSON object
            formattedValue.forEach((line) => {
              pdf.text(line, 20, yPos);
              yPos += 5; // Increment y position
            });
            yPos += 5; // Add extra spacing after the JSON object
          } else {
            pdf.text(`${key}: ${value}`, 15, yPos);
            yPos += 5; // Increment y position
          }
        });
      });

      // If subitems exist for the main key
      // if (mainData.subitems) {
      //   Object.keys(mainData.subitems).forEach((itemKey) => {
      //     const subItems = mainData.subitems[itemKey];

      //     // Add subdetail to PDF
      //     pdf.text(`Subdetail ${itemKey}:`, 5, yPos);
      //     yPos += 5; // Increment y position

      //     // Add subdetail data to PDF
      //     Object.keys(subItems).forEach((key) => {
      //       const value = subItems[key];
      //       if (typeof value === "object") {
      //         // If the value is an object, stringify it
      //         pdf.text(`${key}: ${JSON.stringify(value)}`, 15, yPos);
      //       } else {
      //         pdf.text(`${key}: ${value}`, 15, yPos);
      //       }
      //       yPos += 5; // Increment y position
      //     });
      //   });
      // }
      // If subitems exist for the main key
      if (mainData.subitems) {
        Object.keys(mainData.subitems).forEach((itemKey) => {
          const subItems = mainData.subitems[itemKey];

          // Add subdetail to PDF
          pdf.text(`Subdetail ${itemKey}:`, 5, yPos);
          yPos += 5; // Increment y position

          // Add subdetail data to PDF
          Object.entries(subItems).forEach(([key, value]) => {
            if (typeof value === "object") {
              // If the value is an object, iterate over its properties
              pdf.text(`${key}:`, 15, yPos);
              Object.entries(value).forEach(([subKey, subValue]) => {
                pdf.text(`${subKey}: ${subValue}`, 20, yPos);
                yPos += 5; // Increment y position for each subproperty
              });
            } else {
              pdf.text(`${key}: ${value}`, 15, yPos);
            }
            yPos += 5; // Increment y position for each property
          });
        });
      }

      yPos += 10; // Add some spacing between main keys

      // Add a new page if there are more main keys
      if (index < Object.keys(reportData).length - 1) {
        pdf.addPage();
        yPos = 10; // Reset yPos for new page
      }
    });

    // Save the PDF file
    pdf.save("generated_report.pdf");
  };

  return (
    <div>
      <div id="pdf-content">
        <div
          id="pdf-content-home"
          style={{ position: "absolute", left: "-9999px" }}
        >
          <CoverPageDesigner />
        </div>
      </div>
      <div>
        <div>This is Generate report page</div>
        <div>
          <button onClick={generatePDF}>Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
