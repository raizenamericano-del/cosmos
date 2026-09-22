'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { createGlowTexture, createNebulaTexture } from '@/lib/three/textures';

/**
 * ============================================================
 * HERO STARFIELD — WebGL interaktif
 * - 1.400 bintang sebagai THREE.Points (hemat performa)
 * - Nebula additive blending berlapis
 * - Asteroid low-poly yang mengapung dan berotasi
 * - Parallax kamera yang merespons gerakan mouse (useThree.pointer)
 * ============================================================
 */

const STAR_COUNT = 1400;
const STAR_COLORS = ['#ffffff', '#c7d2fe', '#a5f3fc', '#ddd6fe', '#fde68a', '#93c5fd'];

function CameraParallax({ strength = 1.4 }: { strength?: number }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 14));

  useFrame((_, delta) => {
    target.current.set(pointer.x * strength * 2.4, pointer.y * strength * 1.4, 14 - pointer.y * 0.6);
    camera.position.lerp(target.current, Math.min(delta * 2.2, 1));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function StarLayer() {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const color = new THREE.Color();

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const radius = 26 + Math.random() * 130;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 40;

      color.set(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.4 + Math.random() * 1.9;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createGlowTexture('#ffffff')
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function NebulaLayer() {
  const group = useRef<THREE.Group>(null);

  const textures = useMemo(
    () => [
      createNebulaTexture('#7c3aed', '#22d3ee'),
      createNebulaTexture('#db2777', '#6366f1'),
      createNebulaTexture('#0ea5e9', '#a855f7')
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.01;
    group.current.children.forEach((child, index) => {
      child.position.y = Math.sin(state.clock.elapsedTime * 0.12 + index) * 2.2;
    });
  });

  return (
    <group ref={group}>
      {textures.map((texture, index) => (
        <mesh
          key={index}
          position={[
            index === 0 ? -22 : index === 1 ? 26 : 4,
            index === 0 ? 8 : index === 1 ? -6 : 16,
            -34 - index * 16
          ]}
        >
          <planeGeometry args={[64 + index * 14, 52 + index * 10]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.42 - index * 0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function AsteroidField({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const asteroids = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        position: [
          (Math.random() - 0.5) * 46,
          (Math.random() - 0.5) * 26,
          -6 - Math.random() * 34
        ] as [number, number, number],
        scale: 0.22 + Math.random() * 0.85,
        speed: 0.1 + Math.random() * 0.35,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number
        ]
      })),
    [count]
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const data = asteroids[index];
      if (!data) return;
      child.rotation.x += data.speed * 0.01;
      child.rotation.y += data.speed * 0.013;
      child.position.y =
        data.position[1] + Math.sin(state.clock.elapsedTime * data.speed + index) * 1.4;
    });
  });

  return (
    <group ref={group}>
      {asteroids.map((asteroid) => (
        <mesh key={asteroid.id} position={asteroid.position} scale={asteroid.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8b8f9a" roughness={0.95} metalness={0.15} flatShading />
        </mesh>
      ))}
    </group>
  );
}

export default function StarfieldScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 14], fov: 62 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#04060f']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[12, 8, 6]} intensity={1.4} color="#a78bfa" />
      <pointLight position={[-14, -10, -8]} intensity={0.9} color="#22d3ee" />

      <CameraParallax />
      <StarLayer />
      <NebulaLayer />
      <AsteroidField />
      <Stars radius={120} depth={70} count={1200} factor={3.4} saturation={0} fade speed={0.6} />
    </Canvas>
  );
}
