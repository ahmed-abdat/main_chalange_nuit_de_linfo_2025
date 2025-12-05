'use client';

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

// =============================================================================
// PARTICLE SYSTEM
// =============================================================================
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'circle' | 'square' | 'star' | 'spark';
}

interface ParticleSystemProps {
  particles: Particle[];
  className?: string;
}

export function ParticleSystem({ particles, className }: ParticleSystemProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {particles.map(p => {
        const opacity = p.life / p.maxLife;
        const scale = 0.5 + (p.life / p.maxLife) * 0.5;

        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.type === 'spark' ? 'transparent' : p.color,
              borderRadius: p.type === 'circle' ? '50%' : p.type === 'star' ? '0' : '2px',
              opacity,
              transform: `scale(${scale}) rotate(${p.id * 45}deg)`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              ...(p.type === 'spark' ? {
                background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                height: 2,
                width: p.size * 3
              } : {})
            }}
          />
        );
      })}
    </div>
  );
}

// Particle spawner hook
export function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const spawn = useCallback((config: {
    x: number;
    y: number;
    count: number;
    colors: string[];
    spread?: number;
    speed?: number;
    size?: number;
    type?: Particle['type'];
    lifetime?: number;
  }) => {
    const newParticles: Particle[] = [];
    const {
      x, y, count, colors,
      spread = 50,
      speed = 3,
      size = 6,
      type = 'circle',
      lifetime = 60
    } = config;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const velocity = speed * (0.5 + Math.random() * 0.5);

      newParticles.push({
        id: ++idRef.current,
        x: x + (Math.random() - 0.5) * spread * 0.5,
        y: y + (Math.random() - 0.5) * spread * 0.5,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size * (0.5 + Math.random() * 0.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: lifetime,
        maxLife: lifetime,
        type
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Update loop
  useEffect(() => {
    const update = () => {
      setParticles(prev => {
        if (prev.length === 0) return prev;

        return prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // Gravity
            life: p.life - 1
          }))
          .filter(p => p.life > 0);
      });

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { particles, spawn };
}

// =============================================================================
// EXPLOSION EFFECT
// =============================================================================
interface ExplosionProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  onComplete?: () => void;
}

export function Explosion({ x, y, color = '#F9A825', size = 60, onComplete }: ExplosionProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute pointer-events-none"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
    >
      {/* Core */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, white 0%, ${color} 40%, transparent 70%)`,
        }}
      />
      {/* Ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
      />
      {/* Sparks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((Math.PI * 2 * i) / 8) * size,
            y: Math.sin((Math.PI * 2 * i) / 8) * size,
            opacity: 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full -ml-1 -mt-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </motion.div>
  );
}

// =============================================================================
// SCREEN SHAKE
// =============================================================================
interface ScreenShakeContextType {
  shake: (intensity?: number, duration?: number) => void;
  offset: { x: number; y: number };
}

const ScreenShakeContext = createContext<ScreenShakeContextType>({
  shake: () => {},
  offset: { x: 0, y: 0 }
});

export function useScreenShake() {
  return useContext(ScreenShakeContext);
}

interface ScreenShakeProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function ScreenShakeProvider({ children, className }: ScreenShakeProviderProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const shakeRef = useRef<NodeJS.Timeout | null>(null);

  const shake = useCallback((intensity = 10, duration = 200) => {
    let elapsed = 0;
    const interval = 16;

    const doShake = () => {
      elapsed += interval;
      if (elapsed >= duration) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const decay = 1 - elapsed / duration;
      setOffset({
        x: (Math.random() - 0.5) * intensity * decay * 2,
        y: (Math.random() - 0.5) * intensity * decay * 2
      });

      shakeRef.current = setTimeout(doShake, interval);
    };

    if (shakeRef.current) clearTimeout(shakeRef.current);
    doShake();
  }, []);

  useEffect(() => {
    return () => {
      if (shakeRef.current) clearTimeout(shakeRef.current);
    };
  }, []);

  return (
    <ScreenShakeContext.Provider value={{ shake, offset }}>
      <div
        className={className}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`
        }}
      >
        {children}
      </div>
    </ScreenShakeContext.Provider>
  );
}

// =============================================================================
// COMBO COUNTER
// =============================================================================
interface ComboCounterProps {
  combo: number;
  className?: string;
}

export function ComboCounter({ combo, className }: ComboCounterProps) {
  if (combo < 2) return null;

  const colors = ['#00d9a7', '#F9A825', '#ff6b6b', '#9C27B0'];
  const colorIndex = Math.min(combo - 2, colors.length - 1);

  return (
    <motion.div
      key={combo}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0 }}
      className={cn(
        "fixed z-50 flex items-center gap-2 px-4 py-2 rounded-full font-black",
        className
      )}
      style={{
        backgroundColor: `${colors[colorIndex]}30`,
        borderColor: colors[colorIndex],
        borderWidth: 2,
        color: colors[colorIndex]
      }}
    >
      <span className="text-2xl">{combo}x</span>
      <span className="text-sm uppercase tracking-wider">Combo!</span>

      {/* Pulse ring */}
      <motion.div
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.4, repeat: Infinity }}
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: colors[colorIndex] }}
      />
    </motion.div>
  );
}

// =============================================================================
// SPEED LINES (for fast typing)
// =============================================================================
interface SpeedLinesProps {
  active: boolean;
  intensity?: number;
  className?: string;
}

