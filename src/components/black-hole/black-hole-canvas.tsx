'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  createAccretionDiskTexture,
  createGlowTexture
} from '@/lib/three/textures';

/**
 * ============================================================
 * VISUALISASI LUBANG HITAM
 * - Event horizon: bola hitam matte
 * - Photon ring: torus bercahaya tipis di sekitar horizon
 * - Piringan akresi: dua bidang bertekstur (Doppler beaming + turbulensi)
 * - Jet relativistik: dua kerucut additive di sepanjang sumbu rotasi
 * Skala visual mengikuti log(massa) sehingga massa 1–10¹⁰ M☉ tetap terlihat.
 * ============================================================
 */

function AccretionDisk({ massLog }: { massLog: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => createAccretionDiskTexture(), []);
  const heat = Math.min(0.35 + massLog * 0.06, 1);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) innerRef.current.rotation.z = t * 0.55;
    if (outerRef.current) outerRef.current.rotation.z = -t * 0.22;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2 - 0.28, 0, 0.12]}>
      <mesh ref={outerRef} scale={2.5}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.5 * heat}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={innerRef} scale={1.6}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function BlackHoleCore({ massLog }: { massLog: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);

  const glowTexture = useMemo(() => createGlowTexture('#ffcf7a'), []);
  const coreScale = 0.55 + massLog * 0.19;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.35;
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2.1) * 0.03;
      glowRef.current.scale.set(5.4 * coreScale * pulse, 5.4 * coreScale * pulse, 1);
    }
    if (groupRef.current) groupRef.current.rotation.y = t * 0.02;
  });

  return (
    <group ref={groupRef} scale={coreScale}>
      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2 - 0.3, 0, 0]}>
        <torusGeometry args={[1.06, 0.018, 16, 220]} />
        <meshBasicMaterial
          color="#ffe6b0"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cahaya gravitasi di tepi horizon */}
      <sprite ref={glowRef} scale={[5.4, 5.4, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

function RelativisticJets() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, index) => {
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + Math.abs(Math.sin(state.clock.elapsedTime * 0.8 + index)) * 0.16;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 2.6, 0]}>
        <coneGeometry args={[0.28, 4.6, 24, 1, true]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.28, 4.6, 24, 1, true]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SlowCameraOrbit() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    camera.position.x = Math.sin(t) * 7.4;
    camera.position.z = Math.cos(t) * 7.4;
    camera.position.y = 2.4 + Math.sin(t * 0.7) * 0.9;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BlackHoleCanvas({ massLog }: { massLog: number }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 2.4, 7.4], fov: 52 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#03050c']} />
      <ambientLight intensity={0.2} />

      <SlowCameraOrbit />
      <BlackHoleCore massLog={massLog} />
      <AccretionDisk massLog={massLog} />
      <RelativisticJets />
      <Stars radius={90} depth={60} count={2600} factor={3.2} saturation={0} fade speed={0.4} />
    </Canvas>
  );
}
