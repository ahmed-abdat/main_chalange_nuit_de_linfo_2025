'use client';

import React, { useRef, ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

// =============================================================================
// SCROLL PROGRESS BAR - Fixed at top
// =============================================================================
export function ScrollProgressBar({
  color = '#00997d',
  height = 4,
  glowColor,
}: {
  color?: string;
  height?: number;
  glowColor?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        scaleX,
        height,
        backgroundColor: color,
        boxShadow: glowColor ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` : 'none',
      }}
    />
  );
}

// =============================================================================
// PARALLAX SECTION - Background parallax effect
// =============================================================================
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y: smoothY }} className="relative">
        {children}
      </motion.div>
    </div>
  );
}

// =============================================================================
// SCROLL REVEAL - Reveals content as user scrolls
// =============================================================================
export function ScrollRevealSection({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// SCROLL SCALE - Scales content based on scroll position
// =============================================================================
export function ScrollScaleSection({
  children,
  className,
  scaleRange = [0.8, 1],
  opacityRange = [0.3, 1],
}: {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// SCROLL FADE - Progressive opacity based on scroll
// =============================================================================
export function ScrollFade({
  children,
  className,
  fadeIn = true,
  fadeOut = true,
}: {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [
    fadeIn ? 0 : 1,
    1,
    1,
    fadeOut ? 0 : 1,
  ]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// PARALLAX BACKGROUND - For background elements
// =============================================================================
export function ParallaxBackground({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

// =============================================================================
// SCROLL ROTATE - Rotates element based on scroll
// =============================================================================
export function ScrollRotate({
  children,
  className,
  rotateRange = [0, 360],
}: {
  children: ReactNode;
  className?: string;
  rotateRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// SCROLL TEXT REVEAL - Character by character reveal
// =============================================================================
export function ScrollTextReveal({
  text,
  className,
  highlightColor = '#00997d',
}: {
  text: string;
  className?: string;
  highlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className={cn('flex flex-wrap gap-2', className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            highlightColor={highlightColor}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  highlightColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlightColor: string;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ['inherit', highlightColor]);

  return (
    <motion.span style={{ opacity, color }} className="transition-colors">
      {children}
    </motion.span>
  );
}

// =============================================================================
// FLOATING NAV - Appears on scroll
// =============================================================================
export function FloatingNav({
  children,
  className,
  showAfter = 200,
}: {
  children: ReactNode;
  className?: string;
  showAfter?: number;
}) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on('change', (latest) => {
      setVisible(latest > showAfter);
    });
  }, [scrollY, showAfter]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('fixed top-0 left-0 right-0 z-50', className)}
    >
      {children}
    </motion.nav>
  );
}

// =============================================================================
// SCROLL PINNED - Pins content while scrolling
// =============================================================================
export function ScrollPinned({
  children,
  className,
  pinDuration = 1,
}: {
  children: ReactNode;
  className?: string;
  pinDuration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{ height: `${100 * pinDuration}vh` }}
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// =============================================================================
// STAGGER CHILDREN - Staggers children animations on scroll
// =============================================================================
export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// =============================================================================
// HORIZONTAL SCROLL - Horizontal scroll section
// =============================================================================
export function HorizontalScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <div ref={containerRef} className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SCROLL BLUR - Progressive blur based on scroll
// =============================================================================
export function ScrollBlur({
  children,
  className,
  maxBlur = 10,
}: {
  children: ReactNode;
  className?: string;
  maxBlur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, maxBlur]);

  return (
    <motion.div
      ref={ref}
      style={{ filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
