import React from "react";
import FloatingPlane from "./FloatingPlane";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="relative text-center mt-16 overflow-hidden">
      <div className="relative">
        <FloatingPlane />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </div>
  );
};

export default HeroSection;
