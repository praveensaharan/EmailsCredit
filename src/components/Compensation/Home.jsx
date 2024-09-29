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
    <div className="min-h-screen flex flex-col mt-20">
      {/* Navbar */}
      <div>
        <div className="container mx-auto flex justify-center items-center p-4">
          <button
            type="button"
            onClick={() => setActiveTab("All")}
            className={`${
              activeTab === "All"
                ? "bg-orange-400 text-white"
                : "bg-white text-customBlue border-teal-500 hover:bg-slate-300"
            } w-1/2 max-w-xs mx-2 font-semibold py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Iit")}
            className={`${
              activeTab === "Iit"
                ? "bg-orange-400 text-white"
                : "bg-white text-customBlue border-teal-500 hover:bg-slate-300"
            } w-1/2 max-w-xs mx-2 font-semibold py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            IIT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Leetcode")}
            className={`${
              activeTab === "Leetcode"
                ? "bg-orange-400 text-white"
                : "bg-white text-customBlue border-teal-500 hover:bg-slate-300"
            } w-1/2 max-w-xs mx-2 font-semibold py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            Leetcode
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-6 bg-white rounded-lg shadow-md">
        {renderContent()}
      </div>

      {/* Insights component always visible at the bottom */}
      <div className="mt-8">
        <Insights />
      </div>
    </div>
  );
};

export default Home;
