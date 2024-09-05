import React from "react";
import { Button } from "antd";
import { Canvas } from "@react-three/fiber";
import FloatingPlane from "./FloatingPlane";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-teal-600 text-white py-20 px-5 text-center mt-16 overflow-hidden">
      <div className="relative">
        <h1 className="text-6xl font-extrabold mb-6 text-shadow-lg drop-shadow-xl">
          Revolutionize Your Email Outreach!
        </h1>
        <p className="text-xl font-medium mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Effortlessly connect with the right contacts, accelerate your hiring
          process, and boost your referrals with our cutting-edge email service.
        </p>
        <Button
          type="primary"
          size="large"
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          Get Started for Free
        </Button>
      </div>
      <div className="relative z-20">
        <Canvas className="absolute inset-0 w-full h-full pointer-events-none">
          <ambientLight intensity={0.8} />
          <spotLight position={[15, 20, 5]} angle={0.3} intensity={1.5} />
          <FloatingPlane />
        </Canvas>
      </div>

      {/* Adding some particles for extra flair */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          pointer-events: none;
          animation: float 5s ease-in-out infinite;
        }

        .particle-1 {
          width: 150px;
          height: 150px;
          top: 10%;
          left: 30%;
          animation-duration: 7s;
        }

        .particle-2 {
          width: 100px;
          height: 100px;
          top: 50%;
          left: 70%;
          animation-duration: 10s;
        }

        .particle-3 {
          width: 120px;
          height: 120px;
          top: 75%;
          left: 40%;
          animation-duration: 8s;
        }

        .particle-4 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 80%;
          animation-duration: 12s;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
