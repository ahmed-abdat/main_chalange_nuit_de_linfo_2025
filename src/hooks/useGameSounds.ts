'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType =
  | 'click'
  | 'success'
  | 'error'
  | 'match'
  | 'flip'
  | 'victory'
  | 'levelUp'
  | 'countdown'
  | 'type'
  | 'shoot'
  | 'hit'
  | 'gameOver';

type HapticIntensity = 'light' | 'medium' | 'heavy';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
  frequencies?: number[];
  delays?: number[];
  haptic?: HapticIntensity;
}

// Haptic patterns for each sound type
const HAPTIC_PATTERNS: Record<HapticIntensity, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: [50, 30, 50],
};

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  click: { frequency: 600, duration: 0.05, type: 'sine', volume: 0.12, haptic: 'light' },
  success: { frequency: 880, duration: 0.15, type: 'sine', volume: 0.18, haptic: 'medium' },
  error: { frequency: 200, duration: 0.2, type: 'sawtooth', volume: 0.12, haptic: 'medium' },
  match: { frequency: 523, duration: 0.1, type: 'sine', volume: 0.18, frequencies: [523, 659, 784], delays: [0, 0.08, 0.16], haptic: 'medium' },
  flip: { frequency: 400, duration: 0.05, type: 'sine', volume: 0.08, haptic: 'light' },
  victory: { frequency: 523, duration: 0.15, type: 'sine', volume: 0.22, frequencies: [523, 659, 784, 1047], delays: [0, 0.12, 0.24, 0.36], haptic: 'heavy' },
  levelUp: { frequency: 440, duration: 0.1, type: 'sine', volume: 0.18, frequencies: [440, 554, 659], delays: [0, 0.1, 0.2], haptic: 'heavy' },
  countdown: { frequency: 440, duration: 0.1, type: 'sine', volume: 0.12, haptic: 'light' },
  type: { frequency: 800, duration: 0.02, type: 'square', volume: 0.03, haptic: 'light' },
  shoot: { frequency: 150, duration: 0.1, type: 'sawtooth', volume: 0.08, haptic: 'light' },
  hit: { frequency: 100, duration: 0.15, type: 'square', volume: 0.1, haptic: 'medium' },
  gameOver: { frequency: 200, duration: 0.3, type: 'sawtooth', volume: 0.18, frequencies: [200, 150, 100], delays: [0, 0.2, 0.4], haptic: 'heavy' },
};

// Haptic feedback helper
function triggerHaptic(intensity: HapticIntensity) {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;

  try {
    const pattern = HAPTIC_PATTERNS[intensity];
    navigator.vibrate(pattern);
  } catch {
    // Vibration API not supported or blocked
  }
}

interface UseGameSoundsOptions {
  soundEnabled?: boolean;
  hapticEnabled?: boolean;
}

export function useGameSounds(options: UseGameSoundsOptions = {}) {
  const { soundEnabled = true, hapticEnabled = true } = options;

  const audioContextRef = useRef<AudioContext | null>(null);
  const lastPlayedRef = useRef<number>(0);
  const minInterval = 30; // Slightly increased to reduce sound spam

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const playTone = useCallback((
    ctx: AudioContext,
    frequency: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    startTime: number = 0
  ) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime + startTime);
    oscillator.stop(ctx.currentTime + startTime + duration + 0.01);
  }, []);

  const play = useCallback((soundType: SoundType) => {
    const config = SOUND_CONFIGS[soundType];

    // Always try haptic feedback first (more subtle)
    if (hapticEnabled && config.haptic) {
      triggerHaptic(config.haptic);
    }

    // Sound is secondary and optional
    if (!soundEnabled) return;

    // Throttle sounds
    const now = Date.now();
    if (now - lastPlayedRef.current < minInterval) return;
    lastPlayedRef.current = now;

    try {
      const ctx = getAudioContext();

      if (config.frequencies && config.delays) {
        config.frequencies.forEach((freq, i) => {
          playTone(ctx, freq, config.duration, config.type, config.volume, config.delays![i]);
        });
      } else {
        playTone(ctx, config.frequency, config.duration, config.type, config.volume);
      }
    } catch {
      // Silently fail
    }
  }, [soundEnabled, hapticEnabled, getAudioContext, playTone]);

  // Haptic-only function for subtle feedback
  const vibrate = useCallback((intensity: HapticIntensity = 'light') => {
    if (hapticEnabled) {
      triggerHaptic(intensity);
    }
  }, [hapticEnabled]);

  return { play, vibrate };
}

// Standalone function
let sharedContext: AudioContext | null = null;

export function playGameSound(
  soundType: SoundType,
  options: { sound?: boolean; haptic?: boolean } = {}
) {
  const { sound = true, haptic = true } = options;
  const config = SOUND_CONFIGS[soundType];

  // Haptic first
  if (haptic && config.haptic) {
    triggerHaptic(config.haptic);
  }

  if (!sound) return;

  try {
    if (!sharedContext) {
      sharedContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    if (sharedContext.state === 'suspended') {
      sharedContext.resume();
    }

    const ctx = sharedContext;

    const playTone = (frequency: number, startTime: number = 0) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gainNode.gain.linearRampToValueAtTime(config.volume, ctx.currentTime + startTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + config.duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime + startTime);
      oscillator.stop(ctx.currentTime + startTime + config.duration + 0.01);
    };

    if (config.frequencies && config.delays) {
      config.frequencies.forEach((freq, i) => {
        playTone(freq, config.delays![i]);
      });
    } else {
      playTone(config.frequency);
    }
  } catch {
    // Silently fail
  }
}
