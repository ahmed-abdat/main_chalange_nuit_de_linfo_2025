'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  RoundedBox,
  Text,
  OrbitControls,
  Stars,
  Cloud,
  Sparkles,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// =============================================================================
// VILLAGE HUT - Low poly Gaulish hut
// =============================================================================
function VillageHut({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const hutRef = useRef<THREE.Group>(null);

  return (
    <group ref={hutRef} position={position} scale={scale}>
      {/* Hut base (circular stone) */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.4, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>

      {/* Hut walls */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.8, 8]} />
        <meshStandardMaterial color="#FFF8E1" roughness={0.8} />
      </mesh>

      {/* Thatched roof */}
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.8, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={1} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.5, 0.56]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.05]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

// =============================================================================
// CAULDRON - Magic potion cauldron
// =============================================================================
function Cauldron({ position }: { position: [number, number, number] }) {
  const bubbleRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (bubbleRef.current) {
      bubbleRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.05 + 0.3;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Cauldron body */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cauldron rim */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.4, 0.05, 8, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Magic potion (glowing liquid) */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 16]} />
        <meshStandardMaterial
          color="#00997d"
          emissive="#00997d"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Bubbles */}
      <Float speed={5} rotationIntensity={0} floatIntensity={0.5}>
        <mesh ref={bubbleRef} position={[0.1, 0.3, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#00d9a7"
            emissive="#00d9a7"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Glow light */}
      <pointLight ref={glowRef} position={[0, 0.5, 0]} color="#00997d" intensity={2} distance={3} />

      {/* Fire under cauldron */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.15, 0.2, 6]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// =============================================================================
// TREE - Stylized low poly tree
// =============================================================================
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#5D4037" roughness={1} />
      </mesh>

      {/* Foliage layers */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.4, 0.6, 6]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.2, 0.4, 6]} />
        <meshStandardMaterial color="#43A047" roughness={0.8} />
      </mesh>
    </group>
  );
}

// =============================================================================
// CORPORATE TOWER - Evil Big Tech building
// =============================================================================
function CorporateTower({ position }: { position: [number, number, number] }) {
  const towerRef = useRef<THREE.Group>(null);
  const lightRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    // Pulsing lights effect
    lightRefs.current.forEach((light, i) => {
      if (light) {
        const material = light.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
      }
    });
  });

  return (
    <group ref={towerRef} position={position}>
      {/* Main tower */}
      <RoundedBox args={[1, 3, 0.8]} radius={0.05} smoothness={4} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#1A237E" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Windows grid */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <mesh
            key={`window-${row}-${col}`}
            ref={(el) => {
              if (el) lightRefs.current[row * 3 + col] = el;
            }}
            position={[-0.3 + col * 0.3, 0.5 + row * 0.4, 0.41]}
          >
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshStandardMaterial
              color="#C62828"
              emissive="#C62828"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))
      )}

      {/* Antenna */}
      <mesh position={[0, 3.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#424242" metalness={0.9} />
      </mesh>

      {/* Red beacon */}
      <Float speed={2} floatIntensity={0.1}>
        <mesh position={[0, 3.7, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#C62828" emissive="#C62828" emissiveIntensity={2} />
        </mesh>
      </Float>
      <pointLight position={[0, 3.7, 0]} color="#C62828" intensity={1} distance={2} />

      {/* Server racks at base */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={`server-${i}`} position={[x, 0.2, 0.5]}>
          <boxGeometry args={[0.2, 0.4, 0.3]} />
          <meshStandardMaterial color="#263238" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// =============================================================================
// LINUX PENGUIN (TUX) - Floating mascot
// =============================================================================
function LinuxPenguin({ position }: { position: [number, number, number] }) {
  const penguinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (penguinRef.current) {
      penguinRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={penguinRef} position={position} scale={0.6}>
        {/* Body */}
        <mesh position={[0, 0.4, 0]}>
          <capsuleGeometry args={[0.3, 0.4, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Belly */}
        <mesh position={[0, 0.35, 0.2]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#FFF8E1" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.08, 0.95, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.08, 0.95, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Pupils */}
        <mesh position={[-0.08, 0.95, 0.24]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.08, 0.95, 0.24]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Beak */}
        <mesh position={[0, 0.85, 0.25]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 4]} />
          <meshStandardMaterial color="#F9A825" />
        </mesh>

        {/* Feet */}
        <mesh position={[-0.12, 0, 0.1]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.15]} />
          <meshStandardMaterial color="#F9A825" />
        </mesh>
        <mesh position={[0.12, 0, 0.1]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.15]} />
          <meshStandardMaterial color="#F9A825" />
        </mesh>
      </group>
    </Float>
  );
}

// =============================================================================
// GROUND
// =============================================================================
function Ground() {
  return (
    <>
      {/* Village side - green grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -0.01, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>

      {/* Empire side - dark concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.01, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#263238" />
      </mesh>

      {/* Dividing line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[0.1, 8]} />
        <meshStandardMaterial color="#F9A825" emissive="#F9A825" emissiveIntensity={0.3} />
      </mesh>
    </>
  );
}

// =============================================================================
// SCENE CONTENT
// =============================================================================
function SceneContent() {
  return (
    <>
      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.3}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Village side lighting (warm) */}
      <pointLight position={[-3, 2, 2]} color="#F9A825" intensity={0.5} />

      {/* Empire side lighting (cold) */}
      <pointLight position={[3, 2, 2]} color="#C62828" intensity={0.3} />

      {/* Ground */}
      <Ground />

      {/* Village Side */}
      <group position={[-2, 0, 0]}>
        <VillageHut position={[0, 0, 0]} scale={0.8} />
        <VillageHut position={[-1.2, 0, 0.5]} scale={0.6} />
        <VillageHut position={[0.8, 0, -0.8]} scale={0.7} />
        <Cauldron position={[0.3, 0, 1]} />
        <Tree position={[-1.5, 0, -1]} scale={0.8} />
        <Tree position={[1.2, 0, -1.5]} scale={0.6} />
        <Tree position={[-0.5, 0, -1.8]} scale={0.7} />
      </group>

      {/* Linux Penguin (center, floating) */}
      <LinuxPenguin position={[0, 1.5, 1]} />

      {/* Empire Side */}
      <group position={[2.5, 0, 0]}>
        <CorporateTower position={[0, 0, 0]} />
      </group>

      {/* Village sparkles */}
      <Sparkles
        count={50}
        scale={[4, 3, 4]}
        position={[-2, 1, 0]}
        size={2}
        speed={0.3}
        color="#00997d"
      />

      {/* Stars in background */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.5} />
      </EffectComposer>

      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function VillageScene({
  className,
  height = '400px',
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div className={className} style={{ height, width: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3, 6], fov: 50 }}
        frameloop="demand"
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Lightweight version for smaller displays
export function VillageSceneMini({ className }: { className?: string }) {
  return (
    <div className={className} style={{ height: '200px', width: '100%' }}>
      <Canvas
        camera={{ position: [0, 2, 4], fov: 50 }}
        frameloop="demand"
        dpr={[1, 1]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <VillageHut position={[-1, 0, 0]} scale={0.5} />
          <LinuxPenguin position={[0.5, 0.5, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#2E7D32" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
