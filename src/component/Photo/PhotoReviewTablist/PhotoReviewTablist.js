import React, { useState } from "react";
// import PhotoReview from "../PhotoReview";
import Location from "../Location";
import Header from "../../Header/Header";
import Footer from "./../../Footer/Footer";
import "./PhotoReviewTablist.css";

function PhotoReviewTablist() {
  const [tabs, setTabs] = useState([
    { id: "tab1", name: "Tab 1", content: <Location /> },
    { id: "tab2", name: "Tab 2", content: <Location /> },
    { id: "tab3", name: "Tab 3", content: <Location /> },
    { id: "tab4", name: "Tab 4", content: <Location /> },
    { id: "tab5", name: "Tab 5", content: <Location /> },
  ]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNewTabClick = () => {
    const newTabId = `tab${tabs.length + 1}`;
    const newTabName = `Tab ${tabs.length + 1}`;
    const newTabContent = <Location />;
    const newTabs = [
      ...tabs,
      { id: newTabId, name: newTabName, content: newTabContent },
    ];
    setTabs(newTabs);
    setActiveTab(newTabId);
  };

  return (
    <>
      <Header />
      <div className="Tablist-to-open-new-EditImageTabList">
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
