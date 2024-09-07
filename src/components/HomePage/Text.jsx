// Text.jsx
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { SearchOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";

const features = [
  {
    icon: <SearchOutlined style={{ fontSize: "2em", color: "#1890ff" }} />,
    title: "Search by Company",
    description:
      "Find the right contacts quickly by searching for companies relevant to your needs.",
  },
  {
    icon: <MailOutlined style={{ fontSize: "2em", color: "#ff4d4f" }} />,
    title: "Effortless Outreach",
    description:
      "Easily connect with key contacts through our streamlined email service.",
  },
  {
    icon: <RiseOutlined style={{ fontSize: "2em", color: "#52c41a" }} />,
    title: "Boost Referrals",
    description:
      "Increase your success rate with personalized outreach and targeted connections.",
  },
];

// Box component for each feature card
function Box({ text, color, icon, description, ...props }) {
  const [hovered, setHovered] = useState(false);

  // Inline styles for the HTML content (icon, title, description)
  const contentStyle = {
    padding: "15px 25px",
    borderRadius: "12px",
    backgroundColor: hovered
      ? "rgba(30, 144, 255, 0.9)"
      : "rgba(0, 0, 0, 0.75)",
    color: "#fff",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    textAlign: "center",
    transform: hovered ? "scale(1.1)" : "scale(1)",
    boxShadow: hovered ? "0px 8px 25px rgba(0, 0, 0, 0.3)" : "none",
  };

  const iconStyle = {
    fontSize: "2em",
    marginBottom: "10px",
    color: hovered ? "#fff" : "#ddd",
  };

  return (
    <mesh
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : color} />
      <Html position={[0, 0, 1]} center>
        <div style={contentStyle}>
          <div style={iconStyle}>{icon}</div>
          <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>{text}</h2>
          <p style={{ fontSize: "0.9em", color: "#eee" }}>{description}</p>
        </div>
      </Html>
    </mesh>
  );
}

// Scroll container for the 3D scrolling effect
function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree();
  const group = useRef();
  useFrame((state, delta) => {
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      viewport.height * scroll.current,
      4,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

// Scene that adds Boxes dynamically using feature data
function Scene() {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {features.map((feature, index) => (
        <Box
          key={index}
          text={feature.title}
          color={index % 2 === 0 ? "aquamarine" : "lightblue"}
          icon={feature.icon}
          description={feature.description}
          position={[0, -index * (viewport.height + 1), 0]} // Stacking boxes
        />
      ))}
    </>
  );
}

export { Box, ScrollContainer, Scene };
