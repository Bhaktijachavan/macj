import React from "react";
import html2pdf from "html2pdf.js";

const Generatepdffile = () => {
  const handleClose = () => {
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
  return (
    <div>
      <button onClick={handleClose}>Generate Report</button>
    </div>
  );
};

export default Generatepdffile;