export function SpeedLines({ active, intensity = 1, className }: SpeedLinesProps) {
  if (!active) return null;

  const lineCount = Math.floor(20 * intensity);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {Array.from({ length: lineCount }).map((_, i) => {
        const y = (100 / lineCount) * i;
        const delay = Math.random() * 0.5;
        const width = 50 + Math.random() * 100;

        return (
          <motion.div
            key={i}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '-100%', opacity: [0, 0.3, 0] }}
            transition={{
              duration: 0.3,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 0.5
            }}
            className="absolute h-px bg-gradient-to-l from-transparent via-white to-transparent"
            style={{
              top: `${y}%`,
              width: `${width}px`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        );
      })}
    </div>
  );
}

// =============================================================================
// GLOW PULSE
// =============================================================================
interface GlowPulseProps {
  color?: string;
  size?: number;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GlowPulse({
  color = '#00997d',
  size = 20,
  active = true,
  className,
  children
}: GlowPulseProps) {
  return (
    <div className={cn("relative", className)}>
      {active && (
        <motion.div
          animate={{
            boxShadow: [
              `0 0 ${size}px ${color}40`,
              `0 0 ${size * 2}px ${color}60`,
              `0 0 ${size}px ${color}40`
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-inherit"
        />
      )}
      {children}
    </div>
  );
}

// =============================================================================
// FLOATING TEXT (damage numbers, +points, etc.)
// =============================================================================
interface FloatingTextProps {
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

export function FloatingText({
  x, y, text, color = '#F9A825', size = 'md', onComplete
}: FloatingTextProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const fontSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 0.5 }}
      animate={{ y: -40, opacity: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={cn(
        "absolute pointer-events-none font-black",
        fontSize
      )}
      style={{
        left: x,
        top: y,
        color,
        textShadow: `0 0 10px ${color}`
      }}
    >
      {text}
    </motion.div>
  );
}

// =============================================================================
// ENHANCED CONFETTI (with more variety)
// =============================================================================
interface EnhancedConfettiProps {
  active: boolean;
  colors?: string[];
  count?: number;
}

export function EnhancedConfetti({
  active,
  colors = ['#00997d', '#F9A825', '#4CAF50', '#00d9a7', '#FFD700', '#ff6b6b'],
  count = 50
}: EnhancedConfettiProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const isShape = Math.random() > 0.5;
        const size = 4 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: `${Math.random() * 100}%`,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: '110vh',
              rotate: Math.random() * 1440 - 720,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.8,
              ease: 'linear'
            }}
            className="absolute"
            style={{
              width: size,
              height: isShape ? size : size / 3,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              borderRadius: isShape && Math.random() > 0.5 ? '50%' : '2px'
            }}
          />
        );
      })}

      {/* Big sparkles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            y: -20,
            x: `${10 + Math.random() * 80}%`,
            scale: 0
          }}
          animate={{
            y: '50vh',
            scale: [0, 1.5, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + Math.random() * 0.5,
            ease: 'easeOut'
          }}
          className="absolute w-4 h-4"
        >
          <svg viewBox="0 0 24 24" fill={colors[i % colors.length]}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// PROGRESS RING
// =============================================================================
interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 4,
  color = '#00997d',
  bgColor = '#ffffff20',
  className,
  children
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CHARACTER MASCOT
// =============================================================================
interface CharacterMascotProps {
  character: 'panoramix' | 'asterix' | 'obelix' | 'idefix';
  mood: 'idle' | 'happy' | 'thinking' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CHARACTER_EMOJIS = {
  panoramix: '🧙‍♂️',
  asterix: '⚔️',
  obelix: '🪨',
  idefix: '🐕'
};

const CHARACTER_COLORS = {
  panoramix: '#00997d',
  asterix: '#F9A825',
  obelix: '#4a90d9',
  idefix: '#8B4513'
};

export function CharacterMascot({
  character,
  mood,
  size = 'md',
  className
}: CharacterMascotProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl'
  };

  const moodAnimations = {
    idle: { y: [0, -5, 0] },
    happy: { rotate: [-5, 5, -5], scale: [1, 1.1, 1] },
    thinking: { rotate: [0, 5, 0] },
    excited: { y: [0, -10, 0], scale: [1, 1.2, 1] }
  };

  return (
    <motion.div
      animate={moodAnimations[mood]}
      transition={{ duration: 1, repeat: Infinity }}
      className={cn(
        "rounded-full flex items-center justify-center shadow-lg",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `${CHARACTER_COLORS[character]}30`,
        border: `3px solid ${CHARACTER_COLORS[character]}`
      }}
    >
      <span>{CHARACTER_EMOJIS[character]}</span>
    </motion.div>
  );
}

// =============================================================================
// DAMAGE FLASH
// =============================================================================
interface DamageFlashProps {
  active: boolean;
  color?: string;
}

export function DamageFlash({ active, color = '#ff0000' }: DamageFlashProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{ backgroundColor: color }}
        />
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// KEYBOARD VISUALIZATION
// =============================================================================
interface KeyboardVisualizerProps {
  currentKey?: string;
  className?: string;
}

const KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  [' '] // Space bar
];

export function KeyboardVisualizer({ currentKey, className }: KeyboardVisualizerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-0.5">
          {row.map((key) => {
            const isActive = currentKey?.toLowerCase() === key.toLowerCase();
            const isSpace = key === ' ';

            return (
              <motion.div
                key={key}
                animate={isActive ? { scale: 0.9, backgroundColor: '#00997d' } : {}}
                className={cn(
                  "flex items-center justify-center rounded text-[8px] font-mono transition-colors",
                  isSpace ? "w-24 h-4" : "w-4 h-4",
                  isActive
                    ? "bg-[#00997d] text-white"
                    : "bg-gray-800 text-gray-500 border border-gray-700"
                )}
              >
                {isSpace ? 'SPACE' : key.toUpperCase()}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
