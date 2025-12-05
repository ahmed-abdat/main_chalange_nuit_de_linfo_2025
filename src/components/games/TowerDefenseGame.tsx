'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, ShieldCheck, Ban, RefreshCw, Eye, Megaphone, TimerOff, RadioTower, Crown,
  Play, Pause, RotateCcw, Trophy, Heart, Coins, Zap, AlertTriangle, PartyPopper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ENEMIES, TOWERS, WAVES, GAME_CONFIG, type EnemyType, type TowerType } from '@/data/towerDefenseData';
import { useAchievementStore } from '@/store/achievementStore';
import {
  EnhancedConfetti,
  Explosion,
  useParticles,
  ParticleSystem,
  FloatingText,
  DamageFlash,
  ScreenShakeProvider,
  useScreenShake
} from './GameVFX';

// =============================================================================
// TYPES
// =============================================================================
interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  lane: number;
  health: number;
  maxHealth: number;
}

interface Tower {
  id: string;
  type: TowerType;
  x: number;
  y: number;
  lane: number;
  lastFired: number;
}

interface Projectile {
  id: string;
  x: number;
  y: number;
  targetId: string;
  damage: number;
  color: string;
}

type GamePhase = 'menu' | 'playing' | 'between_waves' | 'victory' | 'defeat';

// =============================================================================
// ICON COMPONENTS
// =============================================================================
const ENEMY_ICONS: Record<EnemyType, typeof Eye> = {
  tracker: Eye,
  ad: Megaphone,
  obsolescence: TimerOff,
  telemetry: RadioTower,
  boss: Crown
};

const TOWER_ICONS: Record<TowerType, typeof Shield> = {
  firewall: Shield,
  adblock: Ban,
  linux: RefreshCw,
  shield: ShieldCheck
};

