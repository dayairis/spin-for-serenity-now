
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Center, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Loading progress component
const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
      <div className="text-tibetan-maroon text-xl">
        Loading...{Math.round(progress)}%
      </div>
    </div>
  );
};

type PrayerWheelModelProps = {
  isSpinning: boolean;
  onClick: () => void;
};

// 3D model component
const PrayerWheelModel = ({ isSpinning, onClick }: PrayerWheelModelProps) => {
  const gltf = useLoader(GLTFLoader, '/models/prayer_wheel.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  // Initialize model
  useEffect(() => {
    if (modelRef.current && gltf.scene) {
      // Enable shadows
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Improve material quality
          if (child.material) {
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
          }
        }
      });
    }
  }, [gltf.scene]);
  
  // Rotation animation
  useFrame((state) => {
    if (isSpinning && modelRef.current) {
      modelRef.current.rotation.y += 0.05; // Adjust rotation speed
    }
  });
  
  return (
    <Center>
      <group 
        ref={modelRef} 
        onClick={onClick} 
        scale={[1.5, 1.5, 1.5]} 
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees to show horizontal orientation
        castShadow 
        receiveShadow
      >
        <primitive object={gltf.scene} dispose={null} />
      </group>
    </Center>
  );
};

type PrayerWheel3DProps = {
  isSpinning: boolean;
  onSpin: () => void;
};

const PrayerWheel3D = ({ isSpinning, onSpin }: PrayerWheel3DProps) => {
  return (
    <div className="h-[500px] w-full relative cursor-pointer">
      <Canvas 
        shadows 
        camera={{ 
          position: [0, 0, 5], // Adjusted camera position for horizontal view
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <spotLight 
          position={[0, 8, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-bias={-0.0001}
        />
        
        {/* Environment - modified to use a simple background color */}
        <color attach="background" args={["#f5f5f5"]} />
        
        {/* Ground plane */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1, 0]} 
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
        
        {/* Load 3D model */}
        <React.Suspense fallback={null}>
          <PrayerWheelModel isSpinning={isSpinning} onClick={onSpin} />
          <OrbitControls 
            enableZoom={true} 
            maxZoom={5}
            minZoom={2}
            enablePan={false} 
            minPolarAngle={Math.PI / 5} 
            maxPolarAngle={Math.PI / 2}
            rotateSpeed={0.5}
          />
        </React.Suspense>
      </Canvas>
      
      {/* Loading progress display */}
      <React.Suspense fallback={null}>
        <LoadingScreen />
      </React.Suspense>
    </div>
  );
};

export default PrayerWheel3D;
