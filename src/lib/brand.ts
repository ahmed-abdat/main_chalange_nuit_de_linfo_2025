/**
 * VILLAGE NIRD - Brand Identity System
 * La Nuit de l'Info 2025
 *
 * This file defines the consistent brand identity for the project.
 * Use these values across all components for consistency.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary - Village/NIRD (Green = Resistance, Freedom, Linux)
  primary: {
    emerald: '#00997d',      // Main brand color - use for CTAs, highlights
    emeraldDark: '#007d66',  // Hover states
    emeraldLight: '#00b894', // Accents
    forest: '#2E7D32',       // Secondary green
  },

  // Accent - Gold (Magic Potion, Success)
  accent: {
    gold: '#F9A825',         // Highlights, badges
    goldLight: '#FFD54F',    // Softer accents
    amber: '#d97706',        // Alternative warm
  },

  // Danger - Empire/Big Tech (Red = Warning, Enemy)
  danger: {
    red: '#C62828',          // Alerts, enemy references
    redDark: '#B71C1C',      // Hover states
    redLight: '#EF5350',     // Softer warnings
  },

  // Neutral - Text & Backgrounds
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    gray950: '#030712',
  },

  // Special - Thematic
  special: {
    parchment: '#FFF8E1',    // Asterix narrative theme
    wood: '#8D4513',         // Village elements
    darkBlue: '#1A237E',     // Empire/corporate
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fonts = {
  // Primary - Modern, warm, great for French
  sans: 'Outfit, system-ui, sans-serif',

  // Display - Bold headlines (use sparingly)
  display: 'Outfit, system-ui, sans-serif',

  // Mono - Code, tech elements, "hacker" vibe
  mono: 'JetBrains Mono, Fira Code, monospace',

  // Serif - Narrative/storytelling sections (Asterix theme)
  serif: 'Source Serif 4, Georgia, serif',
} as const;

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

// =============================================================================
// SPACING & SIZING
// =============================================================================

export const spacing = {
  section: 'py-20 px-6',           // Consistent section padding
  container: 'max-w-5xl mx-auto',  // Main content width
  containerNarrow: 'max-w-3xl mx-auto',
  containerWide: 'max-w-6xl mx-auto',
} as const;

export const borderRadius = {
  sm: '0.375rem',   // 6px - small elements
  md: '0.5rem',     // 8px - buttons, inputs
  lg: '0.75rem',    // 12px - cards
  xl: '1rem',       // 16px - large cards
  '2xl': '1.5rem',  // 24px - hero elements
  full: '9999px',   // Pills, badges
} as const;

// =============================================================================
// RECOMMENDED COMPONENTS
// =============================================================================

/**
 * TIER 1 - Core Components (Always use these)
 * These create the main visual identity
 */
export const coreComponents = {
  text: {
    BlurText: 'Hero titles - blur-in reveal effect',
    SplitText: 'Narrative text - character by character reveal',
    CountUp: 'Statistics - animated number counters',
  },
  layout: {
    GridPattern: 'Subtle background pattern',
  },
  interaction: {
    motion: 'All animations via motion/react (Framer Motion)',
  },
} as const;

/**
 * TIER 2 - Accent Components (Use for WOW moments)
 * These add visual interest but use sparingly
 */
export const accentComponents = {
  backgrounds: {
    Squares: 'Animated grid - tech/digital sections',
    Waves: 'Flowing lines - organic feel',
    Particles: 'Floating particles - magical feel',
  },
  effects: {
    Shuffle: 'Text scramble - hacker/matrix vibe',
    ClickSpark: 'Click feedback sparkles',
    Magnet: 'Magnetic hover on buttons',
  },
  cards: {
    GlareHover: 'Subtle 3D tilt on hover',
    PixelCard: 'Retro pixel aesthetic',
  },
} as const;

/**
 * TIER 3 - Special Use (Specific contexts only)
 */
export const specialComponents = {
  narrative: {
    ScrollReveal: 'Scroll-triggered reveals',
    FadeContent: 'Simple fade transitions',
  },
  gaming: {
    RetroGrid: 'Retro synthwave grid - game sections',
    Stepper: 'Multi-step wizards',
  },
} as const;

// =============================================================================
// COMPONENT USAGE RULES
// =============================================================================

export const usageRules = {
  hero: {
    primary: ['BlurText', 'GridPattern'],
    optional: ['Particles', 'Waves'],
    avoid: ['RetroGrid', 'Shuffle'], // Too heavy for hero
  },
  sections: {
    primary: ['motion', 'CountUp', 'SplitText'],
    optional: ['ScrollReveal', 'FadeContent'],
    avoid: ['Squares', 'Particles'], // Save for special moments
  },
  interactive: {
    primary: ['motion', 'ClickSpark'],
    optional: ['Magnet', 'GlareHover'],
    avoid: ['Heavy canvas animations'],
  },
} as const;

// =============================================================================
// CSS CLASS HELPERS
// =============================================================================

export const classes = {
  // Text styles
  heroTitle: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  sectionTitle: 'text-2xl md:text-3xl font-bold',
  subtitle: 'text-lg md:text-xl text-gray-600',
  body: 'text-base text-gray-600 leading-relaxed',

  // Button styles
  btnPrimary: 'px-8 py-4 bg-[#00997d] text-white font-semibold rounded-xl hover:bg-[#007d66] transition-all',
  btnSecondary: 'px-8 py-4 bg-gray-100 text-gray-900 font-medium rounded-xl hover:bg-gray-200 transition-all',
  btnOutline: 'px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-[#00997d] hover:text-[#00997d] transition-all',

  // Card styles
  card: 'p-6 bg-white rounded-xl border border-gray-100 shadow-sm',
  cardHover: 'hover:border-gray-200 hover:shadow-md transition-all',

  // Badge styles
  badge: 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full',
  badgeAlert: 'bg-[#C62828]/10 text-[#C62828]',
  badgeSuccess: 'bg-[#00997d]/10 text-[#00997d]',
  badgeWarning: 'bg-[#F9A825]/10 text-[#F9A825]',
} as const;
