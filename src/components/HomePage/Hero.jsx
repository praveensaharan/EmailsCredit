import React from "react";
import { Button } from "antd";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-teal-500 text-white py-20 px-5 text-center">
      <h1 className="text-5xl font-bold mb-4">
        Revolutionize Your Email Outreach!
      </h1>
      <p className="text-lg mb-8">
        Effortlessly connect with the right contacts, accelerate your hiring
        process, and boost your referrals with our innovative email service.
      </p>
      <Button
        type="primary"
        size="large"
        className="bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        Get Started for Free
      </Button>
    </div>
  );
};

export default HeroSection;
