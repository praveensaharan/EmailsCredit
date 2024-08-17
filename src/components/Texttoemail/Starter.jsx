import React, { useState } from "react";
import { Button } from "antd";
import Home from "./Home";
import Result from "./Result";

const Starter = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Navbar */}
      <div className="">
        <div className="container mx-auto flex justify-center items-center p-4">
          <button
            type="default"
            onClick={() => handleNavigation("home")}
            className={`${
              activeComponent === "home"
                ? "bg-orange-400 text-white"
                : "bg-white text-customBlue border-teal-500 hover:bg-slate-300"
            } w-1/2 max-w-xs mx-2 font-semibold py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            Add Emails
          </button>
          <button
            type="default"
            onClick={() => handleNavigation("result")}
            className={`${
              activeComponent === "result"
                ? "bg-orange-400 text-white"
                : "bg-white text-customBlue border-teal-500 hover:bg-slate-300"
            } w-1/2 max-w-xs mx-2 font-semibold py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            Edit Emails
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-6">
        {activeComponent === "home" ? <Home /> : <Result />}
      </div>
    </div>
  );
};

export default Starter;
