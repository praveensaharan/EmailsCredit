import { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import { Button } from "antd"; // Adjust the import path according to your project structure

// Extend for post-processing effects
extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Particles() {
  const particlesRef = useRef(null);
  const particlesGeometryRef = useRef(null);

  useEffect(() => {
    if (particlesGeometryRef.current) {
      const particlesGeometry = particlesGeometryRef.current;
      const particlesCount = 5000;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={particlesGeometryRef} />
      <pointsMaterial size={0.02} color="#8352FD" />
    </points>
  );
}

function Effects() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef();

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    composerRef.current = composer;
  }, [gl, scene, camera, size]);

  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
}

export default function CoolHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-900">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
        <Particles />
        <Effects />
      </Canvas>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
          Welcome to the Future
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-purple-200 mb-8">
          Experience innovation in 3D. Dive into a world of endless
          possibilities.
        </p>
        <div>
          <Button size="lg" className="mr-4 bg-purple-600 hover:bg-purple-700">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-purple-900"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
