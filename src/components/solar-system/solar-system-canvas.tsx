'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { PLANETARY_BODIES } from '@/lib/data/solar-system';
import type { PlanetaryBody } from '@/lib/types';
import { createGlowTexture, createPlanetTexture, createRingTexture, createSunTexture } from '@/lib/three/textures';

export type SolarMode = 'orbital' | 'jelajah';

interface SceneProps {
  mode: SolarMode;
  selectedId: string | null;
  onSelect: (body: PlanetaryBody) => void;
  positionsRef: React.MutableRefObject<Map<string, THREE.Vector3>>;
}

const ORBIT_TILT = 0.06;

function Sun({ onSelect, selected }: { onSelect: () => void; selected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const textures = useMemo(
    () => ({ surface: createSunTexture(), glow: createGlowTexture('#ffb347') }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0016;
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.02;
      glowRef.current.scale.set(26 * pulse, 26 * pulse, 1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[4.2, 64, 64]} />
        <meshBasicMaterial map={textures.surface} />
      </mesh>
      <sprite ref={glowRef} scale={[26, 26, 1]}>
        <spriteMaterial
          map={textures.glow}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={selected ? 1 : 0.85}
        />
      </sprite>
      <pointLight intensity={3.4} distance={220} decay={1.1} color="#ffe0a3" />
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const ring = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 160);
    return ring;
  }, [radius]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial
        color="#7dd3fc"
        transparent
        opacity={0.16}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Planet({
  body,
  mode,
  selected,
  onSelect,
  positionsRef
}: {
  body: PlanetaryBody;
  mode: SolarMode;
  selected: boolean;
  onSelect: () => void;
  positionsRef: React.MutableRefObject<Map<string, THREE.Vector3>>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  const textures = useMemo(
    () => ({
      surface: createPlanetTexture(
        [body.color, body.accentColor, body.color, '#0f172a'],
        body.order * 3 + 5
      ),
      ring: body.hasRing ? createRingTexture(body.accentColor) : null
    }),
    [body.accentColor, body.color, body.hasRing, body.order]
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (mode === 'orbital') {
      angleRef.current += delta * body.orbitSpeed * 0.42;
    }

    const x = Math.cos(angleRef.current) * body.orbitRadius;
    const z = Math.sin(angleRef.current) * body.orbitRadius;
    const y = Math.sin(angleRef.current + body.order) * ORBIT_TILT * body.orbitRadius * 0.35;
    groupRef.current.position.set(x, y, z);

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * body.rotationSpeed * 0.7;
    }

    positionsRef.current.set(body.id, groupRef.current.position.clone());
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        scale={hovered || selected ? body.visualRadius * 1.08 : body.visualRadius}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          map={textures.surface}
          roughness={0.82}
          metalness={0.08}
          emissive={new THREE.Color(selected ? body.accentColor : '#000000')}
          emissiveIntensity={selected ? 0.28 : 0}
        />
      </mesh>

      {textures.ring && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[body.visualRadius * 1.4, body.visualRadius * 2.5, 96]} />
          <meshBasicMaterial
            map={textures.ring}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {(hovered || selected) && (
        <Html center distanceFactor={42} position={[0, body.visualRadius * 1.8, 0]}>
          <span className="pointer-events-none whitespace-nowrap rounded-full border border-cyan-300/40 bg-cosmos-void/80 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-cyan-100">
            {body.name}
          </span>
        </Html>
      )}
    </group>
  );
}

function PlanetSystem({ mode, selectedId, onSelect, positionsRef }: SceneProps) {
  const planets = PLANETARY_BODIES.filter((body) => body.type !== 'bintang');

  return (
    <>
      <Sun
        selected={selectedId === 'sun'}
        onSelect={() => onSelect(PLANETARY_BODIES[0])}
      />
      {planets.map((body) => (
        <group key={body.id}>
          <OrbitRing radius={body.orbitRadius} />
          <Planet
            body={body}
            mode={mode}
            selected={selectedId === body.id}
            onSelect={() => onSelect(body)}
            positionsRef={positionsRef}
          />
        </group>
      ))}
    </>
  );
}

/** Menggerakkan kamera ke planet terpilih selama ±1,4 detik. */
function CameraRig({
  selectedId,
  positionsRef,
  controlsRef,
  focusToken
}: {
  selectedId: string | null;
  positionsRef: React.MutableRefObject<Map<string, THREE.Vector3>>;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  focusToken: number;
}) {
  const { camera } = useThree();
  const remaining = useRef(0);
  const lastToken = useRef(focusToken);

  useEffect(() => {
    if (lastToken.current !== focusToken) {
      lastToken.current = focusToken;
      remaining.current = 1.4;
    }
  }, [focusToken]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (remaining.current <= 0) return;
    remaining.current -= delta;

    const planetPosition = selectedId ? positionsRef.current.get(selectedId) : undefined;
    const desiredTarget = planetPosition
      ? planetPosition.clone()
      : new THREE.Vector3(0, 0, 0);

    const radius = planetPosition
      ? PLANETARY_BODIES.find((body) => body.id === selectedId)?.visualRadius ?? 1
      : 8;
    const offset = planetPosition
      ? new THREE.Vector3(0, radius * 2.4, radius * 6.5 + 3.4)
      : new THREE.Vector3(0, 26, 58);

    const desiredCamera = desiredTarget.clone().add(offset);

    controls.target.lerp(desiredTarget, Math.min(delta * 2.6, 1));
    camera.position.lerp(desiredCamera, Math.min(delta * 2.2, 1));
    controls.update();
  });

  return null;
}

export default function SolarSystemCanvas(props: SceneProps & { focusToken: number }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 26, 58], fov: 46, near: 0.1, far: 3000 }}
      gl={{ antialias: true }}
      onPointerMissed={() => undefined}
    >
      <color attach="background" args={['#04060f']} />
      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.22} color="#c7d2fe" groundColor="#0b1120" />

      <PlanetSystem {...props} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={6}
        maxDistance={190}
        maxPolarAngle={Math.PI / 2.05}
        rotateSpeed={0.7}
        zoomSpeed={0.85}
      />
      <CameraRig
        selectedId={props.selectedId}
        positionsRef={props.positionsRef}
        controlsRef={controlsRef}
        focusToken={props.focusToken}
      />
      <Preload all />
    </Canvas>
  );
}
