'use client';

import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  Html,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Text,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import CountUp from '@/components/CountUp';

// =============================================================================
// TYPES
// =============================================================================
type GameState = 'idle' | 'hovering' | 'plugging' | 'installing' | 'booting' | 'success';

interface Laptop3DGameProps {
  onComplete?: () => void;
}

// =============================================================================
// LAPTOP MODEL - Simple geometric laptop
// =============================================================================
function Laptop({
  screenContent,
  isLidOpen = true,
  glowColor = '#C62828',
}: {
  screenContent: React.ReactNode;
  isLidOpen?: boolean;
  glowColor?: string;
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  // Subtle floating animation
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Base/Keyboard */}
      <RoundedBox args={[3, 0.15, 2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Keyboard area */}
      <RoundedBox args={[2.6, 0.02, 1.4]} radius={0.02} smoothness={2} position={[0, 0.08, 0.15]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox args={[0.8, 0.01, 0.5]} radius={0.02} smoothness={2} position={[0, 0.08, 0.7]}>
        <meshStandardMaterial color="#252525" metalness={0.5} roughness={0.5} />
      </RoundedBox>

      {/* USB Port indicator (glowing) */}
      <mesh position={[1.5, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.06, 0.15]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Screen/Lid */}
      <group ref={lidRef} position={[0, 0.075, -0.95]} rotation={[-0.3, 0, 0]}>
        {/* Lid back */}
        <RoundedBox args={[3, 2, 0.1]} radius={0.05} smoothness={4} position={[0, 1, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox args={[2.8, 1.85, 0.02]} radius={0.02} smoothness={2} position={[0, 1, 0.05]}>
          <meshStandardMaterial color="#0a0a0a" />
        </RoundedBox>

        {/* Screen (with HTML content) */}
        <Html
          transform
          occlude
          position={[0, 1, 0.08]}
          rotation={[0, 0, 0]}
          style={{
            width: '350px',
            height: '220px',
            backgroundColor: '#000',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {screenContent}
        </Html>

        {/* Screen glow effect */}
        <pointLight
          position={[0, 1, 0.5]}
          color={glowColor}
          intensity={0.5}
          distance={3}
        />
      </group>
    </group>
  );
}

// =============================================================================
// USB DRIVE - Interactive 3D USB
// =============================================================================
function USBDrive({
  position,
  onDrag,
  isNearPort,
  gameState,
}: {
  position: [number, number, number];
  onDrag: (pos: THREE.Vector3) => void;
  isNearPort: boolean;
  gameState: GameState;
}) {
  const usbRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { camera, gl } = useThree();

  useFrame((state) => {
    if (usbRef.current && !isDragging && gameState === 'idle') {
      // Floating animation when idle
      usbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      usbRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (gameState === 'idle') {
      setIsDragging(true);
      gl.domElement.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gl.domElement.style.cursor = 'grab';
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && usbRef.current) {
      // Simple drag on XY plane
      const intersectPoint = e.point;
      if (intersectPoint) {
        usbRef.current.position.x = intersectPoint.x;
        usbRef.current.position.y = Math.max(0.2, intersectPoint.y);
        onDrag(usbRef.current.position);
      }
    }
  };

  if (gameState !== 'idle' && gameState !== 'hovering') {
    return null; // Hide USB after plugging
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={usbRef}
        position={position}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={() => gl.domElement.style.cursor = 'grab'}
        onPointerOut={() => gl.domElement.style.cursor = 'default'}
      >
        {/* USB Body */}
        <RoundedBox args={[0.4, 0.8, 0.15]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#00997d"
            metalness={0.5}
            roughness={0.3}
            emissive={isNearPort ? '#00997d' : '#000'}
            emissiveIntensity={isNearPort ? 1 : 0}
          />
        </RoundedBox>

        {/* USB Connector */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.25, 0.2, 0.08]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Linux Logo placeholder */}
        <Text
          position={[0, -0.1, 0.09]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          🐧
        </Text>

        {/* Glow when near port */}
        {isNearPort && (
          <pointLight color="#00997d" intensity={2} distance={1} />
        )}
      </group>
    </Float>
  );
}

// =============================================================================
// SCREEN CONTENTS
// =============================================================================
function WindowsErrorScreen() {
  return (
    <div className="w-full h-full bg-[#0078D4] flex flex-col items-center justify-center p-4 text-white">
      <div className="text-5xl mb-4">:(</div>
      <p className="text-sm font-bold mb-2">Votre PC a rencontré un problème</p>
      <p className="text-xs opacity-70 mb-4">WINDOWS_10_END_OF_SUPPORT</p>
      <div className="text-[10px] opacity-50 animate-pulse">
        Support terminé : 14 Octobre 2025
      </div>
      <div className="mt-4 text-[8px] opacity-40">
        Arrêt du code : OBSOLESCENCE_PROGRAMMÉE
      </div>
    </div>
  );
}

function InstallingScreen({ progress }: { progress: number }) {
  const messages = [
    'Détection du matériel...',
    'Copie des fichiers système...',
    'Installation de Linux NIRD...',
    'Configuration du bureau...',
    'Installation des logiciels libres...',
    'Finalisation...',
  ];

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#00997d] flex items-center justify-center">
          <span className="text-sm">🐧</span>
        </div>
        <span className="text-white text-sm font-mono">Linux NIRD</span>
      </div>

      <div className="w-full max-w-[280px] h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00997d] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-[10px] text-gray-400 mt-3 font-mono">
        {messages[Math.min(Math.floor(progress / 17), messages.length - 1)]}
      </p>

      <p className="text-sm text-[#00997d] mt-2 font-bold">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

function BootingScreen() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#00997d] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#00997d] text-xs mt-4 font-mono">Démarrage de Linux...</p>
    </div>
  );
}

function LinuxDesktopScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#2E7D32] to-[#1B5E20] p-2 relative">
      {/* Desktop icons */}
      <div className="flex gap-2 flex-wrap">
        {['📁', '🌐', '📝', '🖼️', '🎵'].map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-lg animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Success badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-white text-sm font-bold">LIBRE !</p>
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1a1a1d] flex items-center px-2 gap-2">
        <div className="w-4 h-4 bg-[#00997d] rounded-sm flex items-center justify-center">
          <span className="text-[8px]">🐧</span>
        </div>
        <span className="text-[8px] text-white">Linux NIRD</span>
      </div>
    </div>
  );
}

// =============================================================================
// SCENE
// =============================================================================
function Scene({
  gameState,
  setGameState,
  installProgress,
}: {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  installProgress: number;
}) {
  const [usbNearPort, setUsbNearPort] = useState(false);

  const handleUSBDrag = (pos: THREE.Vector3) => {
    // Check if USB is near the port (right side of laptop)
    const nearPort = pos.x > 1.2 && pos.x < 2 && pos.y < 0.5 && pos.y > -0.3;
    setUsbNearPort(nearPort);

    if (nearPort && gameState === 'idle') {
      setGameState('hovering');
    } else if (!nearPort && gameState === 'hovering') {
      setGameState('idle');
    }

    // If very close, trigger plug in
    if (pos.x > 1.4 && pos.y < 0.3 && pos.y > -0.1 && gameState === 'hovering') {
      setGameState('plugging');
    }
  };

  const getScreenContent = () => {
    switch (gameState) {
      case 'idle':
      case 'hovering':
        return <WindowsErrorScreen />;
      case 'plugging':
      case 'installing':
        return <InstallingScreen progress={installProgress} />;
      case 'booting':
        return <BootingScreen />;
      case 'success':
        return <LinuxDesktopScreen />;
      default:
        return <WindowsErrorScreen />;
    }
  };

  const getGlowColor = () => {
    switch (gameState) {
      case 'idle':
        return '#C62828';
      case 'hovering':
        return '#F9A825';
      case 'installing':
      case 'booting':
        return '#F9A825';
      case 'success':
        return '#00997d';
      default:
        return '#C62828';
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00997d" />

      {/* Laptop */}
      <Laptop
        screenContent={getScreenContent()}
        glowColor={getGlowColor()}
      />

      {/* USB Drive */}
      <USBDrive
        position={[2.5, 0.5, 1.5]}
        onDrag={handleUSBDrag}
        isNearPort={usbNearPort}
        gameState={gameState}
      />


      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1d" />
      </mesh>

      {/* Environment */}
      <Environment preset="city" />

      {/* Post-processing */}
      {gameState === 'plugging' ? (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            intensity={0.5}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.002, 0.002)}
          />
        </EffectComposer>
      ) : (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            intensity={gameState === 'success' ? 1.5 : 0.5}
          />
        </EffectComposer>
      )}
    </>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function Laptop3DGame({ onComplete }: Laptop3DGameProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [installProgress, setInstallProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Handle game state transitions
  useEffect(() => {
    if (gameState === 'plugging') {
      // Brief delay then start installing
      const timeout = setTimeout(() => {
        setGameState('installing');
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (gameState === 'installing') {
      // Progress animation
      const interval = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setGameState('booting');
            return 100;
          }
          return prev + Math.random() * 8 + 3;
        });
      }, 200);
      return () => clearInterval(interval);
    }

    if (gameState === 'booting') {
      const timeout = setTimeout(() => {
        setGameState('success');
        setShowStats(true);
        onComplete?.();
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [gameState, onComplete]);

  const resetGame = () => {
    setGameState('idle');
    setInstallProgress(0);
    setShowStats(false);
  };

  return (
    <div className="relative w-full">
      {/* 3D Canvas */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene
              gameState={gameState}
              setGameState={setGameState}
              installProgress={installProgress}
            />
          </Suspense>
        </Canvas>

        {/* Instruction overlay */}
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-[#00997d]/30"
            >
              <p className="text-white text-sm">
                🖱️ <span className="text-[#F9A825] font-bold">Glissez</span> la clé USB vers le port du PC
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State indicators */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            gameState === 'idle' ? 'bg-[#C62828]' :
            gameState === 'success' ? 'bg-[#00997d]' :
            'bg-[#F9A825] animate-pulse'
          }`} />
          <span className="text-white text-xs font-mono">
            {gameState === 'idle' && 'Windows EOL'}
            {gameState === 'hovering' && 'Prêt à insérer'}
            {gameState === 'plugging' && 'Connexion...'}
            {gameState === 'installing' && `Installation ${Math.round(installProgress)}%`}
            {gameState === 'booting' && 'Démarrage...'}
            {gameState === 'success' && 'Linux NIRD'}
          </span>
        </div>
      </div>

      {/* Success Stats */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mt-8"
          >
            <div className="bg-[#00997d]/20 border border-[#00997d]/50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white text-center mb-6">
                🎉 PC Libéré avec succès !
              </h4>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CountUp to={600} duration={2} className="text-3xl font-black text-[#F9A825]" />
                    <span className="text-xl text-[#F9A825]">€</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Économisés</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CountUp to={300} duration={2} className="text-3xl font-black text-[#2E7D32]" />
                    <span className="text-xl text-[#2E7D32]">kg</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">CO2 évités</p>
                </div>

                <div className="text-center">
                  <span className="text-3xl font-black text-[#00997d]">+5</span>
                  <p className="text-sm text-gray-400 mt-1">Années de vie</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-300 text-sm mb-4">
                  Votre ordinateur peut maintenant fonctionner librement, partout dans le monde !
                </p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-[#00997d] text-white font-bold rounded-xl hover:bg-[#00997d]/80 transition-colors"
                >
                  🔄 Rejouer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
