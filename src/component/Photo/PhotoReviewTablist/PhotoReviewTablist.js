import React, { useState, useRef } from "react";
import PhotoReview from "../PhotoReview";

import Header from "../../Header/Header";
import Footer from "./../../Footer/Footer";
import "./PhotoReviewTablist.css";
import Buttons from "./../Buttons";

function PhotoReviewTablist() {
  const fileInputRef = useRef(null);

  const [tabs, setTabs] = useState([
    { id: "tab1", name: "Tab 1", content: <PhotoReview images={[]} /> },
  ]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNewTabClick = () => {
    const newTabId = `tab${tabs.length + 1}`;
    const newTabName = `Tab ${tabs.length + 1}`;
    const newTabContent = <PhotoReview images={[]} />;
    const newTabs = [
      ...tabs,
      { id: newTabId, name: newTabName, content: newTabContent },
    ];
    setTabs(newTabs);
    setActiveTab(newTabId);
  };
  const handleBulkImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click event on file input
    }
  };
  const handleClearBulkImport = () => {
    setTabs([
      { id: "tab1", name: "Tab 1", content: <PhotoReview images={[]} /> },
    ]);
    alert("Do you want to clear all photos");
    setActiveTab("tab1"); // Set active tab to the default tab
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files); // Convert FileList to array

      // Extract URLs from files
      const imageUrls = files.map((file) => URL.createObjectURL(file));

      // Calculate the number of tabs needed
      const numTabsToAdd = Math.ceil(imageUrls.length / 4);

      // Create new tabs if needed and distribute images across them
      let newTabs = [];
      for (let i = 0; i < numTabsToAdd; i++) {
        const newTabId = `tab${i + 1}`; // Ensure unique tab IDs
        const newTabName = `Tab ${i + 1}`;
        const start = i * 4;
        const end = Math.min((i + 1) * 4, imageUrls.length);
        const images = imageUrls.slice(start, end);
        const newTabContent = <PhotoReview key={newTabId} images={images} />;
        newTabs.push({
          id: newTabId,
          name: newTabName,
          content: newTabContent,
        });
      }

      // Set the new tabs and activate the first one
      setTabs(newTabs);
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <>
      <Header />
      <div className="Tablist-to-open-new-EditImageTabList">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
          webkitdirectory=""
          directory=""
        />

        <div className="tab1-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`tab1-container-buttons ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.name}
            </button>
          ))}
          <button
            onClick={handleNewTabClick}
            className="tab1-container-buttons"
          >
            New Tab
          </button>
        </div>
        <div className="flex items-start content-start mx-[10px] ">
          <div className=" grid gap-[5px] mt-1">
            <button
              className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[8em]"
              onClick={handleBulkImportClick}
            >
              Bulk Import
            </button>
            <button
              className="bg-gray-100 text-black border-2 border-gray-400 rounded px-[5px] hover:bg-[#d7e9f7] hover:border-[#005a9e] w-[8em]"
              onClick={handleClearBulkImport}
            >
              Clear Photos
            </button>
          </div>
          <p className="PhotoReview-Main-Para">
            The photo added to the top-left box will appear on the cover of the
            report <br />
            The drop-down boxes are automatically preloaded with the sectors
            from The photo added to the top left box will appear on the cover of
            the the current template. The photo will print in the location
            specified using both drop-down boxes, unless you check "Print At
            End" for a photo.
            <br />
            The caption will be placed under each photo unless you check the
            'Use Location As Caption' button check the 'Summary' box to include
            the photo in the Report Summary in addition to the report body.
          </p>
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="tab"
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default PhotoReviewTablist;
