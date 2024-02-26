import React, { useState } from "react";
import PhotoReview from "../PhotoReview";
import Header from "../../Header/Header";
import Footer from "./../../Footer/Footer";
import "./PhotoReviewTablist.css";

function PhotoReviewTablist() {
  const [tabs, setTabs] = useState([
    { id: "tab1", name: "Tab 1", content: <PhotoReview /> },
    { id: "tab2", name: "Tab 2", content: <PhotoReview /> },
    { id: "tab3", name: "Tab 3", content: <PhotoReview /> },
    { id: "tab4", name: "Tab 4", content: <PhotoReview /> },
    { id: "tab5", name: "Tab 5", content: <PhotoReview /> },
  ]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNewTabClick = () => {
    const newTabId = `tab${tabs.length + 1}`;
    const newTabName = `Tab ${tabs.length + 1}`;
    const newTabContent = <PhotoReview />;
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
            <button key={tab.id} onClick={() => handleTabClick(tab.id)}>
              {tab.name}
            </button>
          ))}
          <button onClick={handleNewTabClick}>New Tab</button>
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="tab"
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            <div className="opened-tab-for-tablist">
              <h2 className="opened-tab-for-tablist-name">{tab.name} Opened</h2>
            </div>

            {tab.content}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default PhotoReviewTablist;
