import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Table } from "antd";

export default function ThreeScene() {
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "10 Downing Street, London",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 28,
      address: "20 Baker Street, London",
    },
    {
      key: "3",
      name: "Michael Johnson",
      age: 45,
      address: "30 Fleet Street, London",
    },
    {
      key: "3",
      name: "Michael Johnson",
      age: 45,
      address: "30 Fleet Street, London",
    },
    {
      key: "3",
      name: "Michael Johnson",
      age: 45,
      address: "30 Fleet Street, London",
    },
    {
      key: "3",
      name: "Michael Johnson",
      age: 45,
      address: "30 Fleet Street, London",
    },
    {
      key: "3",
      name: "Michael Johnson",
      age: 45,
      address: "30 Fleet Street, London",
    },
  ];

  // Column definitions
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const ref = useRef();
  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-gradient-to-b from-accent-foreground to-blue-900"
    >
      <div className="absolute inset-0 w-full flex">
        <div
          className="w-2/5 p-4 flex items-center justify-center text-foreground text-6xl font-bold leading-tight overflow-hidden"
          style={{
            wordBreak: "break-word",
            background: "rgba(0, 0, 0, 0.6)", // Add a background for better text visibility
            padding: "20px", // Add some padding for the text
          }}
        >
          "But afterwards there occurred violent earthquakes and floods; and in
          a single daya."
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="w-3/5 overflow-auto p-10 bg-accent-foreground"
        />
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
