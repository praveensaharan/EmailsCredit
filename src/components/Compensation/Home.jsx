import React, { useState } from "react";
import All from "./All";
import Iit from "./Iit";
import Insights from "./Insights";
import Leetcode from "./Leetcode";

const Home = () => {
  // State to keep track of the currently selected tab
  const [activeTab, setActiveTab] = useState("All");

  // Function to render the selected component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "All":
        return <All />;
      case "Iit":
        return <Iit />;
      case "Leetcode":
        return <Leetcode />;
      default:
        return <All />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Buttons for switching between tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("All")}
          className={`px-4 py-2 font-semibold rounded-lg transition-all duration-150 ${
            activeTab === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("Iit")}
          className={`px-4 py-2 font-semibold rounded-lg transition-all duration-150 ${
            activeTab === "Iit" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          IIT
        </button>
        <button
          onClick={() => setActiveTab("Leetcode")}
          className={`px-4 py-2 font-semibold rounded-lg transition-all duration-150 ${
            activeTab === "Leetcode" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Leetcode
        </button>
      </div>

      {/* Rendering the content based on the active tab */}
      <div>{renderContent()}</div>

      {/* Insights component always visible at the bottom */}
      <div className="mt-8">
        <Insights />
      </div>
    </div>
  );
};

export default Home;
