import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

export default function ThreeScene() {
  const ref = useRef();
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          lineHeight: "1em",
          textAlign: "left",
          fontSize: "8em",
          wordBreak: "break-word",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        "But afterwards there occurred violent earthquakes and floods; and in a
        single daya."
      </div>
      <Canvas
        shadows
        frameloop="demand"
        camera={{ position: [0, 0, 4] }}
        style={{ pointerEvents: "none" }}
        eventSource={ref}
        eventPrefix="offset"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
          shadow-mapSize={[2024, 2024]}
        />
        <pointLight position={[10, 0, 0]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Shadows position={[0, 0, -0.5]} />
      </Canvas>
    </div>
  );
}

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  return (
    <mesh
      {...props}
      castShadow
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Shadows(props) {
  const { viewport } = useThree();
  return (
    <mesh receiveShadow scale={[viewport.width, viewport.height, 1]} {...props}>
      <planeGeometry />
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  );
}
