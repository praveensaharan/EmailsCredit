import React, { useRef, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import * as THREE from "three";
// import { Button } from "antd";

export default function FloatingPlaneScene() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-black">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="mx-3 font-handjet font-extrabold text-5xl mb-6 text-shadow-lg drop-shadow-xl tracking-widest bg-gradient-to-r from-accent to-accent-dark text-background py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300">
            Revolutionize Your Email Outreach!
          </h1>
          <p className="px-4 text-lg font-medium font-heading mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-foreground">
            Effortlessly connect with the right contacts, accelerate your hiring
            process, and boost your referrals with our cutting-edge email
            service.
          </p>
        </div>
      </div>
    </div>
  );
}
