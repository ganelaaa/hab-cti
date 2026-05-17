"use client";
import { useState } from "react";

export default function RegulationsDirectory() {
  const [activeTab, setActiveTab] = useState("Federal");
  const [activeFederalTab, setActiveFederalTab] = useState("State");

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Laws and Permits</span>
        <span>›</span>
        <span className="text-gray-800">Regulations Directory</span>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-primary font-bold">
          Regulatory Agencies Directory
        </h1>
        <p>Something about the regulations directory</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-row justify-center gap-10 mb-8">
        <button
          onClick={() => setActiveTab("Federal")}
          className={`pb-2 text-sm font-bold transition-colors duration-200 cursor-pointer ${
            activeTab === "federal"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          Federal
        </button>
        <button
          onClick={() => setActiveTab("State")}
          className={`pb-2 text-sm font-bold transition-colors duration-200 cursor-pointer ${
            activeTab === "state"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          State
        </button>
      </div>

      {/* Federal Tab */}

      {/* State Tab */}
    </div>
  );
}
