'use client';

import { Canvas } from '@react-three/fiber';
import { Sphere, Preload } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.0005;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef}>
      <meshPhongMaterial
        map={new THREE.TextureLoader().load('/assets/3d/texture_earth.jpg')}
        emissive="#0a0e27"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

export function AnimatedGlobe() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Globe />
        <Preload all />
      </Canvas>
    </div>
  );
}
