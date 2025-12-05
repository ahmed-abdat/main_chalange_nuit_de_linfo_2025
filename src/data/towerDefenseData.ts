// Tower Defense Game Data
// Enemies, Towers, and Wave configurations

export type EnemyType = 'tracker' | 'ad' | 'obsolescence' | 'telemetry' | 'boss';
export type TowerType = 'firewall' | 'adblock' | 'linux' | 'shield';

export interface EnemyConfig {
  type: EnemyType;
  name: string;
  description: string;
  health: number;
  speed: number; // pixels per frame
  reward: number; // coins earned when destroyed
  color: string;
  icon: string; // emoji or icon name
}

export interface TowerConfig {
  type: TowerType;
  name: string;
  description: string;
  cost: number;
  damage: number;
  range: number; // pixels
  fireRate: number; // shots per second
  color: string;
  icon: string;
}

export interface WaveConfig {
  waveNumber: number;
  enemies: { type: EnemyType; count: number; delay: number }[];
  bonus: number;
}

export const ENEMIES: Record<EnemyType, EnemyConfig> = {
  tracker: {
    type: 'tracker',
    name: 'Tracker',
    description: 'Collecteur de données - rapide mais fragile',
    health: 30,
    speed: 2.5,
    reward: 15,
    color: '#9C27B0',
    icon: 'eye'
  },
  ad: {
    type: 'ad',
    name: 'Publicite Invasive',
    description: 'Pub intrusive - vitesse moyenne',
    health: 50,
    speed: 1.8,
    reward: 20,
    color: '#FF5722',
    icon: 'megaphone'
  },
  obsolescence: {
    type: 'obsolescence',
    name: 'Obsolescence',
    description: 'Obsolescence programmee - lent mais resistant',
    health: 100,
    speed: 1.0,
    reward: 35,
    color: '#607D8B',
    icon: 'timer-off'
  },
  telemetry: {
    type: 'telemetry',
    name: 'Telemetrie',
    description: 'Espion silencieux - moyen',
    health: 60,
    speed: 1.5,
    reward: 25,
    color: '#795548',
    icon: 'radio-tower'
  },
  boss: {
    type: 'boss',
    name: 'Microsoft Empire',
    description: 'Le boss final - tres resistant',
    health: 500,
    speed: 0.5,
    reward: 200,
    color: '#0078D4',
    icon: 'crown'
  }
};

export const TOWERS: Record<TowerType, TowerConfig> = {
  firewall: {
    type: 'firewall',
    name: 'Firewall Tux',
    description: 'Bloque les trackers - degats rapides',
    cost: 50,
    damage: 15,
    range: 100,
    fireRate: 2,
    color: '#00997d',
    icon: 'shield'
  },
  adblock: {
    type: 'adblock',
    name: 'AdBlocker Firefox',
    description: 'Elimine les pubs - portee moyenne',
    cost: 75,
    damage: 25,
    range: 120,
    fireRate: 1.5,
    color: '#FF6611',
    icon: 'ban'
  },
  linux: {
    type: 'linux',
    name: 'Linux Update',
    description: 'Combat l\'obsolescence - degats eleves',
    cost: 100,
    damage: 40,
    range: 80,
    fireRate: 1,
    color: '#F9A825',
    icon: 'refresh-cw'
  },
  shield: {
    type: 'shield',
    name: 'NIRD Shield',
    description: 'Protection complete - tous ennemis',
    cost: 150,
    damage: 30,
    range: 150,
    fireRate: 1.2,
    color: '#4CAF50',
    icon: 'shield-check'
  }
};

export const WAVES: WaveConfig[] = [
  {
    waveNumber: 1,
    enemies: [
      { type: 'tracker', count: 5, delay: 1000 },
    ],
    bonus: 50
  },
  {
    waveNumber: 2,
    enemies: [
      { type: 'tracker', count: 4, delay: 800 },
      { type: 'ad', count: 3, delay: 1200 },
    ],
    bonus: 75
  },
  {
    waveNumber: 3,
    enemies: [
      { type: 'tracker', count: 3, delay: 600 },
      { type: 'ad', count: 4, delay: 1000 },
      { type: 'telemetry', count: 2, delay: 1500 },
    ],
    bonus: 100
  },
  {
    waveNumber: 4,
    enemies: [
      { type: 'ad', count: 5, delay: 800 },
      { type: 'telemetry', count: 3, delay: 1000 },
      { type: 'obsolescence', count: 3, delay: 2000 },
    ],
    bonus: 150
  },
  {
    waveNumber: 5,
    enemies: [
      { type: 'tracker', count: 5, delay: 500 },
      { type: 'ad', count: 5, delay: 700 },
      { type: 'obsolescence', count: 3, delay: 1500 },
      { type: 'boss', count: 1, delay: 3000 },
    ],
    bonus: 300
  }
];

// Game constants
export const GAME_CONFIG = {
  startingCoins: 150,
  startingLives: 10,
  laneCount: 5,
  laneHeight: 60,
  gameWidth: 800,
  villageX: 50, // village position (left side)
  spawnX: 750, // enemy spawn position (right side)
};

// Path points for enemies (right to left)
export const PATH_POINTS = [
  { x: 750, y: 0 }, // spawn
  { x: 50, y: 0 },  // village
];
