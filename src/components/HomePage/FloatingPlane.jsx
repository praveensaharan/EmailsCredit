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

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaRegPaperPlane } from "react-icons/fa";

const FloatingPlane = () => {
  const planeRef = useRef();

  // Rotating the mesh
  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.rotation.y -= 0.09; // Increase the speed for visibility
      planeRef.current.rotation.z += 0.01;
      planeRef.current.rotation.x += 0.03;
    }
  });

  return (
    <mesh ref={planeRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial transparent opacity={0} />

      {/* Use Html to render the icon */}
      <Html position={[0, 0, 10]} center>
        <FaRegPaperPlane style={{ fontSize: "3em", color: "#FFD700" }} />
      </Html>
    </mesh>
  );
};

export default FloatingPlane;
