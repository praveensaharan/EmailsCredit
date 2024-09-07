import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "antd";

const FloatingPlane = () => {
  const planeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const texture = useLoader(
    THREE.TextureLoader,
    "/logo13.ico?height=712&width=512"
  );

  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
      planeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh
      ref={planeRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.8}
        color={hovered ? "#FFD700" : "#FFFFFF"}
      />

      <Html
        position={[0, 0, 0.1]}
        center
        style={{
          opacity: hovered ? 1 : 0,
          transition: "all 0.2s ease-in-out",
          transform: `scale(${hovered ? 1 : 0.5})`,
        }}
      >
        <Button
          size="small"
          style={{
            backgroundColor: "#FFD700",
            color: "#000",
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Button clicked!");
          }}
        >
          EmailsCredit
        </Button>
      </Html>
    </mesh>
  );
};

export default function FloatingPlaneScene() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-black">
      <Canvas>
        <ambientLight intensity={0.9} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enableZoom={false} />
        <FloatingPlane />
      </Canvas>
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