// =============================================================================
// VFX TYPES
// =============================================================================
interface ExplosionData {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface FloatingTextData {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

// =============================================================================
// TOWER SELECTION PANEL
// =============================================================================
function TowerPanel({
  coins,
  selectedTower,
  onSelect
}: {
  coins: number;
  selectedTower: TowerType | null;
  onSelect: (type: TowerType | null) => void;
}) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {(Object.keys(TOWERS) as TowerType[]).map(type => {
        const tower = TOWERS[type];
        const Icon = TOWER_ICONS[type];
        const canAfford = coins >= tower.cost;

        return (
          <motion.button
            key={type}
            whileHover={canAfford ? { scale: 1.05 } : {}}
            whileTap={canAfford ? { scale: 0.95 } : {}}
            onClick={() => onSelect(selectedTower === type ? null : type)}
            disabled={!canAfford}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all min-w-[80px]",
              selectedTower === type && "ring-2 ring-white",
              canAfford
                ? "bg-gray-800 border-gray-600 hover:border-[#00997d] cursor-pointer"
                : "bg-gray-900 border-gray-700 opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${tower.color}30` }}
            >
              <Icon className="w-4 h-4" style={{ color: tower.color }} />
            </div>
            <span className="text-[10px] text-white font-medium">{tower.name.split(' ')[0]}</span>
            <span className="text-[10px] text-yellow-400 flex items-center gap-0.5">
              <Coins className="w-3 h-3" />
              {tower.cost}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// =============================================================================
// GAME HUD
// =============================================================================
function GameHUD({
  lives,
  coins,
  wave,
  totalWaves,
  phase
}: {
  lives: number;
  coins: number;
  wave: number;
  totalWaves: number;
  phase: GamePhase;
}) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/30">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-red-400 font-bold text-sm">{lives}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1.5 rounded-full border border-yellow-500/30">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm">{coins}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-[#00997d]/20 px-3 py-1.5 rounded-full border border-[#00997d]/30">
        <Zap className="w-4 h-4 text-[#00d9a7]" />
        <span className="text-[#00d9a7] font-bold text-sm">
          Vague {wave}/{totalWaves}
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// GAME CANVAS
// =============================================================================
function GameCanvas({
  enemies,
  towers,
  projectiles,
  selectedTower,
  onPlaceTower,
  laneCount,
  laneHeight,
  gameWidth
}: {
  enemies: Enemy[];
  towers: Tower[];
  projectiles: Projectile[];
  selectedTower: TowerType | null;
  onPlaceTower: (lane: number, x: number) => void;
  laneCount: number;
  laneHeight: number;
  gameWidth: number;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!selectedTower || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lane = Math.floor(y / laneHeight);

    if (lane >= 0 && lane < laneCount && x > 100 && x < gameWidth - 100) {
      onPlaceTower(lane, x);
    }
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleClick}
      className={cn(
        "relative w-full rounded-lg overflow-hidden border-2",
        selectedTower ? "cursor-crosshair border-[#00997d]" : "border-gray-700"
      )}
      style={{
        height: laneCount * laneHeight,
        background: 'linear-gradient(to right, #1a472a 0%, #0f2818 50%, #1a1a1a 100%)'
      }}
    >
      {/* Village (left side) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="w-12 h-16 bg-[#FFF8E1] rounded-t-lg relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#8B4513]" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-[#8B4513] rounded-t-sm" />
        </div>
        <span className="text-[8px] text-[#00d9a7] font-bold">VILLAGE</span>
      </div>

      {/* Spawn (right side) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-[#C62828] rounded flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <span className="text-[8px] text-red-400 font-bold">EMPIRE</span>
      </div>

      {/* Lane dividers */}
      {Array.from({ length: laneCount - 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px bg-white/10"
          style={{ top: (i + 1) * laneHeight }}
        />
      ))}

      {/* Towers */}
      {towers.map(tower => {
        const config = TOWERS[tower.type];
        const Icon = TOWER_ICONS[tower.type];

        return (
          <motion.div
            key={tower.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute flex items-center justify-center"
            style={{
              left: tower.x - 20,
              top: tower.lane * laneHeight + laneHeight / 2 - 20,
              width: 40,
              height: 40
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border-2"
              style={{
                backgroundColor: `${config.color}30`,
                borderColor: config.color
              }}
            >
              <Icon className="w-5 h-5" style={{ color: config.color }} />
            </div>
            {/* Range indicator */}
            <div
              className="absolute rounded-full border border-white/10 pointer-events-none"
              style={{
                width: config.range * 2,
                height: config.range * 2,
                left: 20 - config.range,
                top: 20 - config.range
              }}
            />
          </motion.div>
        );
      })}

      {/* Enemies */}
      {enemies.map(enemy => {
        const config = ENEMIES[enemy.type];
        const Icon = ENEMY_ICONS[enemy.type];
        const healthPercent = (enemy.health / enemy.maxHealth) * 100;

        return (
          <motion.div
            key={enemy.id}
            className="absolute"
            style={{
              left: enemy.x - 16,
              top: enemy.lane * laneHeight + laneHeight / 2 - 16
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.color }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
            {/* Health bar */}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Projectiles */}
      {projectiles.map(proj => (
        <motion.div
          key={proj.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: proj.x - 4,
            top: proj.y - 4,
            backgroundColor: proj.color,
            boxShadow: `0 0 8px ${proj.color}`
          }}
        />
      ))}

      {/* Placement hint */}
      {selectedTower && (
        <div className="absolute inset-0 bg-[#00997d]/5 flex items-center justify-center pointer-events-none">
          <p className="text-[#00d9a7] text-sm font-medium bg-black/50 px-3 py-1 rounded">
            Cliquez pour placer la tour
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TowerDefenseGame() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [lives, setLives] = useState(GAME_CONFIG.startingLives);
  const [coins, setCoins] = useState(GAME_CONFIG.startingCoins);
  const [wave, setWave] = useState(1);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [selectedTower, setSelectedTower] = useState<TowerType | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // VFX states
  const [explosions, setExplosions] = useState<ExplosionData[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([]);
  const [damageFlash, setDamageFlash] = useState(false);
  const [killCount, setKillCount] = useState(0);

  const { particles, spawn: spawnParticles } = useParticles();
  const vfxIdRef = useRef(0);

  const gameLoopRef = useRef<number | null>(null);
  const enemySpawnRef = useRef<NodeJS.Timeout | null>(null);
  const enemyIdRef = useRef(0);
  const projectileIdRef = useRef(0);

  const unlockBadge = useAchievementStore(s => s.unlockBadge);

  // VFX helpers
  const spawnExplosion = useCallback((x: number, y: number, color: string) => {
    const id = `exp-${++vfxIdRef.current}`;
    setExplosions(prev => [...prev, { id, x, y, color }]);
  }, []);

  const spawnFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
    const id = `txt-${++vfxIdRef.current}`;
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);
  }, []);

  const removeExplosion = useCallback((id: string) => {
    setExplosions(prev => prev.filter(e => e.id !== id));
  }, []);

  const removeFloatingText = useCallback((id: string) => {
    setFloatingTexts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Generate unique IDs
  const getEnemyId = () => `enemy-${++enemyIdRef.current}`;
  const getProjectileId = () => `proj-${++projectileIdRef.current}`;

  // Start a wave
  const startWave = useCallback((waveNum: number) => {
    const waveConfig = WAVES[waveNum - 1];
    if (!waveConfig) return;

    setPhase('playing');

    let enemyIndex = 0;
    const allEnemies: { type: EnemyType; delay: number }[] = [];

    waveConfig.enemies.forEach(group => {
      for (let i = 0; i < group.count; i++) {
        allEnemies.push({ type: group.type, delay: group.delay * i });
      }
    });

    allEnemies.sort((a, b) => a.delay - b.delay);

    const spawnEnemy = (index: number) => {
      if (index >= allEnemies.length) return;

      const { type } = allEnemies[index];
      const config = ENEMIES[type];

      const newEnemy: Enemy = {
        id: getEnemyId(),
        type,
        x: GAME_CONFIG.spawnX,
        y: 0,
        lane: Math.floor(Math.random() * GAME_CONFIG.laneCount),
        health: config.health,
        maxHealth: config.health
      };

      setEnemies(prev => [...prev, newEnemy]);

      if (index + 1 < allEnemies.length) {
        const nextDelay = allEnemies[index + 1].delay - allEnemies[index].delay;
        enemySpawnRef.current = setTimeout(() => spawnEnemy(index + 1), nextDelay);
      }
    };

    spawnEnemy(0);
  }, []);

  // Place a tower
  const placeTower = useCallback((lane: number, x: number) => {
    if (!selectedTower) return;

    const config = TOWERS[selectedTower];
    if (coins < config.cost) return;

    // Check if position is too close to existing tower
    const tooClose = towers.some(t =>
      t.lane === lane && Math.abs(t.x - x) < 50
    );
    if (tooClose) return;

    const newTower: Tower = {
      id: `tower-${Date.now()}`,
      type: selectedTower,
      x,
      y: lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2,
      lane,
      lastFired: 0
    };

    setTowers(prev => [...prev, newTower]);
    setCoins(prev => prev - config.cost);
    setSelectedTower(null);
  }, [selectedTower, coins, towers]);

  // Game loop
  useEffect(() => {
    if (phase !== 'playing' || isPaused) return;

    const gameLoop = () => {
      const now = Date.now();

      // Move enemies
      setEnemies(prev => {
        const updated = prev.map(enemy => {
          const config = ENEMIES[enemy.type];
          return { ...enemy, x: enemy.x - config.speed };
        });

        // Check for enemies reaching village
        const reached = updated.filter(e => e.x <= GAME_CONFIG.villageX);
        if (reached.length > 0) {
          setLives(l => Math.max(0, l - reached.length));
          // Trigger damage flash
          setDamageFlash(true);
          setTimeout(() => setDamageFlash(false), 200);
        }

        return updated.filter(e => e.x > GAME_CONFIG.villageX && e.health > 0);
      });

      // Tower attacks
      setTowers(prev => {
        return prev.map(tower => {
          const config = TOWERS[tower.type];
          const fireInterval = 1000 / config.fireRate;

          if (now - tower.lastFired < fireInterval) return tower;

          // Find enemy in range
          const enemiesInRange = enemies.filter(e =>
            e.lane === tower.lane &&
            Math.abs(e.x - tower.x) <= config.range
          );

          if (enemiesInRange.length > 0) {
            const target = enemiesInRange[0];

            // Create projectile
            setProjectiles(p => [...p, {
              id: getProjectileId(),
              x: tower.x,
              y: tower.lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2,
              targetId: target.id,
              damage: config.damage,
              color: config.color
            }]);

            return { ...tower, lastFired: now };
          }

          return tower;
        });
      });

      // Move projectiles and handle hits
      setProjectiles(prev => {
        return prev.filter(proj => {
          const target = enemies.find(e => e.id === proj.targetId);
          if (!target) return false;

          const dx = target.x - proj.x;
          const dy = (target.lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2) - proj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 10) {
            // Hit!
            setEnemies(e => e.map(enemy => {
              if (enemy.id === proj.targetId) {
                const newHealth = enemy.health - proj.damage;
                if (newHealth <= 0) {
                  // Enemy killed! Spawn explosion and floating text
                  const reward = ENEMIES[enemy.type].reward;
                  const enemyConfig = ENEMIES[enemy.type];
                  setCoins(c => c + reward);
                  setKillCount(k => k + 1);

                  // Spawn explosion at enemy position
                  spawnExplosion(
                    enemy.x,
                    enemy.lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2,
                    enemyConfig.color
                  );

                  // Spawn floating reward text
                  spawnFloatingText(
                    enemy.x,
                    enemy.lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2 - 20,
                    `+${reward}`,
                    '#F9A825'
                  );

                  // Spawn particles
                  spawnParticles({
                    x: enemy.x,
                    y: enemy.lane * GAME_CONFIG.laneHeight + GAME_CONFIG.laneHeight / 2,
                    count: 8,
                    colors: [enemyConfig.color, '#ffffff', '#F9A825'],
                    spread: 30,
                    speed: 3,
                    size: 4,
                    type: 'spark'
                  });
                }
                return { ...enemy, health: newHealth };
              }
              return enemy;
            }));
            return false;
          }

          // Move towards target
          const speed = 8;
          proj.x += (dx / dist) * speed;
          proj.y += (dy / dist) * speed;
          return true;
        });
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [phase, isPaused, enemies, towers]);

  // Check wave completion
  useEffect(() => {
    if (phase !== 'playing') return;

    // Check defeat
    if (lives <= 0) {
      setPhase('defeat');
      if (enemySpawnRef.current) clearTimeout(enemySpawnRef.current);
      return;
    }

    // Check if all enemies spawned and defeated
    const waveConfig = WAVES[wave - 1];
    if (!waveConfig) return;

    const totalEnemies = waveConfig.enemies.reduce((sum, g) => sum + g.count, 0);
    const spawnedAll = enemyIdRef.current >= totalEnemies;
    const allDefeated = enemies.length === 0 && spawnedAll;

    if (allDefeated && enemies.length === 0) {
      setCoins(c => c + waveConfig.bonus);

      if (wave >= WAVES.length) {
        setPhase('victory');
        setShowConfetti(true);
        unlockBadge('village_defender');
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setPhase('between_waves');
      }
    }
  }, [phase, lives, enemies, wave, unlockBadge]);

  // Reset game
  const resetGame = () => {
    setPhase('menu');
    setLives(GAME_CONFIG.startingLives);
    setCoins(GAME_CONFIG.startingCoins);
    setWave(1);
    setEnemies([]);
    setTowers([]);
    setProjectiles([]);
    setSelectedTower(null);
    setIsPaused(false);
    enemyIdRef.current = 0;
    if (enemySpawnRef.current) clearTimeout(enemySpawnRef.current);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
  };

  // Start next wave
  const nextWave = () => {
    setWave(w => w + 1);
    enemyIdRef.current = 0;
    startWave(wave + 1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {/* VFX Layers */}
      <EnhancedConfetti active={showConfetti} />
      <DamageFlash active={damageFlash} />
      <ParticleSystem particles={particles} />

      {/* Explosions */}
      {explosions.map(exp => (
        <Explosion
          key={exp.id}
          x={exp.x}
          y={exp.y}
          color={exp.color}
          onComplete={() => removeExplosion(exp.id)}
        />
      ))}

      {/* Floating Texts */}
      {floatingTexts.map(txt => (
        <FloatingText
          key={txt.id}
          x={txt.x}
          y={txt.y}
          text={txt.text}
          color={txt.color}
          onComplete={() => removeFloatingText(txt.id)}
        />
      ))}

      {/* Menu Screen */}
      <AnimatePresence>
        {phase === 'menu' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 bg-[#00997d]/20 rounded-full flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-[#00d9a7]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Defense du Village</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Protegez le Village contre les invasions de Big Tech !
              Placez des tours pour stopper les ennemis.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {(Object.keys(TOWERS) as TowerType[]).map(type => {
                const tower = TOWERS[type];
                const Icon = TOWER_ICONS[type];
                return (
                  <div key={type} className="bg-gray-800 rounded-lg p-3 w-32">
                    <div
                      className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${tower.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: tower.color }} />
                    </div>
                    <p className="text-white text-sm font-medium">{tower.name}</p>
                    <p className="text-white/50 text-[10px]">{tower.description}</p>
                  </div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startWave(1)}
              className="px-8 py-4 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl text-lg shadow-lg shadow-[#00997d]/30"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Commencer la Defense
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Screen */}
      {(phase === 'playing' || phase === 'between_waves') && (
        <div>
          <GameHUD lives={lives} coins={coins} wave={wave} totalWaves={WAVES.length} phase={phase} />

          <GameCanvas
            enemies={enemies}
            towers={towers}
            projectiles={projectiles}
            selectedTower={selectedTower}
            onPlaceTower={placeTower}
            laneCount={GAME_CONFIG.laneCount}
            laneHeight={GAME_CONFIG.laneHeight}
            gameWidth={GAME_CONFIG.gameWidth}
          />

          <div className="mt-4">
            <TowerPanel coins={coins} selectedTower={selectedTower} onSelect={setSelectedTower} />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 text-sm"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Reprendre' : 'Pause'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-sm border border-red-500/30"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer
            </motion.button>
          </div>

          {/* Between waves overlay */}
          <AnimatePresence>
            {phase === 'between_waves' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 flex items-center justify-center z-20"
              >
                <div className="text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-[#F9A825]" />
                  <h4 className="text-xl font-bold text-white mb-2">Vague {wave} Terminee !</h4>
                  <p className="text-[#00d9a7] mb-4">+{WAVES[wave - 1]?.bonus} pieces bonus</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextWave}
                    className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl"
                  >
                    Vague Suivante
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Victory Screen */}
      <AnimatePresence>
        {phase === 'victory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 bg-[#F9A825]/20 rounded-full flex items-center justify-center"
            >
              <PartyPopper className="w-10 h-10 text-[#F9A825]" />
            </motion.div>
            <h3 className="text-3xl font-bold text-[#00d9a7] mb-2">Victoire !</h3>
            <p className="text-white/80 mb-6">Le Village est sauve ! L'Empire a ete repousse.</p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#F9A825] text-2xl font-bold">{coins}</p>
                <p className="text-white/50 text-sm">Pieces</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-red-400 text-2xl font-bold">{lives}</p>
                <p className="text-white/50 text-sm">Vies restantes</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#00d9a7] text-2xl font-bold">{towers.length}</p>
                <p className="text-white/50 text-sm">Tours placees</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl"
            >
              Rejouer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defeat Screen */}
      <AnimatePresence>
        {phase === 'defeat' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-red-400 mb-2">Defaite</h3>
            <p className="text-white/80 mb-6">Le Village a ete envahi... Mais la resistance continue !</p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#00d9a7] text-2xl font-bold">{wave}</p>
                <p className="text-white/50 text-sm">Vagues survecues</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl"
            >
              Reessayer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
