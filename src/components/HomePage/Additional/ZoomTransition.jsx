import React, { useState, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";

// Define your colors
const colors = {
  background: "hsl(210, 100%, 6%)",
  foreground: "hsl(180, 100%, 90%)",
  accent: {
    DEFAULT: "hsl(198, 70%, 50%)",
  },
  destructive: {
    DEFAULT: "hsl(0, 98%, 44%)",
    foreground: "hsl(0, 0%, 100%)",
  },
};

function ZoomManager({ setActiveComponent }) {
  const { camera } = useThree();

  useFrame(() => {
    if (camera.position.z > 50) {
      setActiveComponent("cool3");
    } else if (camera.position.z < 20) {
      setActiveComponent("three1");
    } else {
      setActiveComponent("random");
    }
  });

  return null;
}

function Cool3() {
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial color={colors.accent.DEFAULT} />
    </mesh>
  );
}

function Three1() {
  return (
    <mesh>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color={colors.foreground} />
    </mesh>
  );
}

function Random() {
  // Placeholder for the Random component
  return (
    <group>
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
          ]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={colors.destructive.DEFAULT} />
        </mesh>
      ))}
    </group>
  );
}

export default function ZoomTransition() {
  const [activeComponent, setActiveComponent] = useState("random");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 35], fov: 75 }}
        style={{ background: colors.background }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <fog attach="fog" args={[colors.background, 0, 100]} />
        <Suspense fallback={null}>
          <ZoomManager setActiveComponent={setActiveComponent} />
          {activeComponent === "random" && <Random />}
          {activeComponent === "three1" && <Three1 />}
          {activeComponent === "cool3" && <Cool3 />}
        </Suspense>
        <TrackballControls />
      </Canvas>
    </div>
  );
}
