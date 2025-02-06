'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';
import type { GroupProps } from '@react-three/fiber';

interface LaptopModelProps {
  modelPath: string;
  position: [number, number, number];
}

export default function LaptopModel({ modelPath, position }: LaptopModelProps) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} scale={0.5} />;
}