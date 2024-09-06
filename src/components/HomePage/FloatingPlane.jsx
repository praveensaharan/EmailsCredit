// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Text } from "@react-three/drei";
// import { FaRegPaperPlane } from "react-icons/fa";

// const FloatingPlane = () => {
//   const planeRef = useRef();

//   useFrame(() => {
//     if (planeRef.current) {
//       planeRef.current.rotation.y += 0.005;
//     }
//   });

//   return (
//     <mesh ref={planeRef} position={[0, 0, 3]} scale={[1.5, 1.5, 1.5]}>
//       <planeGeometry args={[5, 5]} />
//       <meshStandardMaterial transparent opacity={0} />

//       <Text
//         position={[0, 0, 10]}
//         fontSize={3}
//         color="#ffffff"
//         anchorX="center"
//         anchorY="middle"
//         outlineWidth={0.05}
//         outlineColor="#000000"
//       >
//         <FaRegPaperPlane className="h-6 w-6 text-customGold animate-bounce" />
//       </Text>
//     </mesh>
//   );
// };

// export default FloatingPlane;

// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Html } from "@react-three/drei";
// import { FaRegPaperPlane } from "react-icons/fa";

// const FloatingPlane = () => {
//   const planeRef = useRef();

//   // Rotating the mesh
//   useFrame(() => {
//     if (planeRef.current) {
//       planeRef.current.rotation.y -= 0.09; // Increase the speed for visibility
//       planeRef.current.rotation.z += 0.01;
//       planeRef.current.rotation.x += 0.03;
//     }
//   });

//   return (
//     <mesh ref={planeRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
//       <planeGeometry args={[5, 5]} />
//       <meshStandardMaterial transparent opacity={0} />

//       {/* Use Html to render the icon */}
//       <Html position={[0, 0, 10]} center>
//         <FaRegPaperPlane style={{ fontSize: "3em", color: "#FFD700" }} />
//       </Html>
//     </mesh>
//   );
// };

// export default FloatingPlane;

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "antd";

// FloatingPlane Component
const FloatingPlane = () => {
  const planeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Load texture
  const texture = useLoader(
    THREE.TextureLoader,
    "/logo13.ico?height=712&width=512" // Ensure this URL is correct
  );

  useFrame((state, delta) => {
    if (planeRef.current) {
      // Add rotation and movement
      planeRef.current.rotation.y += delta * 0.5;
      planeRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
      planeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
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
            backgroundColor: "#FFD700", // Custom inline style (gold color)
            color: "#000", // Text color
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from reaching the mesh
            console.log("Button clicked!");
          }}
        >
          EmailsCredit
        </Button>
      </Html>
    </mesh>
  );
};

// Main FloatingPlaneScene Component
export default function FloatingPlaneScene({ redirectUrl }) {
  const handleClick = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Handle the redirect logic here
    }
  };

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
          <h1
            className="font-heading font-extrabold text-5xl mb-6 text-shadow-lg drop-shadow-xl text-primary tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Revolutionize Your Email Outreach!
          </h1>
          <p className="px-4 text-body text-lg font-medium mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-foreground">
            Effortlessly connect with the right contacts, accelerate your hiring
            process, and boost your referrals with our cutting-edge email
            service.
          </p>
          <button
            type="button"
            className="bg-gradient-to-r from-accent to-accent-dark text-background py-3 px-8 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 duration-300"
            onClick={handleClick} // Handle redirection logic here
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
}
