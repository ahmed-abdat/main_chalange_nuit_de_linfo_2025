'use client';

import React, { ReactNode, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { cn } from '@/lib/utils';

interface Wrapper3DProps {
  children: ReactNode;
  damping?: number;
  stiffness?: number;
  mass?: number;
  maxRotation?: number;
  translateZ?: number;
  perspective?: boolean;
  className?: string;
  glowColor?: string;
  enableGlow?: boolean;
}

export function Wrapper3D({
  children,
  damping = 25,
  stiffness = 150,
  mass = 0.5,
  maxRotation = 15,
  translateZ = 50,
  perspective = true,
  className,
  glowColor = '#00997d',
  enableGlow = true,
}: Wrapper3DProps) {
  const halfMaxRotation = maxRotation / 2;
  const refMotionDiv = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const xSpring = useSpring(x, { damping, stiffness, mass });
  const ySpring = useSpring(y, { damping, stiffness, mass });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  const glowPosition = useMotionTemplate`${glowX}% ${glowY}%`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!refMotionDiv.current) return;

    const rect = refMotionDiv.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / rect.height) * maxRotation - halfMaxRotation) * -1;
    const rY = (mouseX / rect.width) * maxRotation - halfMaxRotation;

    x.set(rX);
    y.set(rY);

    // Update glow position
    glowX.set((mouseX / rect.width) * 100);
    glowY.set((mouseY / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={refMotionDiv}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
        ...(perspective && { perspective: '1000px' }),
      }}
      className={cn('relative', className)}
    >
      {/* Glow effect */}
      {enableGlow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${glowPosition}, ${glowColor}20, transparent 40%)`,
          }}
        />
      )}
      <div
        style={{
          transform: `translateZ(${translateZ}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Simpler floating animation wrapper
export function FloatingElement({
  children,
  className,
  duration = 3,
  distance = 10,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
