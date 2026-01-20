"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useLoader } from "@/context/LoaderContext";

// RevealText Component - Smooth clip-path reveal from center to outer
interface RevealTextProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  shouldAnimate?: boolean;
}

const RevealText: React.FC<RevealTextProps> = ({
  children,
  direction = "left",
  delay = 0,
  duration = 1,
  className = "",
  shouldAnimate = true,
}) => {
  // Clip-path for center-to-outer reveal:
  // - Left side text: reveals from RIGHT (center) toward LEFT (outer)
  //   So we clip the LEFT side initially: inset(0 0 0 100%) hides everything by pushing left edge to 100%
  //   Animate to inset(0 0 0 0) reveals left-to-right... 
  //   Wait, we need the OPPOSITE - reveal right-to-left
  //   Use inset(0 100% 0 0) which clips from RIGHT, then reveal by going to inset(0 0 0 0)
  // - Right side text: reveals from LEFT (center) toward RIGHT (outer)
  //   Use inset(0 0 0 100%) which clips from LEFT, then reveal by going to inset(0 0 0 0)
  
  const initialClip = direction === "left" 
    ? "inset(-10% 100% -10% 0)"  // Left text: clip from right, with vertical padding
    : "inset(-10% 0 -10% 100%)"; // Right text: clip from left, with vertical padding
  
  const finalClip = "inset(-10% 0 -10% 0)"; // Fully visible with vertical padding to prevent top/bottom clipping

  return (
    <motion.div
      initial={{ clipPath: initialClip }}
      animate={{ clipPath: shouldAnimate ? finalClip : initialClip }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // Smooth expo-out easing
      }}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {children}
    </motion.div>
  );
};

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  useFrame(() => {
    // Subtle camera movement to follow mouse
    camera.position.lerp(vec.set(mouse.x * 0.2, mouse.y * 0.2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function FloatingGeometry(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={1.5}>
      <mesh ref={meshRef} {...props}>
        {/* Optimized geometry */}
        <torusKnotGeometry args={[1.2, 0.4, 100, 16]} /> 
        <meshPhysicalMaterial
          color="#a0c0ff"
          roughness={0}
          metalness={0.1}
          transmission={1} 
          thickness={1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
    </Float>
  );
}

function AnimatedKnot({ hasLoaded }: { hasLoaded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetY = -2; // Final position
  const startY = 0;   // Center position (where loader has it)
  
  useFrame(() => {
    if (groupRef.current) {
      // Smoothly interpolate to target position
      const target = hasLoaded ? targetY : startY;
      groupRef.current.position.y += (target - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, startY, 0]}>
      <FloatingGeometry />
    </group>
  );
}

const HeroSection = () => {
  const { hasLoaded } = useLoader();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
          
          <ambientLight intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#4f46e5" />

          {/* Knot - animates from center to final position */}
          <AnimatedKnot hasLoaded={hasLoaded} />
          
          <Environment preset="city" />
          
          <Rig />
        </Canvas>
      </div>

      {/* DOM Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-start pt-48 pointer-events-none">
        
        {/* Top Text Area - Split Left/Right of Center Line */}
        <div className="w-full z-20 flex flex-col">
           {/* Row 1: Name */}
           <div className="w-full grid grid-cols-2 items-center">
              {/* Left Side - Rangel reveals from center to left */}
              <div className="flex justify-end pr-1 md:pr-2">
                <RevealText direction="left" delay={0.2} duration={1} shouldAnimate={hasLoaded}>
                  <h1 className="font-mango font-extrabold text-[16vw] md:text-[12.5vw] leading-[0.8] text-[#1a1a1a] uppercase">
                    Rangel
                  </h1>
                </RevealText>
              </div>
              
              {/* Right Side - Koli reveals from center to right */}
              <div className="flex justify-start pl-1 md:pl-2">
                <RevealText direction="right" delay={0.2} duration={1} shouldAnimate={hasLoaded}>
                  <h1 className="font-mango font-extrabold text-[16vw] md:text-[12.5vw] leading-[0.8] text-[#1a1a1a] uppercase">
                    Koli
                  </h1>
                </RevealText>
              </div>
           </div>

           {/* Row 2: Title - delayed by 0.15s */}
           <div className="w-full grid grid-cols-2 items-center">
              {/* Left Side - Software reveals from center to left */}
              <div className="flex justify-end pr-2 md:pr-2">
                <RevealText direction="left" delay={0.35} duration={1} shouldAnimate={hasLoaded}>
                  <h1 className="font-mango font-extrabold text-[16vw] md:text-[12.5vw] leading-[0.8] text-[#1a1a1a] uppercase">
                    Software
                  </h1>
                </RevealText>
              </div>
              
              {/* Right Side - Developer reveals from center to right */}
              <div className="flex justify-start pl-2 md:pl-2">
                <RevealText direction="right" delay={0.35} duration={1} shouldAnimate={hasLoaded}>
                  <h1 className="font-mango font-extrabold text-[16vw] md:text-[12.5vw] leading-[0.8] text-[#1a1a1a] uppercase">
                    Developer
                  </h1>
                </RevealText>
              </div>
           </div>
        </div>

      </div>
      
    </section>
  );
};

export default HeroSection;
