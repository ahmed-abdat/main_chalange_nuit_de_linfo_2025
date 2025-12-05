'use client';

import { motion } from 'motion/react';
import { useTotalPoints } from '@/store/studentScenarioStore';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';

interface PointsBadgeProps {
  emoji: string;
  label: string;
  value: number;
  color: string;
}

function PointsBadge({ emoji, label, value, color }: PointsBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border bg-white shadow-sm',
        'transition-all hover:shadow-md'
      )}
      style={{ borderColor: `${color}40` }}
    >
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-xl font-bold" style={{ color }}>
          <CountUp to={value} duration={0.8} />
        </p>
      </div>
    </motion.div>
  );
}

interface PointsDisplayProps {
  className?: string;
  sticky?: boolean;
}

export function PointsDisplay({ className, sticky = false }: PointsDisplayProps) {
  const points = useTotalPoints();
  const total = points.money + points.protection + points.environment;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'w-full',
        sticky && 'sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {/* Title */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🎯</span>
            <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap">Vos Points</h3>
          </div>

          {/* Points Badges */}
          <div className="flex items-center gap-3">
            <PointsBadge
              emoji="💰"
              label="Économies"
              value={points.money}
              color="#F9A825"
            />
            <PointsBadge
              emoji="🛡️"
              label="Protection"
              value={points.protection}
              color="#00997d"
            />
            <PointsBadge
              emoji="🌱"
              label="Environnement"
              value={points.environment}
              color="#22C55E"
            />
          </div>

          {/* Total Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#007d66] rounded-xl text-white shrink-0"
          >
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-wide opacity-90">Total</p>
              <p className="text-2xl font-bold leading-none">
                <CountUp to={total} duration={0.8} />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

