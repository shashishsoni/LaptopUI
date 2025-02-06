// src/app/page.tsx
'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SpotLight } from '@react-three/drei';
import { motion } from 'framer-motion';
import LaptopModel from '../components/laptopmodel';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: ThreeElements['ambientLight']
      spotLight: ThreeElements['spotLight']
      primitive: ThreeElements['primitive']
    }
  }
}

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Middle Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20 z-10" />

      {/* 3D Scene */}
      <Canvas className="h-screen w-full">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} />
          <LaptopModel
            modelPath="/models/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb"
            position={[-2, 0, 0]}
          />
          <LaptopModel
            modelPath="/models/alienware_m18_gaming_laptop.glb"
            position={[2, 0, 0]}
          />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>

      {/* Animation for Models */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <div className="absolute left-0 top-0 h-full w-1/2 bg-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <div className="absolute right-0 top-0 h-full w-1/2 bg-transparent" />
      </motion.div>
    </div>
  );
}