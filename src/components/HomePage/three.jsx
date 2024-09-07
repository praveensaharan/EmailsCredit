import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Table1 from "./Additional/Table";

export default function ThreeScene() {
  const ref = useRef();
  return (
    <div ref={ref} className="relative w-full h-full">
      <div className="absolute inset-0 w-full flex flex-col lg:flex-row bg-background">
        <div
          className="lg:w-2/5 w-full p-4 flex items-center justify-center text-foreground text-4xl lg:text-6xl font-bold leading-tight overflow-hidden"
          style={{
            wordBreak: "break-word",
            padding: "20px",
          }}
        >
          "Effortlessly manage referral emails and customize responses using AI,
          all directly from our platform."
        </div>
        <div className="lg:w-3/5 w-full overflow-auto p-4 lg:p-10">
          <Table1 />
        </div>
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
        <Shadows position={[0, 0, -0.9]} />
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
      <meshStandardMaterial color={hovered ? "hotpink" : "skyblue"} />
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
