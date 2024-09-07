import React from "react";
import FloatingPlane from "./FloatingPlane";
import "./HeroSection.css";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative text-center mt-16 overflow-hidden">
      <div className="relative">
        <FloatingPlane />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <BackgroundShapes />
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </div>
  );
};

export default HeroSection;

function BackgroundShapes() {
  return (
    <>
      <motion.div
        className="absolute left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
        animate={{
          scale: [2, 3, 3, 2, 2],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute right-0 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
        animate={{
          scale: [2, 3, 3, 2, 2],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute left-0 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
        animate={{
          scale: [2, 3, 3, 2, 2],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </>
  );
}
