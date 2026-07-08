"use client";
import { useState, useEffect } from "react";

export default function Strategies({ strategiesList = [], headerData }) {
  const [activeTab, setActiveTab] = useState("chemical");
  const [activeSubTab, setActiveSubTab] = useState("");

  // Helper to dynamically assign icons regardless of what the admin names the tab
  const getIconForTab = (label) => {
    const lower = String(label).toLowerCase();
    if (lower.includes("chemical")) return "science";
    if (lower.includes("biological")) return "hourglass_empty";
    if (lower.includes("physical")) return "wash";
    if (lower.includes("minimum")) return "assignment_turned_in";
    return "science"; // default fallback icon
  };

  // Programmatically transform your flat post pool into your tab matrix structure
  const tabs = strategiesList.reduce((acc, currentPost) => {
    const fields = currentPost.controlStrategiesConnector;

    // 1. Extract the raw field
    let rawTab = fields?.mainTab;
    if (Array.isArray(rawTab)) rawTab = rawTab[0];

    // 2. WPGraphQL now returns the Label (e.g., "Minimum Risk Pesticides") directly!
    const tabLabel = rawTab || "Chemical";

    // 3. Create a safe, lower-cased grouping key (e.g., "Minimum Risk Pesticides" -> "minimum-risk-pesticides")
    const mainKey = String(tabLabel)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    if (!acc[mainKey]) {
      acc[mainKey] = {
        label: tabLabel, // Assigns the exact string from your ACF Choices!
        icon: getIconForTab(tabLabel),
        subTabs: {},
      };
    }

    const subKey = currentPost.databaseId.toString();
    acc[mainKey].subTabs[subKey] = {
      label: fields?.subTabLabel || currentPost.title,
      image: fields?.tabThumbnail?.node?.sourceUrl || "/biochemical.png",
      title: currentPost.title,
      learnMoreLink: fields?.learnMoreLink || "/learnMore",
      htmlBody: fields?.strategyDescription || "",
    };

    return acc;
  }, {});

  const hasData = Object.keys(tabs).length > 0;

  useEffect(() => {
    if (hasData && tabs[activeTab]?.subTabs) {
      const availableSubKeys = Object.keys(tabs[activeTab].subTabs);
      if (
        availableSubKeys.length > 0 &&
        !availableSubKeys.includes(activeSubTab)
      ) {
        setActiveSubTab(availableSubKeys[0]);
      }
    }
  }, [activeTab, hasData]);

  if (!hasData) {
    return (
      <div className="px-4 py-10 text-center text-gray-400 italic sm:px-10 lg:px-20">
        No control technologies configured yet. Check server terminal logs for
        validation info.
      </div>
    );
  }

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    const firstSubTabKey = Object.keys(tabs[tabKey].subTabs)[0];
    if (firstSubTabKey) {
      setActiveSubTab(firstSubTabKey);
    }
  };

  // Gracefully defaults to the first available dynamic key if the active state doesn't match
  const currentMainTab = tabs[activeTab] || Object.values(tabs)[0];
  const currentSubTabs = currentMainTab.subTabs;
  const currentContent =
    currentSubTabs[activeSubTab] || Object.values(currentSubTabs)[0];

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      <p className="text-sm font-bold text-green">
        {headerData?.label || "CONTROL STRATEGIES"}
      </p>
      <h2 className="mt-1 text-3xl font-bold text-black">
        {headerData?.title || "Types of HAB Control Technologies"}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-gray-600">
        {headerData?.description ||
          "Determining what type of product you have is key as each type has a different process for registration"}
      </p>

      <div className="mt-5 rounded-xl border border-gray-300 overflow-hidden">
        {/* Main Tabs */}
        <div className="bg-[#ecf8dc] flex flex-wrap text-gray-500 font-bold p-4 gap-2">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`p-4 rounded transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 flex-1 min-w-[140px] ${
                activeTab === key ||
                (!tabs[activeTab] && Object.keys(tabs)[0] === key)
                  ? "bg-[#4b710a] text-white"
                  : "text-gray-500 hover:bg-[#bed79c]"
              }`}
            >
              <svg
                className="usa-icon w-4 h-4"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href={`/assets/img/sprite.svg#${tab.icon}`}></use>
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub Tabs */}
        <div className="bg-primary-lighter text-gray-500 font-bold p-3 flex flex-wrap gap-2">
          {Object.entries(currentSubTabs).map(([key, subTab]) => (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`rounded py-2 px-3 font-bold transition-all duration-300 cursor-pointer flex-1 text-center min-w-[120px] ${
                activeSubTab === key
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-[#bed6e8]"
              }`}
            >
              {subTab.label}
            </button>
          ))}
        </div>

        {/* Selected Data Viewport */}
        {currentContent && (
          <div className="bg-white text-black p-6 border-t border-gray-300">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={currentContent.image}
                alt=""
                className="w-60 h-60 object-contain shrink-0 mx-auto md:mx-0 mt-2"
              />
              <div className="flex flex-col justify-between min-h-[15rem] w-full">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-black">
                    {currentContent.title}
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentContent.htmlBody,
                    }}
                    className="space-y-4 pr-1 max-h-64 overflow-y-auto text-gray-800 leading-relaxed font-light dynamic-wysiwyg-content"
                  />
                </div>

                <a href={currentContent.learnMoreLink} className="mt-6 block">
                  <button className="usa-button bg-primary flex items-center gap-1">
                    Learn More
                    <svg
                      className="usa-icon w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    >
                      <use href="/assets/img/sprite.svg#arrow_forward"></use>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
