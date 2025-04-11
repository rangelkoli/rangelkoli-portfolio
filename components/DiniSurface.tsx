"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  SoftShadows,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Create a simple floor to receive shadows
const Floor = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50]} />
      <shadowMaterial opacity={0.2} />
    </mesh>
  );
};

// Ambient particles that float around the Dini surface
const AmbientParticles = ({ count = 200, color = "#ffffff" }) => {
  return (
    <Sparkles
      count={count}
      scale={[5, 5, 5]}
      size={0.5}
      speed={0.3}
      opacity={0.4}
      color={color}
    />
  );
};

const DiniSurfaceMesh: React.FC<{
  a: number;
  b: number;
  colorScheme: string;
  rotationSpeed?: number;
  castShadow?: boolean;
}> = ({ a, b, colorScheme, rotationSpeed = 0.005, castShadow = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Time reference for more complex rotation patterns
  const timeRef = useRef({ offset: Math.random() * Math.PI * 2 });

  // Create a parametric geometry for Dini's surface
  const geometry = useMemo(() => {
    // Correct implementation of Dini's surface
    const diniFunction = (u: number, v: number, target: THREE.Vector3) => {
      // Proper parameter ranges:
      // u goes from 0 to 4π (multiple spiral turns)
      // v must stay away from 0 (to avoid singularity) and below π/2
      const uRange = 4 * Math.PI * u;
      const vRange = 0.01 + (Math.PI / 2 - 0.01) * v;

      // Dini's surface equations with parameters a and b
      const x = a * Math.cos(uRange) * Math.sin(vRange);
      const y = a * Math.sin(uRange) * Math.sin(vRange);
      const z =
        a * (Math.cos(vRange) + Math.log(Math.tan(vRange / 2))) + b * uRange;

      target.set(x, y, z);
    };
    // Create with higher resolution for smoother surface
    return new ParametricGeometry(diniFunction, 120, 120);
  }, [a, b]);

  // Enhanced materials with more visual interest
  const materials = useMemo(
    () => ({
      rainbow: new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        vertexColors: true,
        flatShading: true,
      }),
      normal: new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        flatShading: false,
      }),
      shiny: new THREE.MeshStandardMaterial({
        color: 0x049ef4,
        metalness: 0.9,
        roughness: 0.1,
        side: THREE.DoubleSide,
      }),
      white: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      }),
      whiteGlow: new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        emissive: 0xaaaaaa,
        emissiveIntensity: 0.2,
      }),
      whiteShadow: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        envMapIntensity: 1.5,
      }),
      glacial: new THREE.MeshPhysicalMaterial({
        color: 0xf0f8ff, // Alice Blue - very light blue/white
        roughness: 0.2,
        transmission: 0.95, // High transmission for glass-like effect
        thickness: 0.5, // Refraction thickness
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      }),
      premium: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        envMapIntensity: 2.0,
      }),
      ethereal: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        thickness: 1.5,
        roughness: 0.05,
        ior: 1.5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1.0,
        envMapIntensity: 3.0,
      }),
      holographic: new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(1024, 1024) },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vPosition = position;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            // Holographic effect based on normal and position
            vec3 rainbow = 0.5 + 0.5 * cos(time * 0.2 + vPosition.xzy * 0.8 + vec3(0,2,4));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);
            float fresnel = 0.3 + 0.7 * pow(1.0 - dot(vNormal, viewDir), 3.0);
            
            vec3 baseColor = vec3(0.9, 0.9, 1.0);
            vec3 color = mix(baseColor, rainbow, fresnel);
            
            // Add some scanlines and noise
            float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
            float scanline = sin(vUv.y * 600.0) * 0.05;
            
            color = mix(color, vec3(noise), 0.03) + scanline;
            
            gl_FragColor = vec4(color, 0.85);
          }
        `,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    }),
    []
  );

  // Add vertex colors for rainbow effect
  useEffect(() => {
    if (colorScheme === "rainbow") {
      const colors = [];
      const count = geometry.attributes.position.count;

      for (let i = 0; i < count; i++) {
        // Calculate normalized position for color mapping
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const z = geometry.attributes.position.getZ(i);

        // Convert position to color
        colors.push(
          Math.sin(z * 0.5) + 0.5,
          Math.sin(x * 0.5) + 0.5,
          Math.sin(y * 0.5) + 0.5
        );
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
    }
  }, [geometry, colorScheme]);

  // Update time uniform for shader materials
  useFrame(({ clock }) => {
    if (colorScheme === "holographic" && materials.holographic.uniforms) {
      materials.holographic.uniforms.time.value = clock.getElapsedTime();
    }
  });

  // Enhanced rotation with multi-axis movement
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const baseSpeed = rotationSpeed;

      // Primary rotation - continuous rotation around each axis
      meshRef.current.rotation.y += baseSpeed * 1.0; // Y-axis (horizontal spin)
      meshRef.current.rotation.x += baseSpeed * 0.7; // X-axis (vertical tilt)
      meshRef.current.rotation.z += baseSpeed * 0.3; // Z-axis (sideways roll)

      // Secondary oscillating rotations - adds gentle wobble effect
      const wobbleAmount = 0.2;
      const wobbleFrequency = 0.5;
      meshRef.current.rotation.x +=
        Math.sin(time * wobbleFrequency + timeRef.current.offset) *
        baseSpeed *
        wobbleAmount;
      meshRef.current.rotation.z +=
        Math.cos(time * wobbleFrequency + timeRef.current.offset * 1.3) *
        baseSpeed *
        wobbleAmount;

      // Floating motion - vertical movement
      const floatSpeed = 0.5;
      const floatAmount = 0.1;
      meshRef.current.position.y = Math.sin(time * floatSpeed) * floatAmount;

      // Subtle horizontal drift
      const driftSpeed = 0.3;
      const driftAmount = 0.05;
      meshRef.current.position.x =
        Math.sin(time * driftSpeed + 1.5) * driftAmount;
      meshRef.current.position.z = Math.cos(time * driftSpeed) * driftAmount;
    }
  });

  const material =
    materials[colorScheme as keyof typeof materials] || materials.normal;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      castShadow={castShadow}
      receiveShadow={true}
    />
  );
};

// Main component - can be used standalone or as background
const DiniSurface: React.FC<{
  showControls?: boolean;
  className?: string;
  rotationSpeed?: number;
  isBackground?: boolean;
}> = ({
  showControls = true,
  className = "",
  rotationSpeed,
  isBackground = false,
}) => {
  const [a, setA] = useState(isBackground ? 0.8 : 1);
  const [b, setB] = useState(isBackground ? 0.25 : 0.2);
  const [colorScheme, setColorScheme] = useState<string>(
    isBackground ? "shiny" : "rainbow"
  );
  const [showParticles, setShowParticles] = useState(true);
  const [bloomIntensity, setBloomIntensity] = useState(0.5);

  // Adjusted camera position for background mode
  const cameraPosition = isBackground
    ? ([0, 0, 5] as [number, number, number])
    : ([3, 3, 3] as [number, number, number]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: isBackground ? 60 : 45 }}
        shadows='soft'
        gl={{ antialias: true }}
      >
        <color
          attach='background'
          args={[isBackground ? "#000000" : "#050505"]}
        />
        <PerspectiveCamera makeDefault position={cameraPosition} />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={0.8}
          intensity={1.5}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color='#6666ff' />
        <pointLight position={[3, -2, 3]} intensity={0.5} color='#ff6666' />

        {/* HDR environment for better reflection/lighting */}
        <Environment preset='night' background={false} />

        {/* Soft shadows for better visual quality */}
        <SoftShadows size={25} samples={16} focus={0.5} />

        {/* Ambient particles for added visual interest */}
        {showParticles && <AmbientParticles count={isBackground ? 180 : 80} />}

        {/* Main Dini Surface */}
        <DiniSurfaceMesh
          a={a}
          b={b}
          colorScheme={colorScheme}
          rotationSpeed={rotationSpeed}
          castShadow={true}
        />

        {/* Floor to receive shadows when in non-background mode */}
        {!isBackground && <Floor />}

        {/* Subtle shadow pool under the surface for background mode */}
        {isBackground && (
          <AccumulativeShadows
            temporal
            frames={30}
            alphaTest={0.85}
            opacity={0.3}
            scale={10}
            position={[0, -1.5, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={4}
              ambient={0.5}
              intensity={1}
              position={[5, 5, -5]}
              bias={0.001}
            />
          </AccumulativeShadows>
        )}

        {/* Post-processing effects for enhanced visuals */}
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      {/* Controls - only show if explicitly requested */}
      {showControls && (
        <div className='absolute bottom-4 left-4 bg-black/70 p-4 rounded-md text-white'>
          <div className='mb-2'>
            <label className='block text-sm'>Scale (a): {a.toFixed(2)}</label>
            <input
              type='range'
              min='0.5'
              max='2'
              step='0.1'
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className='w-32'
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm'>Spiral (b): {b.toFixed(2)}</label>
            <input
              type='range'
              min='0.1'
              max='0.5'
              step='0.05'
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className='w-32'
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm'>
              Glow: {bloomIntensity.toFixed(1)}
            </label>
            <input
              type='range'
              min='0'
              max='1.5'
              step='0.1'
              value={bloomIntensity}
              onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
              className='w-32'
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm'>
              <input
                type='checkbox'
                checked={showParticles}
                onChange={(e) => setShowParticles(e.target.checked)}
                className='mr-2'
              />
              Particles
            </label>
          </div>
          <div>
            <label className='block text-sm'>Style:</label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className='bg-black text-white border border-gray-500 rounded px-2 py-1 mt-1'
            >
              <option value='rainbow'>Rainbow</option>
              <option value='normal'>Normal</option>
              <option value='shiny'>Shiny Blue</option>
              <option value='white'>Simple White</option>
              <option value='whiteGlow'>White Glow</option>
              <option value='premium'>Premium White</option>
              <option value='ethereal'>Ethereal Glass</option>
              <option value='holographic'>Holographic</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiniSurface;
