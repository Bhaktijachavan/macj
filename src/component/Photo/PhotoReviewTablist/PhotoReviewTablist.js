import React, { useState, useRef } from "react";
import PhotoReview from "../PhotoReview";

import Header from "../../Header/Header";
import Footer from "./../../Footer/Footer";
import "./PhotoReviewTablist.css";

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
          onChange={handleFileChange}
          multiple
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
