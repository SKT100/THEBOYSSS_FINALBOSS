// MeetingScene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Classroom() {
  const { scene } = useGLTF('/Classroom.glb');
  return <primitive object={scene} />;
}

function Man() {
  const { scene } = useGLTF('/Man.glb');
  return <primitive object={scene} position={[0, 0, 0]} />;
}

export default function MeetingScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Classroom />
        <Man />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
