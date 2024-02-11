import React, { useRef, useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import openimg from "../../Assets/icons/open_inspection.png";
import cutimg from "../../Assets/icons/cutpasteicon.png";
import copyimg from "../../Assets/icons/copy.png";
import pasteimg from "../../Assets/icons/paste.png";
import undoimg from "../../Assets/icons/edit-undo-rtl.svg";
import redoimg from "../../Assets/icons/edit-undo.svg";
import findimg from "../../Assets/icons/generate_report.png";
import boldimg from "../../Assets/icons/boldimg.png";
import italicimg from "../../Assets/icons/italic-font.png";
const ContractPage = () => {
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [highlightOpacity, setHighlightOpacity] = useState(1);
  const [text, setText] =
    useState(`NOTE: THIS IS A SAMPLE CONTRACT. DO NOT USE THIS CONTRACT WITHOUT HAVING AN ATTORNEY LOOK IT OVER. WE ARE NOT LIABLE IF YOU HAVE ANY PROBLEMS WITH IT.

    TERMS AND CONDITIONS 
    THIS CONTRACT LIMITS LIABILITY
    
    It is agreed by all that this inspection is to be performed according to the following terms and conditions:
    
    1. $CompanyName will provide the Client a limited - time visual inspection of the following readily accessible and visible pertinent, major elements existing in the structure on the date of inspection: central air conditioning, central heating, interior electric, interior plumbing, foundation, basement, roofing, siding, walls, floors, ceilings, and built -in kitchen appliances.$CompanyName shall have no obligation to repair or replace any items found to be defective, whether or not discussed in the $CompanyName written report.Conditions that may exist relating to any legal and / or public records are outside the scope of this inspection.$CompanyName cannot determine during the inspection that the roof leaks or is watertight; the rating is on material condition only.Further, this inspection does not cover code compliance, soil or groundwater contamination, geological, design, adequacy evaluation, or any low voltage wiring.$CompanyName reserves a 5 % margin or tolerance.This inspection will include the above elements unless otherwise restricted by the client.At times, conditions may exist and may not have any visible signs to indicate its existence.Such items must be disclosed by the seller of the property.$CompanyName recommends that Client seek the advice of his legal counsel and / or real estate agent to identify items subject to disclosure in additions to those set forth in $CompanyName written inspection report.$CompanyName inspections are performed with consideration given to the age of the structure, items marked good must in all cases be considered good for the age of the item.Also, items in less than good condition must be marked as such, even though the condition may be normal for the age.Opinions vary from person to person and the report is the opinion of the inspector and must be considered as such.This report is not a mold or hazardous materials inspection.
    
    2. Payment of the fee entitles client to one original of the written inspection report including photographs.Payment, in check, cash, or credit card, is due prior to the start of the visual inspection.The liability of $CompanyName is limited to the terms and conditions as set forth in this contract between $CompanyName and the Client.Client expressly releases $CompanyName from any and all claims arising out of the contract.
    
    3. Client represents and assures $CompanyName that Client has secured all approvals necessary for entry onto the premises to be inspected.Client further agrees to defend, indemnify and hold harmless $CompanyName from demands or claims alleging a trespass upon the premises to be inspected.It is the responsibility of the Client or Agent to ensure the utilities are on at the time of inspection.$CompanyName recommends checking for permits on all additional construction performed on the property after the original construction.
    
    4. This Order Form, with its terms, conditions and disclosures, constitutes the entire agreement between $CompanyName and Client.Both parties agree that there is no representation, statement or agreement not set forth herein or incorporated by reference.No waiver, alteration of modification of this contract shall be valid unless it is in writing and signed by an authorized representative of both parties.This contract shall be construed and governed by the laws of the State of California.For all areas marked outside of good condition, $CompanyName recommends proper attention by the appropriate licensed contractor.
    
    5. $CompanyName has no liability for occupied / unoccupied homes and structures, and the inspection is only good until the inspector leaves the property.Disgruntled sellers / squatters often change the condition of the property and no guarantees will be made by $CompanyName
    
    6. I have read the Terms and Conditions of this inspection and accept them, and also accept the Waiver Conditions.
    
    7. I have full authority to execute this contract.I fully understand the fact that only the original buyer on this contract shall be entitled to the information contained in the inspection report / contract.
    
    8. Client shall be liable for $CompanyName attorney's fees in the event of litigation. Any negative comments/actions reflected on/towards $CompanyName shall be grounds for a slander-suit for defamation of character in Superior Court. The defamation of character suit shall be filed against the instigator of said comments/actions.
    
    9. I have read and understand the terms and conditions of this contract as set forth on the front of this form.I fully understand that if there is no signature on the line below, this inspection report shall be null and void.
    
    NOTE: THIS IS A SAMPLE CONTRACT.DO NOT USE THIS CONTRACT WITHOUT HAVING AN ATTORNEY LOOK IT OVER.WE ARE NOT LIABLE IF YOU HAVE ANY PROBLEMS WITH IT.`);

  const [copiedMessage, setCopiedMessage] = useState("");
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showFindPopup, setShowFindPopup] = useState(false);
  const [findText, setFindText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [startAtTop, setStartAtTop] = useState(false);

  const handleFind = () => {
    setShowFindPopup(true);
  };

  const handleFindClose = () => {
    setShowFindPopup(false);
  };

  const handleFindTextChange = (e) => {
    setFindText(e.target.value);
  };

  const handleCaseSensitiveChange = () => {
    setCaseSensitive(!caseSensitive);
  };

  const handleStartAtTopChange = () => {
    setStartAtTop(!startAtTop);
  };

  const handleFindSubmit = () => {
    // Implement your logic for finding text
    // You can use the values of findText, caseSensitive, and startAtTop
    // to perform the find operation
    // ...

    // Close the Find popup after finding
    setShowFindPopup(false);
  };

  useEffect(() => {
    // Set the predefined text when the component mounts
    textAreaRef.current.value = text;
  }, [text]);

  const handleOpenClick = () => {
    fileInputRef.current.click();
  };

  const handleCut = () => {
    // Get selected text
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart,
      textAreaRef.current.selectionEnd
    );

    // Copy selected text to clipboard
    navigator.clipboard.writeText(selectedText);

    // Remove selected text from textarea
    setText(
      textAreaRef.current.value.slice(0, textAreaRef.current.selectionStart) +
        textAreaRef.current.value.slice(textAreaRef.current.selectionEnd)
    );

    setCopiedMessage("Text Cut!");
    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };

  const handleCopy = () => {
    // Get selected text
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart,
      textAreaRef.current.selectionEnd
    );

    // Copy selected text to clipboard
    navigator.clipboard.writeText(selectedText);

    setCopiedMessage("Text Copied!");
    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };

  const handlePaste = async () => {
    // Get clipboard text
    const clipboardText = await navigator.clipboard.readText();

    // Insert clipboard text at the cursor position
    setText(
      textAreaRef.current.value.slice(0, textAreaRef.current.selectionStart) +
        clipboardText +
        textAreaRef.current.value.slice(textAreaRef.current.selectionEnd)
    );
  };

  const handleUndo = () => {
    document.execCommand("undo");
  };

  const handleRedo = () => {
    document.execCommand("redo");
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleBoldChange = () => {
    setIsBold(!isBold);
  };

  const handleItalicChange = () => {
    setIsItalic(!isItalic);
  };

  const handleHighlightChange = () => {
    setIsHighlighted(!isHighlighted);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleHighlightColorChange = (event) => {
    setHighlightColor(event.target.value);
  };

  const handleHighlightOpacityChange = (event) => {
    setHighlightOpacity(event.target.value);
  };

  const handleFileChange = (event) => {
    // Handle file change as needed
    console.log("Selected file:", event.target.files[0]);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div
        style={{ display: "flex", height: "77vh", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            border: "3px solid  rgb(229, 229, 229)",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #ccc",
              backgroundColor: "rgb(229, 229, 229)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                alignItems: "center",
              }}
            >
              <p onClick={handleOpenClick} className="cursor-pointer">
                <img src={openimg} alt="" srcset="" />
              </p>
              <p
                onClick={handleCut}
                className="cursor-pointer"
                style={{ height: "20px", width: "20px" }}
              >
                <img src={cutimg} alt="" srcset="" />
              </p>
              <p onClick={handleCopy} className="cursor-pointer">
                <img src={copyimg} alt="" srcset="" />
              </p>
              <p onClick={handlePaste} className="cursor-pointer">
                <img src={pasteimg} alt="" srcset="" />
              </p>
              <p
                onClick={handleUndo}
                className="cursor-pointer"
                style={{ height: "27px", width: "27px" }}
              >
                <img src={undoimg} alt="" srcset="" />
              </p>
              <p
                onClick={handleRedo}
                className="cursor-pointer"
                style={{ height: "27px", width: "27px" }}
              >
                <img src={redoimg} alt="" srcset="" />
              </p>
              <p onClick={handleFind} className="cursor-pointer">
                <img src={findimg} alt="" srcset="" />
              </p>
              {/* Find popup */}
              {showFindPopup && (
                <div>
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "0",
                      backgroundColor: "rgb(242, 236, 236)",
                      border: "1px solid #ccc",
                      zIndex: "999",
                    }}
                  >
                    <div className="flex justify-between px-4 py-1">
                      <div className="text-sm">Search</div>
                      <div className="hover:bg-red-700 cursor-pointer">
                        <p className="px-1" onClick={handleFindClose}>
                          X
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-2">
                      <div>
                        <label
                          style={{ display: "block", marginBottom: "10px" }}
                        >
                          Find
                        </label>
                      </div>
                      <div>
                        {" "}
                        <input
                          type="text"
                          value={findText}
                          onChange={handleFindTextChange}
                          style={{ border: "1px solid skyblue" }}
                        />
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <div>
                          <label
                            style={{ marginRight: "10px", paddingTop: "10px" }}
                          >
                            <input
                              type="checkbox"
                              checked={caseSensitive}
                              onChange={handleCaseSensitiveChange}
                            />
                            Case Sensitive
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              checked={startAtTop}
                              onChange={handleStartAtTopChange}
                            />
                            Start at Top
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button onClick={handleFindSubmit} className="p-1 mr-2">
                          Accept
                        </button>
                        <button onClick={handleFindClose} className="p-1">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <p
                onClick={handleBoldChange}
                style={{ fontWeight: isBold ? "bold" : "normal" }}
                className="cursor-pointer"
              >
                <img
                  src={boldimg}
                  alt=""
                  srcset=""
                  style={{ height: "20px", width: "20px" }}
                />
              </p>
              <p
                onClick={handleItalicChange}
                style={{ fontStyle: isItalic ? "italic" : "normal" }}
                className="cursor-pointer"
              >
                <img
                  src={italicimg}
                  alt=""
                  srcset=""
                  style={{ height: "20px", width: "20px" }}
                />
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px" }}>
              <select
                value={font}
                onChange={handleFontChange}
                className="border"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', Times, serif">
                  Times New Roman
                </option>
                {/* Add more font options as needed */}
              </select>
              <input
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="border ml-2"
                style={{ width: "127px" }}
              />
            </div>
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            {copiedMessage && (
              <div style={{ marginBottom: "10px", color: "green" }}>
                {copiedMessage}
              </div>
            )}
            <textarea
              ref={textAreaRef}
              style={{
                fontFamily: font,
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                width: "100%",
                height: "100%",
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-2"
            />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ContractPage;
