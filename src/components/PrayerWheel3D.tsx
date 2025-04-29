
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

type PrayerWheelModelProps = {
  isSpinning: boolean;
  onClick: () => void;
};

// 3D模型组件
const PrayerWheelModel = ({ isSpinning, onClick }: PrayerWheelModelProps) => {
  const gltf = useLoader(GLTFLoader, '/models/prayer_wheel.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  // 旋转动画
  useFrame(() => {
    if (isSpinning && modelRef.current) {
      modelRef.current.rotation.y += 0.1;
    }
  });
  
  return (
    <group ref={modelRef} onClick={onClick} scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]}>
      <primitive object={gltf.scene} dispose={null} />
    </group>
  );
};

type PrayerWheel3DProps = {
  isSpinning: boolean;
  onSpin: () => void;
};

const PrayerWheel3D = ({ isSpinning, onSpin }: PrayerWheel3DProps) => {
  return (
    <div className="h-[400px] w-full cursor-pointer">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <React.Suspense fallback={null}>
          <PrayerWheelModel isSpinning={isSpinning} onClick={onSpin} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.5}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default PrayerWheel3D;
